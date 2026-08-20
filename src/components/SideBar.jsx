import { X, Crown } from "lucide-react";
import { NAV_ITEMS } from "../constants/Navigation.js";

export default function Sidebar({
  open,
  onClose,
  activeSection,
  onNavigate,
  tenantSession,
}) {
  return (
    <>
      {/* =====================================================
          OVERLAY
      ===================================================== */}

      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.45)",
            zIndex: 40,
          }}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: 260,
          background:
            "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
          zIndex: 50,
          transform: open
            ? "translateX(0)"
            : "translateX(-100%)",
          transition: "transform 0.22s ease",
          display: "flex",
          flexDirection: "column",
          boxShadow:
            "8px 0 30px rgba(0,0,0,0.25)",
        }}
      >
        {/* ===================================================
            SIDEBAR HEADER
        =================================================== */}

        <div
          style={{
            padding: "22px 20px 18px",
            borderBottom:
              "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* LOGO */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: "#2563EB",
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 15,
                }}
              >
                S
              </div>

              <div
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 17,
                }}
              >
                SelSolve
              </div>
            </div>

            {/* CLOSE */}

            <button
              onClick={onClose}
              aria-label="Close menu"
              style={{
                background:
                  "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: 8,
                width: 30,
                height: 30,
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* WELCOME */}

          <div
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 14.5,
              marginTop: 16,
            }}
          >
            Welcome {tenantSession?.name}!
          </div>

          <div
            style={{
              color:
                "rgba(255,255,255,0.55)",
              fontSize: 12.5,
              marginTop: 2,
            }}
          >
            {tenantSession?.username}
          </div>
        </div>

        {/* ===================================================
            NAVIGATION
        =================================================== */}

        <div
          style={{
            padding: "12px 12px",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {/* EXISTING NAVIGATION */}

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            const isActive =
              activeSection === item.key;

            return (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.key);
                  onClose?.();
                }}
                title={item.description}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 14px",
                  borderRadius: 10,
                  border: "none",

                  background: isActive
                    ? "rgba(37,99,235,0.22)"
                    : "transparent",

                  color: isActive
                    ? "#93C5FD"
                    : "rgba(255,255,255,0.82)",

                  fontSize: 14,
                  fontWeight: isActive
                    ? 700
                    : 500,

                  cursor: "pointer",
                  marginBottom: 2,
                  textAlign: "left",

                  transition:
                    "background 0.15s ease, color 0.15s ease",
                }}
              >
                <Icon size={17} />

                <span>{item.label}</span>
              </button>
            );
          })}

          {/* =================================================
              SUBSCRIPTION SEPARATOR
          ================================================= */}

          <div
            style={{
              height: 1,
              background:
                "rgba(255,255,255,0.08)",
              margin:
                "14px 6px",
            }}
          />

          {/* =================================================
              SUBSCRIPTION
          ================================================= */}

          <button
            onClick={() => {
              onNavigate("subscription");
              onClose?.();
            }}
            title="Manage your subscription"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 10,
              border: "none",

              background:
                activeSection ===
                "subscription"
                  ? "rgba(245,158,11,0.18)"
                  : "transparent",

              color:
                activeSection ===
                "subscription"
                  ? "#FBBF24"
                  : "rgba(255,255,255,0.82)",

              fontSize: 14,
              fontWeight:
                activeSection ===
                "subscription"
                  ? 700
                  : 500,

              cursor: "pointer",
              marginBottom: 2,
              textAlign: "left",

              transition:
                "background 0.15s ease, color 0.15s ease",
            }}
          >
            <Crown size={17} />

            <span>
              Subscription
            </span>
          </button>
        </div>
      </div>
    </>
  );
}