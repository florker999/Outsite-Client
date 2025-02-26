import DbClient from "@/lib/services/DbClient"
import PostCard from "@/ui/postCard/PostCard";
import { Center, Stack, Text } from "@chakra-ui/react";

interface IProps {
    params: Promise<{ hobbyId: string, postId: string }>
}

export default async function Page(props: IProps) {
    const { hobbyId, postId } = await props.params;
    const post = await new DbClient().getPost(hobbyId, postId);

    return (
        <Center>
            <Stack>
                <PostCard post={post} />
            </Stack>
        </Center>
    )
}