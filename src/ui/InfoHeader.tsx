'use client'

import { HoverCardContent, HoverCardRoot, HoverCardTrigger } from "@/components/ui/hover-card";
import { Center, Heading, Text } from "@chakra-ui/react";
import React from "react"
import { LuDelete, LuInfo } from "react-icons/lu";

interface IProps {
    text: string,
    info?: string,
    children?: React.JSX.Element[] | React.JSX.Element
}

export default function InfoHeading(props: IProps) {
    const { text, info } = props;

    return (
        <Center gap={3}>
            <Heading textStyle={'3xl'}>
                {text}
            </Heading>
            {info &&
                <HoverCardRoot>
                    <HoverCardTrigger>
                        <LuInfo />
                    </HoverCardTrigger>
                    <HoverCardContent padding={5}>
                        <Text>{info}</Text>
                    </HoverCardContent>
                </HoverCardRoot>
            }
            {props.children}
        </Center>
    )
}