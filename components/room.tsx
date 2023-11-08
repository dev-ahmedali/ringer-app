"use client";

import "@livekit/components-styles";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Channel } from "@prisma/client";
import { Loader2 } from "lucide-react";

interface RoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const Room = ({ chatId, video, audio }: RoomProps) => {
  const { user } = useUser();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return;

    const name = `${user.firstName} ${user.lastName}`;
    (async () => {
      try {
        const res = await fetch(
          `/api/get-participant-token?room=${chatId}&username=${name}`,
        );
        const data = await res.json();
        setToken(data.token);
      } catch (e) {
        console.log(e);
      }
    });
  }, [chatId, user?.firstName, user?.lastName]);

  if(token === "") {
    return (
        <div className="flex flex-col justify-center items-center">
            <Loader2 className="h-7 w-7 text-zinc-500 animate-spin"/>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
        </div>
    )
  }
  return (
    <LiveKitRoom data-lk-theme="default" serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} token={token} connect={true} video={video} audio={audio}>
        <VideoConference/>
    </LiveKitRoom>
  )
};
