"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import axios from "axios";

type FormValues = {
  link1: string;
  link2: string;
};

export function RightPanel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: { link1: "", link2: "" },
  });

  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pushLog = (msg: string) => {
    setLogs((prev) => [...prev, msg]);
  };

  const onSubmit = async (data: FormValues) => {
    setLogs([]);
    setLoading(true);
    pushLog(" Getting Data from links ....");
    try {
      const res = await axios.post("/api/vectors", { links: data.link1, })
      
      pushLog(res.data.message)
      await new Promise((r) => setTimeout(r, 1500));
      pushLog("Organizing data .... ");


      await new Promise((r) => setTimeout(r, 1500)); // fake delay for demo

      pushLog("  Now you can chat with it  .. ");
      reset();
    } catch (error) {
      pushLog(" Error saving links.");
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="dark:bg-yellow-500 dark:text-black"
        >
          Add Link
        </Button>
      </SheetTrigger>

      <SheetContent className="font-sans">
        <SheetHeader>
          <SheetTitle>Add Links</SheetTitle>
          <SheetDescription>
            Add links to crawl/scrap data from website. Later you can chat with
            it.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid flex-1 auto-rows-min gap-6 px-4"
        >
          {/* Link 1 */}
          <div className="grid gap-2">
            <Label htmlFor="link1">Link: 1</Label>
            <Input
              id="link1"
              placeholder="Enter link..."
              {...register("link1", { required: "Link 1 is required" })}
            />
            {errors.link1 && (
              <p className="text-sm text-red-500">{errors.link1.message}</p>
            )}
          </div>

          {/* Link 2 */}
          <div className="grid gap-2">
            <Label htmlFor="link2">Link: 2</Label>
            <Input
              id="link2"
              placeholder="Enter link..."
              {...register("link2", { required: "Link 2 is required" })}
            />
            {errors.link2 && (
              <p className="text-sm text-red-500">{errors.link2.message}</p>
            )}
          </div>

          {/* Logs Section */}
          {/* Logs Section */}
          <div className="rounded-md p-3 text-sm min-h-[60px] space-y-3">
            {logs.length > 0 ? (
              logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`text-neutral-300 dark:text-neutral-600 ${
                    loading ? "animate-pulse" : ""
                  }`}
                >
                  {log}
                </div>
              ))
            ) : (
              <p className="text-neutral-300 dark:text-neutral-600">
                
              </p>
            )}
          </div>

          <SheetFooter>
            <Button
              type="submit"
              disabled={loading}
              className="dark:bg-yellow-500 dark:text-black flex items-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Saving..." : "Save links"}
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
