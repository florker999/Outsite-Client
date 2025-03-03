'use client'

import { logOut } from "@/lib/services/API";
import { deleteSession } from "@/lib/services/Cookie";
import { Button } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";

export default function LogoutButton() {
    const logout = async () => {
        await deleteSession(); 
        await logOut();
    }

    return (
        <Button onClick={logout}>
            <LuLogOut />
        </Button>

    )
}