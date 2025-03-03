"use client";

import {
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { useRef, useState } from "react";
import "@knocklabs/react/dist/index.css";

export function NotificationFeedWrapper() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  return (
    <>
      <NotificationIconButton
        ref={notifButtonRef}
        onClick={() => setIsVisible(!isVisible)}
      />
      <NotificationFeedPopover
        buttonRef={notifButtonRef}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </>
  );
}
