'use client'

import { TDeliveryMedium } from "@/lib/models/TDeliveryMedium";
import Form from "@/ui/Form";
import { Alert, Center, Container, Stack, Text } from "@chakra-ui/react"
import React from "react";
import { handleSignUpForm } from "@/lib/actions/handleSignUpForm";
import { handleLogInForm } from "@/lib/actions/handleLogInForm";
import ILoginForm from "@/lib/models/forms/loginForm";
import IFormState from "../../lib/models/IFormState";
import { CloseButton } from "@/components/ui/close-button";
import ISignupFormState from "@/lib/models/ISignupFormState";
import { handleConfirmForm } from "@/lib/actions/handleConfirmForm";
import RegisterForm from "@/ui/RegisterForm";
import ConfirmSignUpError from "@/lib/utils/ConfirmSignUpError";
import { resendCode } from "@/lib/actions/signup";

interface IProps {

}

interface IConfirmData {
    destination?: string,
    medium?: TDeliveryMedium
}

export default function Page(props: IProps) {
    const [isRegisterFormVisible, setIsRegisterFormVisible] = React.useState(false);
    const [loginState, loginAction, isLoginPending] = React.useActionState<IFormState, FormData>(handleLogInForm, { message: '', formData: new FormData() });
    const [signupState, signupAction, isSignupPending] = React.useActionState<ISignupFormState, FormData>(handleSignUpForm, { message: '', formData: new FormData() });
    const [confirmState, confirmAction, isConfirmPending] = React.useActionState<IFormState, FormData>(handleConfirmForm, { message: '', formData: new FormData() });

    let display;

    if (!isRegisterFormVisible) {
        display = (
            <>
                {loginState.message &&
                    <Alert.Root status={'error'} padding={5}>
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Title fontWeight={'bold'}>{loginState.message}</Alert.Title>
                            <Alert.Description>
                                {loginState.message}
                            </Alert.Description>
                        </Alert.Content>
                        <CloseButton />
                    </Alert.Root>
                }
                <Form<ILoginForm>
                    title={"Login form"}
                    fields={[
                        {
                            title: 'Username',
                            key: 'username',
                            invalid: !!loginState.message,
                        },
                        {
                            title: 'Password',
                            key: 'password',
                            invalid: !!loginState.message,
                            type: 'password'
                        }
                    ]}
                    submitButtonTitle='Login'
                    formAction={loginAction}
                    disabled={isLoginPending}
                    formData={loginState.formData}
                    buttons={[
                        {
                            title: 'Register',
                            onClick: () => setIsRegisterFormVisible(true)
                        }
                    ]}
                />
            </>
        )
    } else {
        if (!signupState.destination && !signupState.medium) {
            display = (
                <RegisterForm
                    signupState={signupState}
                    signupAction={signupAction}
                    isSignupPending={isSignupPending}
                    closeForm={() => setIsRegisterFormVisible(false)}
                />
            )
        } else if (signupState.destination && signupState.medium) {
            display = (
                <Form
                    title={`An email has been sent to you at ${signupState.destination}. Don't hesitate too long & enter the code from the message in the field below.`}
                    formAction={confirmAction}
                    submitButtonTitle={"Send code"}
                    loading={isConfirmPending}
                    buttons={confirmState.error === undefined ? undefined : [
                        {
                            title: "Resend code",
                            onClick: () => resendCode()
                        }
                    ]}
                    fields={[
                        {
                            title: 'Code',
                            key: 'code',
                            required: true,
                            disabled: isConfirmPending,
                            invalid: confirmState.error !== undefined,
                            invalidText: confirmState.error === undefined ? '' : confirmState.error === ConfirmSignUpError.IncorrectCode ? 'Code incorrect' : confirmState.error === ConfirmSignUpError.ExpiredCode ? "Code has expired" : "Something went wrong..."
                        }
                    ]}
                />
            )
        } else {
            display = <Text>Error</Text>
        }
    }

    return (
        <Center>
            <Container maxW={600} mt={15}>
                {display}
            </Container>
        </Center>
    )
}