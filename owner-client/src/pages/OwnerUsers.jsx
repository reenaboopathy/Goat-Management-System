
import React from "react";
import {
  Search,
  RefreshCw,
  Users,
  ShieldCheck,
  UserCheck,
  UserX,
  X,
} from "lucide-react";

import "./OwnerUsers.css";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function OwnerUsers() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState("");

  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("All");

  const [selectedUser, setSelectedUser] = React.useState(null);

  /* =========================================================
     LOAD USERS
  ========================================================= */

  const loadUsers = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(`${API_BASE}/owner/tenants`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to load users (${response.status})`
        );
      }

      const result = await response.json();

      /*
        Supported backend response formats:

        1. [ tenants ]

        2. {
             tenants: [...]
           }

        3. {
             data: [...]
           }
      */

      const tenants = Array.isArray(result)
        ? result
        : Array.isArray(result?.tenants)
        ? result.tenants
        : Array.isArray(result?.data)
        ? result.data
        : [];

      const normalizedUsers = [];

      tenants.forEach((tenant) => {
        const tenantUsers = Array.isArray(tenant?.users)
          ? tenant.users
          : [];

        tenantUsers.forEach((user) => {
          normalizedUsers.push({
            id: user?._id || user?.id || null,

            username: user?.username || "",

            name:
              user?.name ||
              user?.fullName ||
              "",

            email: user?.email || "",

            role:
              user?.role ||
              user?.userRole ||
              "staff",

            tenantId:
              tenant?._id ||
              tenant?.id ||
              "",

            tenantName:
              tenant?.name ||
              tenant?.tenantName ||
              "Unknown Tenant",

            tenantStatus:
              tenant?.status ||
              tenant?.tenantStatus ||
              "Inactive",

            createdAt:
              user?.createdAt ||
              tenant?.createdAt ||
              null,
          });
        });
      });

      setUsers(normalizedUsers);
    } catch (err) {
      console.error("OWNER USERS ERROR:", err);

      setUsers([]);

      setError(
        err?.message ||
          "Unable to load users from the server."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  React.useEffect(() => {
    loadUsers();
  }, []);

  /* =========================================================
     FILTER USERS
  ========================================================= */

  const filteredUsers = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const name =
        user?.name?.toLowerCase() || "";

      const username =
        user?.username?.toLowerCase() || "";

      const email =
        user?.email?.toLowerCase() || "";

      const tenantName =
        user?.tenantName?.toLowerCase() || "";

      const role =
        user?.role?.toLowerCase() || "";

      const matchesSearch =
        !query ||
        name.includes(query) ||
        username.includes(query) ||
        email.includes(query) ||
        tenantName.includes(query);

      const matchesRole =
        roleFilter === "All" ||
        role === roleFilter.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const adminCount = React.useMemo(() => {
    return users.filter(
      (user) =>
        user?.role?.toLowerCase() === "admin"
    ).length;
  }, [users]);

  const staffCount = React.useMemo(() => {
    return users.filter(
      (user) =>
        user?.role?.toLowerCase() === "staff"
    ).length;
  }, [users]);

  /*
    IMPORTANT:

    Count UNIQUE active tenants,
    not active users.

    Example:

    Tenant A -> 5 users
    Tenant B -> 3 users

    Active Tenants = 2
  */

  const activeTenantCount = React.useMemo(() => {
    const activeTenantIds = new Set();

    users.forEach((user) => {
      if (
        String(user?.tenantStatus).toLowerCase() ===
        "active"
      ) {
        const tenantKey =
          user?.tenantId ||
          user?.tenantName;

        if (tenantKey) {
          activeTenantIds.add(String(tenantKey));
        }
      }
    });

    return activeTenantIds.size;
  }, [users]);

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "—";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "—";
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const closeModal = () => {
    setSelectedUser(null);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="owner-users-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="owner-users-header">
        <div>
          <div className="owner-users-eyebrow">
            SELSOLVE PLATFORM
          </div>

          <h1>Users</h1>

          <p>
            View and manage users belonging to
            SelSolve tenants.
          </p>
        </div>

        <button
          type="button"
          className="owner-users-refresh"
          onClick={() => loadUsers(true)}
          disabled={loading || refreshing}
        >
          <RefreshCw
            size={17}
            className={
              refreshing
                ? "owner-spin"
                : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="owner-users-error">
          <div>
            <strong>
              Unable to load users
            </strong>

            <span>
              {error}
            </span>
          </div>

          <button
            type="button"
            onClick={() => loadUsers()}
          >
            Try Again
          </button>
        </div>
      )}

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="owner-users-stats">

        {/* TOTAL USERS */}

        <div className="owner-users-stat-card">
          <div className="owner-users-stat-icon">
            <Users size={20} />
          </div>

          <div>
            <span>Total Users</span>

            <strong>
              {users.length}
            </strong>
          </div>
        </div>

        {/* ADMINS */}

        <div className="owner-users-stat-card">
          <div className="owner-users-stat-icon">
            <ShieldCheck size={20} />
          </div>

          <div>
            <span>Admins</span>

            <strong>
              {adminCount}
            </strong>
          </div>
        </div>

        {/* STAFF */}

        <div className="owner-users-stat-card">
          <div className="owner-users-stat-icon">
            <UserCheck size={20} />
          </div>

          <div>
            <span>Staff</span>

            <strong>
              {staffCount}
            </strong>
          </div>
        </div>

        {/* ACTIVE TENANTS */}

        <div className="owner-users-stat-card">
          <div className="owner-users-stat-icon">
            <UserCheck size={20} />
          </div>

          <div>
            <span>Active Tenants</span>

            <strong>
              {activeTenantCount}
            </strong>
          </div>
        </div>

      </div>

      {/* =====================================================
          USERS CARD
      ===================================================== */}

      <div className="owner-users-card">

        {/* TOOLBAR */}

        <div className="owner-users-toolbar">

          {/* SEARCH */}

          <div className="owner-users-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search users, email or tenant..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {/* ROLE FILTER */}

          <div className="owner-users-filters">
            {[
              "All",
              "Admin",
              "Staff",
            ].map((role) => (
              <button
                key={role}
                type="button"
                className={
                  roleFilter === role
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setRoleFilter(role)
                }
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* ===================================================
            LOADING
        =================================================== */}

        {loading ? (
          <div className="owner-users-loading">

            <div className="owner-users-loader" />

            <h3>
              Loading users...
            </h3>

            <p>
              Fetching real user data
              from SelSolve.
            </p>

          </div>

        ) : filteredUsers.length === 0 ? (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="owner-users-empty">

            <div className="owner-users-empty-icon">
              {error ? (
                <UserX size={24} />
              ) : (
                <Users size={24} />
              )}
            </div>

            <h3>
              {users.length === 0
                ? "No users found"
                : "No matching users"}
            </h3>

            <p>
              {users.length === 0
                ? "There are no user records available in the database."
                : "Try changing your search or role filter."}
            </p>

          </div>

        ) : (

          /* =================================================
             USERS TABLE
          ================================================= */

          <div className="owner-users-table-wrap">

            <table className="owner-users-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Tenant</th>
                  <th>Role</th>
                  <th>Tenant Status</th>
                  <th>Added</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>

                {filteredUsers.map(
                  (user, index) => {

                    const displayName =
                      user?.name ||
                      user?.username ||
                      "Unnamed User";

                    const initial =
                      displayName
                        .charAt(0)
                        .toUpperCase() ||
                      "U";

                    const role =
                      user?.role ||
                      "staff";

                    const isAdmin =
                      role.toLowerCase() ===
                      "admin";

                    const isActive =
                      String(
                        user?.tenantStatus
                      ).toLowerCase() ===
                      "active";

                    return (
                      <tr
                        key={
                          user?.id ||
                          `${user?.tenantId}-${user?.username}-${index}`
                        }
                      >

                        {/* USER */}

                        <td>
                          <div className="owner-user-cell">

                            <div className="owner-user-avatar">
                              {initial}
                            </div>

                            <div>
                              <strong>
                                {displayName}
                              </strong>

                              <span>
                                @
                                {user?.username ||
                                  "—"}
                              </span>
                            </div>

                          </div>
                        </td>

                        {/* EMAIL */}

                        <td>
                          {user?.email || "—"}
                        </td>

                        {/* TENANT */}

                        <td>
                          <span className="owner-tenant-name">
                            {user?.tenantName ||
                              "Unknown Tenant"}
                          </span>
                        </td>

                        {/* ROLE */}

                        <td>
                          <span
                            className={`owner-role-badge ${
                              isAdmin
                                ? "admin"
                                : "staff"
                            }`}
                          >
                            {role}
                          </span>
                        </td>

                        {/* TENANT STATUS */}

                        <td>
                          <span
                            className={`owner-status-badge ${
                              isActive
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            {user?.tenantStatus ||
                              "Inactive"}
                          </span>
                        </td>

                        {/* CREATED DATE */}

                        <td>
                          {formatDate(
                            user?.createdAt
                          )}
                        </td>

                        {/* VIEW */}

                        <td>
                          <button
                            type="button"
                            className="owner-user-view-btn"
                            onClick={() =>
                              setSelectedUser(
                                user
                              )
                            }
                          >
                            View
                          </button>
                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>
        )}
      </div>

      {/* =====================================================
          USER DETAILS MODAL
      ===================================================== */}

      {selectedUser && (
        <div
          className="owner-user-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="owner-user-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="owner-user-modal-header">

              <div>
                <span>
                  User Details
                </span>

                <h2>
                  {selectedUser?.name ||
                    selectedUser?.username ||
                    "User"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
              >
                <X size={20} />
              </button>

            </div>

            {/* USER DETAILS */}

            <div className="owner-user-detail-list">

              {/* USERNAME */}

              <div>
                <span>
                  Username
                </span>

                <strong>
                  {selectedUser?.username ||
                    "—"}
                </strong>
              </div>

              {/* NAME */}

              <div>
                <span>
                  Name
                </span>

                <strong>
                  {selectedUser?.name ||
                    "—"}
                </strong>
              </div>

              {/* EMAIL */}

              <div>
                <span>
                  Email
                </span>

                <strong>
                  {selectedUser?.email ||
                    "—"}
                </strong>
              </div>

              {/* ROLE */}

              <div>
                <span>
                  Role
                </span>

                <strong>
                  {selectedUser?.role ||
                    "—"}
                </strong>
              </div>

              {/* TENANT */}

              <div>
                <span>
                  Tenant
                </span>

                <strong>
                  {selectedUser?.tenantName ||
                    "—"}
                </strong>
              </div>

              {/* TENANT STATUS */}

              <div>
                <span>
                  Tenant Status
                </span>

                <strong>
                  {selectedUser?.tenantStatus ||
                    "—"}
                </strong>
              </div>

              {/* ADDED DATE */}

              <div>
                <span>
                  Added
                </span>

                <strong>
                  {formatDate(
                    selectedUser?.createdAt
                  )}
                </strong>
              </div>

            </div>

            {/* SECURITY NOTE */}

            <div className="owner-user-modal-note">
              Password information is never
              displayed in the Owner Portal.
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default OwnerUsers;

