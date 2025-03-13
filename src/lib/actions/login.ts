'use server'

import { updateSession } from "../services/Cookie";
import post from "./fetchMethods/post";
import ILoginForm from "../models/forms/loginForm";
import ILoginResponse from "../models/ILoginResponse";

export default async function login(data: ILoginForm) {
    console.log("Server Action - Login");

    try {
        const logInRes = await logIn(data);
        if (logInRes) {
            const nextSession = {
                username: data.username,
                isLoggedIn: true,
                ...logInRes
            };
            await updateSession(nextSession);
            
        } else throw new Error("Could not login");

    } catch (error) {
        throw Error("Failed to login: " + error);
    }
}

async function logIn(data: ILoginForm): Promise<ILoginResponse> {
    const loginRes = await post('/login', data);
    if (!loginRes.ok) {
        throw new Error("Request failed.");

    } else {
        const loginDataRes: ILoginResponse = await loginRes.json();
        return loginDataRes;
    }
}