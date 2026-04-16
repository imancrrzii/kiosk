import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faUser,
  faRightFromBracket,
  faWifi3,
  faCircleCheck,
  faClock,
  faPhoneVolume,
  faForward,
  faRotateRight,
  faSquare,
  faPlay,
  faSlidersH,
  faAdjust,
} from "@fortawesome/free-solid-svg-icons";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useNotification } from "@/hooks/useNotification";
import { useAuth } from "@/hooks/useAuth";
import { useCounter } from "@/hooks/useCounter";
import Button from "@/components/ui/Button";
import NotificationContainer from "@/components/ui/NotificationContainer";
import { QueueTypeBadge } from "@/components/ui/QueueTypeBadge";
import { StatusBadge } from "@/components/counter/StatusBadge";
import { QueueSidebar } from "@/components/counter/QueueSidebar";
import { StatsPanel } from "@/components/counter/StatsPanel";
import { useNavigate } from "react-router-dom";

export default function Counter() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const {
    counter,
    stats,
    refreshCounter,
    counterLogin,
    counterLogout,
    callNext,
    markDone,
    skip,
    recall,
    isLoginLoading,
    isCallNextLoading,
  } = useCounter();

  const [qState, setQState] = useState({
    waiting: [],
    called: [],
    counters: [],
    service_predictions: {},
    queue_type_stats: {},
  });

  const { notifications, show: showNotification, hide: hideNotification } = useNotification();

  // WebSocket handler
  const handleWebSocketMessage = useCallback(
    (msg) => {
      if (msg.type === "queue_update") {
        setQState(msg);
        refreshCounter();
      }
    },
    [refreshCounter],
  );

  useWebSocket(handleWebSocketMessage);

  // Counter Actions dengan Notification
  const handleCounterLogin = async () => {
    try {
      await counterLogin();
      showNotification("Counter aktif!", "success");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const handleCounterLogout = async () => {
    try {
      await counterLogout();
      showNotification("Counter offline", "info");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const handleCallNext = async () => {
    try {
      const data = await callNext();
      showNotification(
        data.queue ? `Memanggil ${data.queue.queue_number}` : "Tidak ada antrian",
        data.queue ? "success" : "info",
      );
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const handleMarkDone = async () => {
    try {
      await markDone();
      showNotification("Selesai melayani", "success");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const handleSkip = async () => {
    try {
      const data = await skip();
      showNotification(data.queue ? `Skip → ${data.queue.queue_number}` : "Skip, kosong", "info");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const handleRecall = async () => {
    try {
      await recall();
      showNotification("Antrian dipanggil ulang", "info");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
      showNotification("Anda telah keluar", "info");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  // Computed values
  const isBusy = counter?.status === "BUSY";
  const isOffline = !counter || counter.status === "OFFLINE";
  const myService = user?.role;
  const myWaiting = qState.waiting.filter((q) => myService === "ADMIN" || q.service_name === myService);

  const currentQueueDetail = (() => {
    if (!counter?.current_queue_id) return null;
    return qState.called.find((q) => q.id === counter.current_queue_id) || null;
  })();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <NotificationContainer notifications={notifications} onClose={hideNotification} />

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              user?.role === "TELLER" ? "bg-sky-500" : "bg-purple-500"
            }`}
          >
            <FontAwesomeIcon icon={user?.role === "TELLER" ? faMoneyBill : faUser} className="text-white" size="sm" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">{user?.name}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">
              {user?.role} · {user?.counter_name || "Tidak ada meja"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={counter?.status || "OFFLINE"} />
          <Button variant="clean" size="small" onClick={handleLogout} leftIcon={faRightFromBracket} label="Keluar" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-[1fr_300px] gap-6">
        <div className="space-y-5">
          {/* Counter Panel */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
              <FontAwesomeIcon icon={faSlidersH} size="sm" />
              Panel Meja — {counter?.counter_name || "—"}
            </div>

            {isOffline ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <FontAwesomeIcon icon={faWifi3} className="text-gray-300" size="3x" />
                </div>
                <p className="text-gray-400 mb-6 text-sm">Counter offline. Klik tombol di bawah untuk mulai bertugas.</p>
                <Button
                  onClick={handleCounterLogin}
                  disabled={isLoginLoading}
                  size="large"
                  variant="primary"
                  leftIcon={faPlay}
                  label="Mulai Bertugas"
                  className="w-full"
                />
              </div>
            ) : (
              <>
                <div
                  className={`rounded-2xl p-6 text-center mb-5 transition-all ${
                    isBusy ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-100"
                  }`}
                >
                  {isBusy ? (
                    <>
                      <div className="flex items-center justify-center gap-1.5 text-xs text-sky-500 font-semibold tracking-widest uppercase mb-2">
                        <FontAwesomeIcon icon={faAdjust} size="sm" />
                        Sedang Dilayani
                      </div>
                      <div className="text-8xl font-black text-sky-600 leading-none">{counter.current_queue_number}</div>
                      {currentQueueDetail?.queue_type && (
                        <div className="mt-3 flex justify-center">
                          <QueueTypeBadge queueType={currentQueueDetail.queue_type} />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center mb-3">
                        <FontAwesomeIcon icon={faClock} className="text-gray-300" size="3x" />
                      </div>
                      <div className="text-gray-400 text-sm">Meja kosong — siap menerima antrian berikutnya</div>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleCallNext}
                    disabled={isCallNextLoading}
                    size="large"
                    variant="primary"
                    leftIcon={faPhoneVolume}
                    label={isBusy ? "Selesai & Panggil Berikutnya" : "Panggil Antrian Berikutnya"}
                    className="w-full"
                  />
                  {isBusy && (
                    <>
                      <Button
                        variant="orange"
                        onClick={handleRecall}
                        leftIcon={faRotateRight}
                        label="Panggil Ulang"
                        size="medium"
                        className="w-full"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="success"
                          onClick={handleMarkDone}
                          leftIcon={faCircleCheck}
                          label="Tandai Selesai"
                          size="medium"
                          className="w-full"
                        />
                        <Button
                          variant="rose"
                          onClick={handleSkip}
                          leftIcon={faForward}
                          label="Lewati"
                          size="medium"
                          className="w-full"
                        />
                      </div>
                    </>
                  )}
                  <Button
                    variant="outline"
                    onClick={handleCounterLogout}
                    leftIcon={faSquare}
                    label="Akhiri Sesi"
                    size="medium"
                    className="w-full"
                  />
                </div>
              </>
            )}
          </div>

          <StatsPanel stats={stats} />
        </div>

        {/* Sidebar - Queue List */}
        <QueueSidebar waiting={myWaiting} />
      </div>
    </div>
  );
}
