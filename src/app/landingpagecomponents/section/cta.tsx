import { ScrollReveal } from "../UI/scroll-reveal"
import { StaggeredWords } from "../UI/straggered"

export function CTASection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="rounded-2xl border border-border p-8 text-center md:p-12">
          <ScrollReveal>
            <StaggeredWords
              text="Start querying your websites with AI today."
              className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl"
            />
          </ScrollReveal>
          <ScrollReveal  className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#demo"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Try Demo
            </a>
            <a
              href="#signup"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Sign Up
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
