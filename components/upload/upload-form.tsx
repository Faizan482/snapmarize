'use client';
import z from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { useRef } from "react";


const schema = z.object({
  file: z.instanceof(File).refine(file => file.type === "application/pdf", {
    message: "Only PDF files are allowed",
  }).refine(file => file.size <= 20 * 1024 * 1024, {
    message: "File size must be less than 10MB",
  }).refine(file => file.name.endsWith(".pdf"), {
    message: "File must have a .pdf extension", 
  }),

})




export default function UploadForm() {
 const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {startUpload,routeConfig} = useUploadThing("pdfUploader",{
    
    onClientUploadComplete: (res) => {
      console.log("File uploaded successfully:", res);
      // You can redirect or show a success message here
    },
    onUploadError: (error) => {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
      // Handle the error appropriately
    },
    onUploadBegin:({file}) => {
      console.log("Upload started for file:", file);
    } 

  });



  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("File submitted");

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    // validating the fields and file type 
    const validatedFields = schema.safeParse({ file });

    console.log(validatedFields ,"validated fields");

    if (!validatedFields.success) {
      toast.error(validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file");
      return;
    }

  const toastId = toast.loading("PDF is being uploaded...");


    // schema with zod 
    // upload the file to uploadthing 


    try {
    const resp = await startUpload([file]);

    if (!resp) {
      toast.error("Something went wrong", { id: toastId });
      return;
    }

    toast.success("File uploaded successfully!", { id: toastId });
    // Reset input here too as a backup
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
  } catch (error) {
    toast.error("Upload failed. Please try again.", { id: toastId });
  }
    // parse the pdf useing langchain 
    // summarize the pdf using AirVentsave the summary to the database 
    // redirect to the [id] summary page 
  }
  return (

    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} fileInputRef={fileInputRef} />
    </div>

  );
} 