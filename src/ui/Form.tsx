'use client'

import { Fieldset, Field, Input, Stack, Button } from "@chakra-ui/react";
import React, { JSX, Ref, RefObject } from "react";

interface IField {
    title: string,
    key: string,
}

interface IRefField extends IField {
    ref: RefObject<HTMLInputElement | null>
}

interface IButton {
    title: string,
    onClick(): any,
}

interface IProps {
    children?: JSX.Element,
    title: string,
    description?: string,
    fields: IField[],
    submitButton: { title: string, onClick: (data: any) => Promise<boolean> },
    buttons?: IButton[]
}

export default function Form(props: IProps) {
    const { title, description, fields, submitButton, buttons } = props;
    const fieldRefs = fields.map<IRefField>(field => ({
        ...field,
        ref: React.useRef<HTMLInputElement>(null)
    }));

    const sendData = async () => {
        const o: any = {};
        for (const fieldRef of fieldRefs) {
            if (fieldRef.ref.current)
                o[fieldRef.key] = fieldRef.ref.current.value;
        }
        const res: boolean = await props.submitButton.onClick(o);
        if (res) {
            for (const fieldRef of fieldRefs) {
                if (fieldRef.ref.current)
                    fieldRef.ref.current.value = '';
            }
        }
    }

    return (
        <Fieldset.Root>
            <Fieldset.Legend fontWeight={'bold'}>{title}</Fieldset.Legend>
            {description &&
                <Fieldset.HelperText>{description}</Fieldset.HelperText>
            }
            <Fieldset.Content>
                {fieldRefs.map(field => (
                    <Field.Root key={field.key}>
                        <Field.Label>{field.title}</Field.Label>
                        <Input ref={field.ref} />
                    </Field.Root>
                ))}
            </Fieldset.Content>
            <Stack direction={'row'}>
                <Button
                    w={100}
                    onClick={sendData}
                >
                    {submitButton.title}
                </Button>
                {buttons?.map((button, i) => (
                    <Button
                        w={100}
                        onClick={button.onClick}
                        key={i}
                    >
                        {button.title}
                    </Button>
                ))}
            </Stack>
        </Fieldset.Root>

    )
}