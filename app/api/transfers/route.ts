import { createClient } from "@/lib/supabase/server"
import { generateMockSignature } from "@/lib/solana/client"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { recipientEmail, amount, note } = body

    // Find recipient by email
    const { data: recipient, error: recipientError } = await supabase
      .from("profiles")
      .select("id, full_name")
      .eq("email", recipientEmail)
      .single()

    if (recipientError || !recipient) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 })
    }

    // Check sender balance
    const { data: senderProfile } = await supabase.from("profiles").select("wallet_balance").eq("id", user.id).single()

    if (!senderProfile || senderProfile.wallet_balance < amount) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
    }

    const solanaSignature = generateMockSignature()

    // Create transfer transaction
    const { error: transactionError } = await supabase.rpc("create_transaction", {
      p_user_id: user.id,
      p_type: "transfer",
      p_amount: amount,
      p_description: note || `Transfer to ${recipient.full_name}`,
      p_recipient_id: recipient.id,
      p_recipient_name: recipient.full_name,
      p_solana_signature: solanaSignature,
    })

    if (transactionError) throw transactionError

    // Create notifications for both users
    await supabase.from("notifications").insert([
      {
        user_id: user.id,
        type: "transfer",
        title: "Transfer Sent",
        message: `You sent $${amount.toFixed(2)} to ${recipient.full_name}`,
        amount: -amount,
        solana_signature: solanaSignature,
      },
      {
        user_id: recipient.id,
        type: "transfer",
        title: "Transfer Received",
        message: `You received $${amount.toFixed(2)}`,
        amount,
        solana_signature: solanaSignature,
      },
    ])

    return NextResponse.json({ success: true, solanaSignature })
  } catch (error) {
    console.error("[v0] Transfer error:", error)
    return NextResponse.json({ error: "Failed to process transfer" }, { status: 500 })
  }
}
