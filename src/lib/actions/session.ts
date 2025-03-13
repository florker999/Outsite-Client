'use server'

import { getSessionField } from "../services/Cookie";

const dbUrl: string = "http://localhost:3001";

export default async function getSessionSID() {
    console.log('Server Action - Get Session SID');
    
    const response = await fetch(dbUrl + '/session', {
        method: 'GET'
    });

    if (response.ok) {
        const decodedSidCookie = getSIDFromResponse(response);
        console.log("Read sid: " + decodedSidCookie);
        return decodedSidCookie;
    } else throw new Error("Failed to call session endpoint.");
}

export async function checkLocalAndResponseSIDsEqual(response:Response) {
    const localSid = (await getSessionField('sid') as string),
    responseSid = getSIDFromResponse(response);
    
    console.log("Checking for sids equality.");
    console.log("Local sid: " + localSid);
    console.log("Response sid: " + responseSid);

    return localSid === responseSid;
}

function getSIDFromResponse(response: Response) {
    const setCookies = response.headers.getSetCookie();
    const sidCookie = readSIDCookie(setCookies);
    const decodedSidCookie = decodeURIComponent(sidCookie);
    return decodedSidCookie;
}

function readSIDCookie(cookies: string[]) {
    for (const cookie of cookies) {
        const cookieStart = 'connect.sid=';
        const cookieStartIndex = cookie.indexOf(cookieStart);
        if (cookieStartIndex != -1) {
            const sidEndIndex = cookie.indexOf(';');
            if (sidEndIndex != -1) {
                const sid = cookie.slice(cookieStartIndex + cookieStart.length, sidEndIndex);
                return sid;
            } else {
                throw new Error("Did not found cookie end in cookie: " + cookie);

            }
        }
    }

    throw new Error("SID cookie not found in cookies: " + cookies.toString());
}