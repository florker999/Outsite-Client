import { Card, Center } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

interface IProps {
    onClick(): any
}

export default function NewHobbyCard(props: IProps) {

    return (
        <Card.Root
            size={'md'}
            variant={'subtle'}
            w={300}
            onClick={props.onClick}
            _hover={{ cursor: 'pointer' }}
        >
            <Center h={'100%'}>
                <FaPlus />
            </Center>
        </Card.Root>
    );
}