import { useEffect, useRef } from 'react'

export default function useWebSocket(userId: string) {
  
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${userId}/`);
    socketRef.current = ws

    ws.onopen = () => {
      console.log("WebSocket: OPENED")
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket: Message - " + data)
    }

    ws.onclose = () => {
      console.log("WebSocket: CLOSED")
    }

    return () => {
      ws.close()
    };
  }, [userId])
}
