import { Navigate, Route, Routes } from "react-router-dom";
import Example from "../pages/Example";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "@/pages/Login";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import Counter from "@/pages/Counter";
import TV from "@/pages/TV";
import ComponentUi from "../pages/ComponentUi";
import Dashboard from "../pages/Dashboard";
import Layout from "@/components/layouts/Layout";
import KioskLayout from "@/pages/kiosk/KioskLayout";
import KioskMainMenu from "@/pages/kiosk/KioskMainMenu";
import KioskAccountRegistration from "@/pages/kiosk/KioskAccountRegistration";
import KioskPayment from "@/pages/kiosk/KioskPayment";
import KioskQueue from "@/pages/kiosk/KioskQueue";
import KioskTopUp from "@/pages/kiosk/KioskTopup";

export default function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route exact path="/" element={<Example />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/kiosk" element={<KioskLayout />}>
          <Route index element={<KioskMainMenu />} />
          <Route path="account" element={<KioskAccountRegistration />} />
          <Route path="payment" element={<KioskPayment />} />
          <Route path="topup" element={<KioskTopUp />} />
          <Route path="queue" element={<KioskQueue />} />
        </Route>
        <Route path="/kiosk" element={<Kiosk />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tv" element={<TV />} />
        
        {/* Protected Route untuk Counter (TELLER & CS) */}
        <Route
          path="/counter"
          element={
            <ProtectedRoute allowedRoles={["TELLER", "CS"]}>
              <Counter />
            </ProtectedRoute>
          }
        />

        {/* Protected Route untuk Dashboard (ADMIN) dengan Layout */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["TELLER", "CS", "ADMIN"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/counter" element={<Counter />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/component-ui" element={<ComponentUi />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </QueryClientProvider>
  );
}