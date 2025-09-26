import { ScrollReveal } from "../UI/scroll-reveal"

const steps = [
  {
    title: "Enter your website link",
    desc: "Point CrawlyMinds to your site or a specific page.",
  },
  {
    title: "Extract + summarize to vectors",
    desc: "We crawl, clean, summarize, and embed your content.",
  },
  {
    title: "Query with natural language",
    desc: "Ask questions and get instant, AI-powered answers.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <ScrollReveal className="mb-8">
          <h2 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">How it works</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Go from raw pages to reliable answers in three simple steps.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <ScrollReveal key={i} >
              <div className="h-full rounded-xl border border-border p-5 transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-2 inline-flex size-7 items-center justify-center rounded-md bg-secondary text-xs text-red-400 font-medium">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-sm font-medium">{s.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        
      </div>
    </section>
  )
}
