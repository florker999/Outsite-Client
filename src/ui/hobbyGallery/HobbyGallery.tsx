'use client'

import { Center, Stack, Text } from "@chakra-ui/react";
import React from "react"
import WithId from "@/lib/models/WithId";
import IHobby from "@/lib/models/IHobby";
import HobbyCard from "../hobbyCard/HobbyCard";
import NewHobbyCard from "../NewHobbyCard";
import * as API from "@/lib/services/API";
import Form from "../Form";
import { handleNewHobbyForm } from "@/lib/actions/hobbies/handleNewHobbyForm";
import { toaster, Toaster } from "@/components/ui/toaster";
import NewHobbyForm from "../NewHobbyForm";

export interface INewHobbyForm {
    name: string,
    description: string,
}

interface IProps {
    hobbies: Promise<WithId<IHobby>[]>
}

export default function HobbyGallery(props: IProps) {
    const hobbies = React.use(props.hobbies);
    const [isFormVisible, setIsFormVisible] = React.useState(false);

    // React.useEffect(() => {
    //     if (!newHobbyFormState.message) {
    //         setIsFormVisible(false);
    //         toaster.create({
    //             title: 'Success!',
    //             description: "The hobby has been created.",
    //             type: 'success'
    //         });
    //     } else {
    //         toaster.create({
    //             title: 'Failure...',
    //             description: "Something went wrong while creating the hobby.",
    //             type: 'error'
    //         })
    //     }
    // }, [newHobbyFormState]);

    return (
        <Stack>
            <Toaster />

            <Center>
                <Text textStyle={'2xl'}>Your hobbies</Text>
            </Center>
            {hobbies ?
                hobbies.map(hobby => (
                    <HobbyCard key={hobby._id} hobby={hobby} />
                ))
                :
                <Text>User not logged in.</Text>
            }
            <NewHobbyCard onClick={() => setIsFormVisible(value => !value)} />
            {isFormVisible &&
                <NewHobbyForm close={() => setIsFormVisible(false)} />
            }
        </Stack>
    )
}