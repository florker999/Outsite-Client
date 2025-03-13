'use server'

import ILoginForm from "../models/forms/loginForm";
import IFormState from "../models/IFormState";
import login from "./login";
import validateForm from "../utils/validateForm";
import { redirect } from "next/navigation";

export async function handleLogInForm(prevState: IFormState, formData: FormData): Promise<IFormState> {
    console.log("Server Action - Validate Log In Form");

    const formIsValid = validateForm<ILoginForm>(formData, ['username', 'password']);
    if (formIsValid) {
        const loginForm: ILoginForm = extractFormFields(formData);
        try {
            await login(loginForm);

        } catch (error) {
            console.error("Failed to login: ", error);
            return {
                message: "Could not login.",
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

function extractFormFields(formData: FormData): ILoginForm {
    const form: ILoginForm = {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
    };

    return form;
}