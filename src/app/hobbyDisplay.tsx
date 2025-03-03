import DbClient from "@/lib/services/API"
import HobbyCard from "@/ui/hobbyCard/HobbyCard";
import { Text } from "@chakra-ui/react";

interface IProps {
    isLoggedIn: boolean;
}

export default async function HobbyDisplay(props: IProps) {
    const hobbies = props.isLoggedIn ? await new DbClient().getHobbies() : undefined;

    return hobbies ?
        hobbies.length === 0 ?
            <Text>There are no hobbies yet</Text>
            :
            hobbies.map((hobby, index) => (
                <HobbyCard key={index} hobby={hobby} />
            ))
        :
        <Text>Not logged in</Text>
}