'use server'

import Consts from "./Consts";
import { getAndAppendSIDHeader } from "./headers";

export default async function post(path: string, body: any): Promise<Response> {
    const headers: any = {
        'content-type': 'application/json',
    };

    await getAndAppendSIDHeader(headers);

    return fetch(Consts.apiUrl + path, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify(body)
    })
}