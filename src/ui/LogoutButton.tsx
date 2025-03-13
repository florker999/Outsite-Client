'use client'

import { logOut } from "@/lib/services/API";
import { deleteSession } from "@/lib/services/Cookie";
import { Button } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

export default function LogoutButton() {
    const logout = async () => {
        await deleteSession(); 
        redirect('/');
        // await logOut();
    }

    return (
        <Button onClick={logout} padding={5}>
            <LuLogOut />
        </Button>

    )
}