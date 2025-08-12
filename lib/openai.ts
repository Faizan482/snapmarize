// "use server";
// import { SUMMARY_SYSTEM_PROMPT } from "./../utils/prompts";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_KEY, 
// });
// console.log("API KEY exists?", !!process.env.OPEN_AI_KEY);
// export async function generateSummaryFromOpenAI(pdfText: string) {
//   if (!pdfText?.trim()) {
//     throw new Error("No PDF text provided");
//   }

//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo", 
//       messages: [
//         { role: "system", content: SUMMARY_SYSTEM_PROMPT },
//         {
//           role: "user",
//           content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 1500,
//     });

//     const result = completion.choices[0]?.message?.content;

//     if (!result) {
//       throw new Error("No summary generated");
//     }

//     return result;
//   } catch (error: any) {
//     console.error("Error generating summary:", error);
//     if (error?.status === 429) {
//       throw new Error("Rate_Limit_Exceeded");
//     }
//     throw error;
//   }
// }
"use server";

import { SUMMARY_SYSTEM_PROMPT } from "./../utils/prompts";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function generateSummaryFromOpenAI(pdfText: string) {
  if (!pdfText?.trim()) {
    throw new Error("No PDF text provided");
  }

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini", // ya jo tum use karna chaho
      input: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        { role: "user", content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}` }
      ],
    });

    const result = response.output_text;

    if (!result) {
      throw new Error("No summary generated");
    }

    return result;
  } catch (error: any) {
    console.error("Error generating summary:", error);
    if (error?.status === 429) {
      throw new Error("Rate_Limit_Exceeded");
    }
    throw error;
  }
}


