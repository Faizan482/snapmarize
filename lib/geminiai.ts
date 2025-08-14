"use server";

import { SUMMARY_SYSTEM_PROMPT } from "./../utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateSummaryFromGemini(pdfText: string) {
  if (!pdfText?.trim()) {
    throw new Error("No PDF text provided");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
    });

    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            {
              text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
            },
          ],
        },
      ],
    };

    const result = await model.generateContent(prompt);

    const response = result.response;
    const generatedText = response.text();

    if (!generatedText) {
      throw new Error("No summary generated");
    }

    return generatedText;
  } catch (error: any) {
    console.error("Gemini API error:", error);
    throw error;
  }
}
