'use server'

import Consts from "./Consts";
import { getAndAppendSIDHeader } from "./headers";

export default async function del(path: string) {
    const headers: any = {};
    await getAndAppendSIDHeader(headers);
    
    return fetch(Consts.apiUrl + path, {
        method: 'DELETE',
        credentials: 'include',
        headers,
    })
}