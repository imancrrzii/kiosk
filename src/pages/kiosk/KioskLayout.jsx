import { useState, useCallback, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useQueue } from "@/hooks/useQueue";
import { useNotification } from "@/hooks/useNotification";

export default function KioskLayout() {
  const navigate = useNavigate();
  const { services, takeQueue, isTakingQueue } = useQueue();
  const { show: showNotification } = useNotification();

  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");

  const [waiting, setWaiting] = useState([]);
  const [servicePreds, setServicePreds] = useState({});
  const rawPredsRef = useRef({});
  const servicesRef = useRef([]);

  useEffect(() => {
    if (services) {
      servicesRef.current = services;
      if (services.length > 0 && Object.keys(rawPredsRef.current).length > 0) {
        const mapped = {};
        Object.entries(rawPredsRef.current).forEach(([name, val]) => {
          const svc = services.find((s) => s.name === name);
          if (svc) mapped[svc.id] = val;
        });
        setServicePreds(mapped);
      }
    }
  }, [services]);

  const handleWebSocketMessage = useCallback((msg) => {
    if (msg.type !== "queue_update") return;

    setWaiting(msg.waiting || []);

    if (msg.service_predictions) {
      rawPredsRef.current = msg.service_predictions;
      const svcs = servicesRef.current;
      if (svcs.length > 0) {
        setServicePreds((prev) => {
          const next = { ...prev };
          Object.entries(msg.service_predictions).forEach(([name, val]) => {
            const svc = svcs.find((s) => s.name === name);
            if (svc) next[svc.id] = val;
          });
          return next;
        });
      }
    }
  }, []);

  useWebSocket(handleWebSocketMessage);

  const waitCount = (sid) => waiting.filter((q) => q.service_id === sid).length;
  const csService = services?.find((s) => s.name === "CS");
  const tellerService = services?.find((s) => s.name === "TELLER");

  const reset = () => {
    setResult(null);
    setErr("");
    navigate("/kiosk");
  };

  const handleTakeQueue = async (serviceId, queueType, extraData = {}) => {
    setErr("");
    try {
      const payload = { service_id: serviceId, queue_type: queueType, ...extraData };
      const response = await takeQueue(payload);

      if (response.responseCode === "201" && response.data) {
        setResult(response.data);
      } else {
        setErr(response.responseMessage || "Gagal mengambil antrian");
      }
    } catch (e) {
      setErr(e.message || "Terjadi kesalahan");
    }
  };

  const contextValue = {
    services,
    csService,
    tellerService,
    servicePreds,
    waiting,
    waitCount,
    result,
    err,
    isTakingQueue,
    handleTakeQueue,
    setErr,
    reset,
  };

  return <Outlet context={contextValue} />;
}