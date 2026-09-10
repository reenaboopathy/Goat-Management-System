import React from "react";
import { Activity, BarChart3, Building2, PawPrint, RefreshCw, Users } from "lucide-react";
import "./OwnerAnalytics.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function OwnerAnalytics() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const load = React.useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch(`${API_BASE}/owner/dashboard/stats`, { credentials: "include" });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to load analytics.");
      setData(result);
    } catch (loadError) { console.error("OWNER ANALYTICS ERROR:", loadError); setError(loadError.message); }
    finally { setLoading(false); }
  }, []);
  React.useEffect(() => { load(); }, [load]);
  if (loading) return <div className="owner-analytics-loading">Loading platform analytics...</div>;
  const stats = data?.stats || {};
  const farms = data?.tenants || [];
  const maxUsers = Math.max(...farms.map((farm) => farm.userCount || 0), 1);
  return <div className="owner-analytics-page">
    <header className="owner-analytics-header">
      <div><span className="owner-analytics-eyebrow">PLATFORM ANALYTICS</span><h1>SelSolve insights</h1><p>Live performance across every farm in your platform.</p></div>
      <button className="owner-analytics-refresh" onClick={load}><RefreshCw size={16} /> Refresh</button>
    </header>
    {error && <div className="owner-analytics-error">{error}</div>}
    <div className="owner-analytics-summary">
      <div><Users size={19}/><span>Users per farm</span><strong>{stats.totalUsers || 0}</strong></div>
      <div><PawPrint size={19}/><span>Goats per farm</span><strong>{stats.totalTenants ? ((stats.totalGoats || 0) / stats.totalTenants).toFixed(1) : "0"}</strong></div>
      <div><Activity size={19}/><span>Online rate</span><strong>{stats.totalUsers ? Math.round((stats.onlineUsers / stats.totalUsers) * 100) : 0}%</strong></div>
      <div><Building2 size={19}/><span>Active farms</span><strong>{stats.activeTenants || 0}</strong></div>
    </div>
    <section className="owner-analytics-panel"><div className="owner-analytics-panel-title"><div><BarChart3 size={19}/><h2>Farm user distribution</h2></div><span>Live tenant data</span></div>
      {farms.length ? farms.map((farm) => <div className="owner-bar-row" key={farm.id}><div><strong>{farm.name}</strong><span>{farm.userCount} users</span></div><div className="owner-bar-track"><i style={{ width: `${Math.max((farm.userCount / maxUsers) * 100, 4)}%` }} /></div></div>) : <p>No farm data available.</p>}
    </section>
  </div>;
}
