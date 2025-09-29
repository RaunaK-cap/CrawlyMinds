"use client"

import { useState, useRef, type FormEvent, useEffect } from "react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", role: "assistant", content: "Hi! How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const listRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  function handleSend(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    }
    setMessages((m) => [...m, userMsg])
    setInput("")

    // Simulated assistant reply to keep the demo simple
    setTimeout(() => {
      const reply: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `You said: "${text}"`,
      }
      setMessages((m) => [...m, reply])
    }, 300)
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-lg border bg-card text-foreground">
      <div className="p-4 border-b">
        <h2 className="text-base font-semibold text-pretty">Chatbot</h2>
        <p className="text-sm text-muted-foreground">A minimal chat UI component</p>
      </div>

      <div ref={listRef} className="p-4 h-80 overflow-y-auto" aria-live="polite" aria-label="Chat messages">
        <ul className="flex flex-col gap-3">
          {messages.map((m) => (
            <li key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  m.role === "user"
                    ? "max-w-[80%] rounded-lg px-3 py-2 bg-primary text-primary-foreground"
                    : "max-w-[80%] rounded-lg px-3 py-2 bg-muted text-foreground"
                }
              >
                <span className="text-sm leading-relaxed">{m.content}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSend} className="p-3 border-t">
        <div className="flex items-center gap-2">
          <input
            aria-label="Type your message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
