'use server'

import WithId from "../../models/WithId";
import get from "../fetchMethods/get";
import { checkLocalAndResponseSIDsEqual } from "../session";
import { deleteSession } from "../../services/Cookie";
import ITrophy from "@/lib/models/ITrophy";

export default async function getTrophies(hobbyId: string) {
    try {
        return await sendRequest(hobbyId);

    } catch (error) {
        throw new Error("Failed to get trophies: " + error);
    }
}

async function sendRequest(hobbyId: string): Promise<WithId<ITrophy>[]> {
    const trophiesRes = await get('/trophies?hobbyId=' + hobbyId);

    if (trophiesRes.ok) {
        return trophiesRes.json();

    } else {
        const areSIDsEqual = await checkLocalAndResponseSIDsEqual(trophiesRes);
        if (!areSIDsEqual) {
            await deleteSession();
            console.log("Deleted session, session invalid.");
        }
        throw Error("Failed to get trophies.");
    }
}