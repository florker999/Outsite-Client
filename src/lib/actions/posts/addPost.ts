'use server'

import ICreatePostRequest from "@/server/src/models/ICreatePostRequest";
import post from "../fetchMethods/post";

export async function addPost(request: ICreatePostRequest) {
    try {
        return await sendRequest(request);

    } catch (error) {
        console.log("Failed to create post: ", error);
    }
}

async function sendRequest(data: ICreatePostRequest) {
    const newPostRes = await post('/posts', data);
    if (newPostRes.ok)
        return await newPostRes.text();
    else
        throw new Error("Failed to create new post.")
}