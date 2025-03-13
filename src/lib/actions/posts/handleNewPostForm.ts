'use server'

import validateForm from "../../utils/validateForm";
import INewPostState from "@/lib/models/INewPostFormState";
import { INewPostForm } from "@/ui/NewPostForm";
import { addPost } from "./addPost";
import { revalidatePath } from "next/cache";
import ICreatePostRequest from "@/lib/models/ICreatePostRequest";

export async function handleNewPostForm(prevState: INewPostState, formData: FormData, hobbyId: string): Promise<INewPostState> {
    console.log("Server Action - Validate New Post Form");

    const formIsValid = validateForm<INewPostForm>(formData, ['title', 'content']);
    if (formIsValid) {
        const newPostForm: INewPostForm = extractFormFields(formData);
        const newPostRequest: ICreatePostRequest = {
            hobbyId,
            post: newPostForm
        }
        try {
            await addPost(newPostRequest);
            const nextFormState: INewPostState = {
                message: '',
                formData: new FormData(),
            };
            revalidatePath("/hobbies/[hobbyId]", 'page')
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

function extractFormFields(formData: FormData): INewPostForm {
    const form: INewPostForm = {
        title: formData.get('title') as string,
        content: formData.get('content') as string,
    };

    return form;
}