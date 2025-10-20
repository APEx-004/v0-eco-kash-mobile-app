"use client"

import { Button } from "@/components/ui/button"

interface OnboardingScreenProps {
  step: number
  onNext: () => void
  onComplete: () => void
}

const onboardingData = [
  {
    title: "Freetown generates 90 tons of plastic daily",
    description: "Our city faces a growing waste crisis. Together, we can make a difference.",
    icon: (
      <svg className="w-32 h-32 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "EcoKash helps you earn while saving the planet",
    description: "Turn your recyclables into real rewards. Every bottle, can, and plastic bag counts.",
    icon: (
      <svg className="w-32 h-32 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Join the movement",
    description: "Be part of Sierra Leone's recycling revolution. Start earning today.",
    icon: (
      <svg className="w-32 h-32 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
]

export function OnboardingScreen({ step, onNext, onComplete }: OnboardingScreenProps) {
  const currentStep = onboardingData[step]

  if (!currentStep) {
    onComplete()
    return null
  }

  return (
    <div className="h-full flex flex-col items-center justify-between p-8 text-center">
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="animate-fade-in-up">{currentStep.icon}</div>
        <div className="space-y-4 animate-fade-in-up animation-delay-200">
          <h1 className="text-3xl font-bold text-balance leading-tight text-foreground">{currentStep.title}</h1>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">{currentStep.description}</p>
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="flex justify-center gap-2 mb-6">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${index === step ? "w-8 bg-primary" : "w-2 bg-border"}`}
            />
          ))}
        </div>
        <Button
          onClick={step === onboardingData.length - 1 ? onComplete : onNext}
          className="w-full h-14 text-lg font-semibold rounded-2xl"
          size="lg"
        >
          {step === onboardingData.length - 1 ? "Get Started" : "Continue"}
        </Button>
      </div>
    </div>
  )
}
