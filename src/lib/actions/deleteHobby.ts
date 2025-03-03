'use server'

import { redirect } from "next/navigation";
import DbClient from "../services/API";

export const deleteHobby = async (hobbyId: string) => {
    try {
        await new DbClient().deleteHobby(hobbyId);

    } catch (error) {
        console.error("Failed to delete the hobby: ", error);
        //return;
    }
    redirect('./');
}
