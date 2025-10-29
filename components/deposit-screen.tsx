"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface DepositScreenProps {
  onBack: () => void
}

const recyclableTypes = [
  { id: "plastic", name: "Plastic Bottles", icon: "♻️", rate: "$0.50/item" },
  { id: "cans", name: "Aluminum Cans", icon: "🥫", rate: "$0.15/item" },
  { id: "pet", name: "PET Bottles", icon: "🍾", rate: "$0.40/item" },
  { id: "glass", name: "Glass Bottles", icon: "🍶", rate: "$0.30/item" },
]

const rvmLocations = [
  {
    id: "1",
    name: "Fourah Bay College",
    type: "School",
    address: "Mount Aureol, Freetown",
    icon: "🏫",
    distance: "2.3 km",
    status: "Active",
  },
  {
    id: "2",
    name: "PZ Market",
    type: "Market",
    address: "Siaka Stevens Street, Freetown",
    icon: "🏪",
    distance: "1.5 km",
    status: "Active",
  },
  {
    id: "3",
    name: "Lumley Beach",
    type: "Beach",
    address: "Lumley Beach Road, Freetown",
    icon: "🏖️",
    distance: "3.8 km",
    status: "Active",
  },
  {
    id: "4",
    name: "Kissy Terminal",
    type: "Vehicular Park",
    address: "Kissy Road, Freetown",
    icon: "🚌",
    distance: "4.2 km",
    status: "Active",
  },
  {
    id: "5",
    name: "Government Wharf",
    type: "Vehicular Park",
    address: "Cline Town, Freetown",
    icon: "🚌",
    distance: "2.1 km",
    status: "Active",
  },
  {
    id: "6",
    name: "St. Edwards Secondary School",
    type: "School",
    address: "Kingtom, Freetown",
    icon: "🏫",
    distance: "1.8 km",
    status: "Active",
  },
  {
    id: "7",
    name: "Aberdeen Beach",
    type: "Beach",
    address: "Aberdeen, Freetown",
    icon: "🏖️",
    distance: "3.2 km",
    status: "Active",
  },
  {
    id: "8",
    name: "King Jimmy Market",
    type: "Market",
    address: "King Jimmy, Freetown",
    icon: "🏪",
    distance: "2.7 km",
    status: "Active",
  },
]

export function DepositScreen({ onBack }: DepositScreenProps) {
  const [step, setStep] = useState<"locations" | "select" | "scan" | "confirm">("locations")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isScanning, setIsScanning] = useState(false)

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId)
    setStep("select")
  }

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    setStep("scan")
  }

  const handleStartScan = () => {
    setIsScanning(true)
    // Simulate QR code scan
    setTimeout(() => {
      setIsScanning(false)
      setStep("confirm")
    }, 2000)
  }

  const selectedItem = recyclableTypes.find((t) => t.id === selectedType)
  const selectedRVM = rvmLocations.find((l) => l.id === selectedLocation)

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 flex items-center gap-4 border-b border-border bg-[rgba(217,237,212,1)]">
        <button
          onClick={() => {
            if (step === "locations") {
              onBack()
            } else if (step === "select") {
              setStep("locations")
            } else if (step === "scan") {
              setStep("select")
            } else {
              onBack()
            }
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(217,237,212,1)]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">{step === "locations" ? "RVM Locations" : "Deposit Recyclables"}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24 bg-[rgba(217,237,212,1)]">
        {step === "locations" && (
          <div className="space-y-4">
            <Card className="p-6 rounded-3xl bg-primary/10 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">How to Use RVM</h3>
                  <p className="text-sm text-muted-foreground">
                    Select a location, scan the QR code at the RVM machine, deposit your recyclables, and receive
                    instant rewards to your wallet!
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Available RVM Locations in Freetown</h2>
              {rvmLocations.map((location) => (
                <Card
                  key={location.id}
                  className="p-5 rounded-2xl cursor-pointer hover:border-primary transition-all hover:shadow-md"
                  onClick={() => handleLocationSelect(location.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                      {location.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-base">{location.name}</p>
                        <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                          {location.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{location.type}</p>
                      <p className="text-xs text-muted-foreground truncate">{location.address}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-xs text-primary font-medium">{location.distance} away</span>
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
        )}

        {step === "select" && (
          <div className="space-y-4">
            {selectedRVM && (
              <Card className="p-5 rounded-2xl bg-muted">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                    {selectedRVM.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{selectedRVM.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedRVM.address}</p>
                  </div>
                </div>
              </Card>
            )}
            <p className="text-muted-foreground">Select the type of recyclable you want to deposit</p>
            <div className="grid gap-4">
              {recyclableTypes.map((type) => (
                <Card
                  key={type.id}
                  className="p-6 rounded-3xl cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{type.name}</p>
                      <p className="text-sm text-muted-foreground">{type.rate}</p>
                    </div>
                    <svg
                      className="w-6 h-6 text-muted-foreground"
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
        )}

        {step === "scan" && selectedItem && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-5xl mb-4">{selectedItem.icon}</div>
              <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
              <p className="text-muted-foreground">Scan QR code at the RVM to deposit</p>
            </div>

            {/* QR Code Scanner */}
            <Card className="p-8 rounded-3xl bg-foreground">
              <div className="aspect-square bg-card rounded-2xl flex items-center justify-center relative overflow-hidden">
                {isScanning ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-1 bg-primary animate-scan" />
                    <p className="absolute bottom-4 text-sm font-medium text-primary">Scanning...</p>
                  </div>
                ) : (
                  <div className="w-48 h-48 border-4 rounded-2xl flex items-center justify-center border-foreground">
                    <svg className="w-32 h-32 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </Card>

            {/* Quantity Selector */}
            <Card className="p-6 rounded-3xl">
              <p className="text-sm text-muted-foreground mb-4">Number of items</p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"
                  disabled={isScanning}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-4xl font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                  disabled={isScanning}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </Card>

            <Button
              onClick={handleStartScan}
              disabled={isScanning}
              className="w-full h-14 text-lg font-semibold rounded-2xl bg-foreground"
              size="lg"
            >
              {isScanning ? "Scanning..." : "Scan QR Code"}
            </Button>
          </div>
        )}

        {step === "confirm" && selectedItem && selectedRVM && (
          <div className="space-y-6">
            {/* Success Animation */}
            <div className="text-center space-y-4 py-8">
              <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto animate-scale-in">
                <svg className="w-12 h-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold">Deposit Successful!</h2>
              <p className="text-muted-foreground">Your rewards have been added to your wallet</p>
            </div>

            {/* Transaction Details */}
            <Card className="p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-semibold text-right">{selectedRVM.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Item Type</span>
                <span className="font-semibold">{selectedItem.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Quantity</span>
                <span className="font-semibold">{quantity} items</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-semibold">{selectedItem.rate}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total Earned</span>
                <span className="text-2xl font-bold text-success">
                  ${(Number.parseFloat(selectedItem.rate.replace(/[^0-9.]/g, "")) * quantity).toFixed(2)}
                </span>
              </div>
            </Card>

            {/* Blockchain Verification */}
            <Card className="p-6 rounded-3xl bg-muted">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold mb-1">Verified on Solana</p>
                  <p className="text-sm text-muted-foreground font-mono break-all">TX: 5x7k...9mP2</p>
                </div>
              </div>
            </Card>

            <Button onClick={onBack} className="w-full h-14 text-lg font-semibold rounded-2xl bg-foreground" size="lg">
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
