"use client";

import { ReactNode } from "react";
import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";

interface NotificationProviderProps {
  children: ReactNode;
  userToken?: string;
  userId: string;
}

export function NotificationProvider({
  children,
  userId,
  userToken,
}: NotificationProviderProps) {
  console.log(userId);
  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY || ""}
      userId={userId}
      userToken={userToken}
    >
      <KnockFeedProvider
        feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID || ""}
      >
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}
