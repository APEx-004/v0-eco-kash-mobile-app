"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { OnboardingScreen } from "@/components/onboarding-screen"
import { SignupScreen } from "@/components/signup-screen"
import { LoginScreen } from "@/components/login-screen"
import { HomeScreen } from "@/components/home-screen"
import { DepositScreen } from "@/components/deposit-screen"
import { CollectionScreen } from "@/components/collection-screen"
import { WalletScreen } from "@/components/wallet-screen"
import { ImpactScreen } from "@/components/impact-screen"
import { EducationScreen } from "@/components/education-screen"
import { ProfileScreen } from "@/components/profile-screen"
import { CharityScreen } from "@/components/charity-screen"
import { TransferScreen } from "@/components/transfer-screen"
import { PaymentsScreen } from "@/components/payments-screen"
import { ServiceRequestScreen } from "@/components/service-request-screen"

type UserData = {
  fullName: string
  email: string
  phone: string
  location: string
} | null

export type Notification = {
  id: string
  type: "transfer" | "payment" | "donation" | "deposit" | "collection"
  title: string
  description: string
  amount: string
  time: string
  icon: string
  solanaSignature?: string
}

export type CollectionData = {
  amount: number
  recyclablesCount: number
  lastCollectionDate: string
  nextCollectionDate: string
}

export default function EcoKashApp() {
  const [currentScreen, setCurrentScreen] = useState<
    | "onboarding"
    | "signup"
    | "login"
    | "home"
    | "deposit"
    | "collection"
    | "wallet"
    | "impact"
    | "education"
    | "profile"
    | "charity"
    | "transfer"
    | "payments"
    | "service-request"
  >("onboarding")
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [userData, setUserData] = useState<UserData>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [walletBalance, setWalletBalance] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const [hasBin, setHasBin] = useState(false)
  const [collectionData, setCollectionData] = useState<CollectionData>({
    amount: 0,
    recyclablesCount: 0,
    lastCollectionDate: "",
    nextCollectionDate: "",
  })
  const [monthlyEarnings, setMonthlyEarnings] = useState(0)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id)
        setIsAuthenticated(true)
        loadUserProfile(session.user.id)
        setCurrentScreen("home")
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id)
        setIsAuthenticated(true)
        loadUserProfile(session.user.id)
      } else {
        setUserId(null)
        setIsAuthenticated(false)
        setUserData(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (uid: string) => {
    const supabase = createClient()
    const { data, error } = await supabase.from("profiles").select("*").eq("id", uid).single()

    if (data) {
      setUserData({
        fullName: data.full_name,
        email: data.email || "",
        phone: data.phone || "",
        location: data.address || "",
      })
      setWalletBalance(Number.parseFloat(data.wallet_balance) || 0)
    }
  }

  const handleOnboardingComplete = () => {
    setCurrentScreen("signup")
  }

  const handleSignup = (data: {
    fullName: string
    email: string
    phone: string
    password: string
    location: string
  }) => {
    setUserData({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      location: data.location,
    })
    setIsAuthenticated(true)
    setWalletBalance(0)
    setNotifications([])
    setHasBin(false)
    setCurrentScreen("home")
  }

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true)
    setCurrentScreen("home")
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUserData(null)
    setIsAuthenticated(false)
    setCurrentScreen("login")
  }

  const handleNavigate = (screen: typeof currentScreen) => {
    setCurrentScreen(screen)
  }

  const handleDonation = (amount: number, charityName: string) => {
    setWalletBalance((prev) => prev - amount)
    const signature = generateSolanaSignature()
    addNotification({
      type: "donation",
      title: `Donated to ${charityName}`,
      description: `Charitable donation`,
      amount: `-$${amount.toFixed(2)}`,
      icon: "❤️",
      solanaSignature: signature,
    })
  }

  const handleTransfer = (amount: number, recipient: string, method: string) => {
    setWalletBalance((prev) => prev - amount)
    const signature = generateSolanaSignature()
    addNotification({
      type: "transfer",
      title: `Transfer to ${recipient}`,
      description: `Via ${method}`,
      amount: `-$${amount.toFixed(2)}`,
      icon: "💸",
      solanaSignature: signature,
    })
  }

  const handlePayment = (amount: number, service: string, provider: string) => {
    setWalletBalance((prev) => prev - amount)
    const signature = generateSolanaSignature()
    addNotification({
      type: "payment",
      title: `${service} Payment`,
      description: `Paid to ${provider}`,
      amount: `-$${amount.toFixed(2)}`,
      icon: "💳",
      solanaSignature: signature,
    })
  }

  const addNotification = (notification: Omit<Notification, "id" | "time">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      time: "Just now",
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const handleBinPurchase = () => {
    setHasBin(true)
    const today = new Date()
    const nextCollection = new Date(today)
    nextCollection.setDate(today.getDate() + 14)

    setCollectionData({
      amount: 0,
      recyclablesCount: 0,
      lastCollectionDate: "",
      nextCollectionDate: nextCollection.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    })
  }

  const handleCollection = (amount: number, itemCount: number) => {
    const today = new Date()
    const nextCollection = new Date(today)
    nextCollection.setDate(today.getDate() + 14)

    setCollectionData({
      amount: collectionData.amount + amount,
      recyclablesCount: collectionData.recyclablesCount + itemCount,
      lastCollectionDate: today.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      nextCollectionDate: nextCollection.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    })

    setWalletBalance((prev) => prev + amount)
    setMonthlyEarnings((prev) => prev + amount)

    const signature = generateSolanaSignature()
    addNotification({
      type: "collection",
      title: "Recyclables Collected",
      description: `${itemCount} items collected`,
      amount: `+$${amount.toFixed(2)}`,
      icon: "♻️",
      solanaSignature: signature,
    })
  }

  const generateSolanaSignature = (): string => {
    const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    let signature = ""
    for (let i = 0; i < 88; i++) {
      signature += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return signature
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[rgba(217,237,212,1)]">
      <div className="w-full max-w-md h-[812px] rounded-[3rem] shadow-2xl overflow-hidden relative border-8 border-foreground/10 bg-[rgba(217,237,212,1)]">
        <div className="absolute top-0 left-0 right-0 h-12 z-50 flex items-center justify-between px-8 pt-2 bg-[rgba(216,237,211,1)]">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-foreground">9:41</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-3.5 text-foreground" viewBox="0 0 16 14" fill="currentColor">
              <circle cx="2" cy="12" r="1.5" />
              <circle cx="6" cy="10" r="1.5" />
              <circle cx="10" cy="7" r="1.5" />
              <circle cx="14" cy="4" r="1.5" />
            </svg>
            <svg className="w-4 h-3.5 text-foreground" viewBox="0 0 16 12" fill="currentColor">
              <path d="M8 12c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm3.74-3.74c-.41-.41-1.08-.41-1.49 0-.2.2-.3.46-.3.74 0 .28.1.54.3.74.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49zm2.83-2.83c-1.56-1.56-4.1-1.56-5.66 0-.78.78-.78 2.05 0 2.83.78.78 2.05.78 2.83 0zm2.83-2.83c-3.12-3.12-8.19-3.12-11.31 0-1.56 1.56-1.56 4.1 0 5.66.78.78 2.05.78 2.83 0 1.56-1.56 1.56-4.1 0-5.66z" />
            </svg>
            <div className="flex items-center gap-0.5">
              <div className="w-6 h-3 border-2 border-foreground rounded-sm relative">
                <div className="absolute inset-0.5 bg-foreground rounded-[1px]" />
              </div>
              <div className="w-0.5 h-1.5 bg-foreground rounded-r-sm" />
            </div>
          </div>
        </div>

        <div className="h-full pt-12 pb-8">
          {currentScreen === "onboarding" && (
            <OnboardingScreen
              step={onboardingStep}
              onNext={() => setOnboardingStep((prev) => prev + 1)}
              onComplete={handleOnboardingComplete}
            />
          )}
          {currentScreen === "signup" && (
            <SignupScreen onSignup={handleSignup} onSwitchToLogin={() => setCurrentScreen("login")} />
          )}
          {currentScreen === "login" && (
            <LoginScreen onLogin={handleLogin} onSwitchToSignup={() => setCurrentScreen("signup")} />
          )}
          {currentScreen === "home" && (
            <HomeScreen
              onNavigate={handleNavigate}
              userData={userData}
              walletBalance={walletBalance}
              notifications={notifications}
              hasBin={hasBin}
              collectionData={collectionData}
              onSimulateCollection={handleCollection}
              monthlyEarnings={monthlyEarnings}
            />
          )}
          {currentScreen === "deposit" && <DepositScreen onBack={() => setCurrentScreen("home")} />}
          {currentScreen === "collection" && <CollectionScreen onBack={() => setCurrentScreen("home")} />}
          {currentScreen === "wallet" && (
            <WalletScreen
              onBack={() => setCurrentScreen("home")}
              walletBalance={walletBalance}
              notifications={notifications}
            />
          )}
          {currentScreen === "impact" && <ImpactScreen onBack={() => setCurrentScreen("home")} />}
          {currentScreen === "education" && <EducationScreen onBack={() => setCurrentScreen("home")} />}
          {currentScreen === "profile" && (
            <ProfileScreen
              onBack={() => setCurrentScreen("home")}
              userData={userData}
              onLogout={handleLogout}
              onNavigateToServiceRequest={() => setCurrentScreen("service-request")}
            />
          )}
          {currentScreen === "charity" && (
            <CharityScreen
              onBack={() => setCurrentScreen("home")}
              walletBalance={walletBalance}
              onDonate={handleDonation}
            />
          )}
          {currentScreen === "transfer" && (
            <TransferScreen
              onBack={() => setCurrentScreen("home")}
              walletBalance={walletBalance}
              onTransfer={handleTransfer}
            />
          )}
          {currentScreen === "payments" && (
            <PaymentsScreen
              onBack={() => setCurrentScreen("home")}
              walletBalance={walletBalance}
              onPayment={handlePayment}
            />
          )}
          {currentScreen === "service-request" && (
            <ServiceRequestScreen
              onBack={() => setCurrentScreen("profile")}
              userData={userData}
              hasBin={hasBin}
              onBinPurchase={handleBinPurchase}
            />
          )}
        </div>

        {isAuthenticated &&
          currentScreen !== "onboarding" &&
          currentScreen !== "signup" &&
          currentScreen !== "login" &&
          currentScreen !== "deposit" &&
          currentScreen !== "collection" &&
          currentScreen !== "charity" &&
          currentScreen !== "transfer" &&
          currentScreen !== "payments" &&
          currentScreen !== "service-request" && (
            <div className="absolute bottom-0 left-0 right-0 h-20 border-t border-border flex items-center justify-around px-4 pb-4 bg-[rgba(217,237,212,1)]">
              <button
                onClick={() => setCurrentScreen("home")}
                className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === "home" ? "text-primary" : "text-muted-foreground"}`}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
                <span className="text-xs font-medium font-sans">Home</span>
              </button>
              <button
                onClick={() => setCurrentScreen("impact")}
                className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === "impact" ? "text-primary" : "text-muted-foreground"}`}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a.75.75 0 01-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                </svg>
                <span className="text-xs font-medium font-sans">Impact</span>
              </button>
              <button
                onClick={() => setCurrentScreen("education")}
                className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === "education" ? "text-primary" : "text-muted-foreground"}`}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                </svg>
                <span className="text-xs font-medium font-sans">Learn</span>
              </button>
              <button
                onClick={() => setCurrentScreen("profile")}
                className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === "profile" ? "text-primary" : "text-muted-foreground"}`}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs font-medium font-sans">Profile</span>
              </button>
            </div>
          )}
      </div>
    </div>
  )
}
