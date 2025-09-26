"use client"

import { StaggeredWords } from "../UI/straggered"
import { TypingText } from "../UI/typing-test"
import { ScrollReveal } from "../UI/scroll-reveal"
import Link from "next/link"
import {  Inspect, MessageSquare,  Network, SunDim } from "lucide-react"

const SomeImportant_Features = [
    { k: "crawler", t: "Fast crawling", d: "Fetch, parse, and normalize pages efficiently." , i: <Inspect/>  },
    { k: "vectors", t: "Smart vectors", d: "Summaries and embeddings for powerful retrieval." ,i: <Network/>},
    { k: "answers", t: "Accurate answers", d: "Ask natural questions, get reliable results." , i: <MessageSquare/> },
  ]

export function HeroSection() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block rounded-full border border-border px-5 py-1 text-xs/6 uppercase tracking-wide text-muted-foreground">
            Websites &rarr; Minds
          </span>
          <StaggeredWords
            text=" CrawlyMinds  —AI-Powered— Website Knowledge Extraction & Q & A"
            className="mt-2 text-3xl font-semibold tracking-tight sm:space-x-1 sm:space-y-3 space-y-1 space-x-1 sm:text-4xl md:text-5xl"
          />
          <div className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-muted-foreground md:text-base">
            <TypingText
              aria-label="subheadline"
              text="Turn any website into structured knowledge you can query like ChatGPT."
              speed={25}
              className="leading-relaxed"
            />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              id="get-started"
              href="/login"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center  gap-2"
            >
              Start to Crawl-Minds {<SunDim className="size-4 text-yellow-500 dark:text-black " />}
            </Link>
            
          </div>
        </ScrollReveal>

        <ScrollReveal  className="mx-auto mt-12 max-w-5xl">
          <div className={"grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 "}>
            {SomeImportant_Features.map((f, i) => (
              <div
                key={f.k}
                className="rounded-lg border border-border p-4 transition hover:-translate-y-1 hover:shadow-md"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="mb-4 h-10 w-10 flex items-center justify-center rounded-lg  text-red-400 dark:bg-primary-foreground bg-neutral-100 " > { f.i} </div>
                <div className="text-sm font-medium">{f.t}</div>
                <p className="mt-1 text-xs text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
