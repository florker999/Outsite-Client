'use client'

import ISignupFormState from "@/lib/models/ISignupFormState";
import Form from "./Form";
import ISignupForm from "@/lib/models/forms/signupForm";
import { toaster, Toaster } from "@/components/ui/toaster";
import React from "react";
import { PasswordAssessorBuilder } from "@/lib/utils/ValueAssessor";

interface IProps {
    signupState: ISignupFormState,
    signupAction(payload: FormData): void,
    isSignupPending: boolean,
    closeForm(): void,
}

export default function RegisterForm(props: IProps) {
    const { signupState, signupAction, isSignupPending, closeForm } = props;
    const passwordAssessor = React.useRef(PasswordAssessorBuilder.build()).current;

    React.useEffect(() => {
        if (signupState.message === 'UnknownException') {
            toaster.create({
                type: 'error',
                title: 'Error encountered',
                description: "Something went wrong. Try again!"
            })
        }
    }, [signupState]);

    return (
        <>
            <Toaster />
            <Form<ISignupForm>
                title='Sign up form'
                submitButtonTitle="Create account"
                formAction={signupAction}
                formData={signupState.formData}
                disabled={isSignupPending}
                loading={isSignupPending}
                fields={[
                    {
                        title: 'Email',
                        key: 'email',
                        required: true,
                    },
                    {
                        title: 'Username',
                        key: 'username',
                        required: true,
                        invalid: signupState.doesUsernameExists,
                        invalidText: signupState.doesUsernameExists ? "This username is not available." : '',
                        // onChange: value => checkUsernameAvailability(value)
                    },
                    {
                        title: 'Password',
                        key: 'password',
                        required: true,
                        type: 'password',
                        invalid: signupState.arePasswordsDifferent,
                        strengthIndicatorOptions: {
                            max: 4,
                            assessor: passwordAssessor,
                        }
                    },
                    {
                        title: 'Confirm password',
                        key: 'confirmPassword',
                        required: true,
                        type: 'password',
                        invalid: signupState.arePasswordsDifferent,
                        invalidText: 'The password is different',
                    },
                ]}
                buttons={[
                    {
                        title: 'Back',
                        onClick: closeForm
                    }
                ]}
            />
        </>
    );
}