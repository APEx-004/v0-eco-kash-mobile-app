"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface OnboardingScreenProps {
  step: number
  onNext: () => void
  onComplete: () => void
}

const onboardingData = [
  {
    title: "Segregate your trash",
    description: "Sort your waste easily at home into the right bins.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/woman-recycling-better-environment%20%282%29-lrWEXx3p3zctJtCyAZaZ5PoxSLsofm.jpg",
    isFullScreen: true,
  },
  {
    title: "Recycle your trash",
    description: "Turn waste into something useful.",
    image: "/recyclables-being-processed-turned-into-new-produc.jpg",
    isFullScreen: false,
  },
  {
    title: "Earn from your waste",
    description: "Earn money or rewards from your recyclables.",
    image: "/person-receiving-cash-digital-rewards-money-from-r.jpg",
    isFullScreen: false,
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

  if (currentStep.isFullScreen) {
    return (
      <div
        className="h-full relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Full-screen background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentStep.image})` }} />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* Content overlay */}
        <div className="relative h-full flex flex-col justify-between p-8 pb-12">
          {/* Top section with title and description */}
          <div className="pt-8 space-y-4 animate-fade-in-up">
            <h1 className="text-4xl font-bold text-white text-balance leading-tight drop-shadow-lg">
              {currentStep.title}
            </h1>
            <p className="text-lg text-white/90 text-pretty leading-relaxed drop-shadow-md max-w-sm">
              {currentStep.description}
            </p>
          </div>

          {/* Bottom section with progress and swipe indicator */}
          <div className="space-y-6">
            {/* Progress Indicators */}
            <div className="flex justify-center gap-2">
              {onboardingData.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === step ? "w-8 bg-white" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Swipe indicator */}
            <div className="flex items-center justify-center gap-2 text-white/80">
              <p className="text-sm font-medium">Swipe left to continue</p>
              <ChevronLeft className="w-5 h-5 rotate-180 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

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
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <p className="text-sm">Swipe left to continue</p>
            <ChevronLeft className="w-4 h-4 rotate-180 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  )
}
