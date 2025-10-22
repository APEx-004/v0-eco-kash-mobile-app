"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Image from "next/image"

interface TransferScreenProps {
  onBack: () => void
  walletBalance: number
  onTransfer: (amount: number) => void
}

type TransferType = "mobile" | "bank" | null
type Provider = string | null
type MobileRecipientType = "phone" | "agent" | null

export function TransferScreen({ onBack, walletBalance, onTransfer }: TransferScreenProps) {
  const [transferType, setTransferType] = useState<TransferType>(null)
  const [selectedProvider, setSelectedProvider] = useState<Provider>(null)
  const [mobileRecipientType, setMobileRecipientType] = useState<MobileRecipientType>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [agentCode, setAgentCode] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [amount, setAmount] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const mobileMoneyProviders = [
    { name: "Orange Money", logo: "/images/orange-money-logo.jpg", color: "bg-orange-50" },
    { name: "Afrimoney", logo: "/images/afrimoney-logo.jpg", color: "bg-blue-50" },
    { name: "Q-Money", logo: "/images/qmoney-logo.jpg", color: "bg-purple-50" },
  ]

  const banks = [
    { name: "UBA Bank", logo: "/images/uba-bank-logo.jpg", color: "bg-red-50" },
    { name: "Ecobank", logo: "/images/ecobank-logo.jpg", color: "bg-blue-50" },
    { name: "Sierra Leone Commercial Bank", logo: "/images/slcb-logo.jpg", color: "bg-green-50" },
    { name: "GTBank", logo: "/images/gtbank-logo.jpg", color: "bg-orange-50" },
  ]

  const handleTransfer = () => {
    const transferAmount = Number.parseFloat(amount)

    if (!transferAmount || transferAmount <= 0) {
      alert("Please enter a valid amount")
      return
    }

    if (transferAmount > walletBalance) {
      alert("Insufficient balance")
      return
    }

    if (transferType === "mobile" && !phoneNumber && !agentCode) {
      alert("Please enter a phone number or agent code")
      return
    }

    if (transferType === "bank" && (!accountNumber || !accountName)) {
      alert("Please fill in all bank details")
      return
    }

    // Process transfer
    onTransfer(transferAmount)

    const recipient =
      transferType === "mobile" ? (mobileRecipientType === "agent" ? `Agent ${agentCode}` : phoneNumber) : accountName
    setSuccessMessage(`Successfully transferred $${transferAmount.toFixed(2)} to ${recipient} via ${selectedProvider}!`)
    setShowSuccess(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
      setTransferType(null)
      setSelectedProvider(null)
      setMobileRecipientType(null)
      setPhoneNumber("")
      setAgentCode("")
      setAccountNumber("")
      setAccountName("")
      setAmount("")
    }, 3000)
  }

  return (
    <div className="h-full overflow-y-auto pb-24 bg-[rgba(216,237,211,1)]">
      {/* Header */}
      <div className="p-6 border-b border-border bg-[rgba(217,237,212,1)]">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-accent rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Transfer</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-2 ml-14">
          Available Balance: <span className="font-bold text-primary">${walletBalance.toFixed(2)}</span>
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Success Notification */}
        {showSuccess && (
          <Card className="p-4 bg-primary/10 border-primary/20 rounded-2xl animate-in slide-in-from-top">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-medium">{successMessage}</p>
            </div>
          </Card>
        )}

        {/* Transfer Type Selection */}
        {!transferType && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Select Transfer Type</h2>

            <button
              onClick={() => setTransferType("mobile")}
              className="w-full p-6 rounded-2xl bg-card border-2 border-border hover:border-primary transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">📱</div>
                <div>
                  <h3 className="font-bold text-lg">Mobile Money</h3>
                  <p className="text-sm text-muted-foreground">Transfer to mobile money accounts</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setTransferType("bank")}
              className="w-full p-6 rounded-2xl bg-card border-2 border-border hover:border-primary transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">🏦</div>
                <div>
                  <h3 className="font-bold text-lg">Bank Transfer</h3>
                  <p className="text-sm text-muted-foreground">Transfer to bank accounts</p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Provider Selection */}
        {transferType && !selectedProvider && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setTransferType(null)} className="p-1 hover:bg-accent rounded-full">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-lg font-semibold">
                Select {transferType === "mobile" ? "Mobile Money Provider" : "Bank"}
              </h2>
            </div>

            <div className="grid gap-3">
              {(transferType === "mobile" ? mobileMoneyProviders : banks).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => setSelectedProvider(provider.name)}
                  className="p-4 rounded-2xl bg-card border-2 border-border hover:border-primary transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-16 h-16 rounded-xl ${provider.color} flex items-center justify-center p-2 overflow-hidden`}
                    >
                      <Image
                        src={provider.logo || "/placeholder.svg"}
                        alt={`${provider.name} logo`}
                        width={56}
                        height={56}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-semibold">{provider.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedProvider && transferType === "mobile" && !mobileRecipientType && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setSelectedProvider(null)} className="p-1 hover:bg-accent rounded-full">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-lg font-semibold">Select Recipient Type</h2>
            </div>

            <button
              onClick={() => setMobileRecipientType("phone")}
              className="w-full p-6 rounded-2xl bg-card border-2 border-border hover:border-primary transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Mobile Number</h3>
                  <p className="text-sm text-muted-foreground">Transfer to a mobile number</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setMobileRecipientType("agent")}
              className="w-full p-6 rounded-2xl bg-card border-2 border-border hover:border-primary transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Agent Code</h3>
                  <p className="text-sm text-muted-foreground">Transfer to an agent</p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Transfer Form */}
        {selectedProvider && (transferType === "bank" || mobileRecipientType) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (transferType === "mobile") {
                    setMobileRecipientType(null)
                  } else {
                    setSelectedProvider(null)
                  }
                }}
                className="p-1 hover:bg-accent rounded-full"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-lg font-semibold">Transfer to {selectedProvider}</h2>
            </div>

            <Card className="p-6 rounded-2xl space-y-4">
              {transferType === "mobile" ? (
                <>
                  {mobileRecipientType === "phone" ? (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter phone number (e.g., 076123456)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="agentCode">Agent Code</Label>
                      <Input
                        id="agentCode"
                        type="text"
                        placeholder="Enter agent code"
                        value={agentCode}
                        onChange={(e) => setAgentCode(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      type="text"
                      placeholder="Enter account name"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      type="text"
                      placeholder="Enter account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 rounded-xl text-lg font-semibold"
                  step="0.01"
                  min="0"
                  max={walletBalance}
                />
              </div>

              <Button
                onClick={handleTransfer}
                className="w-full h-12 rounded-xl bg-[rgba(12,11,11,1)] hover:bg-[rgba(12,11,11,0.9)] text-white font-semibold"
              >
                Transfer ${amount || "0.00"}
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
