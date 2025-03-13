import { deleteHobby } from "@/lib/actions/hobbies/deleteHobby";
import getHobby from "@/lib/actions/hobbies/getHobby";
import getPosts from "@/lib/actions/posts/getPosts";
import { deleteTrophy } from "@/lib/actions/trophies/deleteTrophy";
import getTrophies from "@/lib/actions/trophies/getTrophies";
import InfoHeading from "@/ui/InfoHeader";
import PostGallery from "@/ui/postGallery/PostGallery";
import PostGallerySkeleton from "@/ui/postGallery/PostGallerySkeleton";
import TrophiesGallery from "@/ui/TrophiesGallery";
import { Center, Container, Separator, Stack, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LuDelete } from "react-icons/lu";

interface IProps {
    params: Promise<{ hobbyId: string }>
}

export default async function Page(props: IProps) {
    const { hobbyId } = await props.params;
    const hobby = await getHobby(hobbyId);
    const posts = getPosts(hobbyId);
    const trophies = getTrophies(hobbyId);

    const removeHobbyHandler = async () => {
        'use server'
        await deleteHobby(hobbyId);
        redirect('/');
    }

    const removeTrophyHandler = async (trophyId: string) => {
        'use server'
        await deleteTrophy(trophyId);
    }


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
            <Stack minW={500} maxW={700}>
                <Container mt={5}>
                    <InfoHeading
                        text={hobby.name}
                        info={hobby.description}

                    >
                        <LuDelete onClick={removeHobbyHandler} />
                    </InfoHeading>
                </Container>
                <Separator />
                <Center mt={2} gap={5}>
                    <Text textStyle={'2xl'}>Trophies</Text>
                </Center>
                <TrophiesGallery
                    trophies={trophies}
                    hobbyId={hobbyId}
                    removeTrophy={removeTrophyHandler}
                />
                <Center mt={2} gap={5}>
                    <Text textStyle={'2xl'}>Posts</Text>
                </Center>
                <Suspense fallback={<PostGallerySkeleton />}>
                    <PostGallery posts={posts} />
                </Suspense>
            </Stack>
        </Center>
    )
}