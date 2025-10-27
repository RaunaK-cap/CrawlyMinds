import { Brain, BrainCog, CloudAlertIcon, Database, DatabaseZap, InspectIcon, Scale3d, ShieldCheck, SplitIcon } from "lucide-react"
import { ScrollReveal } from "../UI/scroll-reveal"

const features = [
  {
    k: "crawl",
    title: "Website Crawling",
    desc: "Firecrawl / Open AI - compatible with fallback summarization.",
    note: "Experimental support",
    i:<InspectIcon/>
  },
  { k: "qa", title: "AI-powered Q&A", desc: "Accurate, grounded responses using top LLMs.", note: "OpenAI compatible" ,i: <BrainCog/> },
  { k: "vectors", title: "Vector Database", desc: "Convex for indexing + retrieval.", note: "Real-time search" , i: <Database/> },
  { k: "prisma", title: "Prisma ORM ", desc: "ORM for SQL/NO-SQL DB", note: "ORM" , i: <DatabaseZap/>},
  { k: "auth", title: "Secure Authentication", desc: "Better Auth with OTP via Resend.", note: "Login + OTP" , i: <ShieldCheck/>},
  { k: "emb", title: " Vectors Embeddings", desc: "Fast embedding workflows for content.", note: "Batch-friendly" ,i:<SplitIcon/> },
  { k: "rl", title: "Rate Limiting", desc: "Custom logic to protect resources.", note: "Abuse prevention" , i:<CloudAlertIcon/> },
  { k: "vapi", title: "Vapi", desc: "AI voice Agents", note: "voice agent " , i:<Scale3d/>},
  { k: "Inkeep", title: "Inkeep", desc: "AI agents ", note: "Agents" , i: <Brain/> },
]

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <ScrollReveal className="mb-8">
          <h2 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">Features</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Everything you need to turn websites into answerable knowledge.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <ScrollReveal key={f.k} >
              <article className="h-full rounded-xl border border-border p-5 transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 h-6 w-6 rounded-md text-red-400" > {f.i} </div>
                <h3 className="text-sm font-medium">{f.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
                <div className="mt-3 inline-flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="rounded border border-border px-2 py-0.5">{f.note}</span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
