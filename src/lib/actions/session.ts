'use server'

var dbUrl: string = "http://localhost:3001";

export default async function getSessionSID() {
    console.log('Server Action - Get Session SID');
    
    const response = await fetch(dbUrl + '/session', {
        method: 'GET'
    });

    if (response.ok) {
        const setCookies = response.headers.getSetCookie();
        const sidCookie = readSIDCookie(setCookies);
        const decodedSidCookiet = decodeURIComponent(sidCookie);
        //const sid = readSIDFromCookie(decodeURIComponent(sidCookie));
        console.log("Read sid: " + decodedSidCookiet);
        return decodedSidCookiet;
    } else throw new Error("Failed to call session endpoint.");
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

function readSIDFromCookie(cookie: string) {
    const cookieStart = 's:',
        cookieEnd = '.';

    const cookieStartIndex = cookie.indexOf(cookieStart),
        cookieEndIndex = cookie.indexOf(cookieEnd);
    if (cookieStartIndex !== -1 && cookieEndIndex !== -1)
        return cookie.slice(cookieStartIndex + cookieStart.length, cookieEndIndex + cookieEnd.length);
    else
        throw new Error("Cookie cannot be found.");
}