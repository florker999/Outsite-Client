'use server'

import WithId from "@/lib/models/WithId";
import get from "../fetchMethods/get";
import IPost from "@/lib/models/IPost";

export default async function getPosts(hobbyId: string) {
    const post: WithId<IPost>[] = await sendRequest(hobbyId);
    return post;
}

async function sendRequest(hobbyId: string) {
    const getPostRes = await get(`/posts?hobbyId=${hobbyId}`);

    if (getPostRes.ok) {
        return getPostRes.json();

    } else {
        throw Error("Get posts request failed.");
    }
}