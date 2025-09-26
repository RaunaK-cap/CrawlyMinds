"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  threshold?: number
}

const ScrollReveal = ({ children, threshold = 0.5, className, ...props }: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: threshold,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return (
    <div
      ref={ref}
      className={cn("transition-opacity duration-1000", isVisible ? "opacity-100" : "opacity-0", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { ScrollReveal }
