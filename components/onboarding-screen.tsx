"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface OnboardingScreenProps {
  step: number
  onNext: () => void
  onComplete: () => void
}

const onboardingData = [
  {
    title: "Segregate your trash",
    description: "Sort your waste easily at home.",
    image: "/person-sorting-waste-into-labeled-bins-plastic-org.jpg",
  },
  {
    title: "Recycle your trash",
    description: "Turn waste into something useful.",
    image: "/recyclables-being-processed-turned-into-new-produc.jpg",
  },
  {
    title: "Earn from your waste",
    description: "Earn money or rewards from your recyclables.",
    image: "/person-receiving-cash-digital-rewards-money-from-r.jpg",
  },
]

export function OnboardingScreen({ step, onNext, onComplete }: OnboardingScreenProps) {
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance

    if (isLeftSwipe) {
      if (step === onboardingData.length - 1) {
        return
      }
      onNext()
    }
  }

  const currentStep = onboardingData[step]

  if (!currentStep) {
    onComplete()
    return null
  }

  const isLastSlide = step === onboardingData.length - 1

  return (
    <div
      className="h-full flex flex-col items-center justify-between p-8 pb-12 text-center bg-gradient-to-b from-primary/5 to-background bg-[rgba(217,237,212,1)]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 max-w-md">
        <div className="animate-fade-in-up">
          <img
            src={currentStep.image || "/placeholder.svg"}
            alt={currentStep.title}
            className="w-72 h-72 object-contain rounded-3xl"
          />
        </div>
        <div className="space-y-4 animate-fade-in-up animation-delay-200">
          <h1 className="text-3xl font-bold text-balance leading-tight text-foreground">{currentStep.title}</h1>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">{currentStep.description}</p>
        </div>
      </div>

      {/* Bottom Section with Progress */}
      <div className="w-full space-y-6 max-w-md">
        {/* Progress Indicators */}
        <div className="flex justify-center gap-2">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${index === step ? "w-8 bg-primary" : "w-2 bg-border"}`}
            />
          ))}
        </div>

        {isLastSlide ? (
          <Button
            onClick={onComplete}
            className="w-full text-primary-foreground hover:bg-primary/90 h-12 rounded-2xl font-semibold bg-black"
          >
            Get Started
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">Swipe left to continue</p>
        )}
      </div>
    </div>
  )
}
