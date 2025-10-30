// Solana blockchain integration for dApp functionality
import { Connection } from "@solana/web3.js"

// Use devnet for development
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com"

export function getSolanaConnection() {
  return new Connection(SOLANA_RPC_URL, "confirmed")
}

// Generate a mock transaction signature for demo purposes
export function generateMockSignature(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  let signature = ""
  for (let i = 0; i < 88; i++) {
    signature += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return signature
}

// Verify transaction on Solana blockchain
export async function verifyTransaction(signature: string): Promise<boolean> {
  try {
    const connection = getSolanaConnection()
    const status = await connection.getSignatureStatus(signature)
    return status.value?.confirmationStatus === "confirmed" || status.value?.confirmationStatus === "finalized"
  } catch (error) {
    console.error("[v0] Error verifying transaction:", error)
    return false
  }
}

// Get Solana explorer URL for transaction
export function getSolanaExplorerUrl(signature: string, cluster: "devnet" | "mainnet-beta" = "devnet"): string {
  return `https://explorer.solana.com/tx/${signature}?cluster=${cluster}`
}
