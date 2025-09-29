"use client"

import type React from "react"

import { MessageSquare, LinkIcon, Settings } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  return (
    <nav
      className="flex h-dvh flex-col items-center gap-4 border-r border-border bg-[var(--color-sidebar)] px-2 py-4 md:px-3"
      aria-label="Primary"
    >
      {/* Logo */}
      <Link
        href="/"
        className="my-1 flex h-10 w-10 items-center justify-center rounded-lg"
        aria-label="CrawlyMinds Home"
        style={{
          backgroundColor: "var(--color-chart-3)",
          color: "var(--color-background)",
        }}
      >
        {/* Simple CM monogram */}
        <span className="text-sm font-semibold tracking-tight">CM</span>
      </Link>

      <div className="mt-2 flex flex-1 flex-col items-center gap-2">
        <IconButton label="Chat" href="#" Icon={MessageSquare} />
        <IconButton label="My Links" href="#links" Icon={LinkIcon} />
        <IconButton label="Settings" href="#settings" Icon={Settings} />
      </div>

      <div className="text-xs text-muted-foreground">v0</div>
    </nav>
  )
}

function IconButton({
  label,
  href,
  Icon,
}: {
  label: string
  href: string
  Icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-[var(--color-sidebar-accent)]"
      aria-label={label}
      title={label}
    >
      <Icon className="h-5 w-5 text-[var(--color-sidebar-foreground)] opacity-90 group-hover:opacity-100" />
    </Link>
  )
}
