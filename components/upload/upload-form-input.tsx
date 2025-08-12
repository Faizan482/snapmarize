'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  fileInputRef?: React.RefObject<HTMLInputElement>;
  disabled?: boolean; // 🔹 new prop
  buttonLabel?: string; // 🔹 new prop
}

export default function UploadFormInput({
  onSubmit,
  fileInputRef,
  disabled = false,
  buttonLabel = "Upload Your PDF"
}: UploadFormInputProps) {
  return (
    <form
      className="flex flex-col items-center gap-6"
      onSubmit={onSubmit}
    >
      <div className="flex justify-end items-center gap-4 w-full">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className="text-cyan-700"
          ref={fileInputRef}
          disabled={disabled} // 🔹 disable file input while loading
        />
        <Button
          className="bg-rose-600 hover:bg-rose-400 text-white px-8"
          disabled={disabled} // 🔹 disable button while loading
        >
          {buttonLabel} {/* 🔹 dynamic button text */}
        </Button>
      </div>
    </form>
  );
}
