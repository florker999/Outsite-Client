import { UserNameStateContext } from "@/contexts/userId";
import { getCookie } from "@/lib/services/Cookie";
import { createCookieMap } from "@/server/src/utils/cookies";
import {
    Box,
    Button,
    Flex,
    Link,
    Stack,
    Text,
} from "@chakra-ui/react";
import React from "react";

export default async function MenuBar(props: { userName?: string }) {
    // const { userName, setUserName } = React.useContext(UserNameStateContext);

    // React.useEffect(() => {
    //     const cookieMap = createCookieMap(document.cookie);
    //     const userId = cookieMap.get('userName');
    //     setUserName(userId);
    // }, []);

    return (
        <Box bg="gray.800" px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Text color="white">Outsite</Text>
                <Stack direction={{ base: "column", md: "row" }}>
                    <Link href="/">
                        <Button>Hobbies</Button>
                    </Link>
                    <Link href="/posts">
                        <Button>Posts</Button>
                    </Link>
                    <Button>Profile</Button>
                    <Link href="/login">
                        <Button>{props.userName ? `Hello, ${props.userName}` : 'Login'}</Button>
                    </Link>
                </Stack>
            </Flex>
        </Box>
    );
}