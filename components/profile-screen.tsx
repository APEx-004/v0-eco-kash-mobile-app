"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { ServiceRequestScreen } from "@/components/service-request-screen"
import { Eye, EyeOff } from "lucide-react"

interface ProfileScreenProps {
  onBack: () => void
  userData: {
    fullName: string
    email: string
    phone: string
    location: string
  } | null
  onLogout: () => void
  onNavigateToServiceRequest: () => void
}

export function ProfileScreen({ onBack, userData, onLogout, onNavigateToServiceRequest }: ProfileScreenProps) {
  const [activeScreen, setActiveScreen] = useState<
    | "main"
    | "personal-info"
    | "notifications"
    | "security"
    | "kyc"
    | "help"
    | "about"
    | "change-password"
    | "contact-support"
    | "report-issue"
    | "terms"
    | "privacy"
  >("main")

  const [notificationSettings, setNotificationSettings] = useState({
    transactions: true,
    recycling: true,
    promotions: false,
    updates: true,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [kycData, setKycData] = useState({
    idType: "",
    idNumber: "",
    dateOfBirth: "",
  })

  const [supportMessage, setSupportMessage] = useState("")
  const [issueReport, setIssueReport] = useState({
    category: "",
    description: "",
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!")
      return
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters!")
      return
    }
    setSuccessMessage("Password changed successfully!")
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setActiveScreen("main")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    }, 2000)
  }

  const handleKYCSubmit = () => {
    if (!kycData.idType || !kycData.idNumber || !kycData.dateOfBirth) {
      alert("Please fill in all fields!")
      return
    }
    setSuccessMessage("KYC verification submitted! We'll review your documents within 24-48 hours.")
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setActiveScreen("main")
    }, 3000)
  }

  const handleSupportSubmit = () => {
    if (!supportMessage.trim()) {
      alert("Please enter your message!")
      return
    }
    setSuccessMessage("Message sent! Our support team will respond within 24 hours.")
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setActiveScreen("main")
      setSupportMessage("")
    }, 2000)
  }

  const handleIssueSubmit = () => {
    if (!issueReport.category || !issueReport.description.trim()) {
      alert("Please fill in all fields!")
      return
    }
    setSuccessMessage("Issue reported successfully! We'll investigate and get back to you soon.")
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setActiveScreen("main")
      setIssueReport({ category: "", description: "" })
    }, 2000)
  }

  if (activeScreen === "service-request") {
    return <ServiceRequestScreen onBack={() => setActiveScreen("main")} userData={userData} />
  }

  if (activeScreen === "personal-info") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 flex items-center gap-4 border-b border-border">
          <button
            onClick={() => setActiveScreen("main")}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Personal Information</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <Card className="p-6 rounded-2xl space-y-4">
            <div>
              <Label className="text-sm font-semibold mb-2 block">Full Name</Label>
              <Input value={userData?.fullName || ""} readOnly className="bg-muted" />
            </div>
            <div>
              <Label className="text-sm font-semibold mb-2 block">Email Address</Label>
              <Input value={userData?.email || ""} readOnly className="bg-muted" />
            </div>
            <div>
              <Label className="text-sm font-semibold mb-2 block">Phone Number</Label>
              <Input value={userData?.phone || ""} readOnly className="bg-muted" />
            </div>
            <div>
              <Label className="text-sm font-semibold mb-2 block">Location</Label>
              <Input value={userData?.location || ""} readOnly className="bg-muted" />
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Contact support to update your personal information
            </p>
          </Card>
        </div>
      </div>
    )
  }

  if (activeScreen === "notifications") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 flex items-center gap-4 border-b border-border">
          <button
            onClick={() => setActiveScreen("main")}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Notification Settings</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <Card className="p-6 rounded-2xl space-y-6">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                  <p className="text-sm text-muted-foreground">
                    {key === "transactions" && "Get notified about your transactions"}
                    {key === "recycling" && "Updates on your recycling activities"}
                    {key === "promotions" && "Special offers and promotions"}
                    {key === "updates" && "App updates and new features"}
                  </p>
                </div>
                <button
                  onClick={() => setNotificationSettings({ ...notificationSettings, [key]: !value })}
                  className={`w-12 h-6 rounded-full transition-colors ${value ? "bg-primary" : "bg-muted"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${value ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
            ))}
          </Card>
        </div>
      </div>
    )
  }

  if (activeScreen === "security") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 flex items-center gap-4 border-b border-border">
          <button
            onClick={() => setActiveScreen("main")}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Privacy & Security</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <Card className="p-6 rounded-2xl space-y-4">
            <h3 className="font-semibold text-lg">Change Password</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">Current Password</Label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold mb-2 block">New Password</Label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold mb-2 block">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Button onClick={handlePasswordChange} className="w-full h-12 font-semibold rounded-md">
                Update Password
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (activeScreen === "kyc") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 flex items-center gap-4 border-b border-border">
          <button
            onClick={() => setActiveScreen("main")}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">KYC Verification</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <Card className="p-6 rounded-2xl space-y-4">
            <p className="text-sm text-muted-foreground">
              Complete your KYC verification to unlock higher withdrawal limits and exclusive rewards.
            </p>
            <div>
              <Label className="text-sm font-semibold mb-2 block">ID Type</Label>
              <select
                value={kycData.idType}
                onChange={(e) => setKycData({ ...kycData, idType: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="">Select ID Type</option>
                <option value="national-id">National ID</option>
                <option value="passport">Passport</option>
                <option value="drivers-license">Driver's License</option>
              </select>
            </div>
            <div>
              <Label className="text-sm font-semibold mb-2 block">ID Number</Label>
              <Input
                value={kycData.idNumber}
                onChange={(e) => setKycData({ ...kycData, idNumber: e.target.value })}
                placeholder="Enter your ID number"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold mb-2 block">Date of Birth</Label>
              <Input
                type="date"
                value={kycData.dateOfBirth}
                onChange={(e) => setKycData({ ...kycData, dateOfBirth: e.target.value })}
              />
            </div>
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
              <svg
                className="w-12 h-12 mx-auto mb-2 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm font-semibold mb-1">Upload ID Document</p>
              <p className="text-xs text-muted-foreground">PNG, JPG or PDF (max 5MB)</p>
            </div>
            <Button onClick={handleKYCSubmit} className="w-full h-12 font-semibold rounded-md">
              Submit for Verification
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  if (activeScreen === "help") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 flex items-center gap-4 border-b border-border">
          <button
            onClick={() => setActiveScreen("main")}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Help Center</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <Card className="p-6 rounded-2xl space-y-4">
            <h3 className="font-semibold text-lg">Frequently Asked Questions</h3>

            <div className="space-y-3">
              <details className="group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between p-3 bg-muted rounded-lg">
                  How do I earn tokens?
                  <svg
                    className="w-5 h-5 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-sm text-muted-foreground mt-2 p-3">
                  You earn tokens by recycling waste through our collection service or at reverse vending machines. Each
                  recyclable item has a token value based on its type and weight.
                </p>
              </details>

              <details className="group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between p-3 bg-muted rounded-lg">
                  How do I request a collection service?
                  <svg
                    className="w-5 h-5 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-sm text-muted-foreground mt-2 p-3">
                  Go to Settings → Service Request and fill out the form. Choose your bin size and payment plan, then
                  submit. You'll receive your bin within 7 days.
                </p>
              </details>

              <details className="group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between p-3 bg-muted rounded-lg">
                  What can I do with my tokens?
                  <svg
                    className="w-5 h-5 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-sm text-muted-foreground mt-2 p-3">
                  You can transfer tokens to mobile money or bank accounts, donate to charities, pay bills, buy airtime
                  and data, or use them for other services within the app.
                </p>
              </details>

              <details className="group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between p-3 bg-muted rounded-lg">
                  How long does verification take?
                  <svg
                    className="w-5 h-5 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-sm text-muted-foreground mt-2 p-3">
                  KYC verification typically takes 24-48 hours. You'll receive a notification once your verification is
                  complete.
                </p>
              </details>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl space-y-3">
            <h3 className="font-semibold text-lg">Still need help?</h3>
            <Button onClick={() => setActiveScreen("contact-support")} className="w-full h-12 font-semibold rounded-md">
              Contact Support
            </Button>
            <Button
              onClick={() => setActiveScreen("report-issue")}
              variant="outline"
              className="w-full h-12 font-semibold rounded-md"
            >
              Report an Issue
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  if (activeScreen === "about") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 flex items-center gap-4 border-b border-border">
          <button
            onClick={() => setActiveScreen("main")}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">About EcoKash</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <Card className="p-6 rounded-2xl space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
                ♻️
              </div>
              <h2 className="text-2xl font-bold mb-2">EcoKash</h2>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="font-semibold">Our Mission</h3>
              <p className="text-sm text-muted-foreground">
                EcoKash is revolutionizing waste management in Sierra Leone by incentivizing recycling through
                blockchain technology. We empower communities to earn while protecting the environment.
              </p>

              <h3 className="font-semibold pt-2">What We Do</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Convert recyclables into digital tokens</li>
                <li>• Provide convenient collection services</li>
                <li>• Partner with local recycling facilities</li>
                <li>• Educate communities on sustainable practices</li>
              </ul>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl space-y-2">
            <button
              onClick={() => setActiveScreen("terms")}
              className="w-full text-left p-3 hover:bg-muted rounded-lg transition-colors"
            >
              <p className="font-semibold">Terms & Conditions</p>
            </button>
            <button
              onClick={() => setActiveScreen("privacy")}
              className="w-full text-left p-3 hover:bg-muted rounded-lg transition-colors"
            >
              <p className="font-semibold">Privacy Policy</p>
            </button>
          </Card>

          <Card className="p-6 rounded-2xl text-center">
            <p className="text-sm text-muted-foreground">Built on Solana Blockchain</p>
            <p className="text-xs text-muted-foreground mt-1">© 2025 EcoKash. All rights reserved.</p>
          </Card>
        </div>
      </div>
    )
  }

  if (activeScreen === "terms") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 flex items-center gap-4 border-b border-border">
          <button
            onClick={() => setActiveScreen("about")}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Terms & Conditions</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <Card className="p-6 rounded-2xl space-y-4 text-sm">
            <p className="text-muted-foreground">Last updated: January 2024</p>

            <div className="space-y-3">
              <h3 className="font-semibold text-base">1. Acceptance of Terms</h3>
              <p className="text-muted-foreground">
                By accessing and using EcoKash, you accept and agree to be bound by the terms and provision of this
                agreement.
              </p>

              <h3 className="font-semibold text-base">2. Use of Service</h3>
              <p className="text-muted-foreground">
                You agree to use EcoKash only for lawful purposes and in accordance with these Terms. You must not use
                our service in any way that violates any applicable laws or regulations.
              </p>

              <h3 className="font-semibold text-base">3. Token System</h3>
              <p className="text-muted-foreground">
                Tokens earned through recycling activities can be redeemed for cash or used for various services. Token
                values are subject to change based on market conditions and recyclable material prices.
              </p>

              <h3 className="font-semibold text-base">4. Account Security</h3>
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account credentials and for all
                activities that occur under your account.
              </p>

              <h3 className="font-semibold text-base">5. Service Modifications</h3>
              <p className="text-muted-foreground">
                We reserve the right to modify or discontinue any part of our service at any time without notice.
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (activeScreen === "privacy") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 flex items-center gap-4 border-b border-border">
          <button
            onClick={() => setActiveScreen("about")}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <Card className="p-6 rounded-2xl space-y-4 text-sm">
            <p className="text-muted-foreground">Last updated: January 2024</p>

            <div className="space-y-3">
              <h3 className="font-semibold text-base">Information We Collect</h3>
              <p className="text-muted-foreground">
                We collect information you provide directly to us, including your name, email address, phone number, and
                location when you create an account or use our services.
              </p>

              <h3 className="font-semibold text-base">How We Use Your Information</h3>
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and improve our services, process transactions,
                send notifications, and communicate with you about our services.
              </p>

              <h3 className="font-semibold text-base">Data Security</h3>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information. However, no method of
                transmission over the internet is 100% secure.
              </p>

              <h3 className="font-semibold text-base">Information Sharing</h3>
              <p className="text-muted-foreground">
                We do not sell or rent your personal information to third parties. We may share your information with
                service providers who assist us in operating our platform.
              </p>

              <h3 className="font-semibold text-base">Your Rights</h3>
              <p className="text-muted-foreground">
                You have the right to access, update, or delete your personal information at any time. Contact our
                support team for assistance.
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="p-6 rounded-2xl max-w-sm w-full text-center space-y-4 animate-in fade-in zoom-in">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-semibold text-lg">{successMessage}</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 flex items-center gap-4 border-b border-border">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6">
        {/* Profile Header - Left aligned with profile picture */}
        <Card className="w-[391px] h-[159px] mx-auto p-5 rounded-3xl flex items-center gap-4">
          <div className="w-24 h-24 rounded-full flex-shrink-0 overflow-hidden border-2 border-primary/20 bg-muted">
            <img src="/diverse-group-profile.png" alt="Profile" className="w-full h-full object-cover object-center" />
          </div>

          {/* User Info - Left aligned */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-lg font-bold mb-2 text-left leading-tight">{userData?.fullName || "Guest User"}</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full font-medium text-xs whitespace-nowrap">
                Eco Champion
              </span>
              <span className="px-2 py-1 bg-secondary/10 text-secondary-foreground rounded-full font-medium text-xs whitespace-nowrap">
                Level 5
              </span>
            </div>
          </div>
        </Card>

        {/* Account Settings - Now shows actual user information */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Account Settings</h3>

          <Card
            onClick={onNavigateToServiceRequest}
            className="p-4 rounded-2xl cursor-pointer hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Service Request</p>
                <p className="text-sm text-muted-foreground">Request collection service</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Card>

          <Card
            onClick={() => setActiveScreen("personal-info")}
            className="p-4 rounded-2xl cursor-pointer hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Personal Information</p>
                <p className="text-sm text-muted-foreground">{userData?.fullName || "Not provided"}</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl cursor-pointer hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Email Address</p>
                <p className="text-sm text-muted-foreground">{userData?.email || "Not provided"}</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl cursor-pointer hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Phone Number</p>
                <p className="text-sm text-muted-foreground">{userData?.phone || "Not provided"}</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl cursor-pointer hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1 1 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Location</p>
                <p className="text-sm text-muted-foreground">{userData?.location || "Not provided"}</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Card>

          <Card
            onClick={() => setActiveScreen("notifications")}
            className="p-4 rounded-2xl cursor-pointer hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Notifications</p>
                <p className="text-sm text-muted-foreground">Configure alerts and reminders</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Card>

          <Card
            onClick={() => setActiveScreen("security")}
            className="p-4 rounded-2xl cursor-pointer hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Privacy & Security</p>
                <p className="text-sm text-muted-foreground">Manage your account security</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Card>
        </div>

        <Card
          onClick={() => setActiveScreen("kyc")}
          className="p-6 rounded-3xl bg-secondary/10 border-secondary cursor-pointer hover:border-secondary/70 transition-colors text-center"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-secondary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="flex-1 text-center">
              <p className="font-semibold mb-1 text-left">Complete KYC Verification</p>
              <p className="text-sm text-muted-foreground mb-3 text-left">
                Verify your identity to unlock higher withdrawal limits and exclusive rewards
              </p>
              <Button className="h-10 font-semibold tracking-tight rounded-sm text-left">Start Verification</Button>
            </div>
          </div>
        </Card>

        {/* Support - Now interactive */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Support</h3>
          <Card
            onClick={() => setActiveScreen("help")}
            className="p-4 rounded-2xl cursor-pointer hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-2xl">❓</div>
              <div className="flex-1">
                <p className="font-semibold">Help Center</p>
                <p className="text-sm text-muted-foreground">Find answers to common questions</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Card>

          <Card
            onClick={() => setActiveScreen("about")}
            className="p-4 rounded-2xl cursor-pointer hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-2xl">ℹ️</div>
              <div className="flex-1">
                <p className="font-semibold">About EcoKash</p>
                <p className="text-sm text-muted-foreground">Learn more about our mission</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Card>
        </div>

        {/* App Info */}
        <Card className="p-6 rounded-3xl bg-muted text-center">
          <p className="text-sm text-muted-foreground mb-1">EcoKash Version 1.0.0</p>
          <p className="text-xs text-muted-foreground">Built on Solana Blockchain</p>
        </Card>

        {/* Logout - Now functional */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-14 rounded-2xl font-semibold text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}
