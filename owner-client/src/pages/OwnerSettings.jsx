import React from "react";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Save,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import "./OwnerSettings.css";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function OwnerSettings() {
  /* =========================================================
     PROFILE
  ========================================================= */

  const [profile, setProfile] = React.useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = React.useState(true);
  const [profileSaving, setProfileSaving] =
    React.useState(false);

  const [profileMessage, setProfileMessage] =
    React.useState("");

  const [profileError, setProfileError] =
    React.useState("");


  /* =========================================================
     PASSWORD
  ========================================================= */

  const [passwordForm, setPasswordForm] =
    React.useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [passwordSaving, setPasswordSaving] =
    React.useState(false);

  const [passwordMessage, setPasswordMessage] =
    React.useState("");

  const [passwordError, setPasswordError] =
    React.useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    React.useState(false);

  const [showNewPassword, setShowNewPassword] =
    React.useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState(false);


  /* =========================================================
     LOAD SETTINGS
  ========================================================= */

  React.useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setProfileError("");

        const response = await fetch(
          `${API_BASE}/owner/settings`,
          {
            credentials: "include",
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Unable to load settings."
          );
        }

        setProfile({
          name: result.owner?.name || "",
          email: result.owner?.email || "",
        });
      } catch (error) {
        console.error(
          "LOAD SETTINGS ERROR:",
          error
        );

        setProfileError(
          error.message ||
            "Unable to load settings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);


  /* =========================================================
     PROFILE INPUT
  ========================================================= */

  const updateProfile = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* =========================================================
     PASSWORD INPUT
  ========================================================= */

  const updatePassword = (event) => {
    const { name, value } = event.target;

    setPasswordForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const saveProfile = async (event) => {
    event.preventDefault();

    setProfileSaving(true);
    setProfileMessage("");
    setProfileError("");

    try {
      const response = await fetch(
        `${API_BASE}/owner/settings`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profile.name,
            email: profile.email,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to save profile."
        );
      }

      setProfileMessage(
        "Profile updated successfully."
      );
    } catch (error) {
      console.error(
        "SAVE PROFILE ERROR:",
        error
      );

      setProfileError(
        error.message ||
          "Unable to save profile."
      );
    } finally {
      setProfileSaving(false);
    }
  };


  /* =========================================================
     CHANGE PASSWORD
  ========================================================= */

  const changePassword = async (event) => {
    event.preventDefault();

    setPasswordError("");
    setPasswordMessage("");

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwordForm;


    /* Validation */

    if (!currentPassword) {
      setPasswordError(
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword) {
      setPasswordError(
        "Please enter your new password."
      );
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(
        "New password must be at least 8 characters."
      );
      return;
    }

    if (!confirmPassword) {
      setPasswordError(
        "Please confirm your new password."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        "New password and confirm password do not match."
      );
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError(
        "New password must be different from your current password."
      );
      return;
    }


    /* API */

    try {
      setPasswordSaving(true);

      const response = await fetch(
        `${API_BASE}/owner/auth/settings/password`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to change password."
        );
      }

      setPasswordMessage(
        "Password changed successfully."
      );

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      console.error(
        "PASSWORD CHANGE ERROR:",
        error
      );

      setPasswordError(
        error.message ||
          "Unable to change password."
      );
    } finally {
      setPasswordSaving(false);
    }
  };


  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="owner-settings-loading">
        <div className="owner-settings-loading-box">
          Loading settings...
        </div>
      </div>
    );
  }


  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="owner-settings-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="owner-settings-header">

        <div className="owner-settings-header-icon">
          <Settings size={22} />
        </div>

        <div>
          <span className="owner-settings-eyebrow">
            ACCOUNT SETTINGS
          </span>

          <h1>Settings</h1>

          <p>
            Manage your SelSolve owner profile
            and account security.
          </p>
        </div>

      </header>


      {/* =====================================================
          PROFILE ERROR
      ===================================================== */}

      {profileError && (
        <div className="owner-settings-error">
          {profileError}
        </div>
      )}


      {/* =====================================================
          PROFILE CARD
      ===================================================== */}

      <form
        className="owner-settings-card"
        onSubmit={saveProfile}
      >

        <div className="owner-settings-card-header">

          <div className="owner-settings-card-icon">
            <UserRound size={20} />
          </div>

          <div>
            <h2>Owner Profile</h2>

            <p>
              Manage your basic owner account
              information.
            </p>
          </div>

        </div>


        <div className="owner-settings-grid">

          {/* NAME */}

          <label className="owner-settings-field">

            <span className="owner-settings-label">
              <UserRound size={15} />
              Display Name
            </span>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={updateProfile}
              placeholder="Enter display name"
              className="owner-settings-input"
              required
            />

          </label>


          {/* EMAIL */}

          <label className="owner-settings-field">

            <span className="owner-settings-label">
              <span className="owner-settings-at">
                @
              </span>
              Email Address
            </span>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={updateProfile}
              placeholder="Enter email address"
              className="owner-settings-input"
              required
            />

          </label>

        </div>


        {profileMessage && (
          <div className="owner-settings-success">
            <CheckCircle2 size={17} />
            {profileMessage}
          </div>
        )}


        <div className="owner-settings-actions">

          <button
            type="submit"
            className="owner-settings-primary-btn"
            disabled={profileSaving}
          >
            <Save size={16} />

            {profileSaving
              ? "Saving..."
              : "Save Profile"}
          </button>

        </div>

      </form>


      {/* =====================================================
          SECURITY CARD
      ===================================================== */}

      <form
        className="owner-settings-card"
        onSubmit={changePassword}
      >

        <div className="owner-settings-card-header">

          <div className="owner-settings-card-icon">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2>Account Security</h2>

            <p>
              Update your password and keep
              your account protected.
            </p>
          </div>

        </div>


        {/* SECURITY NOTICE */}

        <div className="owner-security-notice">

          <ShieldCheck size={20} />

          <div>
            <strong>
              Secure your account
            </strong>

            <p>
              Choose a strong password with
              at least 8 characters.
            </p>
          </div>

        </div>


        {/* PASSWORD FIELDS */}

        <div className="owner-settings-password-list">

          {/* CURRENT PASSWORD */}

          <label className="owner-settings-field">

            <span className="owner-settings-label">
              Current Password
            </span>

            <div className="owner-password-input-wrap">

              <input
                type={
                  showCurrentPassword
                    ? "text"
                    : "password"
                }
                name="currentPassword"
                value={
                  passwordForm.currentPassword
                }
                onChange={updatePassword}
                placeholder="Current password"
                autoComplete="current-password"
                className="owner-settings-input"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowCurrentPassword(
                    (previous) => !previous
                  )
                }
              >
                {showCurrentPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

          </label>


          {/* NEW PASSWORD */}

          <label className="owner-settings-field">

            <span className="owner-settings-label">
              New Password
            </span>

            <div className="owner-password-input-wrap">

              <input
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                name="newPassword"
                value={
                  passwordForm.newPassword
                }
                onChange={updatePassword}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                className="owner-settings-input"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowNewPassword(
                    (previous) => !previous
                  )
                }
              >
                {showNewPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

          </label>


          {/* CONFIRM PASSWORD */}

          <label className="owner-settings-field">

            <span className="owner-settings-label">
              Confirm Password
            </span>

            <div className="owner-password-input-wrap">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={
                  passwordForm.confirmPassword
                }
                onChange={updatePassword}
                placeholder="Confirm new password"
                autoComplete="new-password"
                className="owner-settings-input"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) => !previous
                  )
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

          </label>

        </div>


        {/* PASSWORD ERROR */}

        {passwordError && (
          <div className="owner-settings-error">
            {passwordError}
          </div>
        )}


        {/* PASSWORD SUCCESS */}

        {passwordMessage && (
          <div className="owner-settings-success">
            <CheckCircle2 size={17} />
            {passwordMessage}
          </div>
        )}


        {/* PASSWORD BUTTON */}

        <div className="owner-settings-actions">

          <button
            type="submit"
            className="owner-settings-primary-btn"
            disabled={passwordSaving}
          >
            <KeyRound size={16} />

            {passwordSaving
              ? "Updating..."
              : "Change Password"}
          </button>

        </div>

      </form>

    </div>
  );
}