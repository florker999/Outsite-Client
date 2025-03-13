'use server'

import { getSessionField } from "@/lib/services/Cookie";
import post from "../fetchMethods/post";
import ICreateHobbyRequest from "@/server/src/models/ICreateHobbyRequest";


export async function addHobby(request: ICreateHobbyRequest): Promise<string> {
    try {
        const userSub = await getSessionField('userSub') as string;
        const res = await sendRequest(userSub, request);
        return res;

    } catch (error) {
        console.log("Failed to create hobby: ", error);
        throw error
    }
}

async function sendRequest(userSub: string, data: any) {
    const res = await post('/hobbies?userSub=' + userSub, data);

    if (res.ok) {
        return res.text();

    } else {
        throw new Error("New trophy request failed.");

    }
}