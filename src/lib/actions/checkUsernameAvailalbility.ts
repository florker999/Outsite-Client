'use server'

import get from "./fetchMethods/get"

export default async function checkUsernameAvailability(username: string) {
    const res = await get('/checkUsernameAvailability?username=' + username);
    console.log(await res.text());
    
    return await res.text();
}