'use client'

import ISignupFormState from "@/lib/models/ISignupFormState";
import Form from "./Form";
import ISignupForm from "@/lib/models/forms/signupForm";

interface IProps {
    signupState: ISignupFormState,
    signupAction(payload: FormData): void,
    isSignupPending: boolean,
    closeForm(): void,
}

export default function RegisterForm(props: IProps) {
    const { signupState, signupAction, isSignupPending, closeForm } = props;

    return (
        <Form<ISignupForm>
            title='Sign up form'
            submitButtonTitle="Create account"
            formAction={signupAction}
            formData={signupState.formData}
            disabled={isSignupPending}
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
                    invalidText: signupState.doesUsernameExists ? "This username is not available." : ''
                },
                {
                    title: 'Password',
                    key: 'password',
                    required: true,
                    type: 'password',
                    invalid: signupState.arePasswordsDifferent,
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
    );
}