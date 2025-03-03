'use server'

import { updateSession } from "../services/Cookie";
import post from "./fetchMethods/post";

export default async function login(username: string, password: string) {
    console.log("Server Action - Login");

    try {
        const sid = await logIn(username, password);
        if (sid) {
            await updateSession({ username });
        } else throw new Error("Could not login");

    } catch (error) {
        throw Error("Failed to login: " + error);
    }
    //redirect('/');
}

async function logIn(username: string, password: string): Promise<boolean> {
    return post('/login', {
        username,
        password
    })
        .then(res => {
            return res.ok;
        });
}