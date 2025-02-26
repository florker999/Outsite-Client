'use server'

import ICreatePostRequest from "@/server/src/models/ICreatePostRequest";
import DbClient from "../services/DbClient";

export async function addPost(data: any) {
    console.log(data);
    const request: ICreatePostRequest = {
        hobbyId: data.hobbyId,
        post: {
            title: data.title,
            content: data.content
        }
    };

    try {
        const res = await new DbClient().createPost(request);
        return res;
        
    } catch (error) {
        console.log("Failed to create post: ", error);
    }
}