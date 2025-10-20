"use client"

import { useState } from "react"
import { OnboardingScreen } from "@/components/onboarding-screen"
import { HomeScreen } from "@/components/home-screen"
import { DepositScreen } from "@/components/deposit-screen"
import { CollectionScreen } from "@/components/collection-screen"
import { WalletScreen } from "@/components/wallet-screen"
import { ImpactScreen } from "@/components/impact-screen"
import { EducationScreen } from "@/components/education-screen"
import { ProfileScreen } from "@/components/profile-screen"

export default function EcoKashApp() {
  const [currentScreen, setCurrentScreen] = useState<
    "onboarding" | "home" | "deposit" | "collection" | "wallet" | "impact" | "education" | "profile"
  >("onboarding")
  const [onboardingStep, setOnboardingStep] = useState(0)

  const handleOnboardingComplete = () => {
    setCurrentScreen("home")
  }

  const handleNavigate = (screen: typeof currentScreen) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[812px] bg-card rounded-[3rem] shadow-2xl overflow-hidden relative border-8 border-foreground/10">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-card z-50 flex items-center justify-between px-8 pt-2">
          <span className="text-xs font-medium text-foreground">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 border border-foreground/30 rounded-sm relative">
              <div className="absolute inset-0.5 bg-foreground rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="h-full pt-12 pb-8">
          {currentScreen === "onboarding" && (
            <OnboardingScreen
              step={onboardingStep}
              onNext={() => setOnboardingStep((prev) => prev + 1)}
              onComplete={handleOnboardingComplete}
            />
          )}
          {currentScreen === "home" && <HomeScreen onNavigate={handleNavigate} />}
          {currentScreen === "deposit" && <DepositScreen onBack={() => setCurrentScreen("home")} />}
          {currentScreen === "collection" && <CollectionScreen onBack={() => setCurrentScreen("home")} />}
          {currentScreen === "wallet" && <WalletScreen onBack={() => setCurrentScreen("home")} />}
          {currentScreen === "impact" && <ImpactScreen onBack={() => setCurrentScreen("home")} />}
          {currentScreen === "education" && <EducationScreen onBack={() => setCurrentScreen("home")} />}
          {currentScreen === "profile" && <ProfileScreen onBack={() => setCurrentScreen("home")} />}
        </div>

        {/* Bottom Navigation - Only show after onboarding */}
        {currentScreen !== "onboarding" && currentScreen !== "deposit" && currentScreen !== "collection" && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-card border-t border-border flex items-center justify-around px-4 pb-4">
            <button
              onClick={() => setCurrentScreen("home")}
              className={`flex flex-col items-center gap-1 ${currentScreen === "home" ? "text-primary" : "text-muted-foreground"}`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => setCurrentScreen("wallet")}
              className={`flex flex-col items-center gap-1 ${currentScreen === "wallet" ? "text-primary" : "text-muted-foreground"}`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span className="text-xs font-medium">Wallet</span>
            </button>
            <button
              onClick={() => setCurrentScreen("impact")}
              className={`flex flex-col items-center gap-1 ${currentScreen === "impact" ? "text-primary" : "text-muted-foreground"}`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="text-xs font-medium">Impact</span>
            </button>
            <button
              onClick={() => setCurrentScreen("education")}
              className={`flex flex-col items-center gap-1 ${currentScreen === "education" ? "text-primary" : "text-muted-foreground"}`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="text-xs font-medium">Learn</span>
            </button>
            <button
              onClick={() => setCurrentScreen("profile")}
              className={`flex flex-col items-center gap-1 ${currentScreen === "profile" ? "text-primary" : "text-muted-foreground"}`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
