
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  UserRound,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./OwnerLogin.css";

/* =========================================================
   API CONFIGURATION
   ========================================================= */

// Replace this with your actual Render backend URL.
// Example:
// const API_BASE_URL = "https://selsolve-backend.onrender.com/api";

const API_BASE_URL =
  "https://YOUR-RENDER-BACKEND-URL.onrender.com/api";

/* =========================================================
   OWNER LOGIN
   ========================================================= */

function OwnerLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =======================================================
     HANDLE INPUT CHANGE
     ======================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /* =======================================================
     HANDLE LOGIN
     ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!form.username.trim() || !form.password.trim()) {
      setError("Username and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/owner/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username: form.username.trim(),
            password: form.password.trim(),
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            `Login failed (${response.status}).`
        );
      }

      if (!data?.success) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Login failed."
        );
      }

      /* ===================================================
         STORE OWNER SESSION
         =================================================== */

      localStorage.setItem(
        "ownerAuthenticated",
        "true"
      );

      localStorage.setItem(
        "ownerUser",
        JSON.stringify(data.owner || {})
      );

      /* ===================================================
         REDIRECT TO DASHBOARD
         =================================================== */

      navigate("/owner/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error("OWNER LOGIN ERROR:", err);

      setError(
        err?.message ||
          "Unable to connect to SelSolve server."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     UI
     ======================================================= */

  return (
    <div className="owner-login">

      <div className="login-background-shape login-shape-one" />
      <div className="login-background-shape login-shape-two" />

      <div className="login-layout">

        {/* =================================================
            BRAND PANEL
            ================================================= */}

        <div className="login-brand-panel">

          <div className="login-brand-logo">
            <img
              src="/selsolve-logo.svg"
              alt="SelSolve"
              onError={(event) => {
                event.currentTarget.style.display = "none";

                event.currentTarget.parentElement.classList.add(
                  "logo-fallback"
                );
              }}
            />

            <span>SS</span>
          </div>

          <div className="login-brand-name">
            SelSolve
          </div>

          <div className="login-brand-line" />

          <h2>
            Manage your platform
            <br />
            from one place.
          </h2>

          <p>
            Owner administration for your SelSolve
            ecosystem, tenants and platform operations.
          </p>

          <div className="login-feature">
            <div>
              <ShieldCheck size={17} />
            </div>

            <span>
              Secure platform administration
            </span>
          </div>

        </div>

        {/* =================================================
            LOGIN FORM SIDE
            ================================================= */}

        <div className="login-form-side">

          <div className="login-card">

            {/* =================================================
                MOBILE BRAND
                ================================================= */}

            <div className="login-mobile-brand">

              <div className="login-mobile-logo">
                <img
                  src="/selsolve-logo.svg"
                  alt="SelSolve"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";

                    event.currentTarget.parentElement.classList.add(
                      "logo-fallback"
                    );
                  }}
                />

                <span>SS</span>
              </div>

              <strong>
                SelSolve
              </strong>

            </div>

            {/* =================================================
                HEADING
                ================================================= */}

            <div className="login-heading">

              <span>
                OWNER ACCESS
              </span>

              <h1>
                Welcome back
              </h1>

              <p>
                Sign in to continue to your SelSolve
                owner portal.
              </p>

              <small className="login-access-note">
                Use your platform owner credentials,
                not a farm user login.
              </small>

            </div>

            {/* =================================================
                ERROR
                ================================================= */}

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* =================================================
                FORM
                ================================================= */}

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >

              {/* =================================================
                  USERNAME
                  ================================================= */}

              <div className="login-field">

                <label htmlFor="username">
                  Username
                </label>

                <div className="login-input">

                  <UserRound size={17} />

                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    autoComplete="username"
                  />

                </div>

              </div>

              {/* =================================================
                  PASSWORD
                  ================================================= */}

              <div className="login-field">

                <label htmlFor="password">
                  Password
                </label>

                <div className="login-input">

                  <LockKeyhole size={17} />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>

              {/* =================================================
                  LOGIN BUTTON
                  ================================================= */}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="spin"
                    />

                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}

              </button>

            </form>

            {/* =================================================
                FOOTER
                ================================================= */}

            <div className="login-footer">

              <ShieldCheck size={15} />

              <span>
                Your connection is protected by
                SelSolve authentication.
              </span>

            </div>

          </div>

          <p className="login-copyright">
            SelSolve Owner Portal
          </p>

        </div>

      </div>
    </div>
  );
}

export default OwnerLogin;
