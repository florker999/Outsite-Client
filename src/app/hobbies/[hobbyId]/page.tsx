import { SkeletonText } from "@/components/ui/skeleton";
import DbClient from "@/lib/services/DbClient"
import PostGallery from "@/ui/postGallery/PostGallery";
import PostGallerySkeleton from "@/ui/postGallery/PostGallerySkeleton";
import { Center, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Suspense } from "react";

interface IProps {
    params: Promise<{ hobbyId: string }>
}

export default async function Page(props: IProps) {
    const { hobbyId } = await props.params;
    const posts = new DbClient().getPosts(hobbyId);

    /*     const createPost = async (data: any) => {
            'use server'
    
            if (data.title && data.content) {
                const request: ICreatePostRequest = {
                    hobbyId,
                    post: {
                        title: data.title,
                        content: data.content
                    }
                };
                try {
                    const res = await addPost(request);
                    if (res) {
                        revalidatePath('/hobbies/[id]');
                        return true;
                    } else {
                        console.log("Failed to create the post.");
                    }
    
                } catch (error) {
                    console.log("Failed to create the post: ", error);
                }
            } else {
                console.log("Not provided sufficient data: ", data);
            }
            return false;
        }
     */
    return (
        <Center>
            <Stack>
                <Center mt={2}>
                    <Text textStyle={'2xl'}>Posts</Text>
                </Center>
                <Suspense fallback={<PostGallerySkeleton />}>
                    <PostGallery posts={posts} />
                </Suspense>
            </Stack>
        </Center>
    )
}