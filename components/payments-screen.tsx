"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface PaymentsScreenProps {
  onBack: () => void
  walletBalance: number
  onPayment: (amount: number, service: string, provider: string) => void
}

export function PaymentsScreen({ onBack, walletBalance, onPayment }: PaymentsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<"topup" | "bills" | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [amount, setAmount] = useState("")
  const [meterNumber, setMeterNumber] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const topupProviders = [
    { id: "orange", name: "Orange Money", logo: "/images/orange-money-logo.jpg" },
    { id: "africell", name: "Africell Money", logo: "/africell-money-logo.jpg" },
    { id: "qcell", name: "Q-Cell Money", logo: "/qcell-money-logo.jpg" },
  ]

  const handlePayment = () => {
    const paymentAmount = Number.parseFloat(amount)

    if (!paymentAmount || paymentAmount <= 0) {
      alert("Please enter a valid amount")
      return
    }

    if (paymentAmount > walletBalance) {
      alert("Insufficient balance")
      return
    }

    const service = selectedCategory === "topup" ? "Top-up" : "Electricity Bill"
    const provider = selectedCategory === "topup" ? selectedProvider || "" : "EDSA"
    onPayment(paymentAmount, service, provider)

    if (selectedCategory === "topup") {
      setSuccessMessage(`Successfully topped up ${selectedProvider} with $${paymentAmount.toFixed(2)}`)
    } else {
      setSuccessMessage(`Successfully paid $${paymentAmount.toFixed(2)} for EDSA electricity`)
    }

    setShowSuccess(true)
    setAmount("")
    setMeterNumber("")

    setTimeout(() => {
      setShowSuccess(false)
      setSelectedProvider(null)
      setSelectedCategory(null)
    }, 3000)
  }

  // Success popup
  if (showSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-background">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-center text-muted-foreground">{successMessage}</p>
      </div>
    )
  }

  // Payment form for selected provider
  if (selectedProvider) {
    const isTopup = selectedCategory === "topup"
    const provider = isTopup ? topupProviders.find((p) => p.id === selectedProvider) : null

    return (
      <div className="h-full flex flex-col bg-background">
        <div className="p-6 flex items-center gap-4 border-b border-border bg-[rgba(217,237,212,1)]">
          <button
            onClick={() => setSelectedProvider(null)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">{isTopup ? provider?.name : "EDSA Electricity"}</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6 bg-[rgba(217,237,212,1)]">
          <Card className="p-6 rounded-3xl bg-[rgba(217,237,212,1)]">
            <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
            <p className="text-3xl font-bold">${walletBalance.toFixed(2)}</p>
          </Card>

          <div className="space-y-4">
            {!isTopup && (
              <div className="space-y-2">
                <Label htmlFor="meter">Meter Number</Label>
                <Input
                  id="meter"
                  type="text"
                  placeholder="Enter your meter number"
                  value={meterNumber}
                  onChange={(e) => setMeterNumber(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>

            <Button
              onClick={handlePayment}
              className="w-full h-12 rounded-xl font-semibold bg-[rgba(12,11,11,1)] hover:bg-[rgba(12,11,11,0.9)] text-white"
            >
              Confirm Payment
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Category selection (topup or bills)
  if (selectedCategory) {
    const isTopup = selectedCategory === "topup"

    return (
      <div className="h-full flex flex-col bg-background">
        <div className="p-6 flex items-center gap-4 border-b border-border bg-[rgba(217,237,212,1)]">
          <button
            onClick={() => setSelectedCategory(null)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">{isTopup ? "Top-up Options" : "Bill Payments"}</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-4 bg-[rgba(217,237,212,1)]">
          {isTopup ? (
            topupProviders.map((provider) => (
              <Card
                key={provider.id}
                className="p-4 rounded-2xl cursor-pointer hover:border-primary transition-all"
                onClick={() => setSelectedProvider(provider.id)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={provider.logo || "/placeholder.svg"}
                    alt={provider.name}
                    className="w-16 h-16 object-contain rounded-xl"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{provider.name}</p>
                    <p className="text-sm text-muted-foreground">Mobile money top-up</p>
                  </div>
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            ))
          ) : (
            <Card
              className="p-4 rounded-2xl cursor-pointer hover:border-primary transition-all"
              onClick={() => setSelectedProvider("edsa")}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">EDSA Electricity</p>
                  <p className="text-sm text-muted-foreground">Pay your electricity bill</p>
                </div>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          )}
        </div>
      </div>
    )
  }

  // Main payments screen
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-6 flex items-center gap-4 border-b border-border bg-[rgba(217,237,212,1)]">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Payments</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6 bg-[rgba(217,237,212,1)]">
        <Card className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5">
          <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
          <p className="text-4xl font-bold">${walletBalance.toFixed(2)}</p>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Payment Categories</h3>

          <Card
            className="p-6 rounded-2xl cursor-pointer hover:border-primary transition-all"
            onClick={() => setSelectedCategory("topup")}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg">Top-up Options</p>
                <p className="text-sm text-muted-foreground">Orange Money, Africell, Q-Cell</p>
              </div>
              <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Card>

          <Card
            className="p-6 rounded-2xl cursor-pointer hover:border-primary transition-all"
            onClick={() => setSelectedCategory("bills")}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg">Bill Payments</p>
                <p className="text-sm text-muted-foreground">EDSA Electricity</p>
              </div>
              <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
