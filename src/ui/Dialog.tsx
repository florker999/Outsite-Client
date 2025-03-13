import React from "react";
import { DialogRoot, DialogContent, DialogCloseTrigger, DialogBody } from "@/components/ui/dialog";
import { CloseButton } from "@/components/ui/close-button";

interface IProps {
    close(): any,
    children?: React.JSX.Element | React.JSX.Element[]
}
export default function Dialog(props: IProps) {
    return (
        <DialogRoot open={true} placement={'center'}>
            <DialogContent padding={15}>
                <DialogCloseTrigger>
                    <CloseButton onClick={props.close} />
                </DialogCloseTrigger>
                <DialogBody mt={4}>
                    {props.children}
                </DialogBody>
            </DialogContent>
        </DialogRoot>

    )
}