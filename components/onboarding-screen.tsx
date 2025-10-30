"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface OnboardingScreenProps {
  step: number
  onNext: () => void
  onComplete: () => void
}

const onboardingData = [
  {
    title: "Segregate",
    description: "Transform your recyclables into rewards with a simple scan at any RVM location.",
    image: "/person-sorting-waste-into-labeled-bins-plastic-org.jpg",
  },
  {
    title: "Recycle",
    description: "Watch your environmental contribution grow with real-time blockchain verification.",
    image: "/recyclables-being-processed-turned-into-new-produc.jpg",
  },
  {
    title: "Earn",
    description: "Get paid immediately for every recyclable. Your wallet, your planet, your future.",
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
      className="h-full flex flex-col bg-gradient-to-br from-[#f5f5f7] via-white to-[#f5f5f7] relative overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #000 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10 border-[rgba(217,237,212,1)] shadow-none bg-[rgba(217,237,212,1)]">
        {/* Image Frame - Apple-style with shadow and border */}
        <div className="relative mb-12 animate-fade-in-up">
          {/* Outer glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-[2.5rem] blur-2xl border-[rgba(217,237,212,1)]" />

          {/* Main frame */}
          <div className="relative rounded-[2rem] p-2 shadow-2xl border border-black/5 bg-foreground">
            <div className="relative rounded-[1.75rem] overflow-hidden bg-gradient-to-br from-gray-50 to-white">
              <img
                src={currentStep.image || "/placeholder.svg"}
                alt={currentStep.title}
                className="w-80 h-80 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
              {/* Inner shadow overlay */}
              <div className="absolute inset-0 shadow-inner pointer-events-none" />
            </div>
          </div>

          {/* Floating accent element */}
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse" />
        </div>

        {/* Text Content */}
        <div className="space-y-4 text-center max-w-sm animate-fade-in-up animation-delay-200">
          <h1 className="text-4xl font-bold text-balance leading-tight tracking-tight text-gray-900">
            {currentStep.title}
          </h1>
          <p className="text-lg text-gray-600 text-pretty leading-relaxed font-light">{currentStep.description}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-8 pb-12 space-y-8 relative z-10 bg-[rgba(217,237,212,1)]">
        {/* Progress Indicators - Apple style */}
        <div className="flex justify-center gap-2">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                index === step ? "w-8 bg-gray-900" : index < step ? "w-1.5 bg-gray-400" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {isLastSlide ? (
          <Button
            onClick={onComplete}
            className="w-full text-white hover:bg-gray-800 h-14 rounded-2xl font-semibold text-base shadow-lg shadow-gray-900/20 transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] bg-black"
          >
            Get Started
          </Button>
        ) : (
          <button
            onClick={onNext}
            className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 py-4 group"
          >
            <span className="text-sm font-medium">Continue</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        )}
      </div>
    </div>
  )
}
