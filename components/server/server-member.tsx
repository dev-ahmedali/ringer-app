"use client";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 text-indigo-500 ml-2" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 text-rose-500 ml-2" />,
};

export const ServerMember = ({ member, server }: ServerMemberProps) => {
  return <div>Server Members</div>;
};
