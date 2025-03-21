'use server'

import { ISignUpResponse } from "../models/ISignUpResponse";
import post from "./fetchMethods/post";
import { getSession, updateSession } from "../services/Cookie";
import ISignUpRequest from "../models/ISignUpRequest";
import { TDeliveryMedium } from "../models/TDeliveryMedium";
import ISignupResponse from "../models/ISignupResponse copy";

export async function signup(data: ISignUpRequest): Promise<ISignUpResponse> {
    const signUpRes = await post('/signUp', data);

    if (signUpRes.ok) {
        const jsonSignUpRes: ISignupResponse = await signUpRes.json();
        const nextSession = {
            username: data.username,
            isLoggedIn: jsonSignUpRes.isUserConfirmed,
            userSub: jsonSignUpRes.userSub,
            session: jsonSignUpRes.confirmData.session
        }
        await updateSession(nextSession);
        const response: ISignUpResponse = {
            isUserConfirmed: jsonSignUpRes.isUserConfirmed,
            confirmation: {
                destination: jsonSignUpRes.confirmation.destination,
                medium: jsonSignUpRes.confirmation.medium as TDeliveryMedium
            }
        }
        return response;

    } else throw new Error(signUpRes.statusText);
}

export async function confirmSignUp(code: string): Promise<void> {
    const { username, session } = await getSession();
    const confirmationRequest = {
        code,
        username,
        session
    }

    const confRes = await post('/confirmSignUp', confirmationRequest);
    if (confRes.ok) {
        return;

    } else {
        throw Error(confRes.statusText);
    }
}