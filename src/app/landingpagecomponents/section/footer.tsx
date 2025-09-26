import { BrainCircuitIcon, GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
    return (
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <div aria-hidden className="size-5 flex items-center gap-2 rounded "> <BrainCircuitIcon/> </div>
                <span className="text-sm font-semibold">CrawlyMinds</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                @Raunak... © 2025 CrawlyMinds. All rights reserved.
              </p>
            </div>
            <nav className="flex gap-4 text-sm">
              <Link

                className="opacity-80 transition-opacity hover:opacity-100 flex items-center gap-4"
                href="https://github.com/RaunaK-cap/CrawlyMinds"
                target="_blank"
                rel="noreferrer"
              >
                GitHub {<GithubIcon className="size-5" />}
              </Link>
              <Link 
              className="opacity-80 transition-opacity hover:opacity-100 flex items-center gap-4"
               href="https://x.com/caps_raunak"
               target="_blank"
               >
                Twitter X  {<TwitterIcon className="size-5 "/> }
              </Link>
             
            </nav>
          </div>
        </div>
      </footer>
    )
  }
  