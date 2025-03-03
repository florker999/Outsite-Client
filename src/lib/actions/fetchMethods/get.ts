'use server'

import Consts from "./Consts";
import { getAndAppendSIDHeader } from "./headers";

export default async function get(path: string): Promise<Response> {
    const headers: any = {};
    await getAndAppendSIDHeader(headers);

    return fetch(Consts.apiUrl + path, {
        method: 'GET',
        credentials: 'include',
        headers
    });
}
