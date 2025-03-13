'use server'

import del from "../fetchMethods/del";

export const deleteHobby = async (hobbyId: string) => {
    const delRes = await del('/hobbies?hobbyId=' + hobbyId);
    if (!delRes.ok)
        throw new Error("Failed to delete the hobby");
}