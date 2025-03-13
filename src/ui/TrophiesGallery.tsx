'use client'

import ITrophy from "@/lib/models/ITrophy";
import WithId from "@/lib/models/WithId";
import { Card, Flex, For, Heading, HStack, Icon, Show, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { LuBicepsFlexed, LuBike, LuBook, LuCookingPot, LuFlag, LuPlane, LuPlus, LuSquircle, LuTrash2 } from "react-icons/lu";
import Dialog from "./Dialog";
import NewTrophyForm from "./NewTrophyForm";
import { handleNewTrophyForm } from "@/lib/actions/trophies/handleNewTrophyForm";
import { deleteTrophy } from "@/lib/actions/trophies/deleteTrophy";
import { revalidatePath } from "next/cache";

export interface ITrophyForm {
    title: string,
    description: string,
    iconType: string,
}

interface IGalleryProps {
    trophies: Promise<WithId<ITrophy>[]>,
    hobbyId: string,
    removeTrophy(trophyId: string): Promise<any>,
}

export default function TrophiesGallery(props: IGalleryProps) {
    const [isFormVisible, setIsFormVisible] = React.useState(false);
    const [isFormPending, setIsFormPending] = React.useState(false);
    const [selectedAchievementIndex, setSelectedAchievementIndex] = React.useState<number>();
    const trophies = React.use(props.trophies);

    const removeHandler = async (selectedAchievementIndex: number) => {
        await props.removeTrophy(trophies[selectedAchievementIndex]._id);
        setSelectedAchievementIndex(undefined);
    }

    const addHander = async (formData: FormData) => {
        setIsFormPending(true);
        const newTrophy: WithId<ITrophy> = await handleNewTrophyForm({ message: '', formData: new FormData() }, formData, props.hobbyId);
        trophies.push(newTrophy);
        setIsFormVisible(false);
        setIsFormPending(false);
    }

    return (
        <Card.Root h={70} w={'100%'}>
            <Flex h={'100%'} p={2} gap={2} overflow={'scroll'}>
                <Trophy icon={<LuPlus />} onClick={() => setIsFormVisible(true)} />
                <For each={trophies}>
                    {(trophy, index) => (
                        <Trophy
                            key={trophy._id}
                            icon={TrophyIcon({ iconName: trophy.iconType })}
                            onClick={() => setSelectedAchievementIndex(index)}
                        />
                    )}
                </For>
            </Flex>
            <Show when={isFormVisible}>
                <Dialog close={() => setIsFormVisible(false)}>
                    <NewTrophyForm
                        formAction={addHander}
                        disabled={isFormPending}
                    />
                </Dialog>
            </Show>
            {selectedAchievementIndex !== undefined &&
                <Dialog close={() => setSelectedAchievementIndex(undefined)}>
                    <TrophyBoard
                        trophy={trophies[selectedAchievementIndex]}
                        remove={() => removeHandler(selectedAchievementIndex)}
                    />
                </Dialog>
            }
        </Card.Root>
    )
}

interface ITrophyProps {
    icon: React.JSX.Element,
    onClick?: () => any,
}

export function Trophy(props: ITrophyProps) {
    return (
        <Icon
            borderColor={'gray.400'}
            borderRadius={'sm'}
            borderWidth={'thin'}
            p={1}
            aspectRatio={'1/1'}
            h={'100%'}
            w={'auto'}
            _hover={{ bg: "gray.400", cursor: 'pointer' }}
            onClick={props.onClick}
        >
            {props.icon}
        </Icon>
    )
}

export type TTrophyIcon = 'sport' | 'cooking' | 'book' | 'flag' | 'plane' | 'bike';

interface ITrophyIconProps {
    iconName: TTrophyIcon,
}

function TrophyIcon(props: ITrophyIconProps) {
    switch (props.iconName) {
        case 'bike':
            return <LuBike />

        case "sport":
            return <LuBicepsFlexed />

        case "cooking":
            return <LuCookingPot />

        case "book":
            return <LuBook />

        case "flag":
            return <LuFlag />

        case "plane":
            return <LuPlane />

        default:
            return <LuSquircle />
    }
}

interface ITrophyBoardProps {
    trophy: WithId<ITrophy>,
    remove(): any,
}

function TrophyBoard(props: ITrophyBoardProps) {
    const { trophy, remove } = props;

    return (
        <Stack>
            <Heading>{trophy.title}</Heading>
            <Text>{trophy.description}</Text>
            <HStack>
                <Icon
                    onClick={remove}
                    w={25}
                    h={'auto'}
                    aspectRatio={'1/1'}
                >
                    <LuTrash2 />
                </Icon>
            </HStack>
        </Stack>
    )
}