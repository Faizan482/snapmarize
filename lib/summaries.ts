"use server"

import { getDbConnection } from "./db"

export async function getSummaries(userId:string) {
  const sql = await getDbConnection();
  const summaries = await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId} ORDER BY created_at DESC;`;
  return summaries;
}

export async function getSummaryByID(id:string) {
  try {
    const sql =await getDbConnection();
    const [summary] = await sql`SELECT id,user_id,original_file_url,file_name,title,summary_text,status,created_at,updated_at,LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) +1 AS word_count FROM pdf_summaries WHERE id = ${id}`;
    return summary;
  } catch (error) {
    console.error("Error fetching summary by ID:", error);
    return null;
  }
}