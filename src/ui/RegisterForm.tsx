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
            fields={[
                {
                    title: 'Email',
                    key: 'email',
                    required: true,
                    disabled: isSignupPending,
                    value: signupState.formData.get('email')?.toString()
                },
                {
                    title: 'Username',
                    key: 'username',
                    required: true,
                    disabled: isSignupPending,
                    value: signupState.formData.get('email')?.toString()
                },
                {
                    title: 'Password',
                    key: 'password',
                    required: true,
                    disabled: isSignupPending,
                    type: 'password',
                    invalid: signupState.arePasswordsDifferent,
                    invalidText: 'The password is different',
                    value: signupState.formData.get('email')?.toString()
                },
                {
                    title: 'Confirm password',
                    key: 'confirmPassword',
                    required: true,
                    disabled: isSignupPending,
                    type: 'password',
                    value: signupState.formData.get('email')?.toString(),
                    invalid: signupState.arePasswordsDifferent
                },
            ]}
            submitButtonTitle="Create account"
            formAction={signupAction}
            buttons={[
                {
                    title: 'Back',
                    onClick: closeForm
                }
            ]}
        />
    );
}