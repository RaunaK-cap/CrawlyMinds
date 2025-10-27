"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BrainCircuit,
  GlobeIcon,
  SendHorizonalIcon,
} from "lucide-react";
import Link from "next/link";
import { Theme_Toggler } from "@/components/toggler_theme";
import { RightPanel } from "./rightpanel";
import axios from "axios";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
  const [searchType, setsearchType] = useState("vector");

  // 🔥 Credits state (start with 3)
  const [credits, setCredits] = useState<number | null>(3); // 3 max

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  // 🔥 Disable send when no credits or already replying
  const canSend = useMemo(
    () => input.trim().length > 0 && !isReplying && (credits ?? 1) > 0,
    [input, isReplying, credits]
  );

  type SearchType = "vector" | "ai-agents" | "global";

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
  
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
      let res;
  
      // 🔥 Switch backend depending on searchType
      if (searchType === "ai-agents") {
        res = await axios.post("/api/chat", { query: text });
      } else if (searchType === "vector") {
        res = await axios.post("/api/usersVectors", { message: text });
      } 

      // 🔥 Update credits from backend response
      if (res?.data?.remaining !== undefined) {
        setCredits(res.data.remaining);
      }
  
      const replyMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: res?.data?.responses || "Sorry, I couldn't get a response.",
        timestamp: Date.now(),
      };
  
      setMessages((prev) => [...prev, replyMsg]);
    } catch (err) {
      // 🔥 If rate-limit error (credits exhausted)
      if (err instanceof Error && 'response' in err) {
        const axiosError = err as { response?: { status?: number; data?: { responses?: string } } };
        if (axiosError.response?.status === 429) {
          setCredits(0); // set credits to 0
          toast("No credits left. Please try again later.");
        } else {
          toast(axiosError.response?.data?.responses || "Unexpected error");
        }
      } else {
        toast("Unexpected error");
      }
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
  }, [input, searchType]);
  

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      
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
                        isUser ? "ml-auto bg-background" : "mr-auto bg-muted ",
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


      <form
        className="sticky bottom-0 z-10 w-full border-border bg-background"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSend) handleSend();
        }}
        aria-label="Chat composer"
      >
        <div className="mx-auto w-full max-w-3xl px-4 py-3 sm:mb-5 mb-4  ">
          <div className="flex flex-col items-end gap-2 rounded-lg border bg-background px-3 py-2">
            <label htmlFor="chat-input" className="sr-only">
              Message input
            </label>
            <textarea
              id="chat-input"
              ref={textAreaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anythings about websites ..."
              rows={1}
              className="min-h-10 max-h-50 w-full mb-4 resize-none p-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (canSend) handleSend();
                }
              }}
              aria-disabled={isReplying || undefined}
            />

            
            <div className="flex items-center justify-end gap-2">

            <div className="text-xs px-3 bg-red-500 py-1 rounded text-white">
              Credits left: {credits !== null ? credits : "-"}
            </div>

              
              <Select defaultValue="vector"
                onValueChange={(value) => setsearchType(value as SearchType)}
              >
                <SelectTrigger className="  bg-neutral-100  border-none  size-28 text-xs">
                  <SelectValue placeholder="Search" />
                  <GlobeIcon className="size-4 " />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vector">Vector Search</SelectItem>
                  <SelectItem value="ai-agents">AI Agent</SelectItem>
                </SelectContent>
              </Select>

              <Button
              type="submit"
              disabled={!canSend} // 🔥 disables button if no credits or loading
              variant={"outline"}
              className={[
                "flex items-center justify-center   ",
                canSend ? "" : "opacity-50",
              ].join(" ")}
              aria-label="Send message"
            >
              {<SendHorizonalIcon className="size-4 flex items-center" />}
            </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
