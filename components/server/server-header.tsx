'use client';

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    role?: MemberRole
}

export const ServerHeader = ({
    server,
    role
}: ServerHeaderProps) => {
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR
    return (
       <DropdownMenu>
            <DropdownMenuTrigger></DropdownMenuTrigger>
       </DropdownMenu>
    )
}