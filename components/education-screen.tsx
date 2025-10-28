"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"

interface EducationScreenProps {
  onBack: () => void
}

export function EducationScreen({ onBack }: EducationScreenProps) {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)

  const lessons = [
    {
      id: 1,
      title: "The Complete Guide to Waste Segregation",
      description: "Learn how to properly sort your recyclables and maximize your earnings with EcoKash.",
      thumbnail: "/waste-segregation-bins-sorting-recyclables.jpg",
      category: "Basics",
      duration: "5 min read",
      content: `
        <h2>Understanding Waste Segregation</h2>
        <p>Proper waste segregation is the first step to effective recycling. By sorting your waste correctly, you help ensure that recyclable materials can be processed efficiently.</p>
        
        <h3>Types of Waste</h3>
        <ul>
          <li><strong>Plastic:</strong> Bottles, containers, bags (clean and dry)</li>
          <li><strong>Paper:</strong> Newspapers, cardboard, office paper</li>
          <li><strong>Metal:</strong> Aluminum cans, tin cans</li>
          <li><strong>Glass:</strong> Bottles and jars (remove caps)</li>
          <li><strong>Organic:</strong> Food waste, garden waste</li>
        </ul>

        <h3>Best Practices</h3>
        <p>1. Rinse containers before recycling</p>
        <p>2. Remove labels and caps when possible</p>
        <p>3. Flatten boxes to save space</p>
        <p>4. Keep recyclables dry and clean</p>
      `,
    },
    {
      id: 2,
      title: "Why Plastic Pollution Matters in Freetown",
      description: "Understanding the environmental impact of plastic waste in our city.",
      thumbnail: "/plastic-pollution-ocean-environment-freetown.jpg",
      category: "Environment",
      duration: "5 min read",
      content: `
        <h2>The Plastic Crisis in Freetown</h2>
        <p>Freetown generates 90 tons of plastic waste daily, with only 12% being recycled. This creates serious environmental and health challenges for our community.</p>
        
        <h3>Environmental Impact</h3>
        <p>Plastic waste clogs drainage systems, leading to flooding during rainy seasons. It also pollutes our beaches and waterways, harming marine life.</p>

        <h3>Health Concerns</h3>
        <p>Burning plastic releases toxic fumes that affect air quality and public health. Proper recycling helps reduce these harmful practices.</p>

        <h3>What You Can Do</h3>
        <p>By participating in EcoKash, you're directly contributing to reducing plastic pollution in Freetown while earning rewards.</p>
      `,
    },
    {
      id: 3,
      title: "How Blockchain Ensures Fair Rewards",
      description: "Learn how Solana blockchain technology makes EcoKash transparent and secure.",
      thumbnail: "/blockchain-technology-solana-cryptocurrency-secure.jpg",
      category: "Technology",
      duration: "4 min read",
      content: `
        <h2>Blockchain Technology in EcoKash</h2>
        <p>EcoKash uses Solana blockchain to ensure every transaction is transparent, secure, and verifiable.</p>
        
        <h3>Why Blockchain?</h3>
        <p>Traditional reward systems can be manipulated or lack transparency. Blockchain creates an immutable record of all transactions.</p>

        <h3>Benefits for You</h3>
        <ul>
          <li>Instant verification of your recyclables</li>
          <li>Transparent reward calculations</li>
          <li>Secure wallet for your earnings</li>
          <li>Fast, low-cost transactions</li>
        </ul>

        <h3>Your Digital Wallet</h3>
        <p>Your EcoKash wallet is powered by Solana, giving you full control over your earnings with the ability to transfer or withdraw anytime.</p>
      `,
    },
    {
      id: 4,
      title: "Maximizing Your Earnings",
      description: "Tips and tricks to earn more from your recyclables.",
      thumbnail: "/money-earnings-rewards-tips-maximize-income.jpg",
      category: "Tips",
      duration: "3 min read",
      content: `
        <h2>Earn More with EcoKash</h2>
        <p>Follow these strategies to maximize your recycling rewards.</p>
        
        <h3>Quality Matters</h3>
        <p>Clean, dry recyclables earn higher rewards. Take a few extra seconds to rinse containers and remove labels.</p>

        <h3>Collect Strategically</h3>
        <p>Focus on high-value items like aluminum cans and PET bottles. These typically offer better rates per item.</p>

        <h3>Regular Deposits</h3>
        <p>Make regular trips to RVM locations instead of waiting. This helps you track your progress and stay motivated.</p>

        <h3>Refer Friends</h3>
        <p>Earn bonus rewards by referring friends and family to EcoKash. The more people recycle, the cleaner our city becomes!</p>
      `,
    },
  ]

  if (selectedLesson !== null) {
    const lesson = lessons.find((l) => l.id === selectedLesson)
    if (!lesson) return null

    return (
      <div className="h-full flex flex-col bg-background">
        <div className="p-6 flex items-center gap-4 border-b border-[rgba(217,237,212,1)] bg-[rgba(217,237,212,1)]">
          <button
            onClick={() => setSelectedLesson(null)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-balance">{lesson.title}</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-24 border-[rgba(217,237,212,1)] bg-[rgba(217,237,212,1)]">
          <img
            src={lesson.thumbnail || "/placeholder.svg"}
            alt={lesson.title}
            className="w-full h-48 object-cover rounded-2xl mb-6"
          />

          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              {lesson.category}
            </span>
            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
          </div>

          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-6 flex items-center gap-4 border-b border-border bg-[rgba(217,237,212,1)]">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]">
          <svg className="w-5 h-5 bg-[rgba(217,237,212,1)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Learn & Grow</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-6 bg-[rgba(217,237,212,1)]">
        <h3 className="text-lg font-semibold">All Lessons</h3>

        <div className="space-y-4">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="overflow-hidden rounded-2xl cursor-pointer hover:border-primary transition-all"
              onClick={() => setSelectedLesson(lesson.id)}
            >
              <img
                src={lesson.thumbnail || "/placeholder.svg"}
                alt={lesson.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {lesson.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                </div>
                <h3 className="font-bold text-balance">{lesson.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{lesson.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
