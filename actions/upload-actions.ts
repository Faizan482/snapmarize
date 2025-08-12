"use server";

import { generateSummaryFromGemini } from "@/lib/geminiai";
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
    return { success: false, message: "File upload failed", data: null };
  }

  const {
    serverData: {
      file: { url: pdfUrl },
    },
  } = uploadResponse[0];

  if (!pdfUrl?.trim()) {
    return { success: false, message: "File URL is missing", data: null };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log("Extracted PDF text:", pdfText);

    let summary;

    try {
      // First try OpenAI
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log("Generated summary from OpenAI:", summary);
    } catch (error) {
      console.error("Error generating summary from OpenAI:", error);

      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          // Fallback to Gemini
          summary = await generateSummaryFromGemini(pdfText);
          console.log("Generated summary from Gemini:", summary);
        } catch (geminiError) {
          console.error("Gemini API failed after OpenAI rate limit exceeded:", geminiError);
          return { success: false, message: "Failed to generate summary from all AI providers", data: null };
        }
      } else {
        // Some other error from OpenAI
        return { success: false, message: "Error generating summary", data: null };
      }
    }

    if (!summary) {
      return { success: false, message: "Error generating summary", data: null };
    }

    return {
      success: true,
      message: "PDF extracted successfully",
      data: { summary },
    };
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return { success: false, message: "Error extracting PDF text", data: null };
  }
}
