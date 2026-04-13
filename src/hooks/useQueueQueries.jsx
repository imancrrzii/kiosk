import { createWebSocketConnection } from "@/services/socketServices";
import { useEffect, useRef, useCallback } from "react";

export const useWebSocket = (onMessage) => {
  const wsRef = useRef(null);

  const connect = useCallback(() => {
    const ws = createWebSocketConnection(onMessage);
    wsRef.current = ws;

    ws.onclose = () => {
      clearInterval(ws._pingInterval);
      setTimeout(connect, 2000);
    };
  }, [onMessage]);

  useEffect(() => {
    connect();
    return () => {
      clearInterval(wsRef.current?._pingInterval);
      wsRef.current?.close();
    };
  }, [connect]);
};