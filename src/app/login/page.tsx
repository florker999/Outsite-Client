'use client'

import { TDeliveryMedium } from "@/lib/models/TDeliveryMedium";
import { createSession, deleteSession, getSessionField } from "@/lib/services/Cookie";
import login from "@/lib/actions/login";
import Form from "@/ui/Form";
import { Button, Center, Container, Field, Fieldset, Input, Stack, Text } from "@chakra-ui/react"
import React from "react";
import redirect from "@/lib/actions/redirect";
import { confirmSignUp, signup } from "@/lib/services/API";

interface IProps {

}

interface ILoginFormData {
    username: string,
    password: string
}

interface IConfirmData {
    destination?: string,
    medium?: TDeliveryMedium
}

export default function Page(props: IProps) {
    const [userName, setUserName] = React.useState<string>();
    const [isRegisterFormVisible, setIsRegisterFormVisible] = React.useState(false);
    const [confirmData, setConfirmData] = React.useState<IConfirmData>();

    React.useEffect(() => {
        getSessionField('username')
            .then(username => {
                setUserName(username as string | undefined);
            })
    }, []);
    
    const usernameRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const codeRef = React.useRef<HTMLInputElement>(null);
    
    const logIn = async (data: ILoginFormData) => {
        if (data.username && data.password) {
            try {
                await login(data.username, data.password);
                //await createSession({ username: data.username });
                //await redirect('/');
            } catch (error) {
                console.error(error);
            }
        }
        return false;
    }

    const signUp = async () => {
        if (usernameRef.current && passwordRef.current && emailRef.current) {
            try {
                const signUpRes = await signup(usernameRef.current.value, passwordRef.current.value, emailRef.current.value);
                if (signUpRes.isUserConfirmed === false)
                    setConfirmData(signUpRes.confirmation);
                setUserName(usernameRef.current.value);
                document.cookie = "userName=" + usernameRef.current.value;

            } catch (error) {
                console.error("Failed to create enthusiast: ", error);

            }
        }
    };

    const confirmCode = async () => {
        const codeNode = codeRef.current;
        if (codeNode && codeNode.value && userName) {
            const res = await confirmSignUp({ code: codeNode.value });

            setConfirmData(undefined);
        }
    }

    const logOut = () => {
        deleteSession();
        setUserName(undefined);
    }

    let display;

    if (userName && !confirmData) {
        display = (
            <>
                <Text>Already logged in.</Text>
                <Button onClick={logOut}>Logout</Button>
            </>
        )
    } else if (!isRegisterFormVisible) {
        display = (
            <Form<ILoginFormData>
                title={"Login form"}
                fields={[
                    {
                        title: 'Username',
                        key: 'username'
                    },
                    {
                        title: 'Password',
                        key: 'password'
                    }
                ]}
                submitButton={{
                    title: "Login",
                    onClick: logIn
                }}
                buttons={[
                    {
                        title: 'Register',
                        onClick: () => setIsRegisterFormVisible(true)
                    }
                ]}
            />
        )
    } else {
        if (!confirmData) {
            display = (
                <Fieldset.Root>
                    <Fieldset.Legend>Register form</Fieldset.Legend>
                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>
                                Email
                            </Field.Label>
                            <Input ref={emailRef} />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>
                                Username
                            </Field.Label>
                            <Input ref={usernameRef} />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>
                                <Stack>
                                    Password
                                    <Field.HelperText>Make sure it's secure.</Field.HelperText>
                                </Stack>
                            </Field.Label>
                            <Input ref={passwordRef} />
                        </Field.Root>
                    </Fieldset.Content>
                    <Stack direction={'row'}>
                        <Button w={100} onClick={() => setIsRegisterFormVisible(false)}>Back</Button>
                        <Button w={100} onClick={signUp}>Register</Button>
                    </Stack>
                </Fieldset.Root>
            )

        } else {
            display = (
                <Fieldset.Root>
                    <Fieldset.Legend>Confirm form</Fieldset.Legend>
                    <Fieldset.HelperText>Enter your code sent as {confirmData.medium} to {confirmData.destination}.</Fieldset.HelperText>
                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>
                                Code
                            </Field.Label>
                            <Input ref={codeRef} />
                        </Field.Root>
                    </Fieldset.Content>
                    <Stack direction={'row'}>
                        <Button w={100} onClick={confirmCode}>Send code</Button>
                    </Stack>
                </Fieldset.Root>
            )
        }
    }

    return (
        <Center>
            <Container maxW={600}>
                {display}
            </Container>
        </Center>
    )
}