'use server'

import IHobby from "../models/IHobby";
import WithId from "../models/WithId";
import get from "./fetchMethods/get";

export default async function getHobbies() {
    try {
        return await getHobbiess();

    } catch (error) {
        throw new Error("Failed to get hobbies: " + error);
    }
}

async function getHobbiess(): Promise<WithId<IHobby>[] | undefined> {
    return get('/hobbies')
        .then(res => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 403) {
                return undefined;
            } else throw new Error("Failed to get hobbies.");
        });
}
