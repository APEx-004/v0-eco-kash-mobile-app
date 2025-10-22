"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface CharityScreenProps {
  onBack: () => void
  walletBalance: number
  onDonate: (amount: number, charityName: string) => void
}

const charities = [
  {
    name: "Tacugama Chimpanzee Sanctuary",
    description: "Protecting and rehabilitating chimpanzees in Sierra Leone",
    category: "Wildlife Conservation",
    icon: "🦍",
    thankYouMessage:
      "Thank you for protecting our precious chimpanzees! Your donation helps provide food, medical care, and a safe habitat for these amazing creatures. Together, we're preserving Sierra Leone's wildlife heritage.",
  },
  {
    name: "Save Sierra Leone Foundation",
    description: "Supporting education and healthcare initiatives across Sierra Leone",
    category: "Community Development",
    icon: "🏥",
    thankYouMessage:
      "Your generosity is transforming lives! This donation will directly support education programs and healthcare services for communities across Sierra Leone. Thank you for believing in a brighter future for our nation.",
  },
  {
    name: "Give A Chance",
    description: "Empowering youth through education and skills training",
    category: "Education",
    icon: "📚",
    thankYouMessage:
      "You're changing a young person's life today! Your donation provides educational opportunities and skills training that empower Sierra Leone's youth to build successful futures. Thank you for investing in our next generation.",
  },
  {
    name: "Welbodi Partnership",
    description: "Improving healthcare access and quality in Sierra Leone",
    category: "Healthcare",
    icon: "⚕️",
    thankYouMessage:
      "Your donation saves lives! Thank you for supporting quality healthcare access for Sierra Leoneans. Your contribution helps train healthcare workers and improve medical facilities across the country.",
  },
  {
    name: "Block Development",
    description: "Building sustainable communities through infrastructure development",
    category: "Infrastructure",
    icon: "🏗️",
    thankYouMessage:
      "You're building a better Sierra Leone! Your donation supports sustainable infrastructure projects that create jobs and improve living conditions in communities. Thank you for helping us build a stronger nation.",
  },
]

export function CharityScreen({ onBack, walletBalance, onDonate }: CharityScreenProps) {
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [selectedCharity, setSelectedCharity] = useState<(typeof charities)[0] | null>(null)
  const [donationAmount, setDonationAmount] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleDonateClick = (charity: (typeof charities)[0]) => {
    setSelectedCharity(charity)
    setShowDonationModal(true)
    setDonationAmount("")
  }

  const handleConfirmDonation = () => {
    const amount = Number.parseFloat(donationAmount)

    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount")
      return
    }

    if (amount > walletBalance) {
      alert("Insufficient balance. Please enter a lower amount.")
      return
    }

    if (selectedCharity) {
      // Process donation
      onDonate(amount, selectedCharity.name)

      // Show success message
      setSuccessMessage(selectedCharity.thankYouMessage)
      setShowSuccessMessage(true)
      setShowDonationModal(false)

      // Hide success message after 6 seconds
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 6000)
    }
  }

  return (
    <div className="h-full flex flex-col bg-[rgba(217,237,212,1)]">
      {/* Header */}
      <div className="text-primary-foreground p-6 rounded-b-[2rem] bg-foreground">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Support a Cause</h1>
        </div>
        <p className="text-sm opacity-90">Use your EcoKash rewards to support local charities</p>
        <p className="text-sm font-semibold mt-2">Available Balance: ${walletBalance.toFixed(2)}</p>
      </div>

      {/* Charities List */}
      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-4 bg-[rgba(217,237,212,1)]">
        {charities.map((charity, index) => (
          <Card key={index} className="p-5 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-2xl">
                {charity.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base mb-1">{charity.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{charity.description}</p>
                <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                  {charity.category}
                </span>
              </div>
            </div>

            <Button
              onClick={() => handleDonateClick(charity)}
              className="w-full mt-4 hover:bg-card-foreground/90 text-primary-foreground rounded-xl h-10 bg-card-foreground"
            >
              Donate Tokens
            </Button>
          </Card>
        ))}
      </div>

      {showDonationModal && selectedCharity && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowDonationModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 rounded-3xl bg-background">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-3xl">
                  {selectedCharity.icon}
                </div>
                <h2 className="text-xl font-bold mb-2">Donate to {selectedCharity.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedCharity.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Donation Amount ($)</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="h-12 text-lg"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Available: ${walletBalance.toFixed(2)}</p>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => setShowDonationModal(false)} variant="outline" className="flex-1 h-12">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmDonation}
                    className="flex-1 h-12 bg-card-foreground hover:bg-card-foreground/90 text-primary-foreground"
                  >
                    Confirm Donation
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {showSuccessMessage && (
        <div className="fixed bottom-24 left-4 right-4 z-50 animate-in slide-in-from-bottom">
          <Card className="p-5 rounded-2xl bg-primary text-primary-foreground shadow-2xl">
            <div className="flex gap-3">
              <div className="text-2xl">💚</div>
              <div className="flex-1">
                <h3 className="font-bold mb-1">Donation Successful!</h3>
                <p className="text-sm opacity-90">{successMessage}</p>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="text-primary-foreground/80 hover:text-primary-foreground"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
