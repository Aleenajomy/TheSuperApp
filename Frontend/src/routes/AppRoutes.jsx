import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import Register from "../pages/Register";
import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Movies from "../pages/Movies";

// Guard: User must be registered to view categories
const CategoryGuard = ({ children }) => {
  const user = useStore((state) => state.user);
  const isRegistered = user && user.name && user.name.trim() !== "";
  return isRegistered ? children : <Navigate to="/" replace />;
};

// Guard: User must be registered and have selected at least 3 categories to view dashboard or movies
const DashboardGuard = ({ children }) => {
  const user = useStore((state) => state.user);
  const categories = useStore((state) => state.categories);
  
  const isRegistered = user && user.name && user.name.trim() !== "";
  const hasCategories = categories && categories.length >= 3;

  if (!isRegistered) {
    return <Navigate to="/" replace />;
  }
  if (!hasCategories) {
    return <Navigate to="/categories" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route
        path="/categories"
        element={
          <CategoryGuard>
            <Categories />
          </CategoryGuard>
        }
      />
      <Route
        path="/dashboard"
        element={
          <DashboardGuard>
            <Dashboard />
          </DashboardGuard>
        }
      />
      <Route
        path="/movies"
        element={
          <DashboardGuard>
            <Movies />
          </DashboardGuard>
        }
      />
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
