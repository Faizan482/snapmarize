import { Sparkle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
export default function UploadHeader() {
  return (
  <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
            <Badge variant={"secondary"} className="relative px-6 py-2 text-base font-medium bg-white text-rose-400 rounded-full group-hover:bg-rose-300 group-hover:text-white transition-colors">
              <Sparkle className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
              <span className="text-base">AI-Powered Content Creation</span>
            </Badge>
          </div>
          <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
            Start Uploading
            <span className="relative inline-block  ml-1"> <span className="relative z-10 px-2"> Your PDFs </span> <span className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1 " aria-hidden="true"></span></span>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
              Upload your PDFs and let our AI do the magic! 
            </p>
          </div>
        </div>
  );
}