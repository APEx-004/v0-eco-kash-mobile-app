"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface HomeScreenProps {
  onNavigate: (screen: "deposit" | "collection" | "wallet" | "impact" | "education" | "profile") => void
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm opacity-90">Welcome back,</p>
            <h2 className="text-2xl font-bold">Aminata</h2>
          </div>
          <button className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>

        {/* Balance Card */}
        <Card className="bg-card text-card-foreground p-6 rounded-3xl shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
          <div className="flex items-baseline gap-2 mb-4">
            <h3 className="text-4xl font-bold">$24.50</h3>
            <span className="text-success text-sm font-medium">+12.5%</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Recyclables</p>
              <p className="font-semibold">47 items</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-muted-foreground">This Month</p>
              <p className="font-semibold">$8.20</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => onNavigate("deposit")}
            className="h-32 flex-col gap-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-3xl"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-semibold">Deposit Now</span>
          </Button>
          <Button
            onClick={() => onNavigate("collection")}
            className="h-32 flex-col gap-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-3xl"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="font-semibold">Request Pickup</span>
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <button className="text-sm text-primary font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {[
            { type: "Plastic Bottles", amount: "+$2.50", count: "5 items", time: "2 hours ago", icon: "♻️" },
            { type: "Aluminum Cans", amount: "+$1.80", count: "12 items", time: "1 day ago", icon: "🥫" },
            { type: "PET Bottles", amount: "+$3.20", count: "8 items", time: "2 days ago", icon: "🍾" },
          ].map((activity, index) => (
            <Card key={index} className="p-4 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold font-mono">{activity.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.count} • {activity.time}
                  </p>
                </div>
                <p className="font-bold text-success">{activity.amount}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Find RVM */}
      <div className="p-6">
        <Card className="p-6 rounded-3xl bg-muted">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            </div>
            <div className="flex-1">
              <p className="font-semibold">Find RVM Near You</p>
              <p className="text-sm text-muted-foreground">3 machines within 2km</p>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Card>
      </div>
    </div>
  )
}
