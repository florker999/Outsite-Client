'use server'

import 'server-only';
import crypto from "crypto";
import { AuthFlowType, CognitoIdentityProviderClient, ConfirmSignUpCommand, InitiateAuthCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { createSession, getCookie } from '../Cookie';

export async function signUp(username: string, password: string, email: string) {
    const signUpRes = await auth_signUp({ clientId: process.env.AUTH_CLIENT_ID, username, password, email });
    createSession({
        userSub: signUpRes.UserSub,
        session: signUpRes.Session!,
        username,
    });

    return ({
        isUserConfirmed: signUpRes.UserConfirmed,
        confirmation: {
            destination: signUpRes.CodeDeliveryDetails?.Destination,
            medium: signUpRes.CodeDeliveryDetails?.DeliveryMedium
        }
    });
}

export async function confirmSignUp(code: string) {

    const session = await getCookie('session');
    const username = await getCookie('username');

    if (session && username) {
        const signUpRes = await auth_confirmSignUp({ clientId: process.env.AUTH_CLIENT_ID, session, code, username });
        const loginRes = await auth_initiateAuth({ clientId: process.env.AUTH_CLIENT_ID, session: signUpRes.Session, username, password: '' });
    }

    // set session
}

function auth_signUp({ clientId, username, password, email }: { clientId: string, username: string, password: string, email: string }) {
    const client = new CognitoIdentityProviderClient({ region: "eu-north-1" });

    const command = new SignUpCommand({
        ClientId: clientId,
        Username: username,
        Password: password,
        UserAttributes: [{ Name: "email", Value: email }, { Name: 'nickname', Value: username }],
        SecretHash: generateHmacBase64("8ppn74d2qjr3jedu7k4atc8cb3kgv51q8sjktis2r1s5veh6eoe", username, clientId)
    });

    return client.send(command);
};

function auth_confirmSignUp({ clientId, username, session, code }: { clientId: string, username: string, session: string, code: string }) {
    const client = new CognitoIdentityProviderClient({ region: "eu-north-1" });

    const command = new ConfirmSignUpCommand({
        ClientId: clientId,
        Username: username,
        Session: session,
        ConfirmationCode: code,
        SecretHash: generateHmacBase64("8ppn74d2qjr3jedu7k4atc8cb3kgv51q8sjktis2r1s5veh6eoe", username, clientId)
    });

    return client.send(command);
};

const auth_initiateAuth = ({ username, password, clientId, session }: { username: string, password: string, clientId: string, session?: string }) => {
    const client = new CognitoIdentityProviderClient({ region: "eu-north-1" });

    let command;
    if (session) {
        command = new InitiateAuthCommand({
            AuthFlow: AuthFlowType.USER_AUTH,
            AuthParameters: {
                USERNAME: username,
                SECRET_HASH: generateHmacBase64("8ppn74d2qjr3jedu7k4atc8cb3kgv51q8sjktis2r1s5veh6eoe", username, clientId)
            },
            ClientId: clientId,
            Session: session
        });
    } else {
        command = new InitiateAuthCommand({
            AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password,
                SECRET_HASH: generateHmacBase64("8ppn74d2qjr3jedu7k4atc8cb3kgv51q8sjktis2r1s5veh6eoe", username, clientId)
            },
            ClientId: clientId,
        });
    }

    return client.send(command);
};


function generateHmacBase64(clientSecretKey: string, username: string, clientId: string) {
    // Concatenate Username and Client Id
    const message = username + clientId;

    // Create HMAC SHA256 hash
    const hmac = crypto.createHmac('sha256', clientSecretKey);
    hmac.update(message);

    // Convert hash to Base64
    const hashInBase64 = hmac.digest('base64');

    return hashInBase64;
}