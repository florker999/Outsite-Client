'use client'

import { Button, CloseButton, DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTitle, Field, Fieldset, HStack, Input, Stack, Text } from "@chakra-ui/react";
import React from "react"
import WithId from "@/lib/models/WithId";
import IHobby from "@/lib/models/IHobby";
import HobbyCard from "../hobbyCard/HobbyCard";
import NewHobbyCard from "../NewHobbyCard";
import { revalidatePath } from "next/cache";
import * as API from "@/lib/services/API";

interface IProps {
    hobbies: Promise<WithId<IHobby>[] | undefined>
}

export default function HobbyGallery(props: IProps) {
    const hobbies = React.use(props.hobbies);
    const [isFormVisible, setIsFormVisible] = React.useState(false);

    const hobbyNameRef = React.useRef<HTMLInputElement>(null);
    const hobbyDescriptionRef = React.useRef<HTMLInputElement>(null);

    const addHobby = async () => {
        const hobbyDescriptionNode = hobbyDescriptionRef.current;
        if (hobbyNameRef.current !== null && hobbyNameRef.current.value && true && hobbyDescriptionNode && hobbyDescriptionNode.value) {
            const hobbyId = await API.createHobby({
                hobby: {
                    name: hobbyNameRef.current.value,
                    description: hobbyDescriptionNode.value
                }
            });
            const newHobby: WithId<IHobby> = {
                _id: hobbyId,
                name: hobbyNameRef.current.value,
                description: hobbyDescriptionNode.value,
                enthusiastId: ''
            };

            hobbies?.push(newHobby);
            setIsFormVisible(false);
        }
    };

    return (
        <Stack>
            <DialogRoot open={isFormVisible} placement={'center'}>
                <DialogContent padding={15}>
                    <DialogCloseTrigger>
                        <CloseButton onClick={() => setIsFormVisible(false)} />
                    </DialogCloseTrigger>
                    <DialogHeader>
                        <DialogTitle>New hobby</DialogTitle>
                    </DialogHeader>
                    <DialogBody mt={4}>
                        <Fieldset.Root>
                            <Fieldset.Content>
                                <Field.Root>
                                    <Field.Label>Name</Field.Label>
                                    <Input ref={hobbyNameRef} />
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Description</Field.Label>
                                    <Input ref={hobbyDescriptionRef} />
                                </Field.Root>
                            </Fieldset.Content>
                            <HStack marginTop={15}>
                                <Button w={50} onClick={addHobby}>Add</Button>
                            </HStack>
                        </Fieldset.Root>
                    </DialogBody>
                </DialogContent>
            </DialogRoot>

            {hobbies ?
                hobbies.map(hobby => (
                    <HobbyCard key={hobby._id} hobby={hobby} />
                ))
                :
                <Text>User not logged in.</Text>
            }
            <NewHobbyCard onClick={() => setIsFormVisible(value => !value)} />
        </Stack>
    )
}