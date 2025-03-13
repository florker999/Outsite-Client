'use client'

import React from "react";
import { DialogRoot, DialogContent, DialogCloseTrigger, DialogBody } from "@/components/ui/dialog";
import { CloseButton } from "@/components/ui/close-button";
import NewPostForm from "./NewPostForm";

interface IProps {
    close(): any,
}
export default function NewPostDialog(props: IProps) {

    return (
        <DialogRoot open={true} placement={'center'}>
            <DialogContent padding={15}>
                <DialogCloseTrigger>
                    <CloseButton onClick={props.close} />
                </DialogCloseTrigger>
                <DialogBody mt={4}>
                    <NewPostForm />
                </DialogBody>
            </DialogContent>
        </DialogRoot>

    )
}