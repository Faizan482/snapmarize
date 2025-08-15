"use server"

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction({summaryId}:{summaryId:string}) {
  try {
    //delete from db
    const user =await currentUser()
    const userId = user?.id;
    if(!userId){
      throw new Error("User not found");
    }
    const sql = await getDbConnection();
    const result = await sql` DELETE FROM pdf_summaries WHERE id=${summaryId} AND user_id = ${userId} RETURNING id;`
    //revalidatePath
    if(result.length > 0){
      revalidatePath("/dashboard")
      return {success:true, message: "Summary deleted successfully."};
    }
    return {success:false}
  } catch (error) {
    console.log("Error deleting summary:", error);
    return {success:false}
  }
}