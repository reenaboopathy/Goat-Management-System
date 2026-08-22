import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Scale,
  Wifi,
  WifiOff,
  RefreshCw,
  Save,
  Activity,
  CheckCircle2,
  Clock3,
  Search,
  X,
} from "lucide-react";

import "./WeighingScalePage.css";

const TENANT_KEYS = [
  "tenant",
  "currentTenant",
  "tenantData",
];

export default function WeighingScalePage({
  tenant,
  onBack,
  onUpdateTenant,
}) {
  const [goats, setGoats] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedGoat, setSelectedGoat] = useState(null);

  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");

  // Temporary connected status.
  // Later ESP32/HX711 can control this.
  const [connected, setConnected] = useState(true);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Saved weight records
  const [savedWeights, setSavedWeights] = useState([]);

  /* =========================================================
     EXTRACT ORIGINAL GOATS
     NO DEMO DATA
  ========================================================= */

  function extractGoats(source) {
    if (!source || typeof source !== "object") {
      return [];
    }

    const possibleLists = [
      source.goats,
      source.data?.goats,
      source.tenant?.goats,
      source.tenant?.data?.goats,
      source.data?.data?.goats,
    ];

    for (const list of possibleLists) {
      if (Array.isArray(list)) {
        return list.filter(Boolean);
      }
    }

    return [];
  }

  /* =========================================================
     LOAD REAL GOATS FROM EXISTING DATA
  ========================================================= */

  function loadRealGoats() {
    const allGoats = [];
    const seen = new Set();

    // Current tenant prop
    const propGoats = extractGoats(tenant);

    propGoats.forEach((goat) => {
      const id =
        goat?._id ||
        goat?.id ||
        goat?.tagNumber ||
        goat?.tag ||
        goat?.tagNo;

      if (
        id &&
        !seen.has(String(id))
      ) {
        seen.add(String(id));
        allGoats.push(goat);
      }
    });

    // Existing localStorage tenant data
    TENANT_KEYS.forEach((key) => {
      try {
        const stored =
          localStorage.getItem(key);

        if (!stored) return;

        const parsed =
          JSON.parse(stored);

        const storedGoats =
          extractGoats(parsed);

        storedGoats.forEach((goat) => {
          const id =
            goat?._id ||
            goat?.id ||
            goat?.tagNumber ||
            goat?.tag ||
            goat?.tagNo;

          if (
            id &&
            !seen.has(String(id))
          ) {
            seen.add(String(id));
            allGoats.push(goat);
          }
        });
      } catch (error) {
        console.error(
          `Error reading ${key}:`,
          error
        );
      }
    });

    setGoats(allGoats);
  }

  /* =========================================================
     LOAD REAL GOATS + WEIGHT RECORDS
  ========================================================= */

  useEffect(() => {
    loadRealGoats();
    loadSavedWeights();

    const handleTenantUpdate = () => {
      loadRealGoats();
      loadSavedWeights();
    };

    window.addEventListener(
      "tenant-data-updated",
      handleTenantUpdate
    );

    window.addEventListener(
      "storage",
      handleTenantUpdate
    );

    return () => {
      window.removeEventListener(
        "tenant-data-updated",
        handleTenantUpdate
      );

      window.removeEventListener(
        "storage",
        handleTenantUpdate
      );
    };
  }, [tenant]);

  /* =========================================================
     LOAD SAVED WEIGHTS
  ========================================================= */

  function loadSavedWeights() {
    const allWeights = [];
    const seen = new Set();

    TENANT_KEYS.forEach((key) => {
      try {
        const stored =
          localStorage.getItem(key);

        if (!stored) return;

        const parsed =
          JSON.parse(stored);

        const weights =
          Array.isArray(
            parsed?.data?.weights
          )
            ? parsed.data.weights
            : Array.isArray(
                parsed?.weights
              )
            ? parsed.weights
            : [];

        weights.forEach((record) => {
          const id =
            record?._id ||
            record?.id;

          if (
            id &&
            !seen.has(String(id))
          ) {
            seen.add(String(id));
            allWeights.push(record);
          }
        });
      } catch (error) {
        console.error(
          `Unable to load weights from ${key}:`,
          error
        );
      }
    });

    setSavedWeights(allWeights);
  }

  /* =========================================================
     SEARCH REAL GOATS
  ========================================================= */

  const filteredGoats = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return goats
      .filter(Boolean)
      .filter((goat) => {
        const name =
          String(
            goat.name || ""
          ).toLowerCase();

        const tag =
          String(
            goat.tagNumber ||
              goat.tag ||
              goat.tagNo ||
              goat.tag_number ||
              ""
          ).toLowerCase();

        return (
          name.includes(query) ||
          tag.includes(query)
        );
      })
      .slice(0, 10);
  }, [goats, search]);

  /* =========================================================
     SELECT GOAT
  ========================================================= */

  function handleSelectGoat(goat) {
    setSelectedGoat(goat);

    // Search text disappear after selecting
    setSearch("");

    setMessage("");
  }

  /* =========================================================
     CLEAR GOAT
  ========================================================= */

  function clearGoat() {
    setSelectedGoat(null);
    setSearch("");
    setMessage("");
  }

  /* =========================================================
     SAVE WEIGHT
  ========================================================= */

  function handleSaveWeight() {
    setMessage("");

    if (!selectedGoat) {
      setMessage(
        "Please search and select a goat first."
      );
      return;
    }

    if (
      !weight ||
      Number(weight) <= 0
    ) {
      setMessage(
        "Please enter a valid weight."
      );
      return;
    }

    setSaving(true);

    try {
      /* -----------------------------------------------------
         REAL GOAT DETAILS
      ----------------------------------------------------- */

      const goatId =
        selectedGoat._id ||
        selectedGoat.id ||
        selectedGoat.tagNumber;

      const goatName =
        selectedGoat.name ||
        "Unnamed Goat";

      const tagNumber =
        selectedGoat.tagNumber ||
        selectedGoat.tag ||
        selectedGoat.tagNo ||
        "";

      const now =
        new Date().toISOString();

      /* -----------------------------------------------------
         NEW WEIGHT RECORD
      ----------------------------------------------------- */

      const newWeight = {
        id: `weight-${Date.now()}`,

        goatId,

        goatName,

        tagNumber,

        weight: Number(weight),

        unit,

        source: "Weighing Scale",

        date: now,

        createdAt: now,
      };

      /* -----------------------------------------------------
         UPDATE UI IMMEDIATELY
      ----------------------------------------------------- */

      setSavedWeights((previous) => [
        ...previous,
        newWeight,
      ]);

      /* -----------------------------------------------------
         GET EXISTING TENANT
      ----------------------------------------------------- */

      let currentTenant = tenant;

      try {
        const stored =
          localStorage.getItem(
            "tenant"
          );

        if (stored) {
          currentTenant =
            JSON.parse(stored);
        }
      } catch (error) {
        console.error(
          "Tenant parsing error:",
          error
        );
      }

      if (!currentTenant) {
        currentTenant = {};
      }

      const existingData =
        currentTenant.data || {};

      const existingWeights =
        Array.isArray(
          existingData.weights
        )
          ? existingData.weights
          : [];

      /* -----------------------------------------------------
         UPDATED TENANT
      ----------------------------------------------------- */

      const updatedTenant = {
        ...currentTenant,

        data: {
          ...existingData,

          weights: [
            ...existingWeights,
            newWeight,
          ],
        },
      };

      /* -----------------------------------------------------
         SAVE TENANT
      ----------------------------------------------------- */

      localStorage.setItem(
        "tenant",
        JSON.stringify(
          updatedTenant
        )
      );

      /* -----------------------------------------------------
         UPDATE OTHER EXISTING KEYS
      ----------------------------------------------------- */

      if (
        localStorage.getItem(
          "currentTenant"
        )
      ) {
        localStorage.setItem(
          "currentTenant",
          JSON.stringify(
            updatedTenant
          )
        );
      }

      if (
        localStorage.getItem(
          "tenantData"
        )
      ) {
        localStorage.setItem(
          "tenantData",
          JSON.stringify(
            updatedTenant
          )
        );
      }

      /* -----------------------------------------------------
         UPDATE PARENT APP STATE
      ----------------------------------------------------- */

      if (onUpdateTenant) {
        onUpdateTenant(
          updatedTenant
        );
      }

      /* -----------------------------------------------------
         NOTIFY OTHER PAGES
      ----------------------------------------------------- */

      window.dispatchEvent(
        new CustomEvent(
          "tenant-data-updated",
          {
            detail: updatedTenant,
          }
        )
      );

      /* -----------------------------------------------------
         SUCCESS
      ----------------------------------------------------- */

      setMessage(
        `${goatName}'s weight saved successfully.`
      );

      setWeight("");

    } catch (error) {
      console.error(
        "Weight save error:",
        error
      );

      setMessage(
        "Unable to save weight. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================================================
     READ SCALE
     TEMPORARY SAMPLE ONLY
     ESP32 CAN REPLACE THIS LATER
  ========================================================= */

  function readScale() {
    if (!connected) {
      setMessage(
        "Scale is disconnected."
      );
      return;
    }

    const reading =
      (
        Math.random() * 30 +
        10
      ).toFixed(2);

    setWeight(reading);

    setMessage(
      "Weight received from scale."
    );
  }

  /* =========================================================
     RECENT WEIGHTS
  ========================================================= */

  const recentWeights = useMemo(() => {
    return [...savedWeights]
      .sort(
        (a, b) =>
          new Date(
            b.date || b.createdAt || 0
          ) -
          new Date(
            a.date || a.createdAt || 0
          )
      )
      .slice(0, 5);
  }, [savedWeights]);

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  function formatDate(date) {
    if (!date) {
      return "--";
    }

    const parsed =
      new Date(date);

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return "--";
    }

    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="weighing-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="weighing-header">

        <div className="weighing-header-left">

          <button
            type="button"
            className="weighing-back-btn"
            onClick={onBack}
          >
            <ArrowLeft size={19} />
          </button>

          <div className="weighing-header-icon">
            <Scale size={22} />
          </div>

          <div>

            <span className="weighing-eyebrow">
              FARM MANAGEMENT
            </span>

            <h1>
              Weighing Scale
            </h1>

            <p>
              Record and track real
              goat weights.
            </p>

          </div>

        </div>

        <div
          className={
            connected
              ? "scale-status connected"
              : "scale-status disconnected"
          }
        >

          {connected ? (
            <Wifi size={15} />
          ) : (
            <WifiOff size={15} />
          )}

          <span>
            {connected
              ? "Scale Connected"
              : "Scale Disconnected"}
          </span>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="weighing-container">

        {/* HERO */}

        <section className="weighing-hero">

          <div className="weighing-hero-content">

            <div className="hero-badge">
              <Activity size={13} />
              LIVE WEIGHING
            </div>

            <h2>
              Smart Goat
              <br />
              Weight Tracking
            </h2>

            <p>
              Search a goat you already
              created using its name or
              tag number.
            </p>

          </div>

          <div className="hero-scale-visual">

            <div className="scale-circle">
              <Scale size={42} />
            </div>

            <div>

              <span>
                DEVICE STATUS
              </span>

              <strong>
                {connected
                  ? "Ready to weigh"
                  : "Scale disconnected"}
              </strong>

            </div>

          </div>

        </section>

        {/* ===================================================
            STATS
        =================================================== */}

        <section className="weighing-stats">

          <div className="weight-stat-card">

            <div className="weight-stat-icon blue">
              <Scale size={20} />
            </div>

            <div>

              <span>
                Current Reading
              </span>

              <strong>
                {weight
                  ? `${Number(weight).toFixed(2)} kg`
                  : "-- kg"}
              </strong>

            </div>

          </div>

          <div className="weight-stat-card">

            <div className="weight-stat-icon green">
              <CheckCircle2 size={20} />
            </div>

            <div>

              <span>
                Connection
              </span>

              <strong>
                {connected
                  ? "Connected"
                  : "Offline"}
              </strong>

            </div>

          </div>

          <div className="weight-stat-card">

            <div className="weight-stat-icon purple">
              <Clock3 size={20} />
            </div>

            <div>

              <span>
                Recent Records
              </span>

              <strong>
                {savedWeights.length}
              </strong>

            </div>

          </div>

        </section>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <section className="weighing-content">

          {/* =================================================
              RECORD WEIGHT
          ================================================= */}

          <div className="weighing-panel">

            <div className="panel-heading">

              <div>

                <span>
                  NEW RECORD
                </span>

                <h3>
                  Record Goat Weight
                </h3>

                <p>
                  Search your existing
                  goat by name or tag.
                </p>

              </div>

              <div className="panel-icon">
                <Scale size={20} />
              </div>

            </div>

            {/* SEARCH */}

            <div className="field-group">

              <label>
                Search Goat
              </label>

              <div className="goat-search-wrapper">

                <Search
                  size={18}
                  className="goat-search-icon"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(
                      e.target.value
                    );

                    setSelectedGoat(
                      null
                    );

                    setMessage("");
                  }}
                  placeholder="Type goat name or tag number..."
                />

                {search && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => {
                      setSearch("");
                      setMessage("");
                    }}
                  >
                    <X size={16} />
                  </button>
                )}

              </div>

              {/* SEARCH RESULTS */}

              {search.trim() && (

                <div className="goat-search-results">

                  {filteredGoats.length > 0 ? (

                    filteredGoats.map(
                      (goat) => {

                        const id =
                          goat._id ||
                          goat.id ||
                          goat.tagNumber ||
                          goat.tag;

                        return (

                          <button
                            type="button"
                            key={String(id)}
                            className="goat-search-result"
                            onClick={() =>
                              handleSelectGoat(
                                goat
                              )
                            }
                          >

                            <div className="goat-result-avatar">

                              {(
                                goat.name ||
                                "G"
                              )
                                .charAt(0)
                                .toUpperCase()}

                            </div>

                            <div className="goat-result-info">

                              <strong>
                                {goat.name ||
                                  "Unnamed Goat"}
                              </strong>

                              <span>
                                {goat.tagNumber ||
                                goat.tag ||
                                goat.tagNo
                                  ? `Tag #${
                                      goat.tagNumber ||
                                      goat.tag ||
                                      goat.tagNo
                                    }`
                                  : "No tag number"}
                              </span>

                            </div>

                            <span className="select-goat-text">
                              Select
                            </span>

                          </button>

                        );
                      }
                    )

                  ) : (

                    <div className="goat-search-empty">

                      <Search size={20} />

                      <strong>
                        Goat not found
                      </strong>

                      <span>
                        Search using the name
                        or tag number of a
                        goat you already
                        created.
                      </span>

                    </div>

                  )}

                </div>

              )}

            </div>

            {/* =================================================
                SELECTED GOAT
            ================================================= */}

            {selectedGoat && (

              <div className="selected-goat-card">

                <div className="selected-goat-avatar">

                  {(
                    selectedGoat.name ||
                    "G"
                  )
                    .charAt(0)
                    .toUpperCase()}

                </div>

                <div className="selected-goat-info">

                  <span>
                    SELECTED GOAT
                  </span>

                  <strong>
                    {selectedGoat.name ||
                      "Unnamed Goat"}
                  </strong>

                  <small>
                    {selectedGoat.tagNumber ||
                    selectedGoat.tag ||
                    selectedGoat.tagNo
                      ? `Tag #${
                          selectedGoat.tagNumber ||
                          selectedGoat.tag ||
                          selectedGoat.tagNo
                        }`
                      : "No tag number"}
                  </small>

                </div>

                <button
                  type="button"
                  onClick={clearGoat}
                >
                  Change
                </button>

              </div>

            )}

            {/* =================================================
                WEIGHT
            ================================================= */}

            <div className="weight-input-section">

              <div className="field-group">

                <label>
                  Weight
                </label>

                <div className="weight-input-wrapper">

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={weight}
                    onChange={(e) =>
                      setWeight(
                        e.target.value
                      )
                    }
                    placeholder="00.00"
                  />

                  <select
                    value={unit}
                    onChange={(e) =>
                      setUnit(
                        e.target.value
                      )
                    }
                  >

                    <option value="kg">
                      KG
                    </option>

                    <option value="lb">
                      LB
                    </option>

                  </select>

                </div>

              </div>

              <button
                type="button"
                className="read-scale-btn"
                onClick={readScale}
                disabled={!connected}
              >
                <RefreshCw size={16} />
                Read from Scale
              </button>

            </div>

            {/* MESSAGE */}

            {message && (

              <div
                className={
                  message.includes(
                    "successfully"
                  )
                    ? "weight-message success"
                    : "weight-message"
                }
              >
                {message}
              </div>

            )}

            {/* SAVE */}

            <button
              type="button"
              className="save-weight-btn"
              onClick={
                handleSaveWeight
              }
              disabled={saving}
            >

              <Save size={17} />

              {saving
                ? "Saving..."
                : "Save Weight Record"}

            </button>

          </div>

          {/* =================================================
              SCALE DEVICE
          ================================================= */}

          <div className="weighing-panel">

            <div className="panel-heading">

              <div>

                <span>
                  SCALE DEVICE
                </span>

                <h3>
                  Scale Connection
                </h3>

                <p>
                  Monitor your weighing
                  device.
                </p>

              </div>

              <div className="panel-icon">
                <Wifi size={20} />
              </div>

            </div>

            <div className="device-card">

              <div className="device-top">

                <div className="device-status-icon">
                  <Scale size={23} />
                </div>

                <div>

                  <strong>
                    Goat Weighing Scale
                  </strong>

                  <span>
                    USB / ESP32 / HX711
                  </span>

                </div>

                <div
                  className={
                    connected
                      ? "device-dot active"
                      : "device-dot"
                  }
                />

              </div>

              <div className="device-details">

                <div>
                  <span>
                    STATUS
                  </span>

                  <strong>
                    {connected
                      ? "Connected"
                      : "Disconnected"}
                  </strong>
                </div>

                <div>
                  <span>
                    UNIT
                  </span>

                  <strong>
                    Kilograms
                  </strong>
                </div>

                <div>
                  <span>
                    INPUT
                  </span>

                  <strong>
                    Live Reading
                  </strong>
                </div>

                <div>
                  <span>
                    DEVICE
                  </span>

                  <strong>
                    HX711
                  </strong>
                </div>

              </div>

              <button
                type="button"
                className="connection-btn"
                onClick={() =>
                  setConnected(
                    (value) => !value
                  )
                }
              >

                {connected ? (
                  <>
                    <WifiOff size={15} />
                    Disconnect
                  </>
                ) : (
                  <>
                    <Wifi size={15} />
                    Connect Scale
                  </>
                )}

              </button>

            </div>

          </div>

        </section>

        {/* ===================================================
            RECENT WEIGHMENTS
        =================================================== */}

        <section className="weighing-panel recent-panel">

          <div className="panel-heading">

            <div>

              <span>
                WEIGHT HISTORY
              </span>

              <h3>
                Recent Weighments
              </h3>

              <p>
                Latest saved goat weight
                records.
              </p>

            </div>

            <div className="panel-icon">
              <Clock3 size={20} />
            </div>

          </div>

          {recentWeights.length === 0 ? (

            <div className="empty-weight-state">

              <Scale size={25} />

              <strong>
                No weight records yet
              </strong>

              <span>
                Select a real goat and
                save its weight to see
                the record here.
              </span>

            </div>

          ) : (

            <div className="weight-table">

              <div className="weight-table-head">

                <span>
                  Goat
                </span>

                <span>
                  Tag
                </span>

                <span>
                  Weight
                </span>

                <span>
                  Date
                </span>

              </div>

              {recentWeights.map(
                (record, index) => (

                  <div
                    className="weight-table-row"
                    key={
                      record._id ||
                      record.id ||
                      index
                    }
                  >

                    <div className="goat-cell">

                      <div className="goat-avatar">

                        {(
                          record.goatName ||
                          "G"
                        )
                          .charAt(0)
                          .toUpperCase()}

                      </div>

                      <strong>
                        {record.goatName ||
                          "Unknown Goat"}
                      </strong>

                    </div>

                    <span>
                      {record.tagNumber
                        ? `#${record.tagNumber}`
                        : "--"}
                    </span>

                    <strong>
                      {Number(
                        record.weight
                      ).toFixed(2)}{" "}
                      {record.unit ||
                        "kg"}
                    </strong>

                    <span>
                      {formatDate(
                        record.date ||
                          record.createdAt
                      )}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}