'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  fileInputRef?: React.RefObject<HTMLInputElement>;
}

export default function UploadFormInput({ onSubmit ,fileInputRef}: UploadFormInputProps) {
  return (
    <form className="flex flex-col items-center gap-6" onSubmit={onSubmit} >
      <div className="flex justify-end items-center gap-4 w-full">
        <Input type="file" id="file" name="file" accept="application/pdf" required className="text-cyan-700" ref={fileInputRef}/>
        <Button className="bg-rose-600 hover:bg-rose-400 text-white px-8 " >Upload Your PDF</Button>
      </div>
    </form>
  );
}