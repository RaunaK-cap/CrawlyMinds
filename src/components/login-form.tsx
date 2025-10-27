"use client"
import { GalleryVerticalEnd, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useTransition } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [ isgithub , startisgithub] = useTransition()
  const [ isgoogle , startisgoogle] = useTransition()

  async function signwithgithub(){
     startisgithub(async()=>{
      await authClient.signIn.social({
        provider:"github",
        callbackURL:"/main/dashboard",
        fetchOptions:{
          onSuccess: ()=>{
            toast("successfully login")
          },
          onError:()=>{
            toast("login failed")
          }
        }
      })
     })
  }

  async function signwithgoogle(){
    startisgoogle(async()=>{
     await authClient.signIn.social({
       provider:"google",
       callbackURL:"/main/dashboard",
       fetchOptions:{
         onSuccess: ()=>{
           toast("successfully login")
         },
         onError:()=>{
           toast("login failed")
         }
       }
     })
    })
 }

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6 font-sans text-xs">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Crawly_Minds</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={ isgithub || isgoogle}>
              Login
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
          <Button variant="outline" type="button" className="w-full" onClick={signwithgithub} disabled={isgithub || isgoogle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  className="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              { isgithub ? <Loader2 className="animate-spin"/> :"Continue with Github"}
            </Button>
            <Button variant="outline" type="button" className="w-full" onClick={signwithgoogle} disabled={isgithub || isgoogle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              { isgoogle ? <Loader2 className="animate-spin"/> : "Continue with Google"}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        <p className="mb-2"> By </p>
         Better-Auth + Resend  
      </div>
    </div>
  )
}
