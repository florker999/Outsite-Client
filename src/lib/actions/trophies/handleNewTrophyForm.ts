'use server'

import validateForm from "../../utils/validateForm";
import { addTrophy } from "./addTrophy";
import IFormState from "@/lib/models/IFormState";
import { ITrophyForm, TTrophyIcon } from "@/ui/TrophiesGallery";
import WithId from "@/lib/models/WithId";
import ITrophy from "@/lib/models/ITrophy";

export async function handleNewTrophyForm(prevState: IFormState, formData: FormData, hobbyId: string): Promise<WithId<ITrophy>> {
    console.log("Server Action - Validate New Trophy Form");

    const formIsValid = validateForm<ITrophyForm>(formData, ['title', 'description', 'iconType']);
    if (formIsValid) {
        const newTrophyForm: ITrophyForm = extractFormFields(formData);

        try {
            const addTrophyRes = await addTrophy({ ...newTrophyForm, hobbyId });
            const nextFormState: IFormState = {
                message: '',
                formData: new FormData(),
            };
            // revalidatePath('/hobbies/[hobbyId]', 'page')
            const newTrophy: WithId<ITrophy> = {
                title: newTrophyForm.title,
                description: newTrophyForm.description,
                iconType: newTrophyForm.iconType as TTrophyIcon,
                isGained: false,
                hobbyId,
                _id: addTrophyRes
            }
            return newTrophy;

        } catch (error) {
            console.error("Failed to create new trophy: ", error);
            throw new Error("Could not create new trophy.");
        }
    }
    throw new Error("Form is invalid.");
}

function extractFormFields(formData: FormData): ITrophyForm {
    const form: ITrophyForm = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        iconType: formData.get('iconType') as string,
    };

    return form;
}