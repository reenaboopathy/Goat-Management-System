import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import "./OwnerLayout.css";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function OwnerLayout({ children }) {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [user, setUser] = React.useState(null);
  const [tenant, setTenant] = React.useState(null);

  const [authLoading, setAuthLoading] = React.useState(true);
  const [logoutLoading, setLogoutLoading] = React.useState(false);

  /*
  =========================================================
  LOAD CURRENT AUTHENTICATED USER
  =========================================================
  */

  React.useEffect(() => {
    let mounted = true;

    const loadCurrentUser = async () => {
      try {
        setAuthLoading(true);

        const response = await fetch(`${API_BASE}/owner/auth/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          if (mounted) {
            setUser(null);
            setTenant(null);
          }

          navigate("/owner/login", { replace: true });
          return;
        }

        const result = await response.json();

        if (!mounted) return;

        /*
        Expected backend response:

        {
          user: {...},
          tenant: {...}
        }
        */

        if (!result?.owner) {
          setUser(null);
          setTenant(null);

          navigate("/owner/login", { replace: true });
          return;
        }

        setUser(result.owner);
        setTenant(null);
      } catch (error) {
        console.error("OWNER AUTH CHECK ERROR:", error);

        if (!mounted) return;

        setUser(null);
        setTenant(null);

        navigate("/owner/login", { replace: true });
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    };

    loadCurrentUser();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  /*
  =========================================================
  LOGOUT
  =========================================================
  */

  const handleLogout = async () => {
    if (logoutLoading) return;

    try {
      setLogoutLoading(true);

      await fetch(`${API_BASE}/owner/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    } finally {
      /*
      Clear old localStorage auth values if they exist.
      They are NOT used as the authentication source.
      */

      localStorage.removeItem("ownerAuthenticated");
      localStorage.removeItem("ownerUser");

      setUser(null);
      setTenant(null);
      setMobileOpen(false);
      setLogoutLoading(false);

      navigate("/owner/login", { replace: true });
    }
  };

  /*
  =========================================================
  OWNER PORTAL MENU
  =========================================================
  */

  const menuItems = [
    {
      label: "Dashboard",
      path: "/owner/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Tenants",
      path: "/owner/tenants",
      icon: Building2,
    },
    {
      label: "Users",
      path: "/owner/users",
      icon: Users,
    },
    {
      label: "Subscriptions",
      path: "/owner/subscriptions",
      icon: CreditCard,
    },
    {
      label: "Analytics",
      path: "/owner/analytics",
      icon: BarChart3,
    },
    {
      label: "Settings",
      path: "/owner/settings",
      icon: Settings,
    },
  ];

  /*
  =========================================================
  DISPLAY NAME
  =========================================================
  */

  const displayName =
    user?.name?.trim() ||
    user?.username?.trim() ||
    "Owner";

  const displayEmail =
    user?.email?.trim() ||
    tenant?.name?.trim() ||
    "SelSolve";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  /*
  =========================================================
  AUTH LOADING SCREEN
  =========================================================
  */

  if (authLoading) {
    return (
      <div className="owner-auth-loading">
        <div className="owner-auth-loading-card">
          <div className="owner-auth-spinner" />

          <h3>Loading Owner Portal</h3>

          <p>
            Verifying your SelSolve account...
          </p>
        </div>
      </div>
    );
  }

  /*
  =========================================================
  MAIN OWNER LAYOUT
  =========================================================
  */

  return (
    <div className="owner-shell">
      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {mobileOpen && (
        <div
          className="owner-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`owner-sidebar ${
          mobileOpen ? "open" : ""
        }`}
      >
        <div className="owner-sidebar-top">
          <div className="owner-logo-area">
            <img
              src="/selsolve-logo.svg"
              alt="SelSolve"
              className="owner-logo"
            />
          </div>

          <button
            type="button"
            className="owner-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="owner-sidebar-label">
          PLATFORM
        </div>

        <nav className="owner-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `owner-nav-item ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <span className="owner-nav-icon">
                  <Icon
                    size={19}
                    strokeWidth={2}
                  />
                </span>

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* =================================================
            SIDEBAR BOTTOM
        ================================================= */}

        <div className="owner-sidebar-bottom">
          <div className="owner-account-card">
            <div className="owner-avatar">
              {avatarLetter}
            </div>

            <div className="owner-account-info">
              <strong>{displayName}</strong>

              <span>{displayEmail}</span>
            </div>
          </div>

          <button
            type="button"
            className="owner-logout-btn"
            onClick={handleLogout}
            disabled={logoutLoading}
          >
            <LogOut size={18} />

            <span>
              {logoutLoading ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>
      </aside>

      {/* =================================================
          MAIN AREA
      ================================================= */}

      <div className="owner-main">
        {/* =================================================
            TOPBAR
        ================================================= */}

        <header className="owner-topbar">
          <button
            type="button"
            className="owner-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="owner-topbar-left">
            <div className="owner-page-context">
              <span>SelSolve</span>

              <strong>Owner Portal</strong>
            </div>
          </div>

          <div className="owner-topbar-right">
            <div className="owner-top-user">
              <div className="owner-top-avatar">
                {avatarLetter}
              </div>

              <div>
                <strong>{displayName}</strong>

                <span>Platform Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main className="owner-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default OwnerLayout;