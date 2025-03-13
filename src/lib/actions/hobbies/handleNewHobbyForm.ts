'use server'

import validateForm from "../../utils/validateForm";
import { INewHobbyForm } from "@/ui/hobbyGallery/HobbyGallery";
import { addHobby } from "./addHobby";
import { revalidatePath } from "next/cache";
import IFormState from "@/lib/models/IFormState";
import { IHobbyFormState } from "@/ui/NewHobbyForm";

export async function handleNewHobbyForm(prevState: IHobbyFormState, formData: FormData): Promise<IHobbyFormState> {
    console.log("Server Action - Handle New Hobby Form");

    const formIsValid = validateForm<INewHobbyForm>(formData, ['name', 'description']);
    if (formIsValid) {
        const newHobbyForm: INewHobbyForm = extractFormFields(formData);
        try {
            const addHobbyRes = await addHobby({ hobby: newHobbyForm });
            const nextFormState: IHobbyFormState = {
                message: '',
                formData: new FormData(),
                isSuccessful: true,
            };
            revalidatePath('./')
            return nextFormState;

        } catch (error) {
            console.error("Failed to create new hobby: ", error);
            return {
                message: "Could not create new hobby.",
                formData
            };
        }
    }

    return {
        message: "Form is invalid.",
        formData
    };
}

function extractFormFields(formData: FormData): INewHobbyForm {
    const form: INewHobbyForm = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
    };

    return form;
}