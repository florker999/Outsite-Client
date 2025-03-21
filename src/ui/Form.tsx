'use client'

import { PasswordInput, PasswordStrengthMeter } from "@/components/ui/password-input";
import ValueAssessor from "@/lib/utils/ValueAssessor";
import { Fieldset, Field, Input, Stack, Button, Container, FieldErrorText, RadioCard, For, HStack } from "@chakra-ui/react";
import React, { JSX } from "react";

interface IRadioChoices {
    value: string,
    element: React.JSX.Element,
}

type TFieldType = 'text' | 'password' | 'radio';
interface IGeneralField<FormStructure> {
    title: string,
    key: keyof FormStructure & string,
    value?: string,
    invalid?: boolean,
    invalidText?: string,
    required?: boolean,
    disabled?: boolean,
    type?: TFieldType,
    onChange?: (value: string) => any,
}

interface IRadioField<FormStructure> extends IGeneralField<FormStructure> {
    type: 'radio',
    choices: IRadioChoices[],
    defaultChoice?: string,
}

interface IPasswortField<FormStructure> extends IGeneralField<FormStructure> {
    type: 'password',
    strengthIndicatorOptions?: IStrengthIndicatorOptions,
}

interface IStrengthIndicatorOptions {
    assessor: ValueAssessor,

    /** Default 4 */
    max?: number,
}

interface IField<FormStructure> extends IGeneralField<FormStructure> {
    type?: 'text'
}

type TField<FormStructure> = IField<FormStructure> | IRadioField<FormStructure> | IPasswortField<FormStructure>

interface IButton {
    title: string,
    onClick(): any,
}

interface IProps<FormStructure> {
    children?: JSX.Element,
    title: string,
    description?: string,
    fields: TField<FormStructure>[],
    submitButtonTitle: string,
    buttons?: IButton[],
    formAction: string | ((formData: FormData) => void | Promise<void>),
    disabled?: boolean,
    formData?: FormData,
}

export default function Form<FormStructure>(props: IProps<FormStructure>) {
    const { title, description, fields, submitButtonTitle, buttons, formAction, disabled } = props;
    const [passwordStrength, setPasswordStrength] = React.useState(0);

    return (
        <Container padding={5}>
            <Fieldset.Root disabled={disabled}>
                <Fieldset.Legend fontWeight={'bold'} fontSize={'2xl'}>{title}</Fieldset.Legend>
                {description &&
                    <Fieldset.HelperText>{description}</Fieldset.HelperText>
                }
                <form action={formAction}>
                    <Fieldset.Content mt={5}>
                        {fields.map(field => (
                            <Field.Root
                                key={field.key}
                                invalid={field.invalid}
                                required={field.required}
                                disabled={field.disabled}
                            >
                                <Field.Label>
                                    {field.title}
                                    {field.required &&
                                        <Field.RequiredIndicator />
                                    }
                                </Field.Label>
                                {field.type === 'password' ?
                                    <>
                                        <PasswordInput
                                            name={field.key}
                                            defaultValue={field.value}
                                            padding={3}
                                            onChange={e => field.strengthIndicatorOptions ? setPasswordStrength(field.strengthIndicatorOptions.assessor.assess(e.currentTarget.value)) : undefined}
                                        />
                                        {field.strengthIndicatorOptions &&
                                            <PasswordStrengthMeter
                                                max={field.strengthIndicatorOptions.assessor.maxAssessment}
                                                value={passwordStrength}
                                                w={'100%'}
                                            />
                                        }
                                    </>
                                    :
                                    field.type === 'radio' ?
                                        <RadioCard.Root
                                            defaultValue={field.defaultChoice || field.choices[0]?.value}
                                            name={field.key}
                                        >
                                            <HStack>
                                                <For each={field.choices}>
                                                    {(choice) => (
                                                        <RadioCard.Item value={choice.value}>
                                                            <RadioCard.ItemHiddenInput />
                                                            <RadioCard.ItemControl>
                                                                <RadioCard.ItemContent>
                                                                    {choice.element}
                                                                </RadioCard.ItemContent>
                                                            </RadioCard.ItemControl>
                                                        </RadioCard.Item>
                                                    )}
                                                </For>
                                            </HStack>
                                        </RadioCard.Root>
                                        :
                                        <Input
                                            name={field.key}
                                            defaultValue={field.value || props.formData?.get(field.key)?.toString()}
                                            type={field.type}
                                            padding={3}
                                            onChange={e => field.onChange && field.onChange(e.currentTarget.value)}
                                        />
                                }
                                {field.invalidText &&
                                    <FieldErrorText>{field.invalidText}</FieldErrorText>
                                }
                            </Field.Root>
                        ))}
                    </Fieldset.Content>
                    <Stack direction={'row'} mt={5}>
                        <Button
                            w={'auto'}
                            type='submit'
                            p={5}
                        >
                            {submitButtonTitle}
                        </Button>
                        {buttons?.map((button, i) => (
                            <Button
                                w={'auto'}
                                onClick={button.onClick}
                                key={i}
                                p={5}
                            >
                                {button.title}
                            </Button>
                        ))}
                    </Stack>
                </form>
            </Fieldset.Root>
        </Container>
    )
}