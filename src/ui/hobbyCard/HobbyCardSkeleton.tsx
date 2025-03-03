import { SkeletonText } from "@/components/ui/skeleton";
import { Card } from "@chakra-ui/react";

export default function HobbyCardSkeleton() {
    return (
        <Card.Root size={'md'} variant={'subtle'} w={300} padding={15}>
            <Card.Body gap={2}>
                <SkeletonText noOfLines={1} />
                <SkeletonText noOfLines={3} />
            </Card.Body>
        </Card.Root>
    );
}