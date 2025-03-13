'use server'

import ICreateHobbyRequest from "@/server/src/models/ICreateHobbyRequest";
import post from "../fetchMethods/post";
import ICreateTrophyRequest from "@/server/src/models/ICreateTrophyRequest";

interface INewTrophy {
    title: string,
    description: string,
    iconType: string,
    hobbyId: string,
}

export async function addTrophy(data: INewTrophy): Promise<string> {
    const request: ICreateTrophyRequest = {
        trophy: {
            title: data.title,
            description: data.description,
            iconType: data.iconType,
        },
        hobbyId: data.hobbyId
    };

    try {
        const res = await sendRequest(request);
        return res;

    } catch (error) {
        console.log("Failed to create post: ", error);
        throw error
    }
}

async function sendRequest(data: any) {
    const res = await post('/trophies', data);

    if (res.ok) {
        return res.text();

    } else {
        throw new Error("New hobby request failed.");
        
    }
}