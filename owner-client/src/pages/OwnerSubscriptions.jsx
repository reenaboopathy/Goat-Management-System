import React from "react";
import {
  CreditCard,
  RefreshCw,
  Search,
  X,
  ShieldCheck,
  AlertCircle,
  Clock3,
  CalendarDays,
} from "lucide-react";

import "./OwnerSubscriptions.css";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function OwnerSubscriptions() {
  const [subscriptions, setSubscriptions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All");

  const [selectedTenant, setSelectedTenant] = React.useState(null);

  const [updating, setUpdating] = React.useState(false);

  const [paymentRequests, setPaymentRequests] = React.useState([]);

  const [editStartDate, setEditStartDate] = React.useState("");
  const [editEndDate, setEditEndDate] = React.useState("");

  /* =========================================================
     LOAD SUBSCRIPTIONS
  ========================================================= */

  const loadSubscriptions = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        `${API_BASE}/subscriptions`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load subscriptions (${response.status})`
        );
      }

      const result = await response.json();

      const data = Array.isArray(result?.subscriptions)
        ? result.subscriptions
        : Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result)
        ? result
        : [];

      setSubscriptions(data);
    } catch (err) {
      console.error(
        "OWNER SUBSCRIPTIONS ERROR:",
        err
      );

      setSubscriptions([]);

      setError(
        err?.message ||
          "Unable to load subscription data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /* =========================================================
     LOAD PAYMENT REQUESTS
  ========================================================= */

  const loadPaymentRequests = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/subscriptions/payment-requests/list`,
        {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to load payment requests."
        );
      }

      setPaymentRequests(
        result.paymentRequests || []
      );
    } catch (requestError) {
      console.error(
        "OWNER PAYMENT REQUESTS ERROR:",
        requestError
      );
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  React.useEffect(() => {
    loadSubscriptions();
    loadPaymentRequests();
  }, []);

  /* =========================================================
     REVIEW PAYMENT
  ========================================================= */

  const reviewPayment = async (
    request,
    action
  ) => {
    try {
      setUpdating(true);
      setError("");

      const response = await fetch(
        `${API_BASE}/subscriptions/payment-requests/${request.id}/${action}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },
          body:
            action === "reject"
              ? JSON.stringify({
                  reason:
                    "Payment could not be verified by owner.",
                })
              : JSON.stringify({}),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Payment review failed."
        );
      }

      await Promise.all([
        loadSubscriptions(true),
        loadPaymentRequests(),
      ]);
    } catch (requestError) {
      console.error(
        "PAYMENT REVIEW ERROR:",
        requestError
      );

      setError(
        requestError?.message ||
          "Payment review failed."
      );
    } finally {
      setUpdating(false);
    }
  };

  /* =========================================================
     GET STATUS
  ========================================================= */

  const getSubscriptionStatus = (item) => {
    if (!item?.subscription) {
      return "Not Configured";
    }

    return (
      item.subscription.status ||
      "Not Configured"
    );
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredSubscriptions =
    React.useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return subscriptions.filter((item) => {
        const tenantName =
          item?.tenantName || "";

        const plan =
          item?.subscription?.plan || "";

        const status =
          getSubscriptionStatus(item);

        const matchesSearch =
          !query ||
          tenantName
            .toLowerCase()
            .includes(query) ||
          plan
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "All" ||
          status === statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      });
    }, [
      subscriptions,
      search,
      statusFilter,
    ]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = React.useMemo(() => {
    const total = subscriptions.length;

    const active =
      subscriptions.filter(
        (item) =>
          item?.subscription?.status ===
          "Active"
      ).length;

    const trial =
      subscriptions.filter(
        (item) =>
          item?.subscription?.plan ===
          "Trial"
      ).length;

    const expired =
      subscriptions.filter(
        (item) =>
          item?.subscription?.status ===
          "Expired"
      ).length;

    return {
      total,
      active,
      trial,
      expired,
    };
  }, [subscriptions]);

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (value) => {
    if (!value) {
      return "Not configured";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Not configured";
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

  /* =========================================================
     DATE INPUT FORMAT
  ========================================================= */

  const getInputDate = (value) => {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /* =========================================================
     PLAN CLASS
  ========================================================= */

  const getPlanClass = (plan) => {
    if (!plan) {
      return "none";
    }

    return plan
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  /* =========================================================
     UPDATE SUBSCRIPTION DATES
  ========================================================= */

  const updateSubscription = async () => {
    try {
      setUpdating(true);
      setError("");

      if (!selectedTenant?.tenantId) {
        throw new Error(
          "Tenant ID is missing."
        );
      }

      if (!editStartDate) {
        throw new Error(
          "Please select a start date."
        );
      }

      if (!editEndDate) {
        throw new Error(
          "Please select an end date."
        );
      }

      if (
        new Date(editEndDate) <
        new Date(editStartDate)
      ) {
        throw new Error(
          "End date cannot be before start date."
        );
      }

      const response = await fetch(
        `${API_BASE}/subscriptions/${selectedTenant.tenantId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            startDate: editStartDate,
            endDate: editEndDate,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Failed to update subscription (${response.status})`
        );
      }

      setSelectedTenant(null);
      setEditStartDate("");
      setEditEndDate("");

      await loadSubscriptions(true);
    } catch (err) {
      console.error(
        "UPDATE SUBSCRIPTION ERROR:",
        err
      );

      setError(
        err?.message ||
          "Unable to update subscription."
      );
    } finally {
      setUpdating(false);
    }
  };

  /* =========================================================
     UPDATE STATUS
  ========================================================= */

  const updateSubscriptionStatus = async (
    tenantId,
    status
  ) => {
    try {
      setUpdating(true);
      setError("");

      const response = await fetch(
        `${API_BASE}/subscriptions/${tenantId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to update status."
        );
      }

      setSelectedTenant(null);

      await loadSubscriptions(true);
    } catch (err) {
      console.error(
        "UPDATE STATUS ERROR:",
        err
      );

      setError(
        err?.message ||
          "Unable to update status."
      );
    } finally {
      setUpdating(false);
    }
  };

  /* =========================================================
     EXPIRE TRIAL
  ========================================================= */

  const handleExpireTrial = () => {
    if (!selectedTenant) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to expire the trial for "${selectedTenant.tenantName}"?`
    );

    if (!confirmed) {
      return;
    }

    updateSubscriptionStatus(
      selectedTenant.tenantId,
      "Expired"
    );
  };

  /* =========================================================
     RESTORE TRIAL
  ========================================================= */

  const handleRestoreTrial = () => {
    if (!selectedTenant) {
      return;
    }

    const confirmed = window.confirm(
      `Restore trial for "${selectedTenant.tenantName}"?`
    );

    if (!confirmed) {
      return;
    }

    updateSubscriptionStatus(
      selectedTenant.tenantId,
      "Active"
    );
  };

  /* =========================================================
     VIEW TENANT
  ========================================================= */

  const handleViewTenant = (item) => {
    setSelectedTenant(item);

    setEditStartDate(
      getInputDate(
        item?.subscription?.startDate
      )
    );

    setEditEndDate(
      getInputDate(
        item?.subscription?.endDate
      )
    );

    setError("");
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const handleCloseModal = () => {
    if (updating) {
      return;
    }

    setSelectedTenant(null);
    setEditStartDate("");
    setEditEndDate("");
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="owner-subscriptions-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="owner-subscriptions-header">

        <div>
          <div className="owner-subscriptions-eyebrow">
            SELSOLVE PLATFORM
          </div>

          <h1>Subscriptions</h1>

          <p>
            Monitor tenant plans, subscription
            status and limits.
          </p>
        </div>

        <button
          type="button"
          className="owner-subscriptions-refresh"
          onClick={() =>
            loadSubscriptions(true)
          }
          disabled={
            loading || refreshing
          }
        >
          <RefreshCw
            size={17}
            className={
              refreshing
                ? "owner-subscriptions-spin"
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
        <div className="owner-subscriptions-error">

          <div className="owner-subscriptions-error-icon">
            <AlertCircle size={19} />
          </div>

          <div>
            <strong>
              Unable to process request
            </strong>

            <span>{error}</span>
          </div>

          <button
            type="button"
            onClick={() =>
              loadSubscriptions()
            }
          >
            Try Again
          </button>

        </div>
      )}

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="owner-subscriptions-stats">

        <div className="owner-subscription-stat">

          <div className="owner-subscription-stat-icon">
            <CreditCard size={20} />
          </div>

          <div>
            <span>Total Tenants</span>
            <strong>{stats.total}</strong>
          </div>

        </div>

        <div className="owner-subscription-stat">

          <div className="owner-subscription-stat-icon">
            <ShieldCheck size={20} />
          </div>

          <div>
            <span>Active Plans</span>
            <strong>{stats.active}</strong>
          </div>

        </div>

        <div className="owner-subscription-stat">

          <div className="owner-subscription-stat-icon">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Trial Accounts</span>
            <strong>{stats.trial}</strong>
          </div>

        </div>

        <div className="owner-subscription-stat">

          <div className="owner-subscription-stat-icon">
            <AlertCircle size={20} />
          </div>

          <div>
            <span>Expired</span>
            <strong>{stats.expired}</strong>
          </div>

        </div>

      </div>

      {/* =====================================================
          PAYMENT REQUESTS
      ===================================================== */}

      <section className="owner-payment-requests">

        <div className="owner-payment-requests-heading">

          <div>
            <span>
              PAYMENT VERIFICATION QUEUE
            </span>

            <h2>
              Owner review required
            </h2>
          </div>

          <strong>
            {
              paymentRequests.filter(
                (request) =>
                  request.status ===
                  "pending"
              ).length
            }{" "}
            pending
          </strong>

        </div>

        {paymentRequests.filter(
          (request) =>
            request.status === "pending"
        ).length === 0 ? (

          <p className="owner-payment-empty">
            No pending payment confirmations.
          </p>

        ) : (

          paymentRequests
            .filter(
              (request) =>
                request.status ===
                "pending"
            )
            .map((request) => (

              <div
                className="owner-payment-request"
                key={request.id}
              >

                <div className="owner-payment-request-icon">
                  <CreditCard size={18} />
                </div>

                <div className="owner-payment-request-info">

                  <strong>
                    {request.tenantName}
                  </strong>

                  <span>
                    {request.plan} plan · ₹
                    {request.amount} ·{" "}
                    {request.paymentMethod}
                  </span>

                  <small>
                    Receiver:{" "}
                    {request.paymentReceiver ||
                      "Not provided"}
                  </small>

                </div>

                <div className="owner-payment-actions">

                  <button
                    type="button"
                    className="owner-payment-approve"
                    disabled={updating}
                    onClick={() =>
                      reviewPayment(
                        request,
                        "approve"
                      )
                    }
                  >
                    Approve
                  </button>

                  <button
                    type="button"
                    className="owner-payment-reject"
                    disabled={updating}
                    onClick={() =>
                      reviewPayment(
                        request,
                        "reject"
                      )
                    }
                  >
                    Reject
                  </button>

                </div>

              </div>

            ))

        )}

      </section>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="owner-subscriptions-card">

        <div className="owner-subscriptions-toolbar">

          <div className="owner-subscriptions-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search tenant or plan..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

          </div>

          <div className="owner-subscriptions-filters">

            {[
              "All",
              "Active",
              "Expired",
              "Cancelled",
              "Suspended",
              "Not Configured",
            ].map((status) => (

              <button
                key={status}
                type="button"
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

        {/* ===================================================
            CONTENT
        =================================================== */}

        {loading ? (

          <div className="owner-subscriptions-loading">

            <div className="owner-subscriptions-loader" />

            <h3>
              Loading subscriptions...
            </h3>

            <p>
              Fetching real subscription
              information from SelSolve.
            </p>

          </div>

        ) : filteredSubscriptions.length ===
          0 ? (

          <div className="owner-subscriptions-empty">

            <div className="owner-subscriptions-empty-icon">
              <CreditCard size={25} />
            </div>

            <h3>
              {subscriptions.length === 0
                ? "No subscription records found"
                : "No matching subscriptions"}
            </h3>

            <p>
              {subscriptions.length === 0
                ? "No subscription information is currently available in the database."
                : "Try changing your search or status filter."}
            </p>

          </div>

        ) : (

          <div className="owner-subscriptions-table-wrap">

            <table className="owner-subscriptions-table">

              <thead>
                <tr>
                  <th>Tenant</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Goat Limit</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>

                {filteredSubscriptions.map(
                  (item, index) => {

                    const subscription =
                      item.subscription;

                    const plan =
                      subscription?.plan ||
                      "Not Configured";

                    const status =
                      getSubscriptionStatus(
                        item
                      );

                    return (
                      <tr
                        key={
                          item.tenantId ||
                          index
                        }
                      >

                        <td>

                          <div className="owner-subscription-tenant">

                            <div className="owner-subscription-tenant-icon">
                              <CreditCard
                                size={17}
                              />
                            </div>

                            <div>

                              <strong>
                                {item.tenantName ||
                                  "Unnamed Tenant"}
                              </strong>

                              <span>
                                {item.tenantStatus ||
                                  "—"}
                              </span>

                            </div>

                          </div>

                        </td>

                        <td>

                          <span
                            className={`owner-plan-badge ${getPlanClass(
                              subscription?.plan
                            )}`}
                          >
                            {plan}
                          </span>

                        </td>

                        <td>

                          <span
                            className={`owner-subscription-status ${status
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                "-"
                              )}`}
                          >
                            {status}
                          </span>

                        </td>

                        <td>
                          {formatDate(
                            subscription?.startDate
                          )}
                        </td>

                        <td>
                          {formatDate(
                            subscription?.endDate
                          )}
                        </td>

                        <td>
                          {subscription?.goatLimit ??
                            "Not configured"}
                        </td>

                        <td>

                          <button
                            type="button"
                            className="owner-subscription-view"
                            onClick={() =>
                              handleViewTenant(
                                item
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
          DETAILS MODAL
      ===================================================== */}

      {selectedTenant && (

        <div
          className="owner-subscription-modal-overlay"
          onClick={handleCloseModal}
        >

          <div
            className="owner-subscription-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="owner-subscription-modal-header">

              <div>

                <span>
                  SUBSCRIPTION DETAILS
                </span>

                <h2>
                  {selectedTenant.tenantName}
                </h2>

              </div>

              <button
                type="button"
                disabled={updating}
                onClick={
                  handleCloseModal
                }
              >
                <X size={20} />
              </button>

            </div>

            {/* DETAILS */}

            <div className="owner-subscription-details">

              <div>
                <span>Tenant</span>

                <strong>
                  {selectedTenant.tenantName ||
                    "—"}
                </strong>
              </div>

              <div>
                <span>Plan</span>

                <strong>
                  {selectedTenant
                    .subscription?.plan ||
                    "Not Configured"}
                </strong>
              </div>

              <div>
                <span>Status</span>

                <strong>
                  {getSubscriptionStatus(
                    selectedTenant
                  )}
                </strong>
              </div>

              <div>
                <span>Goat Limit</span>

                <strong>
                  {selectedTenant
                    .subscription?.goatLimit ??
                    "Not configured"}
                </strong>
              </div>

            </div>

            {/* =================================================
                DATE EDITOR
            ================================================= */}

            {selectedTenant.subscription && (

              <div className="owner-subscription-date-editor">

                <div className="owner-subscription-date-editor-header">

                  <div>

                    <span className="owner-subscription-date-label">
                      SUBSCRIPTION PERIOD
                    </span>

                    <h3>
                      Manage subscription dates
                    </h3>

                    <p>
                      Update when this tenant's
                      subscription starts and ends.
                    </p>

                  </div>

                  <div className="owner-subscription-calendar-icon">
                    <CalendarDays size={20} />
                  </div>

                </div>

                <div className="owner-subscription-date-grid">

                  {/* START DATE */}

                  <div className="owner-subscription-date-field">

                    <label htmlFor="subscription-start-date">

                      <span>
                        Start Date
                      </span>

                      <small>
                        Subscription begins
                      </small>

                    </label>

                    <div className="owner-subscription-date-input">

                      <CalendarDays
                        size={17}
                      />

                      <input
                        id="subscription-start-date"
                        type="date"
                        value={editStartDate}
                        onChange={(event) =>
                          setEditStartDate(
                            event.target.value
                          )
                        }
                        disabled={updating}
                      />

                    </div>

                    <div className="owner-subscription-current-date">

                      <span>
                        Current:
                      </span>

                      <strong>
                        {formatDate(
                          selectedTenant
                            .subscription
                            ?.startDate
                        )}
                      </strong>

                    </div>

                  </div>

                  {/* TO */}

                  <div className="owner-subscription-date-arrow">

                    <span>TO</span>

                  </div>

                  {/* END DATE */}

                  <div className="owner-subscription-date-field">

                    <label htmlFor="subscription-end-date">

                      <span>
                        End Date
                      </span>

                      <small>
                        Subscription expires
                      </small>

                    </label>

                    <div className="owner-subscription-date-input">

                      <CalendarDays
                        size={17}
                      />

                      <input
                        id="subscription-end-date"
                        type="date"
                        value={editEndDate}
                        onChange={(event) =>
                          setEditEndDate(
                            event.target.value
                          )
                        }
                        disabled={updating}
                      />

                    </div>

                    <div className="owner-subscription-current-date">

                      <span>
                        Current:
                      </span>

                      <strong>
                        {formatDate(
                          selectedTenant
                            .subscription
                            ?.endDate
                        )}
                      </strong>

                    </div>

                  </div>

                </div>

              </div>

            )}

            {/* =================================================
                SAVE DATE AREA
            ================================================= */}

            {selectedTenant.subscription && (

              <div className="owner-subscription-save-area">

                <div className="owner-subscription-save-info">

                  <ShieldCheck size={18} />

                  <div>

                    <strong>
                      Subscription dates
                    </strong>

                    <span>
                      Changes will be applied to
                      this tenant immediately.
                    </span>

                  </div>

                </div>

                <button
                  type="button"
                  className="owner-subscription-save-btn"
                  disabled={
                    updating ||
                    !editStartDate ||
                    !editEndDate
                  }
                  onClick={
                    updateSubscription
                  }
                >

                  {updating ? (
                    <>
                      <RefreshCw
                        size={17}
                        className="owner-subscription-save-spin"
                      />

                      Saving changes...
                    </>
                  ) : (
                    <>
                      <ShieldCheck
                        size={17}
                      />

                      Save Dates
                    </>
                  )}

                </button>

              </div>

            )}

            {/* =================================================
                EXPIRE TRIAL
            ================================================= */}

            {selectedTenant.subscription?.plan ===
              "Trial" &&
              selectedTenant.subscription?.status ===
                "Active" && (

              <div className="owner-subscription-actions">

                <button
                  type="button"
                  className="owner-subscription-expire-btn"
                  disabled={updating}
                  onClick={
                    handleExpireTrial
                  }
                >

                  <AlertCircle size={17} />

                  {updating
                    ? "Expiring..."
                    : "Expire Trial"}

                </button>

              </div>

            )}

            {/* =================================================
                RESTORE TRIAL
            ================================================= */}

            {selectedTenant.subscription?.plan ===
              "Trial" &&
              selectedTenant.subscription?.status ===
                "Expired" && (

              <div className="owner-subscription-actions">

                <button
                  type="button"
                  className="owner-subscription-restore-btn"
                  disabled={updating}
                  onClick={
                    handleRestoreTrial
                  }
                >

                  <RefreshCw size={17} />

                  {updating
                    ? "Restoring..."
                    : "Restore Trial"}

                </button>

              </div>

            )}

            {/* =================================================
                NOTES
            ================================================= */}

            {selectedTenant
              .subscription?.notes && (

              <div className="owner-subscription-notes">

                <span>Notes</span>

                <p>
                  {
                    selectedTenant
                      .subscription
                      .notes
                  }
                </p>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default OwnerSubscriptions;