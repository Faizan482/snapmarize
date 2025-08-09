'use client';
import z from "zod";
import UploadFormInput from "./upload-form-input";


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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("File submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    // validating the fields and file type 
    const validatedFields = schema.safeParse({ file });
    console.log(validatedFields)
    if (!validatedFields.success) {
      console.error(validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file");
      return;
    }

    // schema with zod 
    // upload the file to uploadthing 
    // parse the pdf useing langchain 
    // summarize the pdf using AirVentsave the summary to the database 
    // redirect to the [id] summary page 
  }
  return (

    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>

  );
} 