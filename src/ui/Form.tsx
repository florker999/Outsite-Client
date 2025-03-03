'use client'

import { Fieldset, Field, Input, Stack, Button, Container } from "@chakra-ui/react";
import React, { JSX, RefObject } from "react";

interface IField<FormData> {
    title: string,
    key: keyof FormData & string,
}

interface IRefField<FormData> extends IField<FormData> {
    ref: RefObject<HTMLInputElement | null>
}

interface IButton {
    title: string,
    onClick(): any,
}

interface IProps<FormData> {
    children?: JSX.Element,
    title: string,
    description?: string,
    fields: IField<FormData>[],
    submitButton: { title: string, onClick: (data: FormData) => Promise<boolean> },
    buttons?: IButton[]
}

export default function Form<FormData>(props: IProps<FormData>) {
    const { title, description, fields, submitButton, buttons } = props;
    const fieldRefs = fields.map<IRefField<FormData>>(field => ({
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
        <Container padding={5}>
            <Fieldset.Root >
                <Fieldset.Legend fontWeight={'bold'} fontSize={'2xl'}>{title}</Fieldset.Legend>
                {description &&
                    <Fieldset.HelperText>{description}</Fieldset.HelperText>
                }
                <Fieldset.Content mt={5}>
                    {fieldRefs.map(field => (
                        <Field.Root key={field.key}>
                            <Field.Label>{field.title}</Field.Label>
                            <Input ref={field.ref} />
                        </Field.Root>
                    ))}
                </Fieldset.Content>
                <Stack direction={'row'} mt={5}>
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
        </Container>
    )
}