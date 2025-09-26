"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
  text: string
  delayStepMs?: number
  className?: string
}

export function StaggeredWords({ text, delayStepMs = 60, className }: Props) {
  const words = text.split(" ")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 10)
    return () => clearTimeout(id)
  }, [])

  return (
    <h1 className={cn("text-balance", className)}>
      {words.map((w, i) => (
        <span
          key={i}
          className={cn(
            "inline-block transform opacity-0 transition duration-700 ease-out will-change-transform",
            ready && "translate-y-0 opacity-100",
          )}
          style={{ transitionDelay: `${i * delayStepMs}ms` }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  )
}
