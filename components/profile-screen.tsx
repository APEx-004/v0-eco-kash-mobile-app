"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ServiceRequestScreen } from "@/components/service-request-screen" // Import ServiceRequestScreen

interface ProfileScreenProps {
  onBack: () => void
  userData: {
    fullName: string
    email: string
    phone: string
    location: string
  } | null
  onLogout: () => void
}

export function ProfileScreen({ onBack, userData, onLogout }: ProfileScreenProps) {
  const [activeScreen, setActiveScreen] = useState<
    "main" | "service-request" | "personal-info" | "notifications" | "security" | "kyc" | "help" | "about"
  >("main")

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (activeScreen === "service-request") {
    return <ServiceRequestScreen onBack={() => setActiveScreen("main")} userData={userData} />
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 flex items-center gap-4 border-b border-border">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6">
        {/* Profile Header - Left aligned with profile picture */}
        <Card className="w-[391px] h-[159px] mx-auto p-5 rounded-3xl flex items-center gap-4">
          <div className="w-24 h-24 rounded-full flex-shrink-0 overflow-hidden border-2 border-primary/20">
            <img src="/diverse-group-profile.png" alt="Profile" className="w-full h-full object-cover" />
          </div>

          {/* User Info - Left aligned */}
          <div className="flex-1 flex flex-col justify-center items-start">
            <h2 className="text-lg font-bold mb-2 text-left">{userData?.fullName || "Guest User"}</h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">Eco Champion</span>
              <span className="px-2 py-1 bg-secondary/10 text-secondary-foreground rounded-full font-medium">
                Level 5
              </span>
            </div>
          </div>
        </Card>

        {/* Account Settings - Now shows actual user information */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Account Settings</h3>

          <Card
            onClick={() => setActiveScreen("service-request")}
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
          className="p-6 rounded-3xl bg-secondary/10 border-secondary cursor-pointer hover:border-secondary/70 transition-colors"
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
            <div className="flex-1">
              <p className="font-semibold mb-1">Complete KYC Verification</p>
              <p className="text-sm text-muted-foreground mb-3">
                Verify your identity to unlock higher withdrawal limits and exclusive rewards
              </p>
              <Button className="h-10 rounded-xl font-semibold">Start Verification</Button>
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
