import React from "react";
import {
  Building2,
  Search,
  RefreshCw,
  Users,
  CheckCircle2,
  XCircle,
  CalendarDays,
  Eye,
  X,
} from "lucide-react";
import "./OwnerTenants.css";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function OwnerTenants() {
  const [tenants, setTenants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState("");

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] =
    React.useState("All");

  const [selectedTenant, setSelectedTenant] =
    React.useState(null);

  const loadTenants = React.useCallback(
    async (refresh = false) => {
      try {
        if (refresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await fetch(
          `${API_BASE}/owner/tenants`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
            },
          }
        );

        const result = await response
          .json()
          .catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Failed to load tenant data."
          );
        }

        let tenantData = [];

        if (Array.isArray(result)) {
          tenantData = result;
        } else if (
          Array.isArray(result?.tenants)
        ) {
          tenantData = result.tenants;
        } else if (
          Array.isArray(result?.data)
        ) {
          tenantData = result.data;
        }

        setTenants(tenantData);
      } catch (err) {
        console.error(
          "OWNER TENANTS ERROR:",
          err
        );

        setTenants([]);
        setError(
          err.message ||
            "Unable to load tenants."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  React.useEffect(() => {
    loadTenants();
  }, [loadTenants]);

  const totalTenants = tenants.length;

  const activeTenants = tenants.filter(
    (tenant) =>
      String(
        tenant?.status || "Active"
      ).toLowerCase() === "active"
  ).length;

  const inactiveTenants = tenants.filter(
    (tenant) =>
      String(
        tenant?.status || ""
      ).toLowerCase() === "inactive"
  ).length;

  const totalUsers = tenants.reduce(
    (total, tenant) => {
      if (Array.isArray(tenant?.users)) {
        return total + tenant.users.length;
      }

      return (
        total +
        Number(tenant?.userCount || 0)
      );
    },
    0
  );

  const filteredTenants =
    tenants.filter((tenant) => {
      const name = String(
        tenant?.name || ""
      ).toLowerCase();

      const searchText =
        search.trim().toLowerCase();

      const status = String(
        tenant?.status || "Active"
      ).toLowerCase();

      const searchMatch =
        !searchText ||
        name.includes(searchText);

      const statusMatch =
        statusFilter === "All" ||
        status ===
          statusFilter.toLowerCase();

      return searchMatch && statusMatch;
    });

  const getUserCount = (tenant) => {
    if (Array.isArray(tenant?.users)) {
      return tenant.users.length;
    }

    return Number(
      tenant?.userCount || 0
    );
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="owner-tenants-page">

      {/* HEADER */}
      <div className="owner-tenants-header">

        <div>
          <div className="owner-tenants-breadcrumb">
            Owner Portal
            <span>/</span>
            Tenants
          </div>

          <h1>Tenants</h1>

          <p>
            Manage all SelSolve farm accounts
            from one place.
          </p>
        </div>

        <button
          type="button"
          className="owner-tenants-refresh"
          onClick={() => loadTenants(true)}
          disabled={loading || refreshing}
        >
          <RefreshCw
            size={17}
            className={
              refreshing
                ? "owner-tenants-spin"
                : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {/* STATISTICS */}
      <div className="owner-tenants-stats">

        <div className="owner-tenant-stat">
          <div className="owner-tenant-stat-icon blue">
            <Building2 size={21} />
          </div>

          <div>
            <span>Total Tenants</span>
            <strong>
              {totalTenants}
            </strong>
          </div>
        </div>

        <div className="owner-tenant-stat">
          <div className="owner-tenant-stat-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Active</span>
            <strong>
              {activeTenants}
            </strong>
          </div>
        </div>

        <div className="owner-tenant-stat">
          <div className="owner-tenant-stat-icon red">
            <XCircle size={21} />
          </div>

          <div>
            <span>Inactive</span>
            <strong>
              {inactiveTenants}
            </strong>
          </div>
        </div>

        <div className="owner-tenant-stat">
          <div className="owner-tenant-stat-icon purple">
            <Users size={21} />
          </div>

          <div>
            <span>Total Users</span>
            <strong>
              {totalUsers}
            </strong>
          </div>
        </div>

      </div>

      {/* MAIN CARD */}
      <div className="owner-tenants-card">

        {/* TOOLBAR */}
        <div className="owner-tenants-toolbar">

          <div className="owner-tenants-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search tenant..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="owner-tenants-filters">

            {[
              "All",
              "Active",
              "Inactive",
            ].map((status) => (
              <button
                type="button"
                key={status}
                className={
                  statusFilter === status
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setStatusFilter(status)
                }
              >
                {status}
              </button>
            ))}

          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="owner-tenants-error">
            <XCircle size={19} />

            <div>
              <strong>
                Unable to load tenants
              </strong>

              <span>{error}</span>
            </div>

            <button
              type="button"
              onClick={() =>
                loadTenants()
              }
            >
              Retry
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="owner-tenants-loading">

            <div className="owner-tenants-loader" />

            <h3>
              Loading tenants...
            </h3>

            <p>
              Fetching real tenant data
              from SelSolve.
            </p>

          </div>
        ) : filteredTenants.length ===
          0 ? (
          <div className="owner-tenants-empty">

            <div className="owner-tenants-empty-icon">
              <Building2 size={27} />
            </div>

            <h3>
              {search ||
              statusFilter !== "All"
                ? "No matching tenants"
                : "No tenants found"}
            </h3>

            <p>
              {search ||
              statusFilter !== "All"
                ? "Try changing your search or filter."
                : "Tenant accounts will appear here when they are created."}
            </p>

          </div>
        ) : (
          <div className="owner-tenants-table-wrap">

            <table className="owner-tenants-table">

              <thead>
                <tr>
                  <th>Tenant</th>
                  <th>Status</th>
                  <th>Users</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredTenants.map(
                  (tenant) => {
                    const status =
                      tenant?.status ||
                      "Active";

                    const userCount =
                      getUserCount(
                        tenant
                      );

                    const tenantName =
                      tenant?.name ||
                      "Unnamed Tenant";

                    return (
                      <tr
                        key={
                          tenant?._id ||
                          tenant?.id
                        }
                      >

                        <td>
                          <div className="owner-tenant-name">

                            <div className="owner-tenant-avatar">
                              {tenantName
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <strong>
                                {tenantName}
                              </strong>

                              <span>
                                ID:{" "}
                                {tenant?._id
                                  ? String(
                                      tenant._id
                                    ).slice(
                                      -8
                                    )
                                  : "—"}
                              </span>
                            </div>

                          </div>
                        </td>

                        <td>
                          <span
                            className={`owner-tenant-status ${
                              String(
                                status
                              ).toLowerCase() ===
                              "active"
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            <i />
                            {status}
                          </span>
                        </td>

                        <td>
                          <div className="owner-tenant-users">
                            <Users
                              size={16}
                            />
                            {userCount}
                          </div>
                        </td>

                        <td>
                          <div className="owner-tenant-date">
                            <CalendarDays
                              size={15}
                            />

                            {formatDate(
                              tenant?.createdAt
                            )}
                          </div>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="owner-tenant-view"
                            onClick={() =>
                              setSelectedTenant(
                                tenant
                              )
                            }
                          >
                            <Eye
                              size={15}
                            />
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

      {/* DETAILS MODAL */}
      {selectedTenant && (
        <div
          className="owner-tenant-modal-overlay"
          onClick={() =>
            setSelectedTenant(null)
          }
        >

          <div
            className="owner-tenant-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="owner-tenant-modal-header">

              <div>
                <span>
                  Tenant Details
                </span>

                <h2>
                  {selectedTenant?.name ||
                    "Tenant"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedTenant(
                    null
                  )
                }
              >
                <X size={19} />
              </button>

            </div>

            <div className="owner-tenant-details">

              <div>
                <span>Status</span>

                <strong>
                  {selectedTenant?.status ||
                    "Active"}
                </strong>
              </div>

              <div>
                <span>Users</span>

                <strong>
                  {getUserCount(
                    selectedTenant
                  )}
                </strong>
              </div>

              <div>
                <span>Created</span>

                <strong>
                  {formatDate(
                    selectedTenant?.createdAt
                  )}
                </strong>
              </div>

              <div>
                <span>Tenant ID</span>

                <strong className="owner-tenant-full-id">
                  {selectedTenant?._id ||
                    "—"}
                </strong>
              </div>

            </div>

            {/* USERS */}
            {Array.isArray(
              selectedTenant?.users
            ) &&
              selectedTenant.users.length >
                0 && (
                <div className="owner-tenant-users-list">

                  <h3>
                    Tenant Users
                  </h3>

                  {selectedTenant.users.map(
                    (user) => (
                      <div
                        className="owner-tenant-user"
                        key={user?._id}
                      >

                        <div className="owner-tenant-user-avatar">
                          {String(
                            user?.name ||
                              user?.username ||
                              "U"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {user?.name ||
                              user?.username ||
                              "User"}
                          </strong>

                          <span>
                            {user?.email ||
                              "No email"}
                          </span>
                        </div>

                        <em>
                          {user?.role ||
                            "staff"}
                        </em>

                      </div>
                    )
                  )}

                </div>
              )}

          </div>
        </div>
      )}

    </div>
  );
}

export default OwnerTenants;