import {
    Box,
    Button,
    Flex,
    Link,
    Stack,
    Text,
} from "@chakra-ui/react";

export default function MenuBar() {
    return (
        <Box bg="gray.800" px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Text color="white">Outsite</Text>
                <Stack direction={{ base: "column", md: "row" }}>
                    <Button>Hobbies</Button>
                    <Button>Profile</Button>
                    <Button>Login</Button>
                </Stack>
            </Flex>
        </Box>
    );
}