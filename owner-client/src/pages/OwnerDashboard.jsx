import React from "react";
import {
  Activity,
  Building2,
  CalendarDays,
  CircleDollarSign,
  HeartPulse,
  PawPrint,
  RefreshCw,
  Users,
} from "lucide-react";
import "./OwnerDashboard.css";

/* =========================================================
   API CONFIGURATION
   ========================================================= */

const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

/* =========================================================
   DASHBOARD CARDS
   ========================================================= */

const cards = [
  ["Total users", "totalUsers", Users, "blue"],
  ["Online now", "onlineUsers", Activity, "green"],
  ["Registered goats", "totalGoats", PawPrint, "orange"],
  ["Active farms", "activeTenants", Building2, "purple"],
  ["Sales recorded", "totalSales", CircleDollarSign, "teal"],
  ["Total revenue", "totalRevenue", CircleDollarSign, "blue"],
  ["Farm events", "totalEvents", CalendarDays, "orange"],
  ["Medical records", "totalMedicalRecords", HeartPulse, "red"],
];

/* =========================================================
   FORMAT VALUE
   ========================================================= */

function formatValue(key, value) {
  if (key === "totalRevenue") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);
  }

  return (Number(value) || 0).toLocaleString("en-IN");
}

/* =========================================================
   GREETING
   ========================================================= */

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  if (hour < 21) {
    return "Good evening";
  }

  return "Good night";
}

/* =========================================================
   OWNER DASHBOARD
   ========================================================= */

export default function OwnerDashboard() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState("");

  /* =======================================================
     LOAD DASHBOARD STATS
     ======================================================= */

  const loadStats = React.useCallback(async (refresh = false) => {
    if (refresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await fetch(
        `${API_BASE}/owner/dashboard/stats`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Dashboard request failed (${response.status})`
        );
      }

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Unable to load platform statistics."
        );
      }

      setData(result);
    } catch (loadError) {
      console.error("OWNER DASHBOARD ERROR:", loadError);

      setData(null);

      setError(
        loadError?.message ||
          "Unable to connect to the owner dashboard."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /* =======================================================
     INITIAL LOAD
     ======================================================= */

  React.useEffect(() => {
    loadStats(false);
  }, [loadStats]);

  /* =======================================================
     LOADING SCREEN
     ======================================================= */

  if (loading) {
    return (
      <div className="owner-dashboard-loading">
        Loading platform overview...
      </div>
    );
  }

  /* =======================================================
     DATA
     ======================================================= */

  const stats = data?.stats || {};

  const recentTenants = Array.isArray(data?.tenants)
    ? data.tenants.slice(0, 5)
    : [];

  /* =======================================================
     UI
     ======================================================= */

  return (
    <div className="owner-dashboard">
      {/* ===================================================
          HEADER
          =================================================== */}

      <header className="owner-dashboard-header">
        <div>
          <span className="owner-dashboard-label">
            PLATFORM OVERVIEW
          </span>

          <h1>
            {getGreeting()}, SelSolve Admin
          </h1>

          <p>
            Monitor every farm, user and goat from one secure
            dashboard.
          </p>
        </div>

        <button
          type="button"
          className="owner-refresh-btn"
          onClick={() => loadStats(true)}
          disabled={refreshing}
        >
          <RefreshCw
            size={16}
            className={
              refreshing ? "refresh-spinning" : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </header>

      {/* ===================================================
          ERROR
          =================================================== */}

      {error && (
        <div className="owner-dashboard-error">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => loadStats(false)}
          >
            Try again
          </button>
        </div>
      )}

      {/* ===================================================
          KPI CARDS
          =================================================== */}

      <section className="owner-kpi-grid">
        {cards.map(
          ([label, key, Icon, tone]) => (
            <article
              className={`owner-kpi-card ${tone}`}
              key={key}
            >
              <div className="owner-kpi-icon">
                <Icon size={20} />
              </div>

              <div className="owner-kpi-content">
                <span>{label}</span>

                <strong>
                  {formatValue(
                    key,
                    stats[key]
                  )}
                </strong>

                {key === "onlineUsers" && (
                  <small>
                    Active in the last 15 minutes
                  </small>
                )}
              </div>
            </article>
          )
        )}
      </section>

      {/* ===================================================
          OVERVIEW
          =================================================== */}

      <section className="owner-overview-grid">
        {/* =================================================
            RECENT FARMS
            ================================================= */}

        <div className="owner-panel">
          <div className="owner-panel-heading">
            <div>
              <span className="owner-dashboard-label">
                FARMS
              </span>

              <h2>
                Recent farm accounts
              </h2>
            </div>

            <span className="owner-panel-count">
              {stats.totalTenants || 0} total
            </span>
          </div>

          {recentTenants.length === 0 ? (
            <p className="owner-empty">
              No farm accounts found.
            </p>
          ) : (
            recentTenants.map((tenant) => {
              const tenantId =
                tenant?.id ||
                tenant?._id ||
                tenant?.tenantId ||
                tenant?.name;

              const tenantName =
                tenant?.name || "Unnamed Farm";

              const firstLetter =
                tenantName
                  .charAt(0)
                  .toUpperCase() || "F";

              const status =
                tenant?.status || "Inactive";

              return (
                <div
                  className="owner-tenant-row"
                  key={tenantId}
                >
                  <div className="owner-tenant-avatar">
                    {firstLetter}
                  </div>

                  <div>
                    <strong>
                      {tenantName}
                    </strong>

                    <span>
                      {tenant?.userCount || 0} users
                    </span>
                  </div>

                  <span
                    className={`owner-status ${
                      String(status).toLowerCase()
                    }`}
                  >
                    {status}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* =================================================
            SYSTEM HEALTH
            ================================================= */}

        <div className="owner-panel owner-health-panel">
          <span className="owner-dashboard-label">
            SYSTEM HEALTH
          </span>

          <h2>
            {error
              ? "Connection issue"
              : "Everything is connected"}
          </h2>

          <div className="owner-health">
            <span
              className={`owner-health-dot ${
                error
                  ? "owner-health-dot-error"
                  : ""
              }`}
            />

            {error
              ? "API connection unavailable"
              : "Live API and database"}
          </div>

          <p>
            {error
              ? "The dashboard could not load the latest platform metrics. Check the backend connection and try again."
              : "All platform metrics are loaded from your live SelSolve database. Use the navigation to inspect users, subscriptions and farms."}
          </p>
        </div>
      </section>
    </div>
  );
}