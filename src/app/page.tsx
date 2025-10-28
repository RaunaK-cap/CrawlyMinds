import { Theme_Toggler } from "@/components/toggler_theme";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeroSection } from "./landingpagecomponents/section/hero";
import { HowItWorksSection } from "./landingpagecomponents/section/how's-its-work";
import { FeaturesSection } from "./landingpagecomponents/section/features";
import { TechStackSection } from "./landingpagecomponents/section/tech-stack";
import { WhySection } from "./landingpagecomponents/section/why";
import { CTASection } from "./landingpagecomponents/section/cta";
import { SiteFooter } from "./landingpagecomponents/section/footer";
import { BrainCircuit } from "lucide-react";


<Link href={"/login"}>
  <Button> Start to CrawlyMinds </Button>
</Link>;
export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div  className="size-6 rounded-md "> <BrainCircuit/> </div>
            <span className="text-sm font-semibold tracking-tight">
              CrawlyMinds
            </span>
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a
              href="#how"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              How it works
            </a>
            <a
              href="#features"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              Features
            </a>
            <a
              href="#stack"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              Tech
            </a>
            <a
              href="#why"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              Why
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Theme_Toggler />
            
            <Link
              href="/login"
              className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <HeroSection />

      <HowItWorksSection />

      <FeaturesSection />

      <TechStackSection />

      <WhySection />

    

      <SiteFooter />
    </div>
  );
}
