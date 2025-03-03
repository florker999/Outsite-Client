'use server'

import { redirect } from "next/navigation"

export default async function (url: string): Promise<void> {
    redirect(url);
}