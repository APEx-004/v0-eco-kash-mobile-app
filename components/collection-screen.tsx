"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface CollectionScreenProps {
  onBack: () => void
}

export function CollectionScreen({ onBack }: CollectionScreenProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 flex items-center gap-4 border-b border-border">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Request Collection</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
            <svg className="w-12 h-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Request Submitted!</h2>
            <p className="text-muted-foreground text-pretty">
              {
                "Thank you for your request. We collect by intervals of every two weeks. You'll receive a notification before the next scheduled collection."
              }
            </p>
          </div>
          <Card className="w-full p-6 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Next Collection</span>
              <span className="font-semibold">In 5 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estimated Items</span>
              <span className="font-semibold">15-20 items</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estimated Reward</span>
              <span className="font-semibold text-success">$5.00 - $7.00</span>
            </div>
          </Card>
          <Button onClick={onBack} className="w-full h-14 text-lg font-semibold rounded-2xl" size="lg">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 flex items-center gap-4 border-b border-border">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Request Collection</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Pickup Address</label>
            <Input
              placeholder="Enter your address"
              className="h-14 rounded-2xl"
              defaultValue="123 Main Street, Freetown"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Recyclable Types</label>
            <div className="grid grid-cols-2 gap-3">
              {["Plastic Bottles", "Aluminum Cans", "PET Bottles", "Glass Bottles"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 p-4 rounded-2xl border border-border cursor-pointer hover:border-primary transition-colors"
                >
                  <input type="checkbox" className="w-5 h-5 rounded border-border text-primary" defaultChecked />
                  <span className="text-sm font-medium">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Estimated Quantity</label>
            <select className="w-full h-14 rounded-2xl border border-border px-4 bg-background">
              <option>1-10 items</option>
              <option>11-25 items</option>
              <option>26-50 items</option>
              <option>50+ items</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Notes (Optional)</label>
            <textarea
              placeholder="Any special instructions for the collector..."
              className="w-full h-24 rounded-2xl border border-border px-4 py-3 bg-background resize-none"
            />
          </div>

          <Card className="p-6 rounded-3xl bg-muted">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-muted-foreground">
                {
                  "We collect by intervals of every two weeks. Please have your recyclables sorted and ready for the next scheduled collection."
                }
              </p>
            </div>
          </Card>

          <Button type="submit" className="w-full h-14 text-lg font-semibold rounded-2xl" size="lg">
            Submit Request
          </Button>
        </form>
      </div>
    </div>
  )
}
