import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter  } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader:f({pdf: { maxFileSize: "32MB" }}).middleware(async (req) => { 
    // This middleware runs on every request to this route
    // You can use it to authenticate the user, log requests, etc.
    const user = await currentUser()
    if(!user) throw new Error("Unauthorized");
    console.log("Middleware running for file upload");
    return {
      userId: user.id, // You can pass any metadata you want to the upload handler}; 
    }
  }).onUploadComplete(async ({file, metadata}) => {
    // This function runs on every file upload completion
    // You can use it to save the file metadata to your database, send notifications, etc.
    console.log("File uploaded:", file);
    console.log("Metadata:", metadata.userId);
    return {userId:metadata.userId,file}
  }) 
}satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;