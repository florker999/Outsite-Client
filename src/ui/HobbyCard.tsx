import { Button, CardBody, CardFooter, CardHeader, CardRoot, Link, Text } from "@chakra-ui/react";

interface IProps {
    name: string;
}

export default function HobbyCard(props: IProps) {
    return (
        <CardRoot>
            <CardHeader>{props.name}</CardHeader>
            <CardBody>
                <Text>Hobby icon</Text>
            </CardBody>
            <CardFooter>
                <Button>View more</Button>
            </CardFooter>
        </CardRoot>
    );
}