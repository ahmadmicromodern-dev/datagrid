"use client"

import { useEffect, useState } from "react"

interface HydrationBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onHydrationComplete?: () => void
}

export function HydrationBoundary({ 
  children, 
  fallback = null,
  onHydrationComplete 
}: HydrationBoundaryProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    onHydrationComplete?.()
  }, [onHydrationComplete])

  if (!isHydrated) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
