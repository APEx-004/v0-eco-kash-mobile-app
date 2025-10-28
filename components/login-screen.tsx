"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void
  onSwitchToSignup: () => void
}

export function LoginScreen({ onLogin, onSwitchToSignup }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    setIsLoading(true)
    const supabase = createClient()

    try {
      // Handle phone number login by converting to email format
      const loginEmail = email.includes("@") ? email : `${email}@ecokash.sl`

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      })

      if (signInError) throw signInError

      if (data.user) {
        onLogin(email, password)
      }
    } catch (err: any) {
      setError(err.message || "Invalid email/phone or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="min-h-full flex flex-col justify-center p-6 bg-[rgba(217,237,212,1)]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-bold mb-2 flex items-center justify-center gap-2 text-5xl">
            Kushe
            <svg
              className="w-8 h-8 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ animation: "wave 0.6s ease-in-out infinite" }}
            >
              <path d="M7 4.5C7 3.12 8.12 2 9.5 2S12 3.12 12 4.5v5.25c0 .28.22.5.5.5s.5-.22.5-.5V3c0-1.38 1.12-2.5 2.5-2.5S18 1.62 18 3v6.75c0 .28.22.5.5.5s.5-.22.5-.5V4.5c0-1.38 1.12-2.5 2.5-2.5S9 10.12 9 11.5v.25c0 .28.22.5.5.5s.5-.22.5-.5V4.5z" />
            </svg>
          </h1>
          <p className="text-muted-foreground">Sign in to continue earning rewards</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email/Phone Number</label>
            <Input
              type="text"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Password</label>
            </div>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="h-12 rounded-xl"
            />
          </div>

          {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm">{error}</div>}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 font-semibold text-base mt-8 rounded-sm bg-[rgba(12,11,11,1)] hover:bg-[rgba(12,11,11,1)] hover:opacity-90"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <div className="text-center pt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button type="button" onClick={onSwitchToSignup} className="text-primary font-semibold hover:underline">
                Create Account
              </button>
            </p>
          </div>
        </form>

        {/* Divider */}

        {/* Social Login */}
        <div className="space-y-3"></div>
      </div>
    </div>
  )
}
