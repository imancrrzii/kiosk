import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAuth } from "@/hooks/useAuth";
import { useCounter } from "@/hooks/useCounter";
import { useNotification } from "@/hooks/useNotification";
import NotificationContainer from "@/components/ui/NotificationContainer";

const Layout = () => {
  const { user, logout } = useAuth();
  const { counter } = useCounter();
  const navigate = useNavigate();
  const { notifications, show: showNotification, hide: hideNotification } = useNotification();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
      showNotification("Anda telah keluar", "info");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  return (
    <div className="relative flex min-h-screen max-w-screen bg-gray-50">
      <NotificationContainer notifications={notifications} onClose={hideNotification} />

      <div className="flex flex-col flex-1 min-h-screen bg-gray-50 transition-[margin] duration-300 overflow-x-hidden">
        <Header
          user={user}
          counterStatus={counter?.status}
          onLogout={handleLogout}
          showCounterInfo={user?.role === "TELLER" || user?.role === "CS"}
        />

        <main className="flex-1 bg-gray-50 pt-20">
          <div className="h-full w-full p-3 lg:pb-4 lg:pt-0 lg:px-4">
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
