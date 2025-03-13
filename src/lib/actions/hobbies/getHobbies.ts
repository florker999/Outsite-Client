'use server'

import IHobby from "../../models/IHobby";
import WithId from "../../models/WithId";
import get from "../fetchMethods/get";
import { checkLocalAndResponseSIDsEqual } from "../session";
import { deleteSession, getSessionField } from "../../services/Cookie";

export default async function getHobbies() {
    try {
        const userSub = await getSessionField('userSub') as string;
        return await sendRequest(userSub);

    } catch (error) {
        throw new Error("Failed to get hobbies: " + error);
    }
}

async function sendRequest(userSub: string): Promise<WithId<IHobby>[]> {
    const hobbiesRes = await get('/hobbies?userSub=' + userSub);

    if (hobbiesRes.ok) {
        return hobbiesRes.json();

    } else {
        const areSIDsEqual = await checkLocalAndResponseSIDsEqual(hobbiesRes);
        if (!areSIDsEqual) {
            await deleteSession();
            console.log("Deleted session, session invalid.");
        }
        throw Error("Failed to get hobbies.");
    }
}