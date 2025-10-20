"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProfileScreenProps {
  onBack: () => void
}

export function ProfileScreen({ onBack }: ProfileScreenProps) {
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
        {/* Profile Header */}
        <Card className="p-6 rounded-3xl text-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-primary">A</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">Aminata Johnson</h2>
          <p className="text-muted-foreground mb-4">aminata.j@email.com</p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Eco Champion</span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full font-medium">
              Level 5
            </span>
          </div>
        </Card>

        {/* Account Settings */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Account Settings</h3>
          {[
            { icon: "👤", title: "Personal Information", desc: "Update your profile details" },
            { icon: "📍", title: "Location Settings", desc: "Manage your addresses" },
            { icon: "🔔", title: "Notifications", desc: "Configure alerts and reminders" },
            { icon: "🔒", title: "Privacy & Security", desc: "Manage your account security" },
          ].map((item, index) => (
            <Card key={index} className="p-4 rounded-2xl cursor-pointer hover:border-primary transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          ))}
        </div>

        {/* KYC Verification */}
        <Card className="p-6 rounded-3xl bg-secondary/10 border-secondary">
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

        {/* Support */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Support</h3>
          {[
            { icon: "❓", title: "Help Center", desc: "Find answers to common questions" },
            { icon: "💬", title: "Contact Support", desc: "Get help from our team" },
            { icon: "📄", title: "Terms & Conditions", desc: "Read our policies" },
            { icon: "ℹ️", title: "About EcoKash", desc: "Learn more about our mission" },
          ].map((item, index) => (
            <Card key={index} className="p-4 rounded-2xl cursor-pointer hover:border-primary transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          ))}
        </div>

        {/* App Info */}
        <Card className="p-6 rounded-3xl bg-muted text-center">
          <p className="text-sm text-muted-foreground mb-1">EcoKash Version 1.0.0</p>
          <p className="text-xs text-muted-foreground">Built on Solana Blockchain</p>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full h-14 rounded-2xl font-semibold text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}
