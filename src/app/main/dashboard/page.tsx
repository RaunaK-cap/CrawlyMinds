"use client"
import { Toaster } from "@/components/ui/sonner"
import ChatPage from "../components/vercelchatmessage"
import { authClient } from "@/lib/auth-client" 
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const router = useRouter()
  const { 
    data: session, 
    isPending
} = authClient.useSession()

useEffect(() => {
  if (!isPending && !session) {
    router.push("/")
  }
}, [session, isPending, router])


if (isPending) {
  return <div className="flex items-center justify-center min-h-screen text-5xl tracking-wider ">...</div>
}

if (!session) {
  return null 
}


  return (
    <div className="max-h-screen">
      <main className="relative flex  mx-auto flex-col bg-background">
        <ChatPage/>
        <Toaster position="top-center" closeButton />
      </main>
    </div>
  )
}
