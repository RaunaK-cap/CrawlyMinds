"use client"
import { Toaster } from "@/components/ui/sonner"
import ChatPage from "../components/vercelchatmessage"


export default function Page() {

  return (
    <div className="max-h-screen">
      <main className="relative flex  mx-auto flex-col bg-background">
        <ChatPage/>
        <Toaster position="top-center" closeButton />
      </main>
    </div>
  )
}
