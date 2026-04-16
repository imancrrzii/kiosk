import { Navigate, Route, Routes } from "react-router-dom";
import Example from "../pages/Example";
import Kiosk from "../pages/Kiosk";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "@/pages/Login";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import Counter from "@/pages/Counter";
import TV from "@/pages/TV";

export default function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route exact path="/" element={<Example />} />
        <Route path="/kiosk" element={<Kiosk />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tv" element={<TV />} />
        <Route
          path="/counter"
          element={
            <ProtectedRoute allowedRoles={["TELLER", "CS"]}>
              <Counter />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <div>Admin Dashboard (Coming Soon)</div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </QueryClientProvider>
  );
}
