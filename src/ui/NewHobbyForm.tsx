'use client'

import React from "react";
import { INewHobbyForm } from "./hobbyGallery/HobbyGallery";
import Form from "./Form";
import { handleNewHobbyForm } from "@/lib/actions/hobbies/handleNewHobbyForm";
import { DialogRoot, DialogContent, DialogCloseTrigger, DialogBody } from "@/components/ui/dialog";
import { CloseButton } from "@/components/ui/close-button";
import IFormState from "@/lib/models/IFormState";

interface IProps {
    close(): any,
}

export interface IHobbyFormState extends IFormState {
    isSuccessful?: boolean
}

export default function NewHobbyForm(props: IProps) {
    const [newHobbyFormState, newHobbyAction, isFormPending] = React.useActionState(handleNewHobbyForm, { message: '', formData: new FormData() });

    React.useEffect(() => {
        if (newHobbyFormState.isSuccessful)
            props.close();

    }, [newHobbyFormState]);

    return (
        <DialogRoot open={true} placement={'center'}>
            <DialogContent padding={15}>
                <DialogCloseTrigger>
                    <CloseButton onClick={props.close} />
                </DialogCloseTrigger>
                <DialogBody mt={4}>
                    <Form<INewHobbyForm>
                        title={"New hobby"}
                        fields={[
                            {
                                title: 'Name',
                                key: 'name',
                                value: newHobbyFormState.formData.get('name')?.toString(),
                            },
                            {
                                title: 'Description',
                                key: 'description',
                                value: newHobbyFormState.formData.get('description')?.toString(),
                            }
                        ]}
                        submitButtonTitle={"Add"}
                        formAction={newHobbyAction}
                        disabled={isFormPending}
                    />
                </DialogBody>
            </DialogContent>
        </DialogRoot>

    )
}