import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronRight,
  X,
  Scale,
  CalendarDays,
  Wallet,
  Activity,
  FileText,
  Download,
  RefreshCw,
} from "lucide-react";
import "./ReportsPage.css";

/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEYS = [
  "tenant",
  "currentTenant",
  "tenantData",
];

/* =========================================================
   HELPERS
========================================================= */

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function getTenant() {
  for (const key of STORAGE_KEYS) {
    const value = localStorage.getItem(key);

    if (!value) continue;

    const parsed = safeParse(value);

    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  }

  return null;
}

function getData(source, key) {
  if (!source) return [];

  if (
    source.data &&
    Array.isArray(source.data[key])
  ) {
    return source.data[key];
  }

  if (Array.isArray(source[key])) {
    return source[key];
  }

  return [];
}

/* =========================================================
   GOAT NORMALIZER
========================================================= */

function normalizeGoat(goat) {
  if (!goat || typeof goat !== "object") {
    return null;
  }

  const id =
    goat.id ??
    goat._id ??
    goat.goatId ??
    goat.tagNumber ??
    goat.tag ??
    null;

  const name =
    goat.name ??
    goat.goatName ??
    goat.goat_name ??
    "";

  const tagNumber =
    goat.tagNumber ??
    goat.tag ??
    goat.tagNo ??
    goat.tag_number ??
    "";

  const breed =
    goat.breed ??
    goat.breedName ??
    goat.breed_name ??
    "";

  if (!id && !name && !tagNumber) {
    return null;
  }

  return {
    ...goat,
    id: String(id || tagNumber || name),
    name:
      name ||
      `Goat #${tagNumber || "Unknown"}`,
    tagNumber,
    breed:
      breed || "Unknown breed",
  };
}

/* =========================================================
   WEIGHT NORMALIZER
========================================================= */

function normalizeWeight(record, goats) {
  if (!record) return null;

  const goatId =
    record.goatId ??
    record.goatID ??
    record.animalId ??
    record.animalID ??
    null;

  const tag =
    record.goatTagNumber ??
    record.tagNumber ??
    record.tagNo ??
    record.goatTag ??
    "";

  const goatName =
    record.goatName ??
    record.name ??
    "";

  let goat = null;

  if (goatId) {
    goat = goats.find(
      (g) =>
        String(g.id) ===
        String(goatId)
    );
  }

  if (!goat && tag) {
    goat = goats.find(
      (g) =>
        String(g.tagNumber) ===
        String(tag)
    );
  }

  if (!goat && goatName) {
    goat = goats.find(
      (g) =>
        g.name?.toLowerCase() ===
        goatName?.toLowerCase()
    );
  }

  const weight =
    record.weight ??
    record.weightKg ??
    record.kg ??
    record.value ??
    record.currentWeight ??
    null;

  const date =
    record.date ??
    record.eventDate ??
    record.weightDate ??
    record.createdAt ??
    record.updatedAt ??
    "";

  if (
    weight === null ||
    weight === undefined ||
    weight === ""
  ) {
    return null;
  }

  return {
    ...record,
    goatId:
      goat?.id ||
      goatId ||
      "",
    goatName:
      goat?.name ||
      goatName ||
      "Unknown Goat",
    goatTagNumber:
      goat?.tagNumber ||
      tag ||
      "",
    weight: Number(weight),
    date,
  };
}

/* =========================================================
   FIND WEIGHT RECORDS
========================================================= */

function extractWeightRecords(
  tenant,
  goats
) {
  const possibleKeys = [
    "weights",
    "weightRecords",
    "weightHistory",
    "weighments",
    "weighingRecords",
    "scaleRecords",
    "weightChecks",
  ];

  for (const key of possibleKeys) {
    const records = getData(
      tenant,
      key
    );

    if (records.length) {
      return records
        .map((item) =>
          normalizeWeight(
            item,
            goats
          )
        )
        .filter(Boolean);
    }
  }

  /* -----------------------------------------
     Events fallback
  ----------------------------------------- */

  const events = getData(
    tenant,
    "events"
  );

  return events
    .filter(
      (event) =>
        event.type ===
          "Weight Check" ||
        event.type ===
          "Weight"
    )
    .map((event) =>
      normalizeWeight(
        event,
        goats
      )
    )
    .filter(Boolean);
}

/* =========================================================
   TRANSACTIONS
========================================================= */

function extractTransactions(
  tenant,
  goats
) {
  const possibleKeys = [
    "transactions",
    "transactionRecords",
    "financialTransactions",
    "sales",
    "purchases",
  ];

  let records = [];

  for (const key of possibleKeys) {
    const data = getData(
      tenant,
      key
    );

    if (data.length) {
      records = [
        ...records,
        ...data,
      ];
    }
  }

  return records.map(
    (transaction) => {
      const goatId =
        transaction.goatId ??
        transaction.goatID ??
        "";

      const goat = goats.find(
        (g) =>
          String(g.id) ===
          String(goatId)
      );

      return {
        ...transaction,
        goatName:
          transaction.goatName ||
          goat?.name ||
          "",
        date:
          transaction.date ||
          transaction.transactionDate ||
          transaction.createdAt ||
          "",
        amount:
          transaction.amount ??
          transaction.total ??
          transaction.price ??
          0,
        type:
          transaction.type ||
          transaction.transactionType ||
          "Transaction",
      };
    }
  );
}

/* =========================================================
   DATE
========================================================= */

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ReportsPage({
  tenant,
  onBack,
}) {
  const [goats, setGoats] =
    useState([]);

  const [weights, setWeights] =
    useState([]);

  const [transactions, setTransactions] =
    useState([]);

  const [selectedGoat, setSelectedGoat] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const [goatSearch, setGoatSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* =======================================================
     LOAD
  ======================================================= */

  const loadReports = () => {
    setLoading(true);

    const source =
      tenant ||
      getTenant();

    const goatData = getData(
      source,
      "goats"
    )
      .map(normalizeGoat)
      .filter(Boolean);

    const weightData =
      extractWeightRecords(
        source,
        goatData
      );

    const transactionData =
      extractTransactions(
        source,
        goatData
      );

    setGoats(goatData);
    setWeights(weightData);
    setTransactions(
      transactionData
    );

    setSelectedGoat(
      (current) =>
        goatData.find(
          (g) =>
            String(g.id) ===
            String(current?.id)
        ) || null
    );

    setLoading(false);
  };

  useEffect(() => {
    loadReports();

    const handleUpdate = () => {
      loadReports();
    };

    window.addEventListener(
      "tenant-data-updated",
      handleUpdate
    );

    window.addEventListener(
      "storage",
      handleUpdate
    );

    const interval =
      setInterval(
        loadReports,
        1500
      );

    return () => {
      window.removeEventListener(
        "tenant-data-updated",
        handleUpdate
      );

      window.removeEventListener(
        "storage",
        handleUpdate
      );

      clearInterval(interval);
    };
  }, [tenant]);

  /* =======================================================
     SEARCH GOATS
  ======================================================= */

  const filteredGoats =
    useMemo(() => {
      const query =
        goatSearch
          .trim()
          .toLowerCase();

      if (!query) {
        return goats;
      }

      return goats.filter(
        (goat) => {
          const text = [
            goat.name,
            goat.tagNumber,
            goat.breed,
            goat.id,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return text.includes(query);
        }
      );
    }, [
      goats,
      goatSearch,
    ]);

  /* =======================================================
     SELECTED GOAT WEIGHTS
  ======================================================= */

  const goatWeights =
    useMemo(() => {
      if (!selectedGoat) {
        return [];
      }

      return weights
        .filter(
          (record) => {
            if (
              record.goatId &&
              String(
                record.goatId
              ) ===
                String(
                  selectedGoat.id
                )
            ) {
              return true;
            }

            if (
              record.goatTagNumber &&
              String(
                record.goatTagNumber
              ) ===
                String(
                  selectedGoat.tagNumber
                )
            ) {
              return true;
            }

            return (
              record.goatName
                ?.toLowerCase() ===
              selectedGoat.name
                ?.toLowerCase()
            );
          }
        )
        .sort(
          (a, b) =>
            new Date(
              b.date || 0
            ) -
            new Date(
              a.date || 0
            )
        );
    }, [
      weights,
      selectedGoat,
    ]);

  /* =======================================================
     CURRENT WEIGHT
  ======================================================= */

  const currentWeight =
    goatWeights[0]?.weight ??
    selectedGoat?.weight ??
    selectedGoat?.weightKg ??
    0;

  const previousWeight =
    goatWeights[1]?.weight ??
    null;

  const weightChange =
    previousWeight !== null
      ? currentWeight -
        previousWeight
      : null;

  /* =======================================================
     GOAT TRANSACTIONS
  ======================================================= */

  const goatTransactions =
    useMemo(() => {
      if (!selectedGoat) {
        return [];
      }

      return transactions
        .filter(
          (transaction) => {
            if (
              transaction.goatId &&
              String(
                transaction.goatId
              ) ===
                String(
                  selectedGoat.id
                )
            ) {
              return true;
            }

            return (
              transaction.goatName
                ?.toLowerCase() ===
              selectedGoat.name
                ?.toLowerCase()
            );
          }
        )
        .sort(
          (a, b) =>
            new Date(
              b.date || 0
            ) -
            new Date(
              a.date || 0
            )
        );
    }, [
      transactions,
      selectedGoat,
    ]);

  /* =======================================================
     SEARCH SELECTED REPORT
  ======================================================= */

  const reportVisible =
    selectedGoat &&
    (
      !search ||
      selectedGoat.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      String(
        selectedGoat.tagNumber
      )
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  /* =======================================================
     DOWNLOAD / PRINT
  ======================================================= */

  function handlePrint() {
    window.print();
  }

  return (
    <div className="reports-page">

      {/* HEADER */}
      <header className="reports-header">
        <div className="reports-header-inner">

          <button
            className="reports-back"
            onClick={onBack}
          >
            <ArrowLeft size={20} />

            <div>
              <div className="reports-title">
                Reports
              </div>

              <div className="reports-subtitle">
                Goat weight, activity & transaction reports
              </div>
            </div>
          </button>

          <div className="reports-header-actions">

            <button
              className="report-refresh"
              onClick={loadReports}
              title="Refresh"
            >
              <RefreshCw
                size={18}
                className={
                  loading
                    ? "spin"
                    : ""
                }
              />
            </button>

            <button
              className="report-print"
              onClick={handlePrint}
            >
              <Download size={17} />
              <span>Print Report</span>
            </button>

          </div>
        </div>
      </header>

      <main className="reports-content">

        {/* INTRO */}
        <section className="reports-intro">

          <div>
            <span className="reports-eyebrow">
              FARM ANALYTICS
            </span>

            <h1>
              Goat Reports
            </h1>

            <p>
              View real goat data, weighing history
              and transactions in one place.
            </p>
          </div>

          <div className="reports-intro-icon">
            <FileText size={29} />
          </div>

        </section>

        {/* SEARCH */}
        <div className="reports-search">

          <Search
            size={18}
            color="#64748B"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search goat report..."
          />

          {search && (
            <button
              onClick={() =>
                setSearch("")
              }
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* GOAT SELECTOR */}
        <section className="report-selector">

          <div className="selector-label">
            <Activity size={15} />
            Select goat
          </div>

          <div className="selector-wrapper">

            <button
              className="goat-selector"
              onClick={() =>
                setDropdownOpen(
                  !dropdownOpen
                )
              }
            >

              {selectedGoat ? (
                <div className="selected-goat">
                  <div className="goat-avatar">
                    🐐
                  </div>

                  <div>
                    <strong>
                      {selectedGoat.name}
                    </strong>

                    <span>
                      {selectedGoat.breed}
                      {selectedGoat.tagNumber
                        ? ` · Tag #${selectedGoat.tagNumber}`
                        : ""}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="selector-placeholder">
                  Select a goat to view report
                </span>
              )}

              <ChevronDown
                size={19}
              />
            </button>

            {dropdownOpen && (
              <div className="goat-dropdown">

                <div className="dropdown-search">

                  <Search size={16} />

                  <input
                    value={goatSearch}
                    onChange={(e) =>
                      setGoatSearch(
                        e.target.value
                      )
                    }
                    placeholder="Search goats..."
                    autoFocus
                  />

                  {goatSearch && (
                    <button
                      onClick={() =>
                        setGoatSearch("")
                      }
                    >
                      <X size={14} />
                    </button>
                  )}

                </div>

                <div className="dropdown-list">

                  {filteredGoats.length ===
                  0 ? (
                    <div className="dropdown-empty">
                      <Goat size={30} />
                      <strong>
                        No goats found
                      </strong>
                      <span>
                        Add goats from the Goats page first.
                      </span>
                    </div>
                  ) : (
                    filteredGoats.map(
                      (goat) => (
                        <button
                          key={goat.id}
                          className="dropdown-goat"
                          onClick={() => {
                            setSelectedGoat(
                              goat
                            );
                            setDropdownOpen(
                              false
                            );
                            setGoatSearch(
                              ""
                            );
                          }}
                        >
                          <div className="goat-avatar small">
                            🐐
                          </div>

                          <div>
                            <strong>
                              {goat.name}
                            </strong>

                            <span>
                              {goat.breed}
                              {goat.tagNumber
                                ? ` · Tag #${goat.tagNumber}`
                                : ""}
                            </span>
                          </div>

                          <ChevronRight
                            size={17}
                          />
                        </button>
                      )
                    )
                  )}

                </div>
              </div>
            )}

          </div>

          <div className="goat-count">
            {goats.length} goats available
          </div>

        </section>

        {/* EMPTY */}
        {!selectedGoat && (
          <div className="report-empty">

            <div className="empty-icon">
              <Scale size={30} />
            </div>

            <h2>
              Select a goat
            </h2>

            <p>
              Choose one of your actual goats
              to view weight history, profile
              information and transactions.
            </p>

          </div>
        )}

        {/* REPORT */}
        {selectedGoat &&
          reportVisible && (
            <div className="print-area">

              {/* PROFILE */}
              <section className="goat-profile">

                <div className="profile-left">

                  <div className="large-goat-avatar">
                    🐐
                  </div>

                  <div>

                    <span className="profile-label">
                      GOAT PROFILE
                    </span>

                    <h2>
                      {selectedGoat.name}
                    </h2>

                    <div className="profile-tags">

                      {selectedGoat.tagNumber && (
                        <span>
                          Tag #
                          {
                            selectedGoat.tagNumber
                          }
                        </span>
                      )}

                      {selectedGoat.breed && (
                        <span>
                          {selectedGoat.breed}
                        </span>
                      )}

                      {selectedGoat.gender && (
                        <span>
                          {selectedGoat.gender}
                        </span>
                      )}

                      {selectedGoat.stage && (
                        <span>
                          {selectedGoat.stage}
                        </span>
                      )}

                    </div>

                  </div>

                </div>

                <div className="profile-date">
                  <span>
                    REPORT GENERATED
                  </span>

                  <strong>
                    {formatDate(
                      new Date()
                    )}
                  </strong>
                </div>

              </section>

              {/* SUMMARY */}
              <section className="summary-grid">

                <SummaryCard
                  icon={
                    <Scale size={18} />
                  }
                  title="Current Weight"
                  value={
                    currentWeight
                      ? `${currentWeight} kg`
                      : "—"
                  }
                  subtitle={
                    goatWeights[0]?.date
                      ? `Checked ${formatDate(
                          goatWeights[0].date
                        )}`
                      : "No weight record"
                  }
                />

                <SummaryCard
                  icon={
                    <Activity size={18} />
                  }
                  title="Weight Checks"
                  value={
                    goatWeights.length
                  }
                  subtitle="Recorded checks"
                />

                <SummaryCard
                  icon={
                    <CalendarDays
                      size={18}
                    />
                  }
                  title="Last Weighed"
                  value={
                    goatWeights[0]?.date
                      ? formatDate(
                          goatWeights[0].date
                        )
                      : "—"
                  }
                  subtitle="Latest scale reading"
                />

                <SummaryCard
                  icon={
                    <Wallet size={18} />
                  }
                  title="Transactions"
                  value={
                    goatTransactions.length
                  }
                  subtitle="Linked records"
                />

              </section>

              {/* DETAILS */}
              <section className="details-card">

                <SectionHeading
                  eyebrow="GOAT INFORMATION"
                  title="Basic details"
                />

                <div className="details-grid">

                  <Detail
                    label="Goat name"
                    value={
                      selectedGoat.name
                    }
                  />

                  <Detail
                    label="Tag number"
                    value={
                      selectedGoat.tagNumber ||
                      "—"
                    }
                  />

                  <Detail
                    label="Breed"
                    value={
                      selectedGoat.breed ||
                      "—"
                    }
                  />

                  <Detail
                    label="Gender"
                    value={
                      selectedGoat.gender ||
                      selectedGoat.sex ||
                      "—"
                    }
                  />

                  <Detail
                    label="Stage"
                    value={
                      selectedGoat.stage ||
                      "—"
                    }
                  />

                  <Detail
                    label="Date of birth"
                    value={
                      formatDate(
                        selectedGoat.dob ||
                        selectedGoat.dateOfBirth
                      )
                    }
                  />

                  <Detail
                    label="Current weight"
                    value={
                      currentWeight
                        ? `${currentWeight} kg`
                        : "—"
                    }
                  />

                  <Detail
                    label="Created date"
                    value={
                      formatDate(
                        selectedGoat.createdAt ||
                        selectedGoat.createdDate
                      )
                    }
                  />

                  <Detail
                    label="Status"
                    value={
                      selectedGoat.status ||
                      "Active"
                    }
                  />

                </div>

              </section>

              {/* WEIGHT HISTORY */}
              <section className="history-card">

                <SectionHeading
                  eyebrow="WEIGHING SCALE"
                  title="Weight history"
                  right={
                    <span className="history-count">
                      {goatWeights.length} records
                    </span>
                  }
                />

                {goatWeights.length ===
                0 ? (
                  <div className="history-empty">
                    <Scale size={27} />
                    <strong>
                      No weight records
                    </strong>
                    <span>
                      Weight readings from your
                      weighing scale will appear here.
                    </span>
                  </div>
                ) : (
                  <div className="table-wrap">

                    <table className="history-table">

                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Weight</th>
                          <th>Change</th>
                          <th>Source</th>
                          <th>Notes</th>
                        </tr>
                      </thead>

                      <tbody>

                        {goatWeights.map(
                          (
                            record,
                            index
                          ) => {

                            const next =
                              goatWeights[
                                index + 1
                              ];

                            const change =
                              next
                                ? record.weight -
                                  next.weight
                                : null;

                            return (
                              <tr
                                key={
                                  record.id ||
                                  `${record.date}-${index}`
                                }
                              >
                                <td>
                                  <span className="row-number">
                                    {index + 1}
                                  </span>
                                </td>

                                <td>
                                  <span className="date-cell">
                                    <CalendarDays
                                      size={14}
                                    />
                                    {formatDate(
                                      record.date
                                    )}
                                  </span>
                                </td>

                                <td>
                                  <strong className="weight-value">
                                    {record.weight} kg
                                  </strong>
                                </td>

                                <td>
                                  {change ===
                                  null ? (
                                    <span className="change-neutral">
                                      —
                                    </span>
                                  ) : (
                                    <span
                                      className={
                                        change >
                                        0
                                          ? "change-positive"
                                          : change <
                                            0
                                          ? "change-negative"
                                          : "change-neutral"
                                      }
                                    >
                                      {change >
                                      0
                                        ? "+"
                                        : ""}
                                      {change.toFixed(
                                        2
                                      )}{" "}
                                      kg
                                    </span>
                                  )}
                                </td>

                                <td>
                                  <span className="source-badge">
                                    {record.source ||
                                      record.device ||
                                      "Scale"}
                                  </span>
                                </td>

                                <td>
                                  <span className="notes-cell">
                                    {record.notes ||
                                      "—"}
                                  </span>
                                </td>
                              </tr>
                            );
                          }
                        )}

                      </tbody>

                    </table>

                  </div>
                )}

              </section>

              {/* TRANSACTIONS */}
              <section className="history-card">

                <SectionHeading
                  eyebrow="FARM FINANCE"
                  title="Transaction details"
                  right={
                    <span className="history-count">
                      {
                        goatTransactions.length
                      } records
                    </span>
                  }
                />

                {goatTransactions.length ===
                0 ? (
                  <div className="history-empty">
                    <Wallet size={27} />
                    <strong>
                      No transactions
                    </strong>
                    <span>
                      Transactions linked to this goat
                      will appear here.
                    </span>
                  </div>
                ) : (
                  <div className="table-wrap">

                    <table className="history-table transaction-table">

                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Description</th>
                          <th>Amount</th>
                        </tr>
                      </thead>

                      <tbody>

                        {goatTransactions.map(
                          (
                            transaction,
                            index
                          ) => (
                            <tr
                              key={
                                transaction.id ||
                                index
                              }
                            >
                              <td>
                                {formatDate(
                                  transaction.date
                                )}
                              </td>

                              <td>
                                <span className="transaction-badge">
                                  {
                                    transaction.type
                                  }
                                </span>
                              </td>

                              <td>
                                {transaction.description ||
                                  transaction.title ||
                                  transaction.notes ||
                                  "Transaction"}
                              </td>

                              <td>
                                <strong>
                                  ₹
                                  {Number(
                                    transaction.amount ||
                                      0
                                  ).toLocaleString(
                                    "en-IN"
                                  )}
                                </strong>
                              </td>
                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                  </div>
                )}

              </section>

              {/* FOOTER */}
              <section className="report-note">

                <div className="note-icon">
                  <Activity size={18} />
                </div>

                <div>
                  <strong>
                    Live farm data
                  </strong>

                  <p>
                    This report uses the goat,
                    weighing and transaction data
                    currently stored in your farm
                    application. No sample goat data
                    is added by this page.
                  </p>
                </div>

              </section>

            </div>
          )}

      </main>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function SummaryCard({
  icon,
  title,
  value,
  subtitle,
}) {
  return (
    <div className="summary-card">

      <div className="summary-top">
        <div className="summary-icon">
          {icon}
        </div>

        <span>
          {title}
        </span>
      </div>

      <strong className="summary-value">
        {value}
      </strong>

      <small>
        {subtitle}
      </small>

    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  right,
}) {
  return (
    <div className="section-heading">

      <div>
        <span className="section-eyebrow">
          {eyebrow}
        </span>

        <h3>
          {title}
        </h3>
      </div>

      {right}

    </div>
  );
}

function Detail({
  label,
  value,
}) {
  return (
    <div className="detail-item">

      <span>
        {label}
      </span>

      <strong>
        {value || "—"}
      </strong>

    </div>
  );
}