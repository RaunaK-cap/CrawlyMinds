"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { RightPanel } from "./rightpanel"
import { Theme_Toggler } from "@/components/toggler_theme"
import { BrainCircuit } from "lucide-react"
import Link from "next/link"

type ChatRole = "user" | "assistant"

type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  timestamp: number
}

function VercelLikeHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3">
       <Link href={"/"}>
        <h1 className="text-pretty text-sm font-bold text-foreground flex  items-center gap-2">  {<BrainCircuit/>}CrawlyMinds</h1>
       </Link>
        <div className="ml-auto text-xs ">
            <div className="flex items-center gap-2">
            <Theme_Toggler/>
             <RightPanel />
            </div>
            
             </div>
      </div>
    </header>
  )
}

function MessageBubble({
  message,
}: {
  message: ChatMessage
}) {
  const isUser = message.role === "user"

  return (
    <li className="flex w-full" role="listitem" aria-label={isUser ? "User message" : "Assistant message"}>
      <div
        className={[
          "flex max-w-[80%] flex-col gap-1 rounded-lg border border-border px-3 py-2 text-sm",
          isUser ? "ml-auto" : "mr-auto",
          isUser ? "bg-background" : "bg-muted",
        ].join(" ")}
        style={isUser ? { boxShadow: "0 0 0 1px var(--border)", borderColor: "var(--border)" } : undefined}
      >
        <div className="flex items-center gap-2">
        </div>
        <div className="whitespace-pre-wrap leading-relaxed text-foreground">{message.content}</div>
      </div>
    </li>
  )
}

function ChatWindow({ messages }: { messages: ChatMessage[] }) {
    const scrollerRef = useRef<HTMLDivElement | null>(null)
    const endRef = useRef<HTMLDivElement | null>(null)
  
    useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }, [messages])
  
    return (
      <section
        className="flex min-h-0 flex-1 overflow-x-hidden" // 🚀 prevent x scroll
        aria-label="Chat messages"
        role="region"
      >
        <div
          ref={scrollerRef}
          className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-y-auto px-4"
        >
          <ul className="flex flex-1 flex-col gap-4 pb-6 pt-6" role="list">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
          </ul>
          <div ref={endRef} />
        </div>
      </section>
    )
  }

function ChatComposer({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void
  disabled?: boolean
}) {
  const [value, setValue] = useState("")
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const canSend = useMemo(() => value.trim().length > 0 && !disabled, [value, disabled])

  const handleSubmit = useCallback(() => {
    const text = value.trim()
    if (!text) return
    onSend(text)
    setValue("")
    // focus back
    setTimeout(() => textAreaRef.current?.focus(), 0)
  }, [onSend, value])

  return (
    <form
      className="sticky bottom-0 z-10 w-full border- border-border bg-background"
      onSubmit={(e) => {
        e.preventDefault()
        if (canSend) handleSubmit()
      }}
      aria-label="Chat composer"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-3">
        <div className="flex items-end gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <label htmlFor="chat-input" className="sr-only">
            Message input
          </label>
          <textarea
            id="chat-input"
            ref={textAreaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Message the assistant"
            rows={1}
            className="min-h-20 max-h-50 w-full  resize-none p-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                if (canSend) handleSubmit()
              }
            }}
            aria-disabled={disabled || undefined}
          />
          <button
            type="submit"
            disabled={!canSend}
            className={[
              "inline-flex h-9 shrink-0 items-center justify-center rounded-md px-3 text-sm font-medium",
              "border border-border",
              canSend ? "" : "opacity-50",
              canSend ? "bg-yellow-500" : "opacity-50",
            ].join(" ")}
            aria-label="Send message"
           
          >
            Send
          </button>
        </div>
        <div className="mt-5 "/>
      </div>
    </form>
  )
}

export default function ChatPage() {
  const [isReplying, setIsReplying] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      role: "assistant",
      content: "Hi! I’m your AI assistant. Ask me anything.",
      timestamp: Date.now() - 60_000,
    },
  ])

  const handleSend = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    setIsReplying(true)

    // Mock assistant reply to simulate Vercel-like UX
    setTimeout(() => {
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Thanks! I’ll think about that and respond with something helpful. This is a mocked reply for the demo.",
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, reply])
      setIsReplying(false)
    }, 500)
  }, [])

  return (
    <div className="flex min-h-screen  flex-col bg-background text-foreground font-sans">
      <VercelLikeHeader />

      <main className="flex  flex-1 flex-col">
        <ChatWindow messages={messages} />
      </main>

      <ChatComposer onSend={handleSend} disabled={isReplying} />
    </div>
  )
}
