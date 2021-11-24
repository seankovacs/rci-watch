import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from  "./context/auth";
import MainLayout from "./layout/main";
import AppLayout from "./layout/app";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import HotMarket from "./containers/HotMarket";
import InventoryAge from "./containers/InventoryAge";

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/app" element={<Navigate replace to="/hot-market" />} />
        <Route
          path="/hot-market"
          element={
            <RequireAuth>
              <HotMarket />
            </RequireAuth>
          }
        />
        <Route
          path="/inventory-age"
          element={
            <RequireAuth>
              <InventoryAge />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}
