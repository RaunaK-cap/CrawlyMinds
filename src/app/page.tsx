
import { Theme_Toggler } from "@/components/toggler_theme";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
     <div>
      <h1> Welcome to Crawl Minds ..</h1>

     </div>
     
    
     
    <Link href={"/login"}>
     <Button> Start to Crawlminds </Button>
    </Link>

     <div>
      <Theme_Toggler/>
     </div>
    </div>
  );
}
