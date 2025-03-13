import React, { Suspense } from "react";
import { Center, Flex, Stack, Text } from "@chakra-ui/react";
import HobbyGallery from "@/ui/hobbyGallery/HobbyGallery";
import HobbyGallerySkeleton from "@/ui/hobbyGallery/HobbyGallerySkeleton";
import getHobbies from "@/lib/actions/hobbies/getHobbies";
import { getSessionField } from "@/lib/services/Cookie";
import WithId from "@/lib/models/WithId";
import IHobby from "@/lib/models/IHobby";

interface IProps {
}

export default async function Home(props: IProps) {
  const isLoggedIn = await getSessionField('isLoggedIn') as boolean;
  const hobbiesPromise: Promise<WithId<IHobby>[]> | undefined = isLoggedIn ? getHobbies() : undefined;

  return (
    <Center paddingTop={25}>
      <Stack maxW={800}>
        <Flex wrap={'wrap'} columnGap={25} rowGap={25}>
          <Suspense fallback={<HobbyGallerySkeleton />}>
            {hobbiesPromise ?
              <HobbyGallery hobbies={hobbiesPromise} />
              :
              <Text>User not logged in.</Text>
            }
          </Suspense>
        </Flex >
      </Stack>
    </Center>
  );
}
