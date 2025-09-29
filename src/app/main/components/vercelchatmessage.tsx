"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Theme_Toggler } from "@/components/toggler_theme";
import { RightPanel } from "./rightpanel";
import axios from "axios";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
};

export default function ChatApp() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      role: "assistant",
      content: "Hi! I’m your AI assistant. Ask me anything.",
      timestamp: Date.now() - 60_000,
    },
  ]);
  const [isReplying, setIsReplying] = useState(false);
  const [input, setInput] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isReplying,
    [input, isReplying]
  );

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text) return;

    // Add the user's message to the chat
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsReplying(true);

    try {
      // Send the message to your backend
      const res = await axios.post("/api/usersVectors", { message: text });
      //CHECK POINT ----------------------
      // Assume your backend returns something like { reply: "..." }
      const replyMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: res.data.responses || "Sorry, I couldn't get a response.",
        timestamp: Date.now(),
      };

      // Add the assistant's reply to the chat
      setMessages((prev) => [...prev, replyMsg]);
    } catch (err) {
      console.error("Error fetching assistant reply:", err);

      // Show error message in chat
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Oops! Something went wrong. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsReplying(false);
      setTimeout(() => textAreaRef.current?.focus(), 0);
    }
  }, [input]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3">
          <Link href={"/"}>
            <h1 className="text-pretty text-sm font-bold flex items-center gap-2">
              <BrainCircuit /> CrawlyMinds
            </h1>
          </Link>
          <div className="ml-auto text-xs flex items-center gap-2">
            <Theme_Toggler />
            <RightPanel />
          </div>
        </div>
      </header>

      {/* Chat window */}
      <main className="flex flex-1 flex-col">
        <section
          className="flex min-h-50 flex-1 overflow-x-hidden"
          aria-label="Chat messages"
          role="region"
        >
          <div
            ref={scrollerRef}
            className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-y-auto px-4"
          >
            <ul className="flex flex-1 flex-col gap-4 pb-6 pt-6" role="list">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <li
                    key={msg.id}
                    className="flex w-full"
                    aria-label={isUser ? "User message" : "Assistant message"}
                  >
                    <div
                      className={[
                        "flex max-w-[80%] flex-col gap-1 rounded-lg border px-3 py-2 text-sm",
                        isUser
                          ? "ml-auto bg-background"
                          : "mr-auto bg-muted ",
                      ].join(" ")}
                      style={
                        isUser
                          ? {
                              boxShadow: "0 0 0 1px var(--border)",
                              borderColor: "var(--border)",
                            }
                          : undefined
                      }
                    >
                      <div className="whitespace-pre-wrap leading-relaxed text-foreground">
                        {msg.content}
                      </div>
                    </div>
                  </li>
                );
              })}

              {isReplying && (
                <li className="flex w-full" aria-label="Assistant is typing">
                  <div className="flex max-w-[80%] flex-col gap-1 rounded-lg border px-3 py-2 text-sm mr-auto bg-muted animate-pulse">
                    <div className="whitespace-pre-wrap leading-relaxed text-foreground">
                      Assistant is typing...
                    </div>
                  </div>
                </li>
              )}
            </ul>

            <div ref={endRef} />
          </div>
        </section>
      </main>

      {/* Composer */}
      <form
        className="sticky bottom-0 z-10 w-full border-border bg-background"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSend) handleSend();
        }}
        aria-label="Chat composer"
      >
        <div className="mx-auto w-full max-w-3xl px-4 py-3">
          <div className="flex items-end gap-2 rounded-lg border bg-background px-3 py-2">
            <label htmlFor="chat-input" className="sr-only">
              Message input
            </label>
            <textarea
              id="chat-input"
              ref={textAreaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message the assistant"
              rows={1}
              className="min-h-10 max-h-50 w-full resize-none p-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (canSend) handleSend();
                }
              }}
              aria-disabled={isReplying || undefined}
            />
            <button
              type="submit"
              disabled={!canSend}
              className={[
                "inline-flex h-9 shrink-0 items-center justify-center rounded-md px-3 text-sm font-medium border border-border",
                canSend ? "bg-yellow-500" : "opacity-50",
              ].join(" ")}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
