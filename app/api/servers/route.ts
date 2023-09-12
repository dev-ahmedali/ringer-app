import {v4 as uuidv4} from "uuid"

import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {name, imageUrl} = await req.json();
        const proflle = await CurrentProfile();

        if(!proflle) {
            return new NextResponse("Unauthorized", {status: 401});
        }
    } catch (error) {
        console.log("[SERVERS_POST]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}