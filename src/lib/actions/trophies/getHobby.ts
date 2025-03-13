'use server'

import IHobby from "../../models/IHobby";
import WithId from "../../models/WithId";
import get from "../fetchMethods/get";
import { checkLocalAndResponseSIDsEqual } from "../session";
import { deleteSession } from "../../services/Cookie";

export default async function getHobby(hobbyId: string) {
    try {
        return await sendRequest(hobbyId);

    } catch (error) {
        throw new Error("Failed to get hobbies: " + error);
    }
}

async function sendRequest(hobbyId: string): Promise<WithId<IHobby>> {
    const hobbyRes = await get('/hobbies/' + hobbyId);

    if (hobbyRes.ok) {
        return hobbyRes.json();

    } else {
        const areSIDsEqual = await checkLocalAndResponseSIDsEqual(hobbyRes);
        if (!areSIDsEqual) {
            await deleteSession();
            console.log("Deleted session, session invalid.");
        }
        throw Error("Failed to get hobbies.");
    }
}