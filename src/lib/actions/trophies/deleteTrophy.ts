'use server'

import { revalidatePath } from "next/cache";
import del from "../fetchMethods/del";

export const deleteTrophy = async (trophyId: string) => {
    const delRes = await del('/trophies?trophyId=' + trophyId);
    if (!delRes.ok)
        throw new Error("Failed to delete the trophy");
    else revalidatePath('/hobbies/[hobbyId]', 'page')
}