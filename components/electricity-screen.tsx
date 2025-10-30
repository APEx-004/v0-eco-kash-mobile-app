"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ElectricityScreenProps {
  onBack: () => void
  walletBalance: number
  onPurchase: (amount: number, meterNumber: string, provider: string, token: string) => void
}

export function ElectricityScreen({ onBack, walletBalance, onPurchase }: ElectricityScreenProps) {
  const [step, setStep] = useState(1)
  const [meterNumber, setMeterNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [provider, setProvider] = useState("")
  const [generatedToken, setGeneratedToken] = useState("")

  const providers = [
    { name: "EDSA (Electricity Distribution)", icon: "⚡" },
    { name: "Freetown Power", icon: "🔌" },
    { name: "Bumbuna Hydro", icon: "💡" },
  ]

  const quickAmounts = [5, 10, 20, 50, 100]

  const generateToken = (): string => {
    // Generate a 20-digit electricity token (format: XXXX-XXXX-XXXX-XXXX-XXXX)
    const segments = []
    for (let i = 0; i < 5; i++) {
      const segment = Math.floor(1000 + Math.random() * 9000).toString()
      segments.push(segment)
    }
    return segments.join("-")
  }

  const handlePurchase = () => {
    const purchaseAmount = Number.parseFloat(amount)
    if (purchaseAmount > walletBalance) {
      alert("Insufficient balance")
      return
    }

    const token = generateToken()
    setGeneratedToken(token)
    onPurchase(purchaseAmount, meterNumber, provider, token)
    setStep(3)
  }

  const handleCopyToken = () => {
    navigator.clipboard.writeText(generatedToken.replace(/-/g, ""))
    alert("Token copied to clipboard!")
  }

  return (
    <div className="h-full overflow-y-auto pb-8 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-accent rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold">Electricity Tokens</h1>
            <p className="text-sm text-muted-foreground">Purchase prepaid electricity</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Wallet Balance Card */}
        <Card className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
              <p className="text-3xl font-bold text-primary">${walletBalance.toFixed(2)}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
          </div>
        </Card>

        {/* Step 1: Select Provider */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Select Provider</h2>
              <p className="text-sm text-muted-foreground">Choose your electricity provider</p>
            </div>

            <div className="space-y-3">
              {providers.map((prov) => (
                <button
                  key={prov.name}
                  onClick={() => {
                    setProvider(prov.name)
                    setStep(2)
                  }}
                  className="w-full p-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                      {prov.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-lg">{prov.name}</p>
                      <p className="text-sm text-muted-foreground">Prepaid electricity tokens</p>
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
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Enter Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Purchase Token</h2>
              <p className="text-sm text-muted-foreground">Enter your meter details</p>
            </div>

            <Card className="p-6 rounded-2xl space-y-6">
              {/* Provider Display */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                  {providers.find((p) => p.name === provider)?.icon}
                </div>
                <div>
                  <p className="font-semibold">{provider}</p>
                  <p className="text-xs text-muted-foreground">Selected provider</p>
                </div>
              </div>

              {/* Meter Number */}
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

              {/* Amount */}
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

              {/* Quick Amount Buttons */}
              <div className="space-y-2">
                <Label>Quick Select</Label>
                <div className="grid grid-cols-5 gap-2">
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt.toString())}
                      className="h-10 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 font-semibold text-sm transition-all"
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Units Estimate */}
              {amount && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Estimated Units</span>
                    <span className="font-bold text-primary">{(Number.parseFloat(amount) * 10).toFixed(0)} kWh</span>
                  </div>
                </div>
              )}
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1 h-12 rounded-xl font-semibold">
                Back
              </Button>
              <Button
                onClick={handlePurchase}
                disabled={
                  !meterNumber || !amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > walletBalance
                }
                className="flex-1 h-12 rounded-xl font-semibold bg-primary hover:bg-primary/90"
              >
                Purchase Token
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Token Generated */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Token Generated!</h2>
              <p className="text-muted-foreground">Your electricity token is ready</p>
            </div>

            <Card className="p-6 rounded-2xl space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Provider</Label>
                <p className="font-semibold">{provider}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Meter Number</Label>
                <p className="font-semibold">{meterNumber}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Amount Paid</Label>
                <p className="font-semibold text-primary">${Number.parseFloat(amount).toFixed(2)}</p>
              </div>

              <div className="pt-4 border-t border-border">
                <Label className="text-xs text-muted-foreground mb-2 block">Your Token</Label>
                <div className="p-4 rounded-xl bg-primary/5 border-2 border-primary/20">
                  <p className="text-2xl font-mono font-bold text-center tracking-wider text-primary break-all">
                    {generatedToken}
                  </p>
                </div>
                <Button
                  onClick={handleCopyToken}
                  variant="outline"
                  className="w-full mt-3 h-10 rounded-xl font-semibold bg-transparent"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy Token
                </Button>
              </div>
            </Card>

            <div className="p-4 rounded-xl bg-accent/50 border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>How to use:</strong> Enter this 20-digit token on your electricity meter keypad. The units will
                be credited immediately.
              </p>
            </div>

            <Button
              onClick={() => {
                setStep(1)
                setMeterNumber("")
                setAmount("")
                setProvider("")
                setGeneratedToken("")
              }}
              className="w-full h-12 rounded-xl font-semibold bg-primary hover:bg-primary/90"
            >
              Buy Another Token
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
