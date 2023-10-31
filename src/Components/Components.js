import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from "react-router-dom";
import AuthModule from "./Auth/Auth.js";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js";
import HomePage from "./Main/Main.js"
import OverviewPage from "./Overview/Overview";
import TrackingPage from "./Tracking/Tracking";
import GoalsPage from "./Goals/Goals";
import PremiumPage from "./Premium/Premium";
import Header from "./Header/Header";

export default function Components() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/auth" element={<AuthModule />} />
          <Route path="/auth/register" element={<AuthRegister />} />
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route
            path="/"
            element={<ProtectedRoute path="/" element={<HomePage />} />}
          />
          <Route
            path="/overview"
            element={<ProtectedRoute path="/overview" element={<OverviewPage />} />}
          />
          <Route
            path="/tracking"
            element={<ProtectedRoute path="/tracking" element={<TrackingPage />} />}
          />
          <Route
            path="/goals"
            element={<ProtectedRoute path="/goals" element={<GoalsPage />} />}
          />
          <Route
            path="/premium"
            element={<ProtectedRoute path="/premium" element={<PremiumPage />} />}
          />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
    </Router>
  );
}
