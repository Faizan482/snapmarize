import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg-pt-12">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="space-y-2 ">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Save Hours of Reading Time?</h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 ">
            Transform Lengthy documents into clear, actionable insights with our AI-powered summarization tool
          </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-2">
          <div>
            <Button variant={'link'} size={"lg"} className="w-full min-[400px]:w-auto bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-800 hover:text-white text-white transition-all duration-300 ">
            <Link href='/#pricing' className="flex item-center justify-center px-6 py-4">
              Get Started {" "}
              <ArrowRightIcon className="ml-2 h-4 w-4 animate-pulse "/>
            </Link>
          </Button>
          </div>
        </div>
      </div>
    </section>
  );
}