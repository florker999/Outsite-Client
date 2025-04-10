import {
    Box,
    Button,
    Flex,
    Link,
    Stack,
    Text,
} from "@chakra-ui/react";
import React from "react";
import LogoutButton from "./LogoutButton";

export default async function MenuBar(props: { userName?: string }) {
    return (
        <Box bg="gray.800" px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Link href="/">
                    <Text color="white">Outsite</Text>
                </Link>
                <Stack direction={{ base: "column", md: "row" }}>
                    <Link href="/">
                        <Button padding={5}>Hobbies</Button>
                    </Link>
                    {props.userName ?
                        <Button padding={5} cursor={'default'}>{`Hello, ${props.userName}`}</Button>
                        :
                        <Link href="/login">
                            <Button padding={5}>{props.userName ? `Hello, ${props.userName}` : 'Login'}</Button>
                        </Link>
                    }
                    {props.userName &&
                        <LogoutButton />
                    }
                </Stack>
            </Flex>
        </Box>
    );
}