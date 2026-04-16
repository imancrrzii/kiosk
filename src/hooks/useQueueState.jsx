import { useState, useCallback, useRef, useEffect } from "react";
import { useWebSocket } from "./useWebSocket";

export const useQueueState = () => {
  const [state, setState] = useState({
    counters: [],
    waiting: [],
    called: [],
    service_predictions: {},
    queue_type_stats: {},
  });

  const [flash, setFlash] = useState(null);
  const prevCalledRef = useRef([]);
  const audioRef = useRef(null);

  // Beep sound for new queue call
  const beep = useCallback(() => {
    try {
      if (!audioRef.current) audioRef.current = new AudioContext();
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    } catch (_) {}
  }, []);

  // WebSocket message handler
  const handleWebSocketMessage = useCallback(
    (msg) => {
      if (msg.type !== "queue_update") return;

      // Check for new called queues
      const newCalled = msg.called.filter(
        (q) => !prevCalledRef.current.find((p) => p.id === q.id)
      );

      if (newCalled.length > 0) {
        setFlash(newCalled[0]);
        beep();
        setTimeout(() => setFlash(null), 4500);
      }

      prevCalledRef.current = msg.called;
      setState(msg);
    },
    [beep]
  );

  // Connect to WebSocket
  useWebSocket(handleWebSocketMessage);

  return {
    state,
    flash,
    clearFlash: () => setFlash(null),
  };
};