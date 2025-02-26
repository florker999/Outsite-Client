import IPost from "@/lib/models/IPost";
import WithId from "@/lib/models/WithId";
import { Button, CardBody, CardFooter, CardHeader, CardRoot, CardTitle, Link, Text } from "@chakra-ui/react";

interface IProps {
    post: WithId<IPost>;
}

export default function PostCard(props: IProps) {
    const { post } = props;

    return (
        <CardRoot padding={15} width={250}>
            <CardHeader>
                <CardTitle>
                    {post.title}
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Text>{post.content}</Text>
            </CardBody>
            <CardFooter>
                <Link href={`/hobbies/${post.hobbyId}/posts/${post._id}`}>
                    <Button>View more</Button>
                </Link>
            </CardFooter>
        </CardRoot>
    );
}