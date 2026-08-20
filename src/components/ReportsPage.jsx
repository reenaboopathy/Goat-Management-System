import React, { useMemo, useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  CalendarDays,
  Scale,
  Download,
  Printer,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  X,
  FileText,
  User,
  Tag,
  PawPrint,
} from "lucide-react";

import "../components/ReportsPage.css";

/* =========================================================
   TENANT STORAGE - GET REAL GOAT DATA
   ========================================================= */

const TENANT_STORAGE_KEYS = ["tenant", "currentTenant", "tenantData"];

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function getStoredTenant() {
  if (typeof window === "undefined") return null;

  for (const key of TENANT_STORAGE_KEYS) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    const parsed = safeParse(raw);
    if (parsed && typeof parsed === "object") return parsed;
  }

  return null;
}

function getTenantGoats() {
  const tenant = getStoredTenant();
  if (tenant?.data && Array.isArray(tenant.data.goats)) {
    return tenant.data.goats;
  }
  return [];
}

// Build weight history from goat events
function buildWeightHistoryFromGoat(goat) {
  if (!goat || !goat.events) return [];

  const weightEvents = goat.events
    .filter((e) => e.type === "Weight")
    .map((e) => {
      const match = e.title?.match(/(\d+\.?\d*)\s*kg/);
      const weight = match ? parseFloat(match[1]) : null;
      return {
        id: e.id,
        weight,
        eventDate: e.date,
        title: e.title,
      };
    })
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

  return weightEvents.map((item, idx) => ({
    ...item,
    previousWeight: weightEvents[idx + 1]?.weight || null,
    difference: weightEvents[idx + 1] ? item.weight - weightEvents[idx + 1].weight : null,
  }));
}

/* =========================================================
   HELPERS
========================================================= */

function formatDate(date) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return String(date);
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(date) {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function calcAge(dob) {
  if (!dob) return "-";
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return "-";
  const now = new Date();
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) months -= 1;
  months = Math.max(0, months);
  const years = Math.floor(months / 12);
  return years > 0 ? `${years}y ${months % 12}m` : `${months % 12}m`;
}

/* =========================================================
   REPORT PAGE - WITH REAL DATA
========================================================= */

export default function ReportPage({ onBack }) {
  const [goats, setGoats] = useState([]);
  const [selectedGoatId, setSelectedGoatId] = useState(null);
  const [search, setSearch] = useState("");
  const [goatDropdown, setGoatDropdown] = useState(false);

  // Load real goat data from tenant storage
  useEffect(() => {
    const loadGoats = () => {
      const tenantGoats = getTenantGoats();
      setGoats(tenantGoats);
      if (tenantGoats.length > 0 && !selectedGoatId) {
        setSelectedGoatId(tenantGoats[0].id);
      }
    };

    loadGoats();

    // Listen for tenant data updates
    const syncFromTenant = (event) => {
      const tenant = event?.detail || getStoredTenant();
      const goatData = Array.isArray(tenant?.data?.goats) ? tenant.data.goats : [];
      setGoats(goatData);
    };

    window.addEventListener("tenant-data-updated", syncFromTenant);
    return () => window.removeEventListener("tenant-data-updated", syncFromTenant);
  }, []);

  /* =======================================================
     SELECTED GOAT
  ======================================================= */

  const selectedGoat = useMemo(() => {
    return goats.find((goat) => String(goat.id) === String(selectedGoatId)) || null;
  }, [goats, selectedGoatId]);

  /* =======================================================
     SEARCH
  ======================================================= */

  const searchedGoats = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return goats;
    }

    return goats.filter((goat) => {
      const text = [goat.name, goat.tagNumber, goat.breed, goat.gender]
        .join(" ")
        .toLowerCase();
      return text.includes(query);
    });
  }, [goats, search]);

  /* =======================================================
     WEIGHT HISTORY FROM EVENTS
  ======================================================= */

  const weightHistory = useMemo(() => {
    if (!selectedGoat) return [];
    return buildWeightHistoryFromGoat(selectedGoat);
  }, [selectedGoat]);

  /* =======================================================
     SUMMARY
  ======================================================= */

  const weightSummary = useMemo(() => {
    if (!selectedGoat) {
      return {
        latest: null,
        previous: null,
        change: null,
        percentage: null,
        latestDate: "",
        previousDate: "",
      };
    }

    const latest = weightHistory[0] || null;
    const previous = weightHistory[1] || null;

    const latestWeight = latest?.weight ?? null;
    const previousWeight = previous?.weight ?? null;

    const change =
      latestWeight !== null && previousWeight !== null ? latestWeight - previousWeight : null;

    const percentage =
      change !== null && previousWeight !== 0 ? (change / previousWeight) * 100 : null;

    return {
      latest: latestWeight,
      previous: previousWeight,
      change,
      percentage,
      latestDate: latest?.eventDate || "",
      previousDate: previous?.eventDate || "",
      upcomingDate: "",
    };
  }, [selectedGoat, weightHistory]);

  /* =======================================================
     REPORT STATS
  ======================================================= */

  const reportStats = useMemo(() => {
    const validWeights = weightHistory.filter((item) => Number.isFinite(Number(item.weight)));

    const highest =
      validWeights.length
        ? Math.max(...validWeights.map((item) => Number(item.weight)))
        : null;

    const lowest =
      validWeights.length
        ? Math.min(...validWeights.map((item) => Number(item.weight)))
        : null;

    return {
      totalChecks: weightHistory.length,
      highest,
      lowest,
    };
  }, [weightHistory]);

  /* =======================================================
     SELECT GOAT
  ======================================================= */

  function selectGoat(goat) {
    setSelectedGoatId(goat.id);
    setGoatDropdown(false);
    setSearch("");
  }

  /* =======================================================
     PRINT
  ======================================================= */

  function handlePrint() {
    window.print();
  }

  /* =======================================================
     DOWNLOAD
  ======================================================= */

  function handleDownload() {
    if (!selectedGoat) return;
    const eventRows = weightHistory
      .map(
        (e) =>
          `<tr><td>${formatDate(e.eventDate)}</td><td>${e.weight ? e.weight.toFixed(2) : "-"} kg</td><td>${e.difference ? (e.difference > 0 ? "+" : "") + e.difference.toFixed(2) : "-"} kg</td></tr>`
      )
      .join("");

    const popup = window.open("", "_blank", "width=900,height=700");
    if (!popup) {
      alert("Please allow pop-ups to export the PDF.");
      return;
    }

    popup.document.write(`<!DOCTYPE html><html><head><title>Weight Report - ${selectedGoat.name}</title>
      <style>body{font-family:Arial,sans-serif;padding:40px;color:#16233D}h1{color:#12336B}
      table{width:100%;border-collapse:collapse;margin-top:15px}th,td{border:1px solid #DCE6F9;padding:10px;text-align:left}
      th{background:#EEF4FF;color:#12336B}</style></head><body>
      <h1>Weight Report - ${selectedGoat.name}</h1>
      <p><b>Tag:</b> #${selectedGoat.tagNumber || "-"} | <b>Breed:</b> ${selectedGoat.breed || "-"} | <b>Gender:</b> ${selectedGoat.gender || "-"}</p>
      <p><b>Current Weight:</b> ${weightSummary.latest ? weightSummary.latest.toFixed(2) + " kg" : "-"}</p>
      <h2>Weight History</h2>${
        weightHistory.length
          ? `<table><tr><th>Date</th><th>Weight</th><th>Change</th></tr>${eventRows}</table>`
          : "<p>No weight records found.</p>"
      }
      </body></html>`);
    popup.document.close();
    setTimeout(() => {
      popup.focus();
      popup.print();
    }, 400);
  }

  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (goats.length === 0) {
    return (
      <div className="report-page">
        <header className="report-header">
          <div className="report-header-inner">
            <button className="report-back" onClick={onBack} type="button">
              <ArrowLeft size={20} />
              <div>
                <div className="report-header-title">Weight Reports</div>
                <div className="report-header-subtitle">Goat health & weight tracking</div>
              </div>
            </button>
          </div>
        </header>

        <main className="report-content">
          <section className="report-intro">
            <div>
              <span className="report-eyebrow">HERD REPORT</span>
              <h1>Goat Weight Report</h1>
              <p>No goats registered yet. Create a goat profile first to view weight reports.</p>
            </div>
            <div className="report-intro-icon">
              <Scale size={28} />
            </div>
          </section>
        </main>
      </div>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="report-page">
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="report-header">
        <div className="report-header-inner">
          <button className="report-back" onClick={onBack} type="button">
            <ArrowLeft size={20} />

            <div>
              <div className="report-header-title">Weight Reports</div>

              <div className="report-header-subtitle">Goat health & weight tracking</div>
            </div>
          </button>

          <div className="report-header-actions">
            <button className="report-icon-btn" onClick={handlePrint} title="Print report" type="button">
              <Printer size={18} />
            </button>

            <button className="report-download-btn" onClick={handleDownload} type="button">
              <Download size={17} />
              Export
            </button>
          </div>
        </div>
      </header>

      {/* =================================================
          CONTENT
      ================================================= */}

      <main className="report-content">
        {/* INTRO */}

        <section className="report-intro">
          <div>
            <span className="report-eyebrow">HERD REPORT</span>

            <h1>Goat Weight Report</h1>

            <p>View latest, previous and upcoming weight records.</p>
          </div>

          <div className="report-intro-icon">
            <Scale size={28} />
          </div>
        </section>

        {/* =================================================
            GOAT SELECTOR
        ================================================= */}

        <section className="goat-selector-card">
          <div className="selector-label">
            <PawPrint size={16} />
            Select goat
          </div>

          <div className="selector-wrapper">
            <button
              className="goat-selector"
              onClick={() => setGoatDropdown(!goatDropdown)}
              type="button"
            >
              {selectedGoat ? (
                <div className="selected-goat-content">
                  <div className="mini-goat-avatar">🐐</div>

                  <div>
                    <strong>{selectedGoat.name || "Unnamed"}</strong>

                    <span>
                      {selectedGoat.breed || "Breed unknown"}
                      {" · Tag #"}
                      {selectedGoat.tagNumber || "—"}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="placeholder-text">Select a goat</span>
              )}

              <ChevronDown size={19} />
            </button>

            {goatDropdown && (
              <div className="goat-dropdown">
                <div className="dropdown-search">
                  <Search size={16} />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search goat..."
                    autoFocus
                  />

                  {search && (
                    <button type="button" onClick={() => setSearch("")}>
                      <X size={15} />
                    </button>
                  )}
                </div>

                <div className="dropdown-list">
                  {searchedGoats.length === 0 ? (
                    <div className="dropdown-empty">No goats found</div>
                  ) : (
                    searchedGoats.map((goat) => (
                      <button
                        key={goat.id}
                        className="dropdown-goat"
                        onClick={() => selectGoat(goat)}
                        type="button"
                      >
                        <div className="mini-goat-avatar">🐐</div>

                        <div>
                          <strong>{goat.name || "Unnamed"}</strong>

                          <span>
                            {goat.breed || "Breed unknown"}
                            {" · Tag #"}
                            {goat.tagNumber || "—"}
                          </span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =================================================
            REPORT
        ================================================= */}

        {selectedGoat && (
          <div className="print-area">
            {/* PROFILE */}

            <section className="goat-profile-card">
              <div className="goat-profile-main">
                <div className="large-goat-avatar">🐐</div>

                <div>
                  <span className="profile-label">GOAT PROFILE</span>

                  <h2>{selectedGoat.name || "Unnamed Goat"}</h2>

                  <div className="profile-meta">
                    <span>
                      <Tag size={14} />
                      Tag #
                      {selectedGoat.tagNumber || "—"}
                    </span>

                    <span>
                      <PawPrint size={14} />
                      {selectedGoat.breed || "Breed unknown"}
                    </span>

                    <span>
                      <User size={14} />
                      {selectedGoat.gender || "—"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="profile-date">
                <span>REPORT GENERATED</span>

                <strong>{formatDate(new Date())}</strong>
              </div>
            </section>

            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <section className="weight-summary-grid">
              {/* LATEST */}

              <SummaryCard
                label="Latest Weight"
                value={
                  weightSummary.latest !== null
                    ? `${weightSummary.latest.toFixed(2)} kg`
                    : "—"
                }
                date={
                  weightSummary.latestDate
                    ? `${formatDate(weightSummary.latestDate)} · ${formatTime(
                        weightSummary.latestDate
                      )}`
                    : "No weight"
                }
                icon={<Scale size={20} />}
              />

              {/* PREVIOUS */}

              <SummaryCard
                label="Previous Weight"
                value={
                  weightSummary.previous !== null
                    ? `${weightSummary.previous.toFixed(2)} kg`
                    : "—"
                }
                date={
                  weightSummary.previousDate
                    ? `${formatDate(weightSummary.previousDate)} · ${formatTime(
                        weightSummary.previousDate
                      )}`
                    : "No previous weight"
                }
                icon={<CalendarDays size={20} />}
              />

              {/* TOTAL */}

              <SummaryCard
                label="Total Checks"
                value={reportStats.totalChecks}
                date="Weight check records"
                icon={<FileText size={20} />}
              />

              {/* HIGHEST */}

              <SummaryCard
                label="Highest Weight"
                value={reportStats.highest !== null ? `${reportStats.highest.toFixed(2)} kg` : "—"}
                date="Maximum recorded"
                icon={<TrendingUp size={20} />}
              />
            </section>

            {/* =================================================
                WEIGHT CHANGE
            ================================================= */}

            <section className="weight-change-card">
              <div className="weight-change-left">
                <div className="summary-icon">
                  {weightSummary.change > 0 ? (
                    <TrendingUp size={20} />
                  ) : weightSummary.change < 0 ? (
                    <TrendingDown size={20} />
                  ) : (
                    <Minus size={20} />
                  )}
                </div>

                <div>
                  <span>Weight Change</span>

                  <strong>
                    {weightSummary.change !== null
                      ? `${weightSummary.change > 0 ? "+" : ""}${weightSummary.change.toFixed(2)} kg`
                      : "—"}
                  </strong>
                </div>
              </div>

              <div className="weight-change-right">
                {weightSummary.percentage !== null
                  ? `${weightSummary.percentage > 0 ? "+" : ""}${weightSummary.percentage.toFixed(1)}%`
                  : "Need 2 checks"}
              </div>
            </section>

            {/* =================================================
                DETAILS
            ================================================= */}

            <section className="details-card">
              <div className="section-heading">
                <div>
                  <span className="section-eyebrow">DETAILS</span>

                  <h3>Goat information</h3>
                </div>
              </div>

              <div className="details-grid">
                <DetailItem label="Goat Name" value={selectedGoat.name || "—"} />

                <DetailItem label="Tag Number" value={`#${selectedGoat.tagNumber || "—"}`} />

                <DetailItem label="Breed" value={selectedGoat.breed || "—"} />

                <DetailItem label="Gender" value={selectedGoat.gender || "—"} />

                <DetailItem label="Date of Birth" value={formatDate(selectedGoat.dob)} />

                <DetailItem
                  label="Age"
                  value={calcAge(selectedGoat.dob)}
                />

                <DetailItem
                  label="Current Weight"
                  value={
                    weightSummary.latest !== null
                      ? `${weightSummary.latest.toFixed(2)} kg`
                      : "—"
                  }
                />

                <DetailItem label="Stage" value={selectedGoat.stage || "—"} />
              </div>
            </section>

            {/* =================================================
                WEIGHT HISTORY
            ================================================= */}

            <section className="history-card">
              <div className="section-heading history-heading">
                <div>
                  <span className="section-eyebrow">WEIGHT TRACKING</span>

                  <h3>Weight history</h3>

                  <p>All recorded weight checks for this goat.</p>
                </div>

                <div className="history-count">{weightHistory.length} records</div>
              </div>

              <div className="weight-history-list">
                {weightHistory.length === 0 ? (
                  <div style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>
                    No weight records yet. Add weight checks from the goat's profile.
                  </div>
                ) : (
                  weightHistory.map((item, index) => {
                    const current = Number(item.weight);
                    const previous = item.previousWeight !== null ? Number(item.previousWeight) : null;
                    const difference = item.difference !== null ? Number(item.difference) : null;

                    return (
                      <div className="weight-history-item" key={item.id || index}>
                        <div className="weight-history-icon">
                          <Scale size={18} />
                        </div>

                        <div className="weight-history-content">
                          <strong>{current.toFixed(2)} kg</strong>

                          <span>
                            {formatDate(item.eventDate)}
                            {" · "}
                            {formatTime(item.eventDate)}
                          </span>
                        </div>

                        <div
                          style={{
                            marginLeft: "auto",
                            textAlign: "right",
                          }}
                        >
                          {previous !== null && (
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#64748b",
                              }}
                            >
                              Previous: {previous.toFixed(2)} kg
                            </div>
                          )}

                          {difference !== null && (
                            <strong
                              style={{
                                color: difference >= 0 ? "#059669" : "#dc2626",
                              }}
                            >
                              {difference >= 0 ? "+" : ""}
                              {difference.toFixed(2)} kg
                            </strong>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({ label, value, date, icon }) {
  return (
    <div className="summary-card">
      <div className="summary-top">
        <div className="summary-icon">{icon}</div>

        <span>{label}</span>
      </div>

      <strong className="summary-value">{value}</strong>

      <small>{date}</small>
    </div>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({ label, value }) {
  return (
    <div className="detail-item">
      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
}