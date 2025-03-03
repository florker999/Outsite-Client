import { Stack } from "@chakra-ui/react";
import PostCardSkeleton from "../postCard/PostCardSkeleton";

export default function HobbyGallerySkeleton() {
    return (
        <Stack>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
        </Stack>
    )
}