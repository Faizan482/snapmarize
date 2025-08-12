'use client';
import z from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { generatePdfSummary } from "@/actions/upload-actions";

const schema = z.object({
  file: z.instanceof(File).refine(file => file.type === "application/pdf", {
    message: "Only PDF files are allowed",
  }).refine(file => file.size <= 10 * 1024 * 1024, {
    message: "File size must be less than 10MB",
  }).refine(file => file.name.endsWith(".pdf"), {
    message: "File must have a .pdf extension",
  }),
});

export default function UploadForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false); // 🔹 Track upload/processing state

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      console.log("File uploaded successfully:", res);
      setLoading(false); // stop loader
    },
    onUploadError: (error) => {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
      setLoading(false); // stop loader
    },
    onUploadBegin: ({ file }) => {
      console.log("Upload started for file:", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return; // prevent re-submit if already processing

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // validate file
    const validatedFields = schema.safeParse({ file });
    if (!validatedFields.success) {
      toast.error(validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file");
      return;
    }

    setLoading(true); // start loader
    const toastId = toast.loading("PDF is being uploaded...");

    const resp = await startUpload([file]);
    if (!resp || resp.length === 0) {
      toast.error("Something went wrong", { id: toastId });
      setLoading(false);
      return;
    }

    toast.loading("PDF is being Processed...", { id: toastId });

    const result = await generatePdfSummary(resp);
    console.log("PDF summary generated:", result);

    const {data=null,message=null} = result || {};
    if(data){
      toast.custom(message || "PDF Saving....", { id: toastId });


      // if(data.summary){
        // toast.custom(message || "PDF Saving....", { id: toastId });
        //saving the summary to the database
      // }
    }


    setLoading(false); // stop loader
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        onSubmit={handleSubmit}
        fileInputRef={fileInputRef}
        disabled={loading} // 🔹 disable input while loading
        buttonLabel={loading ? "Processing..." : "Upload PDF"} // 🔹 change button text
      />
    </div>
  );
}
