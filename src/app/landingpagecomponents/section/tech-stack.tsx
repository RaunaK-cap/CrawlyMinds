import Image from "next/image";
import { ScrollReveal } from "../UI/scroll-reveal";
import Link from "next/link";




const tech = [
  { name: "Next.js", img: "/nextjs.png", desc: " React framework ", link:"https://nextjs.org/",  w: 250, h: 200 },
  { name: "Better Auth", img: "/betterauth.png", desc: " Smooth Authentication ",  link:"http://better-auth.com/", w: 300, h: 200 },
  { name: "Resend", img: "/resend.png", desc: "Sending Email ", link:"https://resend.com/home", w: 250, h: 250 },
  { name: "Convex Db", img: "/convexdb.png", desc: "Everything your product deserves to build launch and scale ",  link:"https://www.convex.dev/", w: 300, h: 200 },
  { name: "Primsa", img: "/prisma.png", desc: " ORM for both SQL/NO-SQL database", link:"https://www.prisma.io/", w: 300, h: 200 },
  { name: "OpenAI API's", img: "/openai.png", desc: "Various models of API's ", link:"https://openai.com/api/", w: 250, h: 200 },
  { name: "Firecrawl / GPT4.1 API ", img: "/firecrawl.png", desc: "Crawl & Scrap websites ", link:"https://firecrawl.dev/", w: 250, h: 200 },
  { name: "Vapi", img: "/vapi.png", desc: " Voice AI Agents ",  link:"https://vapi.ai/", w: 300, h: 200 },
  { name: "Inkeep ", img: "/Inkeep.png", desc: " AI Agents", link:"https://inkeep.com/", w: 300, h: 200 },
];

export function TechStackSection() {
  return (
    <section id="stack" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <ScrollReveal className="mb-8 text-center">
          <h2 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">
            Tech stack
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Built with modern, reliable tools.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <ul className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-3">
            {tech.map((t) => (
              <li key={t.name} className="flex items-center justify-center">
                {/* <Image
                  src={"/"}
                  alt={`${t.name}`}
                  width={t.w}
                  height={t.h}
                  className="opacity-70 transition hover:opacity-100"
                /> */}

                <article className="h-full rounded-xl border border-border p-5 transition hover:-translate-y-1 hover:shadow-md">
                  <h3 className="text-sm font-medium">{t.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className=" hover:opacity-90">
                      <Link
                      href={`${t.link}`}
                      target="_blank"
                      >
                      
                          <Image
                            src={`${t.img}`}
                            alt={`${t.name}`}
                            width={`${t.w}`}
                            height={`${t.h}`}
                            className=" rounded-xl hover:opacity-30 hover:cursor-pointer"
                            
                            />
                            
                        </Link>
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
