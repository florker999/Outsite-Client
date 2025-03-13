'use server'

import { redirect } from "next/navigation";
import IFormState from "../models/IFormState";
import { updateSession } from "../services/Cookie";
import validateForm from "../utils/validateForm";
import { confirmSignUp } from "./signup";

interface IConfirmForm {
    code: string,
}

export async function handleConfirmForm(prevState: IFormState, formData: FormData): Promise<IFormState> {
    console.log("Server Action - Validate Confirm Form");

    const formIsValid = validateForm<IConfirmForm>(formData, ['code']);
    if (formIsValid) {
        const confirmForm: IConfirmForm = extractFormFields(formData);
        try {
            const confirmRes = await confirmSignUp(confirmForm);
            await updateSession({ isLoggedIn: true });

        } catch (error) {
            console.error("Failed to confirm sing up: ", error);
            return {
                message: "Could not confirm sing up.",
                formData
            };
        }

        redirect('/');
        return { message: '', formData: new FormData() };
    }

    return {
        message: "Form is invalid.",
        formData
    };
}

function extractFormFields(formData: FormData): IConfirmForm {
    const form: IConfirmForm = {
        code: formData.get('code') as string,
    };

    return form;
}