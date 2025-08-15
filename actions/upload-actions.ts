"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type UploadResponse = Array<{
  serverData: {
    userId: string;
    file: {
      url: string;
      name: string;
    };
  };
}>;

interface pdfSummaryType {
  userId: string;
  fileUrl: string;
  fileName: string;
  title: string;
  summary: string;
}

export async function generatePdfSummary(uploadResponse: UploadResponse) {
  if (!uploadResponse || uploadResponse.length === 0) {
    return { success: false, message: "File upload failed", data: null };
  }

  const {
    serverData: {
      file: { url: pdfUrl, name: fileName },
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
          console.error(
            "Gemini API failed after OpenAI rate limit exceeded:",
            geminiError
          );
          return {
            success: false,
            message: "Failed to generate summary from all AI providers",
            data: null,
          };
        }
      } else {
        // Some other error from OpenAI
        return {
          success: false,
          message: "Error generating summary",
          data: null,
        };
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Error generating summary",
        data: null,
      };
    }

    const formatedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "PDF extracted successfully",
      data: { title: formatedFileName, summary },
    };
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return { success: false, message: "Error extracting PDF text", data: null };
  }
}

async function savedPdfSummary({
  userId,
  fileUrl,
  fileName,
  title,
  summary,
}: {
  userId?: string;
  fileUrl: string;
  fileName: string;
  title: string;
  summary: string;
}) {
  // sql inserting pdf summary
  try {
    // SQL inserting PDF summary
    const sql = await getDbConnection();
   const [savedSummary] = await sql.query(
      `INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        file_name,
        title,
        summary_text
     ) VALUES ($1, $2, $3, $4, $5) RETURNING id,summary_text`,
      [userId, fileUrl, fileName, title, summary]
    );
    return savedSummary;
  } catch (error) {
    console.error("Error saving PDF summary:", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  fileName,
  title,
  summary,
}: pdfSummaryType) {
  //user is logged in and has a userid

  //savePDF summary()
  let savedSummary: any;

  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "User is not found", data: null };
    }

    // Save PDF summary
    savedSummary = await savedPdfSummary({
      userId,
      fileUrl,
      fileName,
      title,
      summary,
    });
    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary,please try again",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "saving PDF summary",
      data: null,
    };
  }

  //revalidate our cache
  revalidatePath(`/summaries/${savedSummary.id}`);

  return {
    success: true,
    message: "PDF summary saved successfully",
    data:{
      id: savedSummary.id,
    },
  };
}
