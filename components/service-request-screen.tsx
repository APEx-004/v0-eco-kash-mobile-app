"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ServiceRequestScreenProps {
  onBack: () => void
  userData: {
    fullName: string
    location: string
  } | null
}

export function ServiceRequestScreen({ onBack, userData }: ServiceRequestScreenProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: userData?.fullName || "",
    address: userData?.location || "",
    binType: "",
    paymentPlan: "",
    paymentMethod: "",
    agreedToTerms: false,
  })
  const [showNotification, setShowNotification] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState("")

  const binTypes = [
    { id: "small", name: "Small Bin (50L)", price: 25, description: "Perfect for 1-2 people" },
    { id: "medium", name: "Medium Bin (120L)", price: 45, description: "Ideal for 3-4 people" },
    { id: "large", name: "Large Bin (240L)", price: 75, description: "Best for 5+ people" },
  ]

  const handleSubmit = () => {
    if (!formData.agreedToTerms) {
      alert("Please agree to the terms and conditions to continue")
      return
    }

    // Calculate delivery date (7 days from now)
    const delivery = new Date()
    delivery.setDate(delivery.getDate() + 7)
    setDeliveryDate(delivery.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }))
    setShowNotification(true)

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false)
      onBack()
    }, 5000)
  }

  const selectedBin = binTypes.find((b) => b.id === formData.binType)
  const binPrice = selectedBin?.price || 0
  const installmentAmount = (binPrice / 3).toFixed(2)

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 flex items-center gap-4 border-b border-border bg-[rgba(217,237,212,1)]">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Service Request</h1>
      </div>

      {/* Success Notification */}
      {showNotification && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <Card className="p-6 rounded-3xl max-w-sm w-full bg-background animate-in fade-in zoom-in">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
              <p className="text-muted-foreground mb-4">
                Your bin will be delivered on <span className="font-semibold text-foreground">{deliveryDate}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                You'll receive a notification 24 hours before delivery with tracking details.
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6 bg-[rgba(217,237,212,1)]">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
              <p className="text-sm text-muted-foreground">Verify your details for service delivery</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 h-12 rounded-xl"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-2 h-12 rounded-xl"
                  placeholder="Enter your address in Freetown"
                />
                <p className="text-xs text-muted-foreground mt-1">Service available in Freetown only</p>
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!formData.name || !formData.address}
              className="w-full h-12 font-semibold rounded-md bg-popover-foreground"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Bin Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Select Your Bin</h2>
              <p className="text-sm text-muted-foreground">Choose the right size for your household</p>
            </div>

            <div className="space-y-3">
              {binTypes.map((bin) => (
                <Card
                  key={bin.id}
                  onClick={() => setFormData({ ...formData, binType: bin.id })}
                  className={`p-4 rounded-2xl cursor-pointer transition-all ${
                    formData.binType === bin.id ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold">{bin.name}</p>
                      <p className="text-sm text-muted-foreground">{bin.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">${bin.price}</p>
                      <p className="text-xs text-muted-foreground">one-time</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1 h-12 rounded-xl font-semibold">
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!formData.binType}
                className="flex-1 h-12 rounded-xl font-semibold"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Plan */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Payment Plan</h2>
              <p className="text-sm text-muted-foreground">Choose how you'd like to pay</p>
            </div>

            <div className="space-y-3">
              <Card
                onClick={() => setFormData({ ...formData, paymentPlan: "full" })}
                className={`p-4 rounded-2xl cursor-pointer transition-all ${
                  formData.paymentPlan === "full" ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Full Payment</p>
                    <p className="text-sm text-muted-foreground">Pay once, save 10%</p>
                  </div>
                  <p className="text-lg font-bold text-primary">${(binPrice * 0.9).toFixed(2)}</p>
                </div>
              </Card>

              <Card
                onClick={() => setFormData({ ...formData, paymentPlan: "installment" })}
                className={`p-4 rounded-2xl cursor-pointer transition-all ${
                  formData.paymentPlan === "installment"
                    ? "border-primary border-2 bg-primary/5"
                    : "hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">3-Month Installment</p>
                    <p className="text-sm text-muted-foreground">Pay in 3 equal parts</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">${installmentAmount}</p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1 h-12 rounded-xl font-semibold">
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                disabled={!formData.paymentPlan}
                className="flex-1 h-12 rounded-xl font-semibold"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Payment Method */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
              <p className="text-sm text-muted-foreground">How would you like to pay?</p>
            </div>

            <div className="space-y-3">
              <Card
                onClick={() => setFormData({ ...formData, paymentMethod: "mobile" })}
                className={`p-4 rounded-2xl cursor-pointer transition-all ${
                  formData.paymentMethod === "mobile"
                    ? "border-primary border-2 bg-primary/5"
                    : "hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Mobile Money</p>
                    <p className="text-sm text-muted-foreground">Orange, Africell, Q-Cell</p>
                  </div>
                </div>
              </Card>

              <Card
                onClick={() => setFormData({ ...formData, paymentMethod: "bank" })}
                className={`p-4 rounded-2xl cursor-pointer transition-all ${
                  formData.paymentMethod === "bank" ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Bank Transfer</p>
                    <p className="text-sm text-muted-foreground">UBA, Ecobank, GTBank, SLCB</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(3)} variant="outline" className="flex-1 h-12 rounded-xl font-semibold">
                Back
              </Button>
              <Button
                onClick={() => setStep(5)}
                disabled={!formData.paymentMethod}
                className="flex-1 h-12 rounded-xl font-semibold"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Terms & Conditions */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Terms & Conditions</h2>
              <p className="text-sm text-muted-foreground">Please review and accept our terms</p>
            </div>

            <Card className="p-6 rounded-2xl bg-muted max-h-64 overflow-y-auto">
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Service Agreement</h4>
                  <p className="text-muted-foreground">
                    By signing up for EcoKash recycling services, you agree to participate in our bi-weekly collection
                    program. Collections occur every two weeks on scheduled days.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Bin Ownership</h4>
                  <p className="text-muted-foreground">
                    The recycling bin remains the property of EcoKash. You are responsible for maintaining the bin in
                    good condition. Damaged or lost bins may incur replacement fees.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Payment Terms</h4>
                  <p className="text-muted-foreground">
                    Full payment receives a 10% discount. Installment plans require three equal monthly payments. Missed
                    payments may result in service suspension.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Acceptable Materials</h4>
                  <p className="text-muted-foreground">
                    Only clean, sorted recyclables are accepted: plastic bottles, aluminum cans, paper, cardboard, and
                    glass. Contaminated materials will not be collected.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Cancellation Policy</h4>
                  <p className="text-muted-foreground">
                    You may cancel service with 30 days notice. Bin must be returned in good condition. Refunds are
                    prorated for full payment plans only.
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-muted">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreedToTerms}
                onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                className="mt-1 w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-sm cursor-pointer">
                I have read and agree to the Terms & Conditions of EcoKash recycling services. I understand the
                collection schedule, payment terms, and my responsibilities as a service subscriber.
              </label>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(4)} variant="outline" className="flex-1 h-12 rounded-xl font-semibold">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.agreedToTerms}
                className="flex-1 h-12 rounded-xl font-semibold bg-black hover:bg-black/90"
              >
                Submit Request
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
