import { useState } from "react";
import {
  Building2,
  User,
  Lock,
  Mail,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import Logo from "./Logo.jsx";
import SimpleField from "./SimpleField.jsx";

import {
  loginFarm,
  registerFarm,
} from "../api.js";

export default function TenantLogin({
  onLogin,
  onRecoverPassword,
}) {
  const [slug, setSlug] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);

  // =========================================================
  // SUBMIT
  // =========================================================

  async function submit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const farmName = slug.trim();
    const userName = username.trim();
    const userEmail = email.trim();
    const userPassword = password;

    // =======================================================
    // VALIDATION
    // =======================================================

    if (!farmName) {
      setError("Please enter your farm name.");
      return;
    }

    if (!userName) {
      setError("Please enter your username.");
      return;
    }

    if (mode !== "forgot" && !userPassword) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      // =====================================================
      // LOGIN
      // =====================================================

      if (mode === "login") {
        console.log("LOGIN REQUEST:", {
          farmId: farmName,
          username: userName,
        });

        const result = await loginFarm({
          farmId: farmName,
          username: userName,
          password: userPassword,
        });

        console.log("LOGIN RESPONSE:", result);

        if (!result || result.success !== true) {
          throw new Error(
            result?.error || "Invalid username or password."
          );
        }

        if (!result.user) {
          throw new Error(
            "Login successful, but user information was not returned."
          );
        }

        if (!result.tenant) {
          throw new Error(
            "Login successful, but farm information was not returned."
          );
        }

        setSuccess("Login successful.");

        // ---------------------------------------------------
        // IMPORTANT
        // ---------------------------------------------------
        // Only send authenticated user to parent.
        // Do NOT use old onCreateTenant callback.

        if (typeof onLogin === "function") {
          await onLogin(
            result.user,
            result.tenant
          );
        } else {
          console.warn(
            "onLogin callback is not available."
          );
        }

        return;
      }

      // =====================================================
      // CREATE ACCOUNT
      // =====================================================

      if (mode === "create") {
        console.log("REGISTER REQUEST:", {
          farmName,
          username: userName,
          email: userEmail,
        });

        const result = await registerFarm({
          farmName: farmName,
          username: userName,
          email: userEmail,
          password: userPassword,
        });

        console.log(
          "REGISTER RESPONSE:",
          result
        );

        if (!result || result.success !== true) {
          throw new Error(
            result?.error ||
            "Unable to create farm account."
          );
        }

        if (!result.user) {
          throw new Error(
            "Account created, but user information was not returned."
          );
        }

        if (!result.tenant) {
          throw new Error(
            "Account created, but farm information was not returned."
          );
        }

        console.log(
          "ACCOUNT CREATED SUCCESSFULLY"
        );

        console.log(
          "NEW USER:",
          result.user
        );

        console.log(
          "NEW TENANT:",
          result.tenant
        );

        setSuccess(
          "Farm account created successfully. Opening dashboard..."
        );

        // ===================================================
        // IMPORTANT
        // ===================================================
        //
        // Backend already:
        // 1. Created Tenant
        // 2. Created User
        // 3. Saved MongoDB
        // 4. Created JWT
        // 5. Sent HTTP-only cookie
        //
        // Therefore directly login in frontend state.
        //
        // Do NOT call old onCreateTenant().
        // ===================================================

        if (typeof onLogin === "function") {
          await onLogin(
            result.user,
            result.tenant
          );
        } else {
          console.warn(
            "onLogin callback is not available."
          );
        }

        return;
      }

      // =====================================================
      // FORGOT PASSWORD
      // =====================================================

      if (mode === "forgot") {
        if (typeof onRecoverPassword === "function") {
          const result =
            await onRecoverPassword(
              farmName,
              userName
            );

          if (!result?.ok) {
            throw new Error(
              result?.error ||
              "Unable to recover password."
            );
          }

          setSuccess(
            result.message ||
            "Password recovery request completed."
          );
        } else {
          setError(
            "Password recovery is not connected yet."
          );
        }

        return;
      }

    } catch (err) {
      console.error(
        "AUTH ERROR:",
        err
      );

      setSuccess("");

      setError(
        err?.message ||
        "Unable to connect to backend server."
      );

    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // CHANGE MODE
  // =========================================================

  function changeMode(newMode) {
    setMode(newMode);

    setError("");
    setSuccess("");

    setPassword("");
  }

  // =========================================================
  // INPUT STYLE
  // =========================================================

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    fontSize: 14,
    background: "#fff",
    color: "#111827",
    boxSizing: "border-box",
    outline: "none",
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.96)",
        borderRadius: 30,
        padding: "36px 32px",
        boxShadow:
          "0 32px 80px rgba(15,23,42,0.12)",
        width: "100%",
        maxWidth: 520,
        border:
          "1px solid rgba(15,23,42,0.08)",
      }}
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <Logo size={56} />

        <div
          style={{
            textTransform: "uppercase",
            letterSpacing: 1.4,
            color: "#2563EB",
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          Farm management
        </div>

        <div
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#111827",
            }}
          >
            {mode === "login"
              ? "Welcome back"
              : mode === "create"
              ? "Create your farm"
              : "Recover password"}
          </div>

          <p
            style={{
              margin: "12px 0 0",
              fontSize: 14,
              color: "#6B7280",
              lineHeight: 1.7,
            }}
          >
            {mode === "login"
              ? "Sign in to access your farm dashboard and herd management tools."
              : mode === "create"
              ? "Register a farm account to track animals, events, and operations."
              : "Enter your farm name and username to recover your access."}
          </p>
        </div>
      </div>

      {/* ===================================================
          FORM
      =================================================== */}

      <form
        onSubmit={submit}
        style={{
          width: "100%",
        }}
      >
        {/* FARM NAME */}

        <SimpleField
          icon={Building2}
          label="Farm name"
        >
          <input
            type="text"
            value={slug}
            onChange={(e) =>
              setSlug(e.target.value)
            }
            style={inputStyle}
            placeholder="Enter farm name"
            autoComplete="organization"
          />
        </SimpleField>

        {/* USERNAME */}

        <SimpleField
          icon={User}
          label={
            mode === "login"
              ? "Username or Email"
              : "Username"
          }
        >
          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            style={inputStyle}
            placeholder={
              mode === "login"
                ? "Enter username or email"
                : "Enter username"
            }
            autoComplete="username"
          />
        </SimpleField>

        {/* EMAIL */}

        {mode === "create" && (
          <SimpleField
            icon={Mail}
            label="Email"
          >
            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={inputStyle}
              placeholder="Enter email (optional)"
              autoComplete="email"
            />
          </SimpleField>
        )}

        {/* PASSWORD */}

        {mode !== "forgot" && (
          <SimpleField
            icon={Lock}
            label="Password"
          >
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                style={inputStyle}
                placeholder="Enter password"
                autoComplete={
                  mode === "create"
                    ? "new-password"
                    : "current-password"
                }
              />

              {mode === "login" && (
                <div
                  style={{
                    marginTop: 10,
                    textAlign: "right",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      changeMode("forgot")
                    }
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#2563EB",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </div>
          </SimpleField>
        )}

        {/* ERROR */}

        {error && (
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              color: "#A33B3B",
              fontSize: 13,
              marginBottom: 14,
              background: "#FEF2F2",
              padding: 12,
              borderRadius: 12,
            }}
          >
            <AlertCircle size={16} />

            <span>{error}</span>
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              color: "#166534",
              fontSize: 13,
              marginBottom: 14,
              background: "#F0FDF4",
              padding: 12,
              borderRadius: 12,
            }}
          >
            <CheckCircle size={16} />

            <span>{success}</span>
          </div>
        )}

        {/* SUBMIT */}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: loading
              ? "#93C5FD"
              : "linear-gradient(135deg, #2563EB, #1D4ED8)",
            color: "#fff",
            border: "none",
            padding: "14px 0",
            borderRadius: 14,
            fontWeight: 700,
            fontSize: 15,
            cursor: loading
              ? "not-allowed"
              : "pointer",
            boxShadow:
              "0 16px 32px rgba(37,99,235,0.18)",
          }}
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Log in"
            : mode === "create"
            ? "Create account"
            : "Recover password"}
        </button>
      </form>

      {/* ===================================================
          BOTTOM
      =================================================== */}

      <div
        style={{
          marginTop: 18,
          textAlign: "center",
          fontSize: 13,
          color: "#6B7280",
        }}
      >
        {mode === "login" ? (
          <button
            type="button"
            onClick={() =>
              changeMode("create")
            }
            style={{
              background: "transparent",
              border: "none",
              color: "#2563EB",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Create a new farm account
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              changeMode("login")
            }
            style={{
              background: "transparent",
              border: "none",
              color: "#2563EB",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Back to login
          </button>
        )}
      </div>
    </div>
  );
}