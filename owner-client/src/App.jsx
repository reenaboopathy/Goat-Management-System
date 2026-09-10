import React from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import OwnerLogin from "./pages/OwnerLogin";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerTenants from "./pages/OwnerTenants";
import OwnerUsers from "./pages/OwnerUsers";
import OwnerSubscriptions from "./pages/OwnerSubscriptions";
import OwnerPlaceholder from "./pages/OwnerPlaceholder";
import OwnerAnalytics from "./pages/OwnerAnalytics";
import OwnerSettings from "./pages/OwnerSettings";

import OwnerLayout from "./components/OwnerLayout";

/* =========================================================
   OWNER PAGE WRAPPER

   OwnerLayout verifies real authentication using:
   GET /api/auth/me

   Authentication is handled by the SelSolve auth cookie.
========================================================= */

function OwnerPage({ children }) {
  return (
    <OwnerLayout>
      {children}
    </OwnerLayout>
  );
}

/* =========================================================
   APP ROUTES
========================================================= */

function App() {
  return (
    <Routes>

      {/* =====================================================
          ROOT
      ===================================================== */}

      <Route
        path="/"
        element={
          <Navigate
            to="/owner/login"
            replace
          />
        }
      />

      {/* =====================================================
          OWNER LOGIN
      ===================================================== */}

      <Route
        path="/owner/login"
        element={
          <OwnerLogin />
        }
      />

      {/* =====================================================
          OWNER DASHBOARD
      ===================================================== */}

      <Route
        path="/owner/dashboard"
        element={
          <OwnerPage>
            <OwnerDashboard />
          </OwnerPage>
        }
      />

      {/* =====================================================
          OWNER TENANTS
      ===================================================== */}

      <Route
        path="/owner/tenants"
        element={
          <OwnerPage>
            <OwnerTenants />
          </OwnerPage>
        }
      />

      {/* =====================================================
          OWNER USERS
      ===================================================== */}

      <Route
        path="/owner/users"
        element={
          <OwnerPage>
            <OwnerUsers />
          </OwnerPage>
        }
      />

      {/* =====================================================
          OWNER SUBSCRIPTIONS
      ===================================================== */}

      <Route
        path="/owner/subscriptions"
        element={
          <OwnerPage>
            <OwnerSubscriptions />
          </OwnerPage>
        }
      />

      {/* =====================================================
          OWNER ANALYTICS
      ===================================================== */}

      <Route
        path="/owner/analytics"
        element={
          <OwnerPage>
            <OwnerAnalytics />
          </OwnerPage>
        }
      />

      {/* =====================================================
          OWNER SETTINGS
      ===================================================== */}

      <Route
        path="/owner/settings"
        element={
          <OwnerPage>
            <OwnerSettings />
          </OwnerPage>
        }
      />

      {/* =====================================================
          UNKNOWN ROUTE
      ===================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/owner/login"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;