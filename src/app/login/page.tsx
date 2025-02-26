'use client'

import { TDeliveryMedium } from "@/lib/models/TDeliveryMedium";
import { createSession, deleteSession, getCookie } from "@/lib/services/Cookie";
import DbClient from "@/lib/services/DbClient";
import { Button, Center, Container, Field, Fieldset, Input, Stack, Text } from "@chakra-ui/react"
import React from "react";

interface IProps {

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
        'use client'
        getCookie('username')
            .then(username => {
                setUserName(username as string | undefined);
            })
    }, []);

    const usernameRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const codeRef = React.useRef<HTMLInputElement>(null);

    const logIn = async () => {
        const usernameNode = usernameRef.current,
            passwordNode = passwordRef.current;
        if (usernameNode && passwordNode) {
            try {
                const loginRes = await new DbClient().login(usernameNode.value, passwordNode.value);
                if (loginRes) {
                    setUserName(usernameNode.value);
                    await createSession({ username: usernameNode.value })
                    usernameNode.value = '';
                    passwordNode.value = '';
                }

            } catch (error) {
                console.error(error);
            }
        }
    }

    const signUp = async () => {
        if (usernameRef.current && passwordRef.current && emailRef.current) {
            try {
                const signUpRes = await new DbClient().signUp(usernameRef.current.value, passwordRef.current.value, emailRef.current.value);
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
            const res = await new DbClient().confirmSignUp({ code: codeNode.value });

            setConfirmData(undefined);
            createSession({ userName });
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
            <Fieldset.Root>
                <Fieldset.Legend>Login form</Fieldset.Legend>
                <Fieldset.Content>
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
                            </Stack>
                        </Field.Label>
                        <Input ref={passwordRef} />
                    </Field.Root>
                </Fieldset.Content>
                <Stack direction={'row'}>
                    <Button w={100} onClick={logIn}>Login</Button>
                    <Button w={100} onClick={() => setIsRegisterFormVisible(true)}>Register</Button>
                </Stack>
            </Fieldset.Root>
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