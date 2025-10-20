"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface WalletScreenProps {
  onBack: () => void
}

export function WalletScreen({ onBack }: WalletScreenProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 flex items-center gap-4 border-b border-border">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Rewards Wallet</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Balance Card */}
        <div className="p-6">
          <Card className="p-8 rounded-3xl bg-primary text-primary-foreground">
            <p className="text-sm opacity-90 mb-2">Available Balance</p>
            <h2 className="text-5xl font-bold mb-6">$24.50</h2>
            <div className="flex gap-3">
              <Button className="flex-1 h-12 bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl font-semibold">
                Withdraw
              </Button>
              <Button className="flex-1 h-12 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 rounded-2xl font-semibold">
                Convert
              </Button>
            </div>
          </Card>
        </div>

        {/* Token Info */}
        <div className="px-6 pb-6">
          <Card className="p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">EcoKash Credits</p>
                  <p className="text-sm text-muted-foreground">49 ECK</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">$24.50</p>
                <p className="text-sm text-success">+12.5%</p>
              </div>
            </div>
            <div className="h-px bg-border mb-4" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Verified on Solana</span>
              <button className="text-primary font-medium">View on Explorer</button>
            </div>
          </Card>
        </div>

        {/* Transaction History */}
        <div className="px-6 space-y-4">
          <h3 className="text-lg font-semibold">Transaction History</h3>
          <div className="space-y-3">
            {[
              {
                type: "Deposit",
                desc: "Plastic Bottles (5 items)",
                amount: "+$2.50",
                date: "Today, 2:30 PM",
                status: "completed",
              },
              {
                type: "Deposit",
                desc: "Aluminum Cans (12 items)",
                amount: "+$1.80",
                date: "Yesterday, 4:15 PM",
                status: "completed",
              },
              {
                type: "Withdrawal",
                desc: "To Bank Account",
                amount: "-$10.00",
                date: "Dec 15, 2024",
                status: "completed",
              },
              {
                type: "Deposit",
                desc: "PET Bottles (8 items)",
                amount: "+$3.20",
                date: "Dec 14, 2024",
                status: "completed",
              },
              {
                type: "Deposit",
                desc: "Glass Bottles (6 items)",
                amount: "+$1.80",
                date: "Dec 13, 2024",
                status: "completed",
              },
            ].map((tx, index) => (
              <Card key={index} className="p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "Deposit" ? "bg-success/10" : "bg-muted"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${tx.type === "Deposit" ? "text-success" : "text-muted-foreground"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {tx.type === "Deposit" ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m0 0l-4-4m4 4l4-4"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 20V4m0 0l4 4m-4-4l-4 4"
                        />
                      )}
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{tx.type}</p>
                    <p className="text-sm text-muted-foreground">{tx.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tx.date}</p>
                  </div>
                  <p className={`font-bold ${tx.type === "Deposit" ? "text-success" : "text-foreground"}`}>
                    {tx.amount}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
