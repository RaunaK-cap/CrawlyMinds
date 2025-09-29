"use client"

import { useState, useMemo, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "../components/sidebar"

import Chatbot from "../components/chatmsg"
import ChatPage from "../components/vercelchatmessage"


export default function Page() {
  // Demo state: messages + links




  return (
    <div className="max-h-screen">
    

      <main className="relative flex  mx-auto flex-col bg-background">
        <ChatPage/>
      </main>

    </div>
  )
}
