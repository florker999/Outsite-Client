'use client'

import IPost from "@/lib/models/IPost"
import WithId from "@/lib/models/WithId";
import DbClient from "@/lib/services/API";
import { Button, Center, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import React from "react"

interface IProps {
    hobbyId: string,
}

export default function page(props: IProps) {
    const [posts, setPosts] = React.useState<WithId<IPost>[]>();
    const [isFormVisible, setIsFormVisible] = React.useState(false);

    const titleRef = React.useRef<HTMLInputElement>(null),
        contentRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const db = new DbClient();
        db.getPosts(props.hobbyId)
            .then(posts => setPosts(posts));
    }, []);

    const createPost = async () => {
        const titleNode = titleRef.current,
            contentNode = contentRef.current;

        if (titleNode && contentNode) {
            const title = titleNode.value,
                content = contentNode.value;
            if (title && content) {
                const db = new DbClient();
                const postId = await db.createPost(props.hobbyId, title, content);
                const newPost: WithId<IPost> = {
                    _id: postId,
                    title,
                    content,
                    hobbyId: props.hobbyId
                };
                setPosts([...(posts || []), newPost]);
            }
            setIsFormVisible(false);
        }
    }

    return (
        <Center>
            <Stack>
                {
                    isFormVisible ?
                        <Fieldset.Root>
                            <Fieldset.Legend>New post form</Fieldset.Legend>
                            <Fieldset.Content>
                                <Field.Root>
                                    <Field.Label>
                                        Title
                                    </Field.Label>
                                    <Input ref={titleRef} />
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Content</Field.Label>
                                    <Input ref={contentRef} />
                                </Field.Root>
                            </Fieldset.Content>
                            <Stack direction={'row'}>
                                <Button w={100} onClick={createPost}>Create</Button>
                                <Button w={100} onClick={() => setIsFormVisible(false)}>Close</Button>
                            </Stack>
                        </Fieldset.Root>
                        :
                        <Button onClick={() => setIsFormVisible(true)}>Create new post</Button>
                }
                {
                    posts ?
                        posts.map(post => (
                            <div>
                                <h1>{post.title}</h1>
                                <p>{post.content}</p>
                            </div>
                        ))
                        :
                        <div>Loading...</div>
                }
            </Stack>
        </Center>
    )
}