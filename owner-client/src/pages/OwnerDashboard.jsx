
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

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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

function formatValue(key, value) {
  if (key === "totalRevenue") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  }

  return (value || 0).toLocaleString("en-IN");
}

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

export default function OwnerDashboard() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState("");

  const loadStats = React.useCallback(async (refresh = false) => {
    setRefreshing(refresh);
    setLoading(!refresh);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE}/owner/dashboard/stats`,
        {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to load platform statistics."
        );
      }

      setData(result);
    } catch (loadError) {
      console.error("OWNER DASHBOARD ERROR:", loadError);
      setError(loadError.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    loadStats();
  }, [loadStats]);

  if (loading) {
    return (
      <div className="owner-dashboard-loading">
        Loading platform overview...
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentTenants = (data?.tenants || []).slice(0, 5);

  return (
    <div className="owner-dashboard">
      {/* HEADER */}
      <header className="owner-dashboard-header">
        <div>
          <span className="owner-dashboard-label">
            PLATFORM OVERVIEW
          </span>

          <h1>
            {getGreeting()}, SelSolve Admin
          </h1>

          <p>
            Monitor every farm, user and goat from one secure dashboard.
          </p>
        </div>

        <button
          className="owner-refresh-btn"
          onClick={() => loadStats(true)}
          disabled={refreshing}
        >
          <RefreshCw
            size={16}
            className={refreshing ? "refresh-spinning" : ""}
          />

          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      {/* ERROR */}
      {error && (
        <div className="owner-dashboard-error">
          <span>{error}</span>

          <button onClick={() => loadStats()}>
            Try again
          </button>
        </div>
      )}

      {/* KPI CARDS */}
      <section className="owner-kpi-grid">
        {cards.map(([label, key, Icon, tone]) => (
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
                {formatValue(key, stats[key])}
              </strong>

              {key === "onlineUsers" && (
                <small>
                  Active in the last 15 minutes
                </small>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* OVERVIEW */}
      <section className="owner-overview-grid">
        {/* RECENT FARMS */}
        <div className="owner-panel">
          <div className="owner-panel-heading">
            <div>
              <span className="owner-dashboard-label">
                FARMS
              </span>

              <h2>Recent farm accounts</h2>
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
            recentTenants.map((tenant) => (
              <div
                className="owner-tenant-row"
                key={tenant.id}
              >
                <div className="owner-tenant-avatar">
                  {tenant.name?.charAt(0)?.toUpperCase() || "F"}
                </div>

                <div>
                  <strong>{tenant.name}</strong>

                  <span>
                    {tenant.userCount || 0} users
                  </span>
                </div>

                <span
                  className={`owner-status ${
                    tenant.status?.toLowerCase() || "inactive"
                  }`}
                >
                  {tenant.status || "Inactive"}
                </span>
              </div>
            ))
          )}
        </div>

        {/* SYSTEM HEALTH */}
        <div className="owner-panel owner-health-panel">
          <span className="owner-dashboard-label">
            SYSTEM HEALTH
          </span>

          <h2>
            Everything is connected
          </h2>

          <div className="owner-health">
            <span className="owner-health-dot" />

            Live API and database
          </div>

          <p>
            All platform metrics are loaded from your live
            SelSolve database. Use the navigation to inspect
            users, subscriptions and farms.
          </p>
        </div>
      </section>
    </div>
  );
}

