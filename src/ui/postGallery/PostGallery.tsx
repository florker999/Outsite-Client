'use client'

import IPost from "@/lib/models/IPost"
import { Button, Stack } from "@chakra-ui/react";
import React, { Suspense } from "react"
import Form from "../Form";
import PostCard from "../postCard/PostCard";
import WithId from "@/lib/models/WithId";
import NewPostDialog from "../NewPostDialog";

interface IProps {
    posts: Promise<WithId<IPost>[]>
}

export default function PostGallery(props: IProps) {
    const posts = React.use(props.posts);
    const [isFormVisible, setIsFormVisible] = React.useState(false);

    return (
        <Stack>
            <Button onClick={() => setIsFormVisible(value => !value)}>Add</Button>
            {isFormVisible &&
                <NewPostDialog close={() => setIsFormVisible(false)} />
            }
            {posts.map(post => (
                <PostCard key={post._id} post={post} />
            ))}
        </Stack>
    )
}