import { ScrollReveal } from "../UI/scroll-reveal";

export function WhySection() {
  return (
    <section id="why" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">
              Why CrawlyMinds?
            </h2>
          </ScrollReveal>
          <br/>
          <ScrollReveal>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              Tired of scrolling through endless web pages just to find one
              clear answer? CrawlyMinds solves that by turning any website into
              a smart, searchable knowledge base powered by AI. It crawls
              through the site, understands the content, and lets you chat
              naturally to get instant, accurate answers — all grounded in the
              site's real data. <br/> <br/>  It&apos;s built to make research, learning, and
              content exploration faster and smarter. Whether you're analyzing
              documentation, doing product research, or studying online
              material, CrawlyMinds helps you extract insights instantly —
              powered by LangChain, OpenAI, and a full RAG (Retrieval-Augmented
              Generation) system.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
