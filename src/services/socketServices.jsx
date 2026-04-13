import { WS_BASE_URL } from "@/constant/api";

export const createWebSocketConnection = (onMessage) => {
  const ws = new WebSocket(`${WS_BASE_URL}/ws/queue`);

  ws.onopen = () => {
    ws._pingInterval = setInterval(() => {
      if (ws.readyState === 1) {
        ws.send("ping");
      }
    }, 25000);
  };

  ws.onmessage = ({ data }) => {
    if (data === "ping") {
      ws.send("pong");
      return;
    }
    try {
      onMessage(JSON.parse(data));
    } catch (_) {}
  };

  ws.onclose = () => {
    clearInterval(ws._pingInterval);
  };

  ws.onerror = () => {
    ws.close();
  };

  return ws;
};