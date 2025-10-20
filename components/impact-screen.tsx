"use client"

import { Card } from "@/components/ui/card"

interface ImpactScreenProps {
  onBack: () => void
}

export function ImpactScreen({ onBack }: ImpactScreenProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 flex items-center gap-4 border-b border-border">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Your Impact</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6">
        {/* Hero Impact Card */}
        <Card className="p-8 rounded-3xl bg-primary text-primary-foreground text-center">
          <div className="text-6xl mb-4">🌍</div>
          <h2 className="text-3xl font-bold mb-2">Great Work!</h2>
          <p className="text-primary-foreground/90 text-pretty">
            {"You've made a real difference in Freetown's environment"}
          </p>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-6 rounded-3xl text-center">
            <div className="text-4xl mb-2">♻️</div>
            <p className="text-3xl font-bold mb-1">47</p>
            <p className="text-sm text-muted-foreground">Items Recycled</p>
          </Card>
          <Card className="p-6 rounded-3xl text-center">
            <div className="text-4xl mb-2">⚖️</div>
            <p className="text-3xl font-bold mb-1">12kg</p>
            <p className="text-sm text-muted-foreground">Plastic Saved</p>
          </Card>
          <Card className="p-6 rounded-3xl text-center">
            <div className="text-4xl mb-2">💧</div>
            <p className="text-3xl font-bold mb-1">25L</p>
            <p className="text-sm text-muted-foreground">Landfill Saved</p>
          </Card>
          <Card className="p-6 rounded-3xl text-center">
            <div className="text-4xl mb-2">🌱</div>
            <p className="text-3xl font-bold mb-1">8kg</p>
            <p className="text-sm text-muted-foreground">CO₂ Reduced</p>
          </Card>
        </div>

        {/* Monthly Progress */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">This Month</h3>
          <Card className="p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Recycling Goal</span>
              <span className="font-semibold">47 / 50 items</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "94%" }} />
            </div>
            <p className="text-sm text-muted-foreground">{"Just 3 more items to reach your monthly goal! 🎯"}</p>
          </Card>
        </div>

        {/* Environmental Impact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Environmental Equivalents</h3>
          <div className="space-y-3">
            {[
              { icon: "🌳", title: "Trees Saved", value: "2.5 trees", desc: "Equivalent to planting 2.5 trees" },
              { icon: "💡", title: "Energy Saved", value: "45 kWh", desc: "Enough to power a home for 1.5 days" },
              { icon: "🚗", title: "Emissions Avoided", value: "20 km", desc: "Equal to not driving 20 km" },
            ].map((item, index) => (
              <Card key={index} className="p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <p className="font-bold text-primary">{item.value}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Community Leaderboard</h3>
            <span className="text-sm text-muted-foreground">This Week</span>
          </div>
          <Card className="p-6 rounded-3xl space-y-4">
            {[
              { rank: 1, name: "You (Aminata)", items: 47, badge: "🥇" },
              { rank: 2, name: "Mohamed K.", items: 42, badge: "🥈" },
              { rank: 3, name: "Fatmata S.", items: 38, badge: "🥉" },
              { rank: 4, name: "Ibrahim T.", items: 35, badge: "" },
              { rank: 5, name: "Mariama B.", items: 32, badge: "" },
            ].map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-4 ${user.rank === 1 ? "p-3 bg-primary/5 rounded-2xl" : ""}`}
              >
                <span className="text-2xl w-8 text-center">{user.badge || `#${user.rank}`}</span>
                <div className="flex-1">
                  <p className={`font-semibold ${user.rank === 1 ? "text-primary" : ""}`}>{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.items} items recycled</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
