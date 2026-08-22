import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Plus,
  MoreVertical,
  Search,
  X,
  ChevronRight,
  Users,
  Milk,
  CalendarDays,
  Clock3,
  FileText,
  Pencil,
  Trash2,
  Droplets,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

/* =========================================================
   COLORS
========================================================= */

const BLUE = "#1d5fd6";
const BLUE_DARK = "#123a8a";
const BLUE_LIGHT = "#eaf1fd";
const BG = "#f4f7fd";

/* =========================================================
   STORAGE
========================================================= */

const TENANT_STORAGE_KEYS = [
  "tenant",
  "currentTenant",
  "tenantData",
];

const MILK_STORAGE_KEY = "milkRecords";

/* =========================================================
   PAGE
========================================================= */

function Page({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        background: BG,
        fontFamily:
          "'Segoe UI', Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#17233c",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header({
  title,
  subtitle,
  onBack,
  rightIcon,
  onRight,
}) {
  return (
    <header
      style={{
        width: "100%",
        background: `linear-gradient(135deg, ${BLUE_DARK}, ${BLUE})`,
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 4px 18px rgba(18,58,138,0.18)",
      }}
    >
      <div
        style={{
          width: "100%",
          minHeight: 76,
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            cursor: onBack ? "pointer" : "default",
          }}
        >
          {onBack && (
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                display: "grid",
                placeItems: "center",
                background: "rgba(255,255,255,0.12)",
              }}
            >
              <ArrowLeft size={22} />
            </div>
          )}

          <div>
            <div
              style={{
                fontSize: 21,
                fontWeight: 750,
                letterSpacing: 0.2,
              }}
            >
              {title}
            </div>

            {subtitle && (
              <div
                style={{
                  marginTop: 3,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.78)",
                }}
              >
                {subtitle}
              </div>
            )}
          </div>
        </div>

        {rightIcon && (
          <button
            type="button"
            onClick={onRight}
            style={{
              width: 42,
              height: 42,
              border: 0,
              borderRadius: 10,
              background: "#fff",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            {rightIcon}
          </button>
        )}
      </div>

      <div
        style={{
          height: 4,
          background:
            "linear-gradient(90deg, #ffb648, #ff8a3d)",
        }}
      />
    </header>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({ label, required, children }) {
  return (
    <div
      style={{
        marginBottom: 20,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#42516b",
          marginBottom: 8,
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#d63b3b" }}> *</span>
        )}
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #dce4f1",
          borderRadius: 12,
          minHeight: 50,
          boxSizing: "border-box",
          boxShadow:
            "0 1px 3px rgba(20,30,60,0.04)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   SAFE PARSE
========================================================= */

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/* =========================================================
   TENANT
========================================================= */

function getStoredTenant() {
  if (typeof window === "undefined") return null;

  for (const key of TENANT_STORAGE_KEYS) {
    const raw = localStorage.getItem(key);

    if (!raw) continue;

    const parsed = safeParse(raw);

    if (
      parsed &&
      typeof parsed === "object"
    ) {
      return parsed;
    }
  }

  return null;
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

  const breed =
    goat.breed ??
    goat.breedName ??
    goat.breed_name ??
    "";

  const tagNumber =
    goat.tagNumber ??
    goat.tag ??
    goat.tagNo ??
    goat.tag_number ??
    "";

  if (!id && !name && !tagNumber) {
    return null;
  }

  return {
    ...goat,
    id:
      id ||
      `goat-${Date.now()}-${Math.random()}`,
    name:
      name ||
      `Goat #${tagNumber || "Unknown"}`,
    breed: breed || "Unknown breed",
    tagNumber: tagNumber || "",
  };
}

/* =========================================================
   GET REAL GOATS
========================================================= */

function getRealGoats() {
  const tenant = getStoredTenant();

  let list = [];

  if (Array.isArray(tenant?.data?.goats)) {
    list = tenant.data.goats;
  } else if (Array.isArray(tenant?.goats)) {
    list = tenant.goats;
  } else if (
    Array.isArray(tenant?.data?.animals)
  ) {
    list = tenant.data.animals;
  } else if (
    Array.isArray(tenant?.animals)
  ) {
    list = tenant.animals;
  }

  return list
    .map(normalizeGoat)
    .filter(Boolean);
}

/* =========================================================
   MILK RECORD NORMALIZER
========================================================= */

function normalizeMilkRecord(record) {
  if (!record || typeof record !== "object") {
    return null;
  }

  return {
    ...record,

    id:
      record.id ??
      record._id ??
      `milk-${Date.now()}-${Math.random()}`,

    goatId:
      record.goatId ??
      record.animalId ??
      record.goat_id ??
      "",

    goatName:
      record.goatName ??
      record.animal ??
      record.name ??
      "",

    goatTagNumber:
      record.goatTagNumber ??
      record.tagNumber ??
      record.tag ??
      "",

    date:
      record.date ??
      record.recordDate ??
      "",

    session:
      record.session ??
      record.milkingSession ??
      "Morning",

    quantity:
      Number(
        record.quantity ??
          record.milkQuantity ??
          record.value ??
          0
      ),

    unit:
      record.unit ??
      "litre",

    notes:
      record.notes ??
      "",
  };
}

/* =========================================================
   GET MILK RECORDS
========================================================= */

function getStoredMilkRecords() {
  if (typeof window === "undefined") {
    return [];
  }

  const tenant = getStoredTenant();

  const candidates = [
    tenant?.data?.milkRecords,
    tenant?.milkRecords,
    tenant?.data?.milk_records,
    tenant?.milk_records,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate
        .map(normalizeMilkRecord)
        .filter(Boolean);
    }
  }

  const raw = localStorage.getItem(
    MILK_STORAGE_KEY
  );

  if (raw) {
    const parsed = safeParse(raw);

    if (Array.isArray(parsed)) {
      return parsed
        .map(normalizeMilkRecord)
        .filter(Boolean);
    }
  }

  return [];
}

/* =========================================================
   SAVE MILK RECORDS
========================================================= */

function saveMilkRecords(records) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    MILK_STORAGE_KEY,
    JSON.stringify(records)
  );

  const tenant = getStoredTenant();

  if (!tenant) return;

  const updatedTenant = {
    ...tenant,
    data: {
      ...(tenant.data || {}),
      milkRecords: records,
    },
  };

  localStorage.setItem(
    "tenant",
    JSON.stringify(updatedTenant)
  );

  localStorage.setItem(
    "currentTenant",
    JSON.stringify(updatedTenant)
  );

  localStorage.setItem(
    "tenantData",
    JSON.stringify(updatedTenant)
  );

  window.dispatchEvent(
    new Event("tenant-data-updated")
  );
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date) {
  if (!date) return "-";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
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
   MILK FORM
========================================================= */

function MilkRecordForm({
  onBack,
  onSave,
  goats,
  record,
}) {
  const [selectedGoat, setSelectedGoat] =
    useState(() => {
      if (!record) return null;

      return (
        goats.find(
          (goat) =>
            String(goat.id) ===
            String(record.goatId)
        ) ||
        goats.find(
          (goat) =>
            String(goat.name)
              .toLowerCase() ===
            String(record.goatName)
              .toLowerCase()
        ) ||
        null
      );
    });

  const [goatSearch, setGoatSearch] =
    useState("");

  const [date, setDate] =
    useState(
      record?.date ||
        new Date()
          .toISOString()
          .split("T")[0]
    );

  const [session, setSession] =
    useState(
      record?.session || "Morning"
    );

  const [quantity, setQuantity] =
    useState(
      record?.quantity ?? ""
    );

  const [unit, setUnit] =
    useState(
      record?.unit || "litre"
    );

  const [notes, setNotes] =
    useState(
      record?.notes || ""
    );

  const [error, setError] =
    useState("");

  /*
    IMPORTANT:
    Goat list is hidden until user searches.
  */

  const filteredGoats = useMemo(() => {
    const query =
      goatSearch.trim().toLowerCase();

    if (!query) return [];

    return goats.filter((goat) => {
      const name =
        String(goat.name || "")
          .toLowerCase();

      const tag =
        String(goat.tagNumber || "")
          .toLowerCase();

      return (
        name.includes(query) ||
        tag.includes(query)
      );
    });
  }, [goats, goatSearch]);

  const handleSave = () => {
    if (!selectedGoat) {
      setError(
        "Please search and select a goat."
      );
      return;
    }

    if (!date) {
      setError(
        "Please select the record date."
      );
      return;
    }

    if (!quantity) {
      setError(
        "Please enter the milk quantity."
      );
      return;
    }

    const numericQuantity =
      parseFloat(quantity);

    if (
      Number.isNaN(numericQuantity) ||
      numericQuantity <= 0
    ) {
      setError(
        "Please enter a valid milk quantity."
      );
      return;
    }

    onSave({
      id:
        record?.id ??
        `milk-${Date.now()}`,

      goatId: selectedGoat.id,

      goatName: selectedGoat.name,

      goatTagNumber:
        selectedGoat.tagNumber || "",

      breed:
        selectedGoat.breed || "",

      date,

      session,

      quantity: numericQuantity,

      unit,

      notes,
    });
  };

  return (
    <Page>
      <Header
        title={
          record
            ? "Edit Milk Record"
            : "New Milk Record"
        }
        subtitle={
          record
            ? "Update milk production details"
            : "Add a milk production record"
        }
        onBack={onBack}
        rightIcon={
          <Check
            size={20}
            color={BLUE_DARK}
            strokeWidth={3}
          />
        }
        onRight={handleSave}
      />

      <main
        style={{
          width: "100%",
          maxWidth: 1180,
          margin: "0 auto",
          padding:
            "34px 40px 70px",
          boxSizing: "border-box",
        }}
      >
        {/* FORM TITLE */}

        <div
          style={{
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 13,
                background: BLUE_LIGHT,
                display: "grid",
                placeItems: "center",
              }}
            >
              <Milk
                size={25}
                color={BLUE}
              />
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 25,
                  color: "#132750",
                }}
              >
                Milk Production
              </h1>

              <p
                style={{
                  margin:
                    "4px 0 0",
                  color: "#71809b",
                  fontSize: 14,
                }}
              >
                Record the milk collected
                from a goat.
              </p>
            </div>
          </div>
        </div>

        {/* MAIN FORM GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1.3fr) minmax(320px, 0.7fr)",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* LEFT */}

          <section
            style={{
              background: "#fff",
              borderRadius: 18,
              border:
                "1px solid #e1e8f4",
              padding: 26,
              boxShadow:
                "0 5px 18px rgba(20,30,60,0.05)",
            }}
          >
            <div
              style={{
                fontSize: 17,
                fontWeight: 750,
                color: "#162b56",
                marginBottom: 22,
              }}
            >
              Record Details
            </div>

            {/* GOAT */}

            <Field
              label="Select Goat"
              required
            >
              <div
                style={{
                  padding: 12,
                }}
              >
                {!selectedGoat && (
                  <div
                    style={{
                      height: 46,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      border:
                        "1px solid #d7e0ee",
                      borderRadius: 10,
                      padding:
                        "0 12px",
                      boxSizing:
                        "border-box",
                    }}
                  >
                    <Search
                      size={18}
                      color="#71809b"
                    />

                    <input
                      value={
                        goatSearch
                      }
                      onChange={(e) => {
                        setGoatSearch(
                          e.target.value
                        );
                        setError("");
                      }}
                      placeholder="Search by goat name or tag number..."
                      style={{
                        flex: 1,
                        border: 0,
                        outline: 0,
                        fontSize: 14,
                        background:
                          "transparent",
                      }}
                    />

                    {goatSearch && (
                      <button
                        type="button"
                        onClick={() =>
                          setGoatSearch("")
                        }
                        style={{
                          border: 0,
                          background:
                            "transparent",
                          cursor:
                            "pointer",
                          color:
                            "#71809b",
                        }}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                )}

                {selectedGoat && (
                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 12,
                      padding: 12,
                      borderRadius: 12,
                      background:
                        BLUE_LIGHT,
                      border:
                        "1px solid #c4d7f7",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 11,
                        background:
                          "#fff",
                        display: "grid",
                        placeItems:
                          "center",
                        fontSize: 22,
                      }}
                    >
                      🐐
                    </div>

                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 750,
                          color:
                            "#152a55",
                        }}
                      >
                        {
                          selectedGoat.name
                        }
                      </div>

                      <div
                        style={{
                          marginTop: 3,
                          fontSize: 12,
                          color:
                            "#66758e",
                        }}
                      >
                        {selectedGoat.breed ||
                          "Unknown breed"}

                        {selectedGoat.tagNumber
                          ? ` · Tag #${selectedGoat.tagNumber}`
                          : ""}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedGoat(
                          null
                        );
                        setGoatSearch(
                          ""
                        );
                      }}
                      style={{
                        width: 32,
                        height: 32,
                        border: 0,
                        borderRadius: 8,
                        background:
                          "#fff",
                        color:
                          "#66758e",
                        display: "grid",
                        placeItems:
                          "center",
                        cursor:
                          "pointer",
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* SEARCH RESULTS */}

                {!selectedGoat &&
                  goatSearch.trim() && (
                    <div
                      style={{
                        marginTop: 10,
                        maxHeight: 230,
                        overflowY:
                          "auto",
                      }}
                    >
                      {filteredGoats.length ===
                      0 ? (
                        <div
                          style={{
                            minHeight: 130,
                            display: "flex",
                            flexDirection:
                              "column",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            textAlign:
                              "center",
                            color:
                              "#71809b",
                            border:
                              "1px dashed #cfd9e8",
                            borderRadius: 12,
                          }}
                        >
                          <Users
                            size={30}
                            color="#9aa8bd"
                          />

                          <strong
                            style={{
                              marginTop: 7,
                              color:
                                "#42516b",
                            }}
                          >
                            No goats found
                          </strong>

                          <span
                            style={{
                              marginTop: 3,
                              fontSize: 12,
                            }}
                          >
                            Search using the
                            goat name or tag
                            number.
                          </span>
                        </div>
                      ) : (
                        filteredGoats.map(
                          (goat) => (
                            <button
                              key={
                                goat.id
                              }
                              type="button"
                              onClick={() => {
                                setSelectedGoat(
                                  goat
                                );
                                setGoatSearch(
                                  ""
                                );
                                setError(
                                  ""
                                );
                              }}
                              style={{
                                width:
                                  "100%",
                                border:
                                  "1px solid #dce4f1",
                                background:
                                  "#fff",
                                borderRadius: 11,
                                padding: 11,
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: 11,
                                marginBottom: 7,
                                cursor:
                                  "pointer",
                                textAlign:
                                  "left",
                              }}
                            >
                              <div
                                style={{
                                  width: 42,
                                  height: 42,
                                  borderRadius: 10,
                                  background:
                                    BLUE_LIGHT,
                                  display:
                                    "grid",
                                  placeItems:
                                    "center",
                                  fontSize: 20,
                                }}
                              >
                                🐐
                              </div>

                              <div
                                style={{
                                  flex: 1,
                                }}
                              >
                                <div
                                  style={{
                                    fontWeight:
                                      750,
                                    color:
                                      "#152a55",
                                  }}
                                >
                                  {
                                    goat.name
                                  }
                                </div>

                                <div
                                  style={{
                                    fontSize: 12,
                                    color:
                                      "#71809b",
                                    marginTop:
                                      3,
                                  }}
                                >
                                  {
                                    goat.breed
                                  }

                                  {goat.tagNumber
                                    ? ` · Tag #${goat.tagNumber}`
                                    : ""}
                                </div>
                              </div>

                              <ChevronRight
                                size={18}
                                color="#94a3b8"
                              />
                            </button>
                          )
                        )
                      )}
                    </div>
                  )}

                {!selectedGoat &&
                  !goatSearch.trim() && (
                    <div
                      style={{
                        padding:
                          "12px 2px 2px",
                        fontSize: 12,
                        color:
                          "#7c8aa1",
                      }}
                    >
                      Start typing a goat
                      name or tag number to
                      search.
                    </div>
                  )}
              </div>
            </Field>

            {/* DATE */}

            <Field
              label="Record Date"
              required
            >
              <div
                style={{
                  height: 50,
                  padding:
                    "0 14px",
                  display: "flex",
                  alignItems:
                    "center",
                  gap: 10,
                }}
              >
                <CalendarDays
                  size={18}
                  color={BLUE}
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    border: 0,
                    outline: 0,
                    fontSize: 14,
                    color: "#1e293b",
                    background:
                      "transparent",
                  }}
                />
              </div>
            </Field>

            {/* SESSION */}

            <Field
              label="Milking Session"
              required
            >
              <div
                style={{
                  position:
                    "relative",
                }}
              >
                <Clock3
                  size={18}
                  color={BLUE}
                  style={{
                    position:
                      "absolute",
                    left: 14,
                    top: 16,
                    pointerEvents:
                      "none",
                  }}
                />

                <select
                  value={session}
                  onChange={(e) =>
                    setSession(
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    height: 50,
                    border: 0,
                    outline: 0,
                    padding:
                      "0 40px 0 44px",
                    background:
                      "transparent",
                    fontSize: 14,
                    color:
                      "#1e293b",
                    appearance:
                      "none",
                    cursor:
                      "pointer",
                  }}
                >
                  <option>
                    Morning
                  </option>
                  <option>
                    Afternoon
                  </option>
                  <option>
                    Evening
                  </option>
                </select>

                <ChevronDown
                  size={17}
                  color="#71809b"
                  style={{
                    position:
                      "absolute",
                    right: 14,
                    top: 16,
                    pointerEvents:
                      "none",
                  }}
                />
              </div>
            </Field>

            {/* QUANTITY */}

            <Field
              label="Milk Quantity"
              required
            >
              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  minHeight: 50,
                }}
              >
                <div
                  style={{
                    paddingLeft: 14,
                  }}
                >
                  <Droplets
                    size={18}
                    color={BLUE}
                  />
                </div>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      e.target.value
                    )
                  }
                  placeholder="Enter milk quantity"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    border: 0,
                    outline: 0,
                    padding:
                      "0 12px",
                    fontSize: 15,
                    background:
                      "transparent",
                  }}
                />

                <select
                  value={unit}
                  onChange={(e) =>
                    setUnit(
                      e.target.value
                    )
                  }
                  style={{
                    border: 0,
                    outline: 0,
                    background:
                      "transparent",
                    color: BLUE,
                    fontWeight: 750,
                    fontSize: 14,
                    padding:
                      "0 14px",
                    cursor:
                      "pointer",
                  }}
                >
                  <option value="litre">
                    Litre
                  </option>

                  <option value="ml">
                    mL
                  </option>
                </select>
              </div>
            </Field>

            {/* NOTES */}

            <Field label="Notes">
              <div
                style={{
                  display: "flex",
                  alignItems:
                    "flex-start",
                  gap: 10,
                  padding: 14,
                }}
              >
                <FileText
                  size={18}
                  color="#71809b"
                  style={{
                    marginTop: 2,
                  }}
                />

                <textarea
                  value={notes}
                  onChange={(e) =>
                    setNotes(
                      e.target.value
                    )
                  }
                  placeholder="Add notes about milk production..."
                  rows={5}
                  style={{
                    width: "100%",
                    border: 0,
                    outline: 0,
                    resize:
                      "vertical",
                    fontFamily:
                      "inherit",
                    fontSize: 14,
                    background:
                      "transparent",
                    boxSizing:
                      "border-box",
                  }}
                />
              </div>
            </Field>

            {error && (
              <div
                style={{
                  padding:
                    "11px 13px",
                  borderRadius: 10,
                  background:
                    "#fff1f1",
                  border:
                    "1px solid #ffd1d1",
                  color:
                    "#c0392b",
                  fontSize: 13,
                  fontWeight: 650,
                  marginBottom: 16,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleSave}
              style={{
                width: "100%",
                height: 52,
                border: 0,
                borderRadius: 12,
                background:
                  `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})`,
                color: "#fff",
                fontSize: 15,
                fontWeight: 750,
                cursor: "pointer",
                boxShadow:
                  `0 7px 18px ${BLUE}40`,
              }}
            >
              {record
                ? "Update Milk Record"
                : "Save Milk Record"}
            </button>
          </section>

          {/* RIGHT INFO */}

          <aside
            style={{
              display: "flex",
              flexDirection:
                "column",
              gap: 16,
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(145deg, #123a8a, #1d5fd6)",
                borderRadius: 18,
                padding: 24,
                color: "#fff",
                minHeight: 180,
                boxSizing:
                  "border-box",
                boxShadow:
                  "0 8px 25px rgba(29,95,214,0.20)",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 13,
                  background:
                    "rgba(255,255,255,0.14)",
                  display: "grid",
                  placeItems:
                    "center",
                  marginBottom: 18,
                }}
              >
                <Milk size={25} />
              </div>

              <div
                style={{
                  fontSize: 19,
                  fontWeight: 750,
                }}
              >
                Milk Production
              </div>

              <div
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color:
                    "rgba(255,255,255,0.78)",
                  marginTop: 7,
                }}
              >
                Record daily milk
                production for each
                goat and track morning,
                afternoon and evening
                collections.
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                border:
                  "1px solid #e1e8f4",
                borderRadius: 18,
                padding: 22,
              }}
            >
              <div
                style={{
                  fontWeight: 750,
                  color: "#1b315d",
                  marginBottom: 15,
                }}
              >
                Recording Tips
              </div>

              {[
                "Select the correct goat.",
                "Enter the actual milk quantity.",
                "Choose the correct milking session.",
                "Add notes when necessary.",
              ].map(
                (tip, index) => (
                  <div
                    key={tip}
                    style={{
                      display:
                        "flex",
                      gap: 10,
                      marginBottom:
                        index === 3
                          ? 0
                          : 12,
                      fontSize: 13,
                      color:
                        "#687791",
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        flexShrink: 0,
                        borderRadius:
                          "50%",
                        background:
                          BLUE_LIGHT,
                        color: BLUE,
                        display:
                          "grid",
                        placeItems:
                          "center",
                        fontSize: 11,
                        fontWeight:
                          750,
                      }}
                    >
                      {index + 1}
                    </div>

                    <span>
                      {tip}
                    </span>
                  </div>
                )
              )}
            </div>
          </aside>
        </div>
      </main>
    </Page>
  );
}

/* =========================================================
   MILK RECORD LIST
========================================================= */

function MilkRecordList({
  records,
  onAdd,
  onOpen,
  onDelete,
  onBack,
}) {
  const [menuOpenId, setMenuOpenId] =
    useState(null);

  const totalMilk = records.reduce(
    (sum, record) =>
      sum +
      (Number(record.quantity) || 0),
    0
  );

  return (
    <Page>
      <Header
        title="Milk Records"
        subtitle="Milk production history"
        onBack={onBack}
      />

      <main
        style={{
          width: "100%",
          maxWidth: 1400,
          margin: "0 auto",
          padding:
            "30px 40px 90px",
          boxSizing: "border-box",
        }}
      >
        {/* PAGE TOP */}

        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            gap: 20,
            marginBottom: 26,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                color: "#142b58",
              }}
            >
              Milk Production Records
            </h1>

            <p
              style={{
                margin:
                  "7px 0 0",
                fontSize: 14,
                color: "#74829b",
              }}
            >
              Manage and review milk
              collection records.
            </p>
          </div>

          <button
            type="button"
            onClick={onAdd}
            style={{
              border: 0,
              borderRadius: 11,
              background:
                `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})`,
              color: "#fff",
              padding:
                "13px 19px",
              display: "flex",
              alignItems:
                "center",
              gap: 8,
              fontWeight: 750,
              cursor:
                "pointer",
              boxShadow:
                `0 6px 16px ${BLUE}35`,
              whiteSpace:
                "nowrap",
            }}
          >
            <Plus size={18} />
            Add Milk Record
          </button>
        </div>

        {/* SUMMARY */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: 18,
            marginBottom: 24,
          }}
        >
          <SummaryCard
            icon={<Milk size={22} />}
            title="Total Records"
            value={records.length}
            suffix=""
          />

          <SummaryCard
            icon={
              <Droplets size={22} />
            }
            title="Total Recorded Milk"
            value={
              totalMilk
                ? totalMilk.toFixed(2)
                : "0.00"
            }
            suffix=" L"
          />

          <SummaryCard
            icon={
              <TrendingUp
                size={22}
              />
            }
            title="Production Entries"
            value={records.length}
            suffix=""
          />
        </div>

        {/* RECORD TABLE */}

        <section
          style={{
            background: "#fff",
            borderRadius: 18,
            border:
              "1px solid #e1e8f4",
            boxShadow:
              "0 5px 18px rgba(20,30,60,0.05)",
            overflow:
              "visible",
          }}
        >
          <div
            style={{
              padding:
                "19px 22px",
              borderBottom:
                "1px solid #edf1f7",
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: 10,
              }}
            >
              <Milk
                size={19}
                color={BLUE}
              />

              <span
                style={{
                  fontWeight: 750,
                  color:
                    "#1b315d",
                }}
              >
                Milk Records
              </span>
            </div>

            <span
              style={{
                fontSize: 12,
                color:
                  "#8492ac",
              }}
            >
              {records.length} record
              {records.length !== 1
                ? "s"
                : ""}
            </span>
          </div>

          {records.length === 0 ? (
            <EmptyState
              onAdd={onAdd}
            />
          ) : (
            <div
              style={{
                width: "100%",
                overflowX:
                  "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse:
                    "collapse",
                  minWidth: 850,
                }}
              >
                <thead>
                  <tr
                    style={{
                      background:
                        "#f8faff",
                    }}
                  >
                    <TableHead>
                      Goat
                    </TableHead>

                    <TableHead>
                      Date
                    </TableHead>

                    <TableHead>
                      Session
                    </TableHead>

                    <TableHead>
                      Milk Quantity
                    </TableHead>

                    <TableHead>
                      Notes
                    </TableHead>

                    <TableHead
                      align="right"
                    >
                      Action
                    </TableHead>
                  </tr>
                </thead>

                <tbody>
                  {records
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(
                          b.date
                        ) -
                        new Date(
                          a.date
                        )
                    )
                    .map(
                      (record) => (
                        <tr
                          key={
                            record.id
                          }
                          onClick={() =>
                            onOpen(
                              record
                            )
                          }
                          style={{
                            borderTop:
                              "1px solid #edf1f7",
                            cursor:
                              "pointer",
                          }}
                        >
                          <td
                            style={{
                              padding:
                                "16px 22px",
                            }}
                          >
                            <div
                              style={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: 11,
                              }}
                            >
                              <div
                                style={{
                                  width: 42,
                                  height: 42,
                                  borderRadius:
                                    11,
                                  background:
                                    BLUE_LIGHT,
                                  display:
                                    "grid",
                                  placeItems:
                                    "center",
                                  fontSize:
                                    19,
                                }}
                              >
                                🐐
                              </div>

                              <div>
                                <div
                                  style={{
                                    fontWeight:
                                      750,
                                    color:
                                      "#172c56",
                                  }}
                                >
                                  {record.goatName ||
                                    "Unknown goat"}
                                </div>

                                <div
                                  style={{
                                    fontSize:
                                      12,
                                    color:
                                      "#7b89a0",
                                    marginTop:
                                      3,
                                  }}
                                >
                                  {record.goatTagNumber
                                    ? `Tag #${record.goatTagNumber}`
                                    : record.breed ||
                                      ""}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td
                            style={{
                              padding:
                                "16px 22px",
                              color:
                                "#53627b",
                              fontSize:
                                13,
                            }}
                          >
                            {formatDate(
                              record.date
                            )}
                          </td>

                          <td
                            style={{
                              padding:
                                "16px 22px",
                            }}
                          >
                            <SessionBadge
                              session={
                                record.session
                              }
                            />
                          </td>

                          <td
                            style={{
                              padding:
                                "16px 22px",
                            }}
                          >
                            <span
                              style={{
                                fontSize:
                                  16,
                                fontWeight:
                                  750,
                                color:
                                  BLUE,
                              }}
                            >
                              {Number(
                                record.quantity
                              ).toFixed(
                                2
                              )}
                            </span>

                            <span
                              style={{
                                marginLeft:
                                  5,
                                fontSize:
                                  12,
                                color:
                                  "#7b89a0",
                                fontWeight:
                                  650,
                              }}
                            >
                              {record.unit ===
                              "ml"
                                ? "mL"
                                : "L"}
                            </span>
                          </td>

                          <td
                            style={{
                              padding:
                                "16px 22px",
                              maxWidth:
                                260,
                              color:
                                "#71809b",
                              fontSize:
                                13,
                            }}
                          >
                            {record.notes ||
                              "—"}
                          </td>

                          <td
                            style={{
                              padding:
                                "16px 22px",
                              textAlign:
                                "right",
                              position:
                                "relative",
                            }}
                            onClick={(e) =>
                              e.stopPropagation()
                            }
                          >
                            <div
                              style={{
                                display:
                                  "flex",
                                justifyContent:
                                  "flex-end",
                                position:
                                  "relative",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setMenuOpenId(
                                    menuOpenId ===
                                      record.id
                                      ? null
                                      : record.id
                                  )
                                }
                                style={{
                                  width: 34,
                                  height: 34,
                                  border: 0,
                                  borderRadius:
                                    8,
                                  background:
                                    "#f3f6fb",
                                  display:
                                    "grid",
                                  placeItems:
                                    "center",
                                  cursor:
                                    "pointer",
                                  color:
                                    "#64748b",
                                }}
                              >
                                <MoreVertical
                                  size={
                                    18
                                  }
                                />
                              </button>

                              {menuOpenId ===
                                record.id && (
                                <div
                                  style={{
                                    position:
                                      "absolute",
                                    right: 0,
                                    top: 40,
                                    width: 145,
                                    background:
                                      "#fff",
                                    border:
                                      "1px solid #e1e8f4",
                                    borderRadius:
                                      10,
                                    boxShadow:
                                      "0 10px 28px rgba(20,30,60,0.15)",
                                    zIndex: 200,
                                    overflow:
                                      "hidden",
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      onOpen(
                                        record
                                      );
                                      setMenuOpenId(
                                        null
                                      );
                                    }}
                                    style={{
                                      width:
                                        "100%",
                                      border:
                                        0,
                                      background:
                                        "#fff",
                                      padding:
                                        "11px 13px",
                                      display:
                                        "flex",
                                      alignItems:
                                        "center",
                                      gap: 9,
                                      cursor:
                                        "pointer",
                                      fontSize:
                                        13,
                                      color:
                                        "#334155",
                                    }}
                                  >
                                    <Pencil
                                      size={
                                        15
                                      }
                                    />
                                    Edit
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      onDelete(
                                        record.id
                                      );
                                      setMenuOpenId(
                                        null
                                      );
                                    }}
                                    style={{
                                      width:
                                        "100%",
                                      border:
                                        0,
                                      background:
                                        "#fff",
                                      padding:
                                        "11px 13px",
                                      display:
                                        "flex",
                                      alignItems:
                                        "center",
                                      gap: 9,
                                      cursor:
                                        "pointer",
                                      fontSize:
                                        13,
                                      color:
                                        "#c0392b",
                                    }}
                                  >
                                    <Trash2
                                      size={
                                        15
                                      }
                                    />
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </Page>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon,
  title,
  value,
  suffix,
}) {
  return (
    <div
      style={{
        background: "#fff",
        border:
          "1px solid #e1e8f4",
        borderRadius: 16,
        padding: 20,
        display: "flex",
        alignItems:
          "center",
        gap: 14,
        boxShadow:
          "0 3px 12px rgba(20,30,60,0.04)",
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background:
            BLUE_LIGHT,
          color: BLUE,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontSize: 12,
            color: "#7a89a1",
            fontWeight: 650,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 3,
            fontSize: 22,
            fontWeight: 800,
            color: "#152b57",
          }}
        >
          {value}
          <span
            style={{
              fontSize: 13,
              color: "#74829b",
            }}
          >
            {suffix}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TABLE HEAD
========================================================= */

function TableHead({
  children,
  align = "left",
}) {
  return (
    <th
      style={{
        padding:
          "13px 22px",
        textAlign: align,
        fontSize: 11,
        textTransform:
          "uppercase",
        letterSpacing: 0.5,
        color: "#7a89a1",
        fontWeight: 750,
        whiteSpace:
          "nowrap",
      }}
    >
      {children}
    </th>
  );
}

/* =========================================================
   SESSION BADGE
========================================================= */

function SessionBadge({
  session,
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems:
          "center",
        gap: 6,
        padding:
          "6px 10px",
        borderRadius: 20,
        background:
          BLUE_LIGHT,
        color:
          BLUE_DARK,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      <Clock3 size={13} />
      {session}
    </span>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  onAdd,
}) {
  return (
    <div
      style={{
        padding:
          "75px 20px",
        textAlign:
          "center",
      }}
    >
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: 18,
          background:
            BLUE_LIGHT,
          display: "grid",
          placeItems:
            "center",
          margin:
            "0 auto 15px",
        }}
      >
        <Milk
          size={32}
          color={BLUE}
        />
      </div>

      <div
        style={{
          fontSize: 17,
          fontWeight: 750,
          color:
            "#25385d",
        }}
      >
        No milk records yet
      </div>

      <div
        style={{
          marginTop: 6,
          fontSize: 13,
          color:
            "#7a89a1",
        }}
      >
        Add your first milk
        production record.
      </div>

      <button
        type="button"
        onClick={onAdd}
        style={{
          marginTop: 18,
          border: 0,
          borderRadius: 10,
          background:
            BLUE,
          color: "#fff",
          padding:
            "11px 17px",
          fontWeight: 750,
          cursor:
            "pointer",
          display:
            "inline-flex",
          alignItems:
            "center",
          gap: 7,
        }}
      >
        <Plus size={17} />
        Add Milk Record
      </button>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WeightlogPage({
  onBack,
}) {
  const [screen, setScreen] =
    useState("list");

  const [activeRecord, setActiveRecord] =
    useState(null);

  const [goats, setGoats] =
    useState(() =>
      getRealGoats()
    );

  const [records, setRecords] =
    useState(() =>
      getStoredMilkRecords()
    );

  /* =======================================================
     REFRESH REAL GOATS + RECORDS
  ======================================================= */

  useEffect(() => {
    const refreshData = () => {
      setGoats(
        getRealGoats()
      );

      setRecords(
        getStoredMilkRecords()
      );
    };

    window.addEventListener(
      "tenant-data-updated",
      refreshData
    );

    window.addEventListener(
      "storage",
      refreshData
    );

    return () => {
      window.removeEventListener(
        "tenant-data-updated",
        refreshData
      );

      window.removeEventListener(
        "storage",
        refreshData
      );
    };
  }, []);

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = (
    entry
  ) => {
    setRecords(
      (previous) => {
        const exists =
          previous.some(
            (item) =>
              String(item.id) ===
              String(entry.id)
          );

        const updated = exists
          ? previous.map(
              (item) =>
                String(item.id) ===
                String(entry.id)
                  ? entry
                  : item
            )
          : [
              entry,
              ...previous,
            ];

        saveMilkRecords(
          updated
        );

        return updated;
      }
    );

    setActiveRecord(
      null
    );

    setScreen("list");
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this milk record?"
      );

    if (!confirmed) {
      return;
    }

    setRecords(
      (previous) => {
        const updated =
          previous.filter(
            (item) =>
              String(item.id) !==
              String(id)
          );

        saveMilkRecords(
          updated
        );

        return updated;
      }
    );
  };

  /* =======================================================
     OPEN RECORD
  ======================================================= */

  const openRecord = (
    record
  ) => {
    setActiveRecord(
      record
    );

    setScreen("form");
  };

  /* =======================================================
     NEW
  ======================================================= */

  const openNew = () => {
    setActiveRecord(
      null
    );

    setScreen("form");
  };

  /* =======================================================
     FORM BACK
  ======================================================= */

  const handleFormBack = () => {
    setActiveRecord(
      null
    );

    setScreen("list");
  };

  /* =======================================================
     RECORDS BACK
  ======================================================= */

  const handleRecordsBack =
    () => {
      if (
        typeof onBack ===
        "function"
      ) {
        onBack();
      }
    };

  /* =======================================================
     FORM
  ======================================================= */

  if (
    screen === "form"
  ) {
    return (
      <MilkRecordForm
        onBack={
          handleFormBack
        }
        onSave={
          handleSave
        }
        goats={goats}
        record={
          activeRecord
        }
      />
    );
  }

  /* =======================================================
     LIST
  ======================================================= */

  return (
    <MilkRecordList
      records={records}
      onAdd={openNew}
      onOpen={openRecord}
      onDelete={
        handleDelete
      }
      onBack={
        handleRecordsBack
      }
    />
  );
}