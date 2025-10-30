"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import type { Notification, CollectionData } from "@/app/page"

interface HomeScreenProps {
  onNavigate: (
    screen:
      | "deposit"
      | "collection"
      | "wallet"
      | "impact"
      | "education"
      | "profile"
      | "charity"
      | "transfer"
      | "payments"
      | "service-request",
  ) => void
  userData?: {
    fullName: string
    email: string
    phone: string
    location: string
  } | null
  walletBalance: number
  notifications: Notification[]
  hasBin: boolean
  collectionData: CollectionData
  onSimulateCollection: (amount: number, itemCount: number) => void
  monthlyEarnings: number
}

export function HomeScreen({
  onNavigate,
  userData,
  walletBalance,
  notifications,
  hasBin,
  collectionData,
  onSimulateCollection,
  monthlyEarnings,
}: HomeScreenProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showBinPopup, setShowBinPopup] = useState(!hasBin)
  const [isCollectionExpanded, setIsCollectionExpanded] = useState(true)

  const firstName = userData?.fullName.split(" ")[0] || "User"

  const getNextMonthDate = () => {
    const today = new Date()
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
    return nextMonth.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="h-full overflow-y-auto pb-24 text-[rgba(217,237,212,1)] bg-[rgba(216,237,211,1)] text-left">
      {showBinPopup && !hasBin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm p-6 rounded-3xl space-y-4 animate-in zoom-in-95">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Get Your EcoKash Bin!</h3>
              <p className="text-lg font-semibold text-primary mb-3">Segregate, Recycle and Earn</p>
              <p className="text-muted-foreground mb-6">
                Start your recycling journey today. Get a bin delivered to your doorstep and begin earning from your
                waste.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setShowBinPopup(false)
                    onNavigate("service-request")
                  }}
                  className="w-full h-12 font-semibold rounded-xl bg-black hover:bg-black/90"
                >
                  Get Bin Now
                </Button>
                <Button
                  onClick={() => setShowBinPopup(false)}
                  variant="ghost"
                  className="w-full h-12 font-semibold rounded-xl"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Header */}
      <div className="p-6 text-left">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-[rgba(7,7,7,1)] font-sans text-3xl">Kushe!</p>
              <span className="text-3xl">👋</span>
            </div>
            <p className="font-medium text-[rgba(7,7,7,1)] font-sans text-xl">{firstName}</p>
          </div>
          <button className="relative" onClick={() => setShowNotifications(!showNotifications)}>
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path
                className="text-card-foreground leading-10"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-accent rounded-full border-2 border-background"></span>
          </button>
        </div>

        {/* Wallet Balance Card */}
        <Card className="relative overflow-hidden backdrop-blur p-6 rounded-3xl border-0 w-[358px] h-[209px] mx-auto">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{ backgroundImage: "url('/images/blockchain-bg.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 text-center py-0 border-0" />

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/80">Total Balance</p>
                <p className="text-4xl font-bold text-white mt-2">${walletBalance.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-white/70 mb-1">Recyclables</p>
                <p className="text-xl font-bold text-white">{collectionData.recyclablesCount} items</p>
              </div>
              <div>
                <p className="text-xs text-white/70 mb-1">This Month</p>
                <p className="text-xl font-bold text-background">+${monthlyEarnings.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </Card>

        {hasBin && (
          <Card className="mt-6 p-6 rounded-3xl border-2 border-primary/20">
            <button
              onClick={() => setIsCollectionExpanded(!isCollectionExpanded)}
              className="w-full flex items-center justify-between mb-4"
            >
              <h3 className="text-lg font-bold">Collection Summary</h3>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform ${isCollectionExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {isCollectionExpanded && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/5 p-4 rounded-2xl">
                    <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
                    <p className="text-2xl font-bold text-primary">${collectionData.amount.toFixed(2)}</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-2xl">
                    <p className="text-sm text-muted-foreground mb-1">Items Collected</p>
                    <p className="text-2xl font-bold text-primary">{collectionData.recyclablesCount}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {collectionData.lastCollectionDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Collection:</span>
                      <span className="font-semibold">{collectionData.lastCollectionDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Collection:</span>
                    <span className="font-semibold text-primary">{collectionData.nextCollectionDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Month:</span>
                    <span className="font-semibold text-primary">{getNextMonthDate()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Collection Interval:</span>
                    <span className="font-semibold">Every 2 weeks</span>
                  </div>
                </div>

                <Button
                  onClick={() => onSimulateCollection(5.5, 12)}
                  className="w-full mt-4 h-10 font-semibold rounded-xl bg-primary/10 text-primary hover:bg-primary/20"
                >
                  Simulate Collection (Testing)
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* Quick Actions */}
        <div className="mb-6 mt-7 flex justify-center">
          <div className="grid grid-cols-3 gap-3 text-left">
            {/* Transfer */}
            <button
              onClick={() => onNavigate("transfer")}
              className="w-[99px] h-[94px] rounded-2xl bg-card border border-border flex flex-col items-center justify-center gap-2 hover:bg-accent/50 transition-colors"
            >
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <span className="text-xs text-foreground font-black">Transfer</span>
            </button>

            {/* Payments */}
            <button
              onClick={() => onNavigate("payments")}
              className="w-[99px] h-[94px] rounded-2xl bg-card border border-border flex flex-col items-center justify-center gap-2 hover:bg-accent/50 transition-colors"
            >
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span className="text-xs text-foreground font-black">Payments</span>
            </button>

            {/* Charity - Added onClick handler to navigate to charity screen */}
            <button
              onClick={() => onNavigate("charity")}
              className="w-[99px] h-[94px] rounded-2xl bg-card border border-border flex flex-col items-center justify-center gap-2 hover:bg-accent/50 transition-colors"
            >
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-xs text-foreground font-black">Charity</span>
            </button>

            {/* RVM Location */}
            <button
              onClick={() => onNavigate("deposit")}
              className="w-[99px] h-[94px] rounded-2xl bg-card border border-border flex flex-col items-center justify-center gap-2 hover:bg-accent/50 transition-colors"
            >
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs text-foreground text-center leading-tight font-black">RVM Location</span>
            </button>
          </div>
        </div>
      </div>

      {/* Find RVM */}

      {showNotifications && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowNotifications(false)} />
          {/* Notifications Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 shadow-2xl overflow-y-auto animate-in slide-in-from-right bg-[rgba(217,237,212,1)]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-sidebar-foreground">Notifications</h2>
                <button onClick={() => setShowNotifications(false)}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12m-4-4l4-4"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <Card key={notification.id} className="p-4 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                          {notification.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold font-mono">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {notification.description} • {notification.time}
                          </p>
                          {notification.solanaSignature && (
                            <a
                              href={`https://explorer.solana.com/tx/${notification.solanaSignature}?cluster=devnet`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              View on Solana Explorer
                            </a>
                          )}
                        </div>
                        <p
                          className={`font-bold ${notification.amount.startsWith("+") ? "text-success" : "text-destructive"}`}
                        >
                          {notification.amount}
                        </p>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
