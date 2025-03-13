'use server'

import WithId from "@/lib/models/WithId";
import get from "../fetchMethods/get";
import IPost from "@/lib/models/IPost";

export default async function getPost(hobbyId: string, postId: string) {
    const post: WithId<IPost> = await sendRequest(hobbyId, postId);
    return post;
}

async function sendRequest(hobbyId: string, postId: string) {
    const getPostRes = await get(`/posts?hobbyId=${hobbyId}&postId=${postId}`);

    if (getPostRes.ok) {
        return getPostRes.json();

    } else {
        throw Error("Get post request failed.");
    }
}