'use server'

import { revalidatePath } from "next/cache";
import del from "../fetchMethods/del";

export const removePost = async (postId: string) => {
    const delRes = await del('/posts?postId=' + postId);
    if (!delRes.ok)
        throw new Error("Failed to delete the post");
    else
        revalidatePath('/hobbies/[hobbyId]', 'page');
}