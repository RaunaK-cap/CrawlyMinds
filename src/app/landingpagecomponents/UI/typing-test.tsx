"use client"

import { useEffect, useState } from "react"

type Props = {
  text: string
  speed?: number // ms per character
  className?: string
  "aria-label"?: string
}

export function TypingText({ text, speed = 20, className, ...rest }: Props) {
  const [shown, setShown] = useState("")

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return (
    <span className={className} aria-live="polite" {...rest}>
      {shown}
      <span
        className="inline-block w-[1px] translate-y-[2px] animate-pulse bg-foreground/60 align-middle"
        style={{ height: "1em" }}
      />
    </span>
  )
}
