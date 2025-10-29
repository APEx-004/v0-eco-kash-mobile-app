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
  hasBin?: boolean
  onBinPurchase?: () => void
}

export function ServiceRequestScreen({ onBack, userData, hasBin = false, onBinPurchase }: ServiceRequestScreenProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: userData?.fullName || "",
    address: userData?.location || "",
    paymentPlan: "",
    paymentMethod: "",
    agreedToTerms: false,
  })
  const [showNotification, setShowNotification] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState("")
  const [nextCollectionDate, setNextCollectionDate] = useState("")

  const binPrice = 150
  const installmentAmount = (binPrice / 3).toFixed(2)

  const handleSubmit = () => {
    if (!formData.agreedToTerms) {
      alert("Please agree to the terms and conditions to continue")
      return
    }

    // Calculate delivery date (7 days from now)
    const delivery = new Date()
    delivery.setDate(delivery.getDate() + 7)
    setDeliveryDate(delivery.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }))

    const nextCollection = new Date(delivery)
    nextCollection.setDate(nextCollection.getDate() + 14)
    setNextCollectionDate(
      nextCollection.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    )

    setShowNotification(true)

    if (onBinPurchase) {
      onBinPurchase()
    }

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false)
      onBack()
    }, 5000)
  }

  if (hasBin) {
    const today = new Date()
    const nextCollection = new Date(today)
    nextCollection.setDate(nextCollection.getDate() + 14)

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
          <h1 className="text-2xl font-bold">My Service</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6 bg-[rgba(217,237,212,1)]">
          {/* Bin Status Card */}
          <Card className="p-6 rounded-3xl bg-primary/10 border-primary">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-3xl">♻️</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-primary">Active Service</h2>
                <p className="text-sm text-muted-foreground">You have an EcoKash bin</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-primary/20">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Bin Size:</span>
                <span className="text-sm">Standard (120L)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Payment Status:</span>
                <span className="text-sm text-primary font-semibold">Paid</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Service Status:</span>
                <span className="text-sm text-primary font-semibold">Active</span>
              </div>
            </div>
          </Card>

          {/* Collection Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Collection Schedule</h3>

            <Card className="p-6 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold mb-1">Next Collection</p>
                  <p className="text-2xl font-bold text-primary mb-2">
                    {nextCollection.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {nextCollection.toLocaleDateString("en-US", { weekday: "long" })} at 8:00 AM
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl bg-muted">
              <h4 className="font-semibold mb-3">Collection Frequency</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <p className="text-sm">
                    Collections occur every <span className="font-semibold">2 weeks</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <p className="text-sm">
                    Collection window: <span className="font-semibold">8:00 AM - 12:00 PM</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <p className="text-sm">
                    You'll receive a reminder <span className="font-semibold">24 hours before</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Preparation Tips */}
          <Card className="p-6 rounded-2xl">
            <h4 className="font-semibold mb-3">Preparation Tips</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Rinse all containers before placing in bin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Remove caps and labels from bottles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Flatten cardboard boxes to save space</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Place bin outside by 7:30 AM on collection day</span>
              </li>
            </ul>
          </Card>

          {/* Contact Support */}
          <Card className="p-6 rounded-2xl text-center">
            <p className="text-sm text-muted-foreground mb-3">Need to reschedule or have questions?</p>
            <Button variant="outline" className="w-full h-12 font-semibold rounded-xl bg-transparent">
              Contact Support
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 flex items-center gap-4 border-b border-border bg-[rgba(217,237,212,1)]">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Bin Payment</h1>
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
              <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
              <p className="text-muted-foreground mb-4">
                Your bin will be delivered on <span className="font-semibold text-foreground">{deliveryDate}</span>
              </p>
              <div className="p-4 bg-primary/10 rounded-xl mb-4">
                <p className="text-sm font-semibold mb-1">First Collection Date</p>
                <p className="text-lg font-bold text-primary">{nextCollectionDate}</p>
                <p className="text-xs text-muted-foreground mt-1">Collections every 2 weeks</p>
              </div>
              <p className="text-sm text-muted-foreground">
                You'll receive notifications before delivery and collection dates.
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
              <p className="text-sm text-muted-foreground">Verify your details for bin delivery</p>
            </div>

            <Card className="p-6 rounded-2xl bg-primary/5 border-primary">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">♻️</div>
                <div>
                  <p className="font-semibold">EcoKash Recycling Bin</p>
                  <p className="text-2xl font-bold text-primary">NLE {binPrice}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Standard 120L household bin with bi-weekly collection service
              </p>
            </Card>

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
                <Label htmlFor="address">Delivery Address</Label>
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
              className="w-full h-12 font-semibold rounded-xl bg-foreground hover:bg-foreground/90"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Payment Plan */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Payment Plan</h2>
              <p className="text-sm text-muted-foreground">Choose how you'd like to pay for your bin</p>
            </div>

            <div className="space-y-3">
              <Card
                onClick={() => setFormData({ ...formData, paymentPlan: "full" })}
                className={`p-5 rounded-2xl cursor-pointer transition-all ${
                  formData.paymentPlan === "full" ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-lg">Full Payment</p>
                    <p className="text-sm text-muted-foreground">Pay once and save</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">NLE {binPrice}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full font-medium text-xs">
                    Recommended
                  </span>
                  <span className="text-muted-foreground">One-time payment</span>
                </div>
              </Card>

              <Card
                onClick={() => setFormData({ ...formData, paymentPlan: "installment" })}
                className={`p-5 rounded-2xl cursor-pointer transition-all ${
                  formData.paymentPlan === "installment"
                    ? "border-primary border-2 bg-primary/5"
                    : "hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-lg">3-Month Installment</p>
                    <p className="text-sm text-muted-foreground">Pay in 3 equal parts</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">NLE {installmentAmount}</p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Total: NLE {binPrice} • First payment due at delivery</p>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1 h-12 rounded-xl font-semibold">
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!formData.paymentPlan}
                className="flex-1 h-12 rounded-xl font-semibold"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Method */}
        {step === 3 && (
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
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
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
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1 h-12 rounded-xl font-semibold">
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                disabled={!formData.paymentMethod}
                className="flex-1 h-12 rounded-xl font-semibold"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Terms & Conditions */}
        {step === 4 && (
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
                    By purchasing an EcoKash recycling bin, you agree to participate in our bi-weekly collection
                    program. Collections occur every two weeks on scheduled days.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Bin Ownership</h4>
                  <p className="text-muted-foreground">
                    The recycling bin remains the property of EcoKash. You are responsible for maintaining the bin in
                    good condition. Damaged or lost bins may incur replacement fees of NLE 150.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Payment Terms</h4>
                  <p className="text-muted-foreground">
                    Full payment of NLE 150 is due upfront. Installment plans require three equal monthly payments of
                    NLE {installmentAmount}. Missed payments may result in service suspension.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Collection Schedule</h4>
                  <p className="text-muted-foreground">
                    Collections occur every 2 weeks between 8:00 AM and 12:00 PM. You'll receive a reminder notification
                    24 hours before each collection. Bins must be placed outside by 7:30 AM on collection day.
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
                collection schedule (every 2 weeks), payment terms, and my responsibilities as a service subscriber.
              </label>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(3)} variant="outline" className="flex-1 h-12 rounded-xl font-semibold">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.agreedToTerms}
                className="flex-1 h-12 rounded-xl font-semibold bg-black hover:bg-black/80"
              >
                Complete Payment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
