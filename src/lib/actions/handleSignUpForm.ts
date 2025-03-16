'use server'

import validateForm from "../utils/validateForm";
import ISignupForm from "../models/forms/signupForm";
import { signup } from "./signup";
import ISignupFormState from "../models/ISignupFormState";
import { deleteSession } from "../services/Cookie";

export async function handleSignUpForm(prevState: ISignupFormState, formData: FormData): Promise<ISignupFormState> {
    console.log("Server Action - Validate Sign Up Form");

    await deleteSession();
    const formIsValid = validateForm<ISignupForm>(formData, ['username', 'password', 'email', 'confirmPassword']);
    if (formIsValid) {
        const signupForm: ISignupForm = extractFormFields(formData);
        if (signupForm.password !== signupForm.confirmPassword) {
            const nextState: ISignupFormState = {
                formData,
                arePasswordsDifferent: true,
                message: ''
            }

            return nextState;
        }
        try {
            const signupRes = await signup(signupForm);
            const nextFormState: ISignupFormState = {
                message: '',
                formData: new FormData(),
                destination: signupRes.confirmation.destination,
                medium: signupRes.confirmation.medium,
            };
            return nextFormState;

        } catch (error) {
            console.log("Read error:", error);
            
            if (error instanceof Error) {
                if (error.message === "UsernameExistsException") {
                    console.log("Failed to signup: " + error);
                    return {
                        message: '',
                        doesUsernameExists: true,
                        formData
                    }
                }
            }
            console.log("Failed to signup: ", error);
            return {
                message: "UnknownException",
                formData
            };
        }
    }

    return {
        message: "Form is invalid.",
        formData
    };
}

function extractFormFields(formData: FormData): ISignupForm {
    const form: ISignupForm = {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
        email: formData.get('email') as string,
    };

    return form;
}