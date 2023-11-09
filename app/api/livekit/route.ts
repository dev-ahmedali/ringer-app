import { NextRequest, NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get("room");
  const username = req.nextUrl.searchParams.get("username");
  if (!room) {
    return NextResponse.json("Missing 'room' query parameter", {
      status: 400,
    });
  } else if (!username) {
    return NextResponse.json('Missing "username" query parameter', {
      status: 400,
    });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wssUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wssUrl) {
    return NextResponse.json("Server misconfigured", {
      status: 500,
    });
  }
  const at = new AccessToken(apiKey, apiSecret, { identity: username });
  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });
  return NextResponse.json({ token: at.toJwt() });
}
