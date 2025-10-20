"use client"

import { Card } from "@/components/ui/card"

interface EducationScreenProps {
  onBack: () => void
}

export function EducationScreen({ onBack }: EducationScreenProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 flex items-center gap-4 border-b border-border">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Learn & Grow</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6">
        {/* Featured Article */}
        <Card className="overflow-hidden rounded-3xl">
          <div className="h-48 bg-primary/10 flex items-center justify-center text-6xl">♻️</div>
          <div className="p-6 space-y-3">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              Featured
            </span>
            <h3 className="text-xl font-bold text-balance">The Complete Guide to Waste Segregation in Sierra Leone</h3>
            <p className="text-muted-foreground text-pretty">
              Learn how to properly sort your recyclables and maximize your earnings with EcoKash.
            </p>
            <button className="text-primary font-semibold flex items-center gap-2">
              Read More
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </Card>

        {/* Quick Tips */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Tips</h3>
          <div className="space-y-3">
            {[
              {
                icon: "🧼",
                title: "Clean Before Recycling",
                desc: "Rinse containers to remove food residue for better recycling quality",
              },
              {
                icon: "🏷️",
                title: "Remove Labels",
                desc: "Take off labels and caps from bottles before depositing",
              },
              {
                icon: "📦",
                title: "Flatten Boxes",
                desc: "Compress cardboard and plastic to save space and earn more",
              },
              {
                icon: "🔍",
                title: "Check Recycling Codes",
                desc: "Look for numbers 1-7 on plastics to identify recyclable types",
              },
            ].map((tip, index) => (
              <Card key={index} className="p-4 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                    {tip.icon}
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{tip.title}</p>
                    <p className="text-sm text-muted-foreground">{tip.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Articles</h3>
          <div className="space-y-3">
            {[
              {
                title: "Why Plastic Pollution Matters in Freetown",
                category: "Environment",
                readTime: "5 min read",
                color: "bg-chart-1",
              },
              {
                title: "How Blockchain Ensures Fair Rewards",
                category: "Technology",
                readTime: "4 min read",
                color: "bg-chart-2",
              },
              {
                title: "Success Stories: Community Impact",
                category: "Community",
                readTime: "6 min read",
                color: "bg-chart-3",
              },
            ].map((article, index) => (
              <Card key={index} className="p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl ${article.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1 text-balance">{article.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-muted-foreground flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Infographic */}
        <Card className="p-6 rounded-3xl bg-muted">
          <h3 className="text-lg font-semibold mb-4">Recycling by the Numbers</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-primary">90</div>
              <p className="text-sm text-muted-foreground">Tons of plastic waste generated daily in Freetown</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-primary">12%</div>
              <p className="text-sm text-muted-foreground">Current recycling rate in Sierra Leone</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-primary">500</div>
              <p className="text-sm text-muted-foreground">Years for plastic to decompose in landfills</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
