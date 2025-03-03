'use server'

import { getSessionField, updateSession } from "@/lib/services/Cookie";
import getSessionSID from "../session";

export async function getAndAppendSIDHeader(headers: any) {
    let sid = (await getSessionField('sid') as string);
    if (!sid) {
        sid = await getSessionSID();
        await updateSession({ sid });
    }
    headers['Cookie'] = `connect.sid=${sid}`;

    return headers;
}