import React from "react";
import { useEffect, useRef } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketRef = useRef<WebSocket | null>(null);
  const { data: currentUserData } = useCurrentUser();

  useEffect(() => {
    if (!currentUserData?.id || socketRef.current) return;

    const ws = new WebSocket(
      `ws://localhost:8000/ws/chat/${currentUserData?.id}/`
    );
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket: OPENED");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket: Message - " + data);
    };

    ws.onclose = () => {
      console.log("WebSocket: CLOSED");
    };

    return () => {
      ws.close();
    };
  }, [currentUserData?.id]);

  return <div>{children}</div>;
}
