'use client'

import React from "react";
import Form from "./Form";
import { handleNewPostForm } from "@/lib/actions/posts/handleNewPostForm";
import INewPostState from "@/lib/models/INewPostFormState";
import { useParams } from "next/navigation";

export interface INewPostForm {
    title: string,
    content: string,
}

interface IProps {
}

export default function NewPostForm(props: IProps) {
    const { hobbyId } = useParams<{ hobbyId: string }>();
    const [newPostFormState, newPostAction, isFormPending] = React.useActionState((arg1: INewPostState, arg2: FormData) => handleNewPostForm(arg1, arg2, hobbyId), { message: '', formData: new FormData() });

    return (
        <Form<INewPostForm>
            title="New post"
            fields={[
                {
                    title: "Title",
                    key: "title"
                },
                {
                    title: "Content",
                    key: "content"
                }
            ]}
            submitButtonTitle={"Publish"}
            formAction={newPostAction}
            disabled={isFormPending}
            formData={newPostFormState.formData}
        />
    )
}