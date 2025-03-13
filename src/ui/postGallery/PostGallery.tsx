'use client'

import IPost from "@/lib/models/IPost"
import { Button, Center, Show, Stack } from "@chakra-ui/react";
import React, { Suspense } from "react"
import Form from "../Form";
import PostCard from "../postCard/PostCard";
import WithId from "@/lib/models/WithId";
import NewPostDialog from "../NewPostDialog";
import PostDialog from "../PostDialog";
import { removePost } from "@/lib/actions/posts/removePost";
import { revalidatePath } from "next/cache";

interface IProps {
    posts: Promise<WithId<IPost>[]>
}

export default function PostGallery(props: IProps) {
    const posts = React.use(props.posts);
    const [isFormVisible, setIsFormVisible] = React.useState(false);
    const [selectedPostIndex, setSelectedPostIndex] = React.useState<number>();

    const removePostHandler = async (postIndex: number) => {
        const selectedPost = posts[postIndex];

        try {
            await removePost(selectedPost._id);
            setSelectedPostIndex(undefined);
            
        } catch (error) {
            console.log("Failed to remove the post.");
        }
    }

    return (
        <>
            <Center>
                <Stack>
                    <Button onClick={() => setIsFormVisible(value => !value)}>Add</Button>
                    {isFormVisible &&
                        <NewPostDialog close={() => setIsFormVisible(false)} />
                    }
                    {posts.map((post, i) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            open={() => setSelectedPostIndex(i)}
                        />
                    ))}
                </Stack>
            </Center>
            {selectedPostIndex !== undefined &&
                <PostDialog
                    post={posts[selectedPostIndex]}
                    close={() => setSelectedPostIndex(undefined)}
                    remove={() => removePostHandler(selectedPostIndex)}
                />
            }
        </>
    )
}