'use client'

import React from "react";
import HobbyCard from "@/ui/HobbyCard";
import { Button, Center, Field, Fieldset, Flex, HStack, Input, Stack, Text } from "@chakra-ui/react";
import DbClient from "@/lib/services/DbClient";
import WithId from "@/lib/models/WithId";
import IHobby from "@/lib/models/IHobby";
import NewHobbyCard from "@/ui/NewHobbyCard";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CloseButton } from "@/components/ui/close-button";

export default function Home() {
  const [hobbies, setHobbies] = React.useState<WithId<IHobby>[]>();
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const hobbyNameRef = React.useRef<HTMLInputElement>(null);
  const hobbyDescriptionRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    new DbClient().getHobbies()
      .then(fetchedHobbies => setHobbies(fetchedHobbies))
      .catch(err => console.log("User not logged in: " + err))

  }, []);

  const addHobby = async () => {
    const hobbyDescriptionNode = hobbyDescriptionRef.current;
    if (hobbyNameRef.current !== null && hobbyNameRef.current.value && true && hobbyDescriptionNode && hobbyDescriptionNode.value) {
      const hobbyId = await new DbClient().createHobby({
        hobby: {
          name: hobbyNameRef.current.value,
          description: hobbyDescriptionNode.value
        }
      });
      const newHobby: WithId<IHobby> = {
        _id: hobbyId,
        name: hobbyNameRef.current.value,
        description: hobbyDescriptionNode.value,
        enthusiastId: ''
      };

      const nextHobbies: WithId<IHobby>[] = [...(hobbies || []), newHobby];
      setHobbies(nextHobbies);
      setIsFormOpen(false);
    }
  };

  return (
    <Center paddingTop={25}>
      <DialogRoot open={isFormOpen} placement={'center'}>
        <DialogContent padding={15}>
          <DialogCloseTrigger>
            <CloseButton onClick={() => setIsFormOpen(false)} />
          </DialogCloseTrigger>
          <DialogHeader>
            <DialogTitle>New hobby</DialogTitle>
          </DialogHeader>
          <DialogBody mt={4}>
            <Fieldset.Root>
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>Name</Field.Label>
                  <Input ref={hobbyNameRef} />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Description</Field.Label>
                  <Input ref={hobbyDescriptionRef} />
                </Field.Root>
              </Fieldset.Content>
              <HStack marginTop={15}>
                <Button w={50} onClick={addHobby}>Add</Button>
              </HStack>
            </Fieldset.Root>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
      <Stack maxW={800}>
        <Flex wrap={'wrap'} columnGap={25} rowGap={25}>
          {
            hobbies ?
              hobbies.map((hobby, index) => (
                <HobbyCard key={index} hobby={hobby} />
              ))
              :
              <Text>Loading</Text>
          }
          <NewHobbyCard onClick={() => setIsFormOpen(!isFormOpen)} />
        </Flex >
      </Stack>
    </Center>
  );
}
