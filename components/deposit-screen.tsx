"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface DepositScreenProps {
  onBack: () => void
}

const recyclableTypes = [
  { id: "plastic", name: "Plastic Bottles", icon: "♻️", rate: "$0.50/item" },
  { id: "cans", name: "Aluminum Cans", icon: "🥫", rate: "$0.15/item" },
  { id: "pet", name: "PET Bottles", icon: "🍾", rate: "$0.40/item" },
  { id: "glass", name: "Glass Bottles", icon: "🍶", rate: "$0.30/item" },
]

export function DepositScreen({ onBack }: DepositScreenProps) {
  const [step, setStep] = useState<"select" | "scan" | "confirm">("select")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    setStep("scan")
  }

  const handleScanComplete = () => {
    setStep("confirm")
  }

  const selectedItem = recyclableTypes.find((t) => t.id === selectedType)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center gap-4 border-b border-border">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Deposit Recyclables</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        {step === "select" && (
          <div className="space-y-4">
            <p className="text-muted-foreground">Select the type of recyclable you want to deposit</p>
            <div className="grid gap-4">
              {recyclableTypes.map((type) => (
                <Card
                  key={type.id}
                  className="p-6 rounded-3xl cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{type.name}</p>
                      <p className="text-sm text-muted-foreground">{type.rate}</p>
                    </div>
                    <svg
                      className="w-6 h-6 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === "scan" && selectedItem && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-5xl mb-4">{selectedItem.icon}</div>
              <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
              <p className="text-muted-foreground">Scan QR code or tap NFC at RVM</p>
            </div>

            {/* QR Code Placeholder */}
            <Card className="p-8 rounded-3xl bg-muted">
              <div className="aspect-square bg-card rounded-2xl flex items-center justify-center">
                <div className="w-48 h-48 border-4 border-primary rounded-2xl flex items-center justify-center">
                  <svg className="w-32 h-32 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                </div>
              </div>
            </Card>

            {/* Quantity Selector */}
            <Card className="p-6 rounded-3xl">
              <p className="text-sm text-muted-foreground mb-4">Number of items</p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-4xl font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </Card>

            <Button onClick={handleScanComplete} className="w-full h-14 text-lg font-semibold rounded-2xl" size="lg">
              Confirm Deposit
            </Button>
          </div>
        )}

        {step === "confirm" && selectedItem && (
          <div className="space-y-6">
            {/* Success Animation */}
            <div className="text-center space-y-4 py-8">
              <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto animate-scale-in">
                <svg className="w-12 h-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold">Deposit Successful!</h2>
              <p className="text-muted-foreground">Your rewards have been added to your wallet</p>
            </div>

            {/* Transaction Details */}
            <Card className="p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Item Type</span>
                <span className="font-semibold">{selectedItem.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Quantity</span>
                <span className="font-semibold">{quantity} items</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-semibold">{selectedItem.rate}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total Earned</span>
                <span className="text-2xl font-bold text-success">
                  ${(Number.parseFloat(selectedItem.rate.replace(/[^0-9.]/g, "")) * quantity).toFixed(2)}
                </span>
              </div>
            </Card>

            {/* Blockchain Verification */}
            <Card className="p-6 rounded-3xl bg-muted">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold mb-1">Verified on Solana</p>
                  <p className="text-sm text-muted-foreground font-mono">TX: 5x7k...9mP2</p>
                </div>
              </div>
            </Card>

            <Button onClick={onBack} className="w-full h-14 text-lg font-semibold rounded-2xl" size="lg">
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
