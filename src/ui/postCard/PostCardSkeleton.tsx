import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { CardRoot, Stack } from "@chakra-ui/react";

export default function PostCardSkeleton() {

    return (
        <CardRoot padding={15} width={250}>
            <Stack>
                <SkeletonText noOfLines={1} h={25} mb={2}/>
                <SkeletonText noOfLines={3} />
                <Skeleton w={55} h={25}/>
            </Stack>
        </CardRoot>
    );
}