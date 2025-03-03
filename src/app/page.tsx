import React, { Suspense } from "react";
import { Center, Flex, Stack } from "@chakra-ui/react";
import HobbyGallery from "@/ui/hobbyGallery/HobbyGallery";
import HobbyGallerySkeleton from "@/ui/hobbyGallery/HobbyGallerySkeleton";
import getHobbies from "@/lib/actions/getHobbies";

export default async function Home() {
  const hobbiesPromise = getHobbies();

  return (
    <Center paddingTop={25}>
      <Stack maxW={800}>
        <Flex wrap={'wrap'} columnGap={25} rowGap={25}>
          <Suspense fallback={<HobbyGallerySkeleton />}>
            <HobbyGallery hobbies={hobbiesPromise} />
          </Suspense>
        </Flex >
      </Stack>
    </Center>
  );
}
