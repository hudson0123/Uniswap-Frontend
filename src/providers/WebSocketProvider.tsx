import React from 'react';
import { useEffect, useRef } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useQueryClient } from '@tanstack/react-query';
export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();
  const { data: currentUserData } = useCurrentUser();

  useEffect(() => {
    const connectWebSocket = () => {
      if (!currentUserData?.id || socketRef.current) return;

      const ws = new WebSocket(
        `ws://localhost:8000/ws/chat/${currentUserData?.id}/`
      );
      socketRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket: OPENED');
      };

      ws.onmessage = (event) => {
        console.log('WebSocket message received:', event.data);

        queryClient.invalidateQueries({ queryKey: ['conversationDetail'] });
        queryClient.invalidateQueries({ queryKey: ['conversations'] });

        setTimeout(() => {
          connectWebSocket();
        }, 3000);
      };

      ws.onclose = () => {
        console.log('WebSocket: CLOSED');
      };

      return () => {
        ws.close();
      };
    };

    connectWebSocket();
  }, [currentUserData?.id, queryClient]);

  return <div>{children}</div>;
}
