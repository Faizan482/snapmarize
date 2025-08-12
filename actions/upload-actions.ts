"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

type UploadResponse = Array<{
  serverData: {
    userId: string;
    file: {
      url: string;
      name: string;
    };
  };
}>;

export async function generatePdfSummary(uploadResponse: UploadResponse) {
  if (!uploadResponse || uploadResponse.length === 0) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      file: { url: pdfUrl },
    },
  } = uploadResponse[0];

  if (!pdfUrl?.trim()) {
    return {
      success: false,
      message: "File URL is missing",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log("Extracted PDF text:", pdfText);
    let summary;
    try {
     summary = await generateSummaryFromOpenAI(pdfText); //here is the genrate summary from the openai fun call
      console.log("Generated summary:", summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      //call gemini
      
    }
    if(!summary) {
      return {
        success: false,
        message: "Error generating summary",
        data: null,
      };
    }

    return {
      success: true,
      message: "PDF extracted successfully",
      data: {
        summary,
      }
    };
  } catch (error) {
    return {
      success: false,
      message: "Error extracting PDF text",
      data: null,
    };
  }
}
