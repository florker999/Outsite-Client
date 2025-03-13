'use server'

import { redirect } from "next/navigation";
import { deleteSession } from "../services/Cookie";
// import get from "./fetchMethods/get";

export default async function logout(username: string, password: string) {
    try {
        // await get('/logout');
        await deleteSession();
        
    } catch (error) {
        console.log("Failed to logout: ", error);
    }
    
    redirect('/');
}