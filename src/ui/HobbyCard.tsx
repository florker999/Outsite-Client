import IHobby from "@/lib/models/IHobby";
import WithId from "@/lib/models/WithId";
import { Button, Card, Link } from "@chakra-ui/react";

interface IProps {
    hobby: WithId<IHobby>;
}

export default function HobbyCard(props: IProps) {
    const hobbyUrl: string = "/hobbies/" + props.hobby._id;

    return (
        <Link href={hobbyUrl}>
            <Card.Root size={'md'} variant={'subtle'} w={300} padding={15}>
                <Card.Body gap={2}>
                    <Card.Title>{props.hobby.name}</Card.Title>
                    <Card.Description>{props.hobby.description}</Card.Description>
                </Card.Body>
            </Card.Root>
        </Link>
    );
}