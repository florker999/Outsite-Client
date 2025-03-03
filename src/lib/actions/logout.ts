'use server'

import { redirect } from "next/navigation";
import { deleteSession } from "../services/Cookie";
import * as API from "@/lib/services/API";

export default async function logout(username: string, password: string) {
    try {
        await API.logOut();
        await deleteSession();
    } catch (error) {

    }
    redirect('/');
}