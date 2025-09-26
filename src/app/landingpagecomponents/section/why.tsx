import { ScrollReveal } from "../UI/scroll-reveal"

export function WhySection() {
  return (
    <section id="why" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">Why CrawlyMinds?</h2>
          </ScrollReveal>
          <ScrollReveal >
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              Stop reading countless pages to find answers. CrawlyMinds converts your site into structured, queryable
              knowledge—so you can ask natural questions and get accurate, grounded answers instantly. Speed up
              research, support, and product discovery with a trustworthy AI layer over your own content.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
