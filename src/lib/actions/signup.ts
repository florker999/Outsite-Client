'use server'

import { IConfirmSignUpRequest } from "@/server/src/models/IConfirmSignUpRequest";
import { ISignUpResponse } from "../models/ISignUpResponse";
import post from "./fetchMethods/post";
import { getSession, updateSession } from "../services/Cookie";
import ISignUpRequest from "../models/ISignUpRequest";
import ISignupResponse from "@/server/src/models/ISignupResponse";
import { TDeliveryMedium } from "../models/TDeliveryMedium";

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

    } else throw new Error("Failed to sign up.");
}

export async function confirmSignUp(request: IConfirmSignUpRequest): Promise<boolean> {
    const { username, session } = await getSession();
    const confirmationRequest = {
        ...request,
        username,
        session
    }

    const confRes = await post('/confirmSignUp', confirmationRequest);
    if (confRes.ok) {
        return true;

    } else {
        console.error("Failed to confirm sign up.");
        return false;
    }
}