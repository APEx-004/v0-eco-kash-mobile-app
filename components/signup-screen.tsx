"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SignupScreenProps {
  onSignup: (userData: {
    fullName: string
    email: string
    phone: string
    password: string
    location: string
  }) => void
  onSwitchToLogin: () => void
}

export function SignupScreen({ onSignup, onSwitchToLogin }: SignupScreenProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "", // Combined phone/email field
    address: "", // Renamed from location to address
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    const isEmail = formData.contact.includes("@")
    onSignup({
      fullName: formData.fullName,
      email: isEmail ? formData.contact : "",
      phone: isEmail ? "" : formData.contact,
      password: formData.password,
      location: formData.address,
    })
  }

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="min-h-full flex flex-col p-6 pt-16 bg-[rgba(217,237,212,1)]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join EcoKash and start earning from recycling</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone or Email</label>
            <Input
              type="text"
              placeholder="+232 XX XXX XXXX or email@example.com"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Address (Freetown)</label>
            <Input
              type="text"
              placeholder="Your address in Freetown"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm Password</label>
            <Input
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              className="h-12 rounded-xl"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 font-semibold text-base mt-6 rounded-sm bg-[rgba(12,11,11,1)] hover:bg-[rgba(12,11,11,0.9)]"
          >
            Create Account
          </Button>

          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button type="button" onClick={onSwitchToLogin} className="text-primary font-semibold hover:underline">
                Sign In
              </button>
            </p>
          </div>
        </form>

        {/* Terms */}
        <p className="text-xs text-center text-muted-foreground mt-6 pb-4">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
