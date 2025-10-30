import { createClient } from "@/lib/supabase/server"
import { generateMockSignature } from "@/lib/solana/client"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { rvmLocation, recyclableType, quantity, amount } = body

    // Generate Solana transaction signature
    const solanaSignature = generateMockSignature()

    // Create deposit record
    const { data: deposit, error: depositError } = await supabase
      .from("deposits")
      .insert({
        user_id: user.id,
        rvm_location: rvmLocation,
        recyclable_type: recyclableType,
        quantity,
        amount,
        solana_signature: solanaSignature,
      })
      .select()
      .single()

    if (depositError) throw depositError

    // Create transaction using database function
    const { error: transactionError } = await supabase.rpc("create_transaction", {
      p_user_id: user.id,
      p_type: "deposit",
      p_amount: amount,
      p_description: `Deposited ${quantity} ${recyclableType} at ${rvmLocation}`,
      p_solana_signature: solanaSignature,
    })

    if (transactionError) throw transactionError

    // Create notification
    await supabase.from("notifications").insert({
      user_id: user.id,
      type: "deposit",
      title: "Deposit Successful",
      message: `You earned $${amount.toFixed(2)} from depositing ${quantity} ${recyclableType}`,
      amount,
      solana_signature: solanaSignature,
    })

    return NextResponse.json({ success: true, deposit, solanaSignature })
  } catch (error) {
    console.error("[v0] Deposit error:", error)
    return NextResponse.json({ error: "Failed to process deposit" }, { status: 500 })
  }
}
