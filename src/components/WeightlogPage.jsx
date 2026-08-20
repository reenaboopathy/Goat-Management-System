import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Plus,
  Scale,
  MoreVertical,
  ChevronDown,
  Search,
  X,
  ChevronRight,
  Users,
} from "lucide-react";

const BLUE = "#1d5fd6";
const BLUE_DARK = "#123a8a";
const BLUE_LIGHT = "#eaf1fd";

const WEIGHT_TYPES = [
  "Body Weight",
  "Birth Weight",
  "Weaning Weight",
  "Monthly Check",
];

const initialLogs = [
  {
    id: 1,
    animal: "Bella",
    date: "2026-08-05",
    type: "Body Weight",
    value: 42.5,
    unit: "kg",
    notes: "",
  },
  {
    id: 2,
    animal: "Kiddo",
    date: "2026-08-01",
    type: "Monthly Check",
    value: 18.2,
    unit: "kg",
    notes: "Healthy growth",
  },
];

/* =========================================================
   PAGE
========================================================= */

function Page({ children }) {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: "#f4f7fd",
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        position: "relative",
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

function Header({ title, onBack, rightIcon, onRight }) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${BLUE_DARK}, ${BLUE})`,
        padding: "18px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      <div
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          cursor: onBack ? "pointer" : "default",
        }}
      >
        {onBack && (
          <ArrowLeft
            color="#fff"
            size={24}
            strokeWidth={2.4}
          />
        )}

        <span
          style={{
            color: "#fff",
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: 0.3,
          }}
        >
          {title}
        </span>
      </div>

      {rightIcon && (
        <div
          onClick={onRight}
          style={{
            width: 38,
            height: 38,
            borderRadius: 9,
            background: "rgba(255,255,255,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({ label, children }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f4",
        borderRadius: 12,
        padding: "14px 16px",
        marginBottom: 18,
        boxShadow: "0 1px 2px rgba(20,30,60,0.04)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "#8492ac",
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        {label}
      </div>

      {children}
    </div>
  );
}

/* =========================================================
   NEW / EDIT WEIGHT FORM
========================================================= */

function NewWeightForm({
  onBack,
  onSave,
  goats,
  record,
}) {
  const [date, setDate] = useState(
    record?.date || ""
  );

  const [type, setType] = useState(
    record?.type || ""
  );

  const [typeOpen, setTypeOpen] = useState(false);

  const [selectedGoat, setSelectedGoat] = useState(() => {
    if (!record) return null;

    const goatId = record.goatId;
    const found = goats.find(
      (goat) =>
        goatId &&
        String(goat.id) === String(goatId)
    );

    return (
      found ||
      goats.find(
        (goat) =>
          String(goat.name).toLowerCase() ===
          String(record.animal || "").toLowerCase()
      ) ||
      null
    );
  });

  const [goatSearch, setGoatSearch] = useState("");

  const [value, setValue] = useState(
    record?.value ?? ""
  );

  const [unit, setUnit] = useState(
    record?.unit || "kg"
  );

  const [notes, setNotes] = useState(
    record?.notes || ""
  );

  const [error, setError] = useState("");

  const filteredGoats = useMemo(() => {
    const query = goatSearch.trim().toLowerCase();

    if (!query) return goats;

    return goats.filter((goat) => {
      const searchable = [
        goat.name,
        goat.breed,
        goat.tagNumber,
        goat.id,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [goats, goatSearch]);

  const handleSave = () => {
    if (!selectedGoat) {
      setError("Please select a goat.");
      return;
    }

    if (!date || !type || !value) {
      setError(
        "Fill in date, weight type, and weight value."
      );
      return;
    }

    const numericValue = parseFloat(value);

    if (
      Number.isNaN(numericValue) ||
      numericValue <= 0
    ) {
      setError(
        "Please enter a valid weight value."
      );
      return;
    }

    onSave({
      id: record?.id ?? Date.now(),
      goatId: selectedGoat.id,
      animal: selectedGoat.name,
      goatName: selectedGoat.name,
      goatTagNumber: selectedGoat.tagNumber || "",
      breed: selectedGoat.breed || "",
      date,
      type,
      value: numericValue,
      unit,
      notes,
    });
  };

  return (
    <Page>
      <Header
        title={
          record ? "Edit Weight" : "New Weight"
        }
        onBack={onBack}
        rightIcon={
          <Check
            size={19}
            color={BLUE_DARK}
            strokeWidth={3}
          />
        }
        onRight={handleSave}
      />

      <div
        style={{
          height: 4,
          background:
            "linear-gradient(90deg, #ffb648, #ff8a3d)",
        }}
      />

      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "28px 24px 60px",
        }}
      >
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              fontSize: 12,
              color: "#8492ac",
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            Select Goat *
          </div>

          <div
            style={{
              background: "#fff",
              border: `1px solid #e2e8f4`,
              borderRadius: 12,
              padding: "12px 14px",
              boxShadow: "0 1px 2px rgba(20,30,60,0.04)",
            }}
          >
            <div
              style={{
                height: 42,
                display: "flex",
                alignItems: "center",
                gap: 9,
                border: "1px solid #d9e2f0",
                borderRadius: 10,
                padding: "0 11px",
                marginBottom: 10,
              }}
            >
              <Search size={17} color="#64748B" />

              <input
                value={goatSearch}
                onChange={(e) =>
                  setGoatSearch(e.target.value)
                }
                placeholder="Search goat..."
                style={{
                  flex: 1,
                  border: 0,
                  outline: 0,
                  fontSize: 14,
                  background: "transparent",
                }}
              />

              {goatSearch && (
                <button
                  type="button"
                  onClick={() => setGoatSearch("")}
                  style={{
                    border: 0,
                    background: "transparent",
                    color: "#64748B",
                    cursor: "pointer",
                  }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {selectedGoat ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: BLUE_LIGHT,
                  border: "1px solid #BBD0F7",
                  borderRadius: 11,
                  padding: 10,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 20,
                  }}
                >
                  🐐
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#12295c",
                    }}
                  >
                    {selectedGoat.name}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "#5b6b85",
                      marginTop: 3,
                    }}
                  >
                    {selectedGoat.breed || "Unknown breed"}
                    {selectedGoat.tagNumber
                      ? ` · Tag #${selectedGoat.tagNumber}`
                      : ""}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedGoat(null)}
                  style={{
                    border: 0,
                    background: "transparent",
                    color: "#64748B",
                    cursor: "pointer",
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                style={{
                  maxHeight: 180,
                  overflowY: "auto",
                }}
              >
                {filteredGoats.length === 0 ? (
                  <div
                    style={{
                      minHeight: 100,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                      color: "#64748B",
                      textAlign: "center",
                    }}
                  >
                    <Users size={28} color="#94A3B8" />

                    <strong>
                      {goatSearch
                        ? "No goats found"
                        : "No goats created yet"}
                    </strong>

                    <span style={{ fontSize: 12 }}>
                      {goatSearch
                        ? "Try another name, breed or tag."
                        : "Add a goat first from the Goats page."}
                    </span>
                  </div>
                ) : (
                  filteredGoats.map((goat) => (
                    <button
                      key={goat.id}
                      type="button"
                      onClick={() => {
                        setSelectedGoat(goat);
                        setGoatSearch("");
                        setError("");
                      }}
                      style={{
                        width: "100%",
                        border: "1px solid #d9e2f0",
                        background: "#fff",
                        borderRadius: 11,
                        padding: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 7,
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: BLUE_LIGHT,
                          display: "grid",
                          placeItems: "center",
                          fontSize: 20,
                        }}
                      >
                        🐐
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#12295c",
                          }}
                        >
                          {goat.name}
                        </div>

                        <div
                          style={{
                            fontSize: 12,
                            color: "#5b6b85",
                            marginTop: 3,
                          }}
                        >
                          {goat.breed || "Unknown breed"}
                          {goat.tagNumber
                            ? ` · Tag #${goat.tagNumber}`
                            : ""}
                        </div>
                      </div>

                      <ChevronRight
                        size={18}
                        color="#94A3B8"
                      />
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <Field label="Weighing date *">
          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 15,
              color: "#1e293b",
              background: "transparent",
            }}
          />
        </Field>

        <div
          style={{
            position: "relative",
            marginBottom: 18,
          }}
        >
          <div
            onClick={() =>
              setTypeOpen(
                (open) => !open
              )
            }
            style={{
              background: "#fff",
              border: `1.5px solid ${BLUE}`,
              borderRadius: 12,
              padding: "14px 16px",
              boxShadow:
                `0 0 0 3px ${BLUE_LIGHT}`,
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                color: type
                  ? "#1e293b"
                  : BLUE,
                fontWeight: type
                  ? 500
                  : 600,
                fontSize: 15,
              }}
            >
              {type ||
                "- Select weight type -"}
            </span>

            <ChevronDown
              size={16}
              color={BLUE}
              style={{
                transform: typeOpen
                  ? "rotate(180deg)"
                  : "none",
                transition:
                  "transform .15s",
              }}
            />
          </div>

          {typeOpen && (
            <div
              style={{
                position: "absolute",
                top:
                  "calc(100% + 6px)",
                left: 0,
                right: 0,
                background: "#fff",
                borderRadius: 12,
                boxShadow:
                  "0 10px 28px rgba(20,30,60,0.18)",
                zIndex: 50,
                overflow: "hidden",
              }}
            >
              {WEIGHT_TYPES.map((t) => (
                <div
                  key={t}
                  onClick={() => {
                    setType(t);
                    setTypeOpen(false);
                  }}
                  style={{
                    padding:
                      "13px 16px",
                    fontSize: 14,
                    fontWeight:
                      t === type
                        ? 700
                        : 500,
                    color:
                      t === type
                        ? BLUE_DARK
                        : "#3a4a63",
                    background:
                      t === type
                        ? BLUE_LIGHT
                        : "#fff",
                    cursor: "pointer",
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>

        <Field label="Weight value *">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <input
              type="number"
              min="0"
              step="0.1"
              value={value}
              onChange={(e) =>
                setValue(e.target.value)
              }
              placeholder="0.0"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 15,
                color: "#1e293b",
                background:
                  "transparent",
              }}
            />

            <select
              value={unit}
              onChange={(e) =>
                setUnit(e.target.value)
              }
              style={{
                border: "none",
                outline: "none",
                fontSize: 14,
                fontWeight: 700,
                color: BLUE,
                background:
                  "transparent",
                cursor: "pointer",
              }}
            >
              <option value="kg">
                kg
              </option>
              <option value="lb">
                lb
              </option>
            </select>
          </div>
        </Field>

        <Field label="Notes">
          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="Write some notes ..."
            rows={5}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 15,
              color: "#1e293b",
              background:
                "transparent",
              resize: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </Field>

        {error && (
          <div
            style={{
              color: "#c0392b",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "15px 0",
            borderRadius: 12,
            border: "none",
            background:
              `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})`,
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow:
              `0 6px 16px ${BLUE}55`,
          }}
        >
          {record
            ? "Update Weight"
            : "Save Weight"}
        </button>
      </div>
    </Page>
  );
}

/* =========================================================
   MILK / WEIGHT RECORDS
========================================================= */

function WeightLogList({
  logs,
  onAdd,
  onOpen,
  onDelete,
  onBack,
}) {
  const [menuOpenId, setMenuOpenId] =
    useState(null);

  return (
    <Page>
      {/* BACK GOES TO PARENT DASHBOARD */}
      <Header
        title="Milk Records"
        onBack={onBack}
      />

      <div
        style={{
          height: 4,
          background:
            "linear-gradient(90deg, #ffb648, #ff8a3d)",
        }}
      />

      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding:
            "24px 20px 120px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {logs.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#5b6b85",
              padding: "60px 0",
              fontSize: 14,
            }}
          >
            No weight records yet.
            Tap "Add" to log one.
          </div>
        )}

        {logs
          .slice()
          .sort(
            (a, b) =>
              new Date(b.date) -
              new Date(a.date)
          )
          .map((l) => (
            <div
              key={l.id}
              onClick={() =>
                onOpen(l)
              }
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: 16,
                display: "flex",
                alignItems: "center",
                gap: 14,
                boxShadow:
                  "0 2px 8px rgba(20,30,60,0.06)",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background:
                    BLUE_LIGHT,
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  flexShrink: 0,
                }}
              >
                <Scale
                  size={24}
                  color={BLUE}
                />
              </div>

              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#12295c",
                  }}
                >
                  {l.goatName || l.animal || "Unknown goat"}
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: "#5b6b85",
                  }}
                >
                  {l.type}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "#8492ac",
                  }}
                >
                  {l.date}
                </div>
              </div>

              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: BLUE,
                  whiteSpace:
                    "nowrap",
                }}
              >
                {l.value}{" "}
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8492ac",
                  }}
                >
                  {l.unit}
                </span>
              </div>

              <div
                style={{
                  position:
                    "relative",
                }}
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                <MoreVertical
                  size={18}
                  color="#5b6b85"
                  style={{
                    cursor:
                      "pointer",
                  }}
                  onClick={() =>
                    setMenuOpenId(
                      menuOpenId ===
                        l.id
                        ? null
                        : l.id
                    )
                  }
                />

                {menuOpenId === l.id && (
                  <div
                    style={{
                      position:
                        "absolute",
                      right: 0,
                      top: 24,
                      background:
                        "#fff",
                      borderRadius: 8,
                      boxShadow:
                        "0 8px 24px rgba(20,30,60,0.18)",
                      zIndex: 100,
                      minWidth: 110,
                    }}
                  >
                    <div
                      onClick={() => {
                        onDelete(l.id);
                        setMenuOpenId(
                          null
                        );
                      }}
                      style={{
                        padding:
                          "10px 14px",
                        fontSize: 14,
                        cursor:
                          "pointer",
                        color:
                          "#c0392b",
                      }}
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={onAdd}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background:
            `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})`,
          color: "#fff",
          border: "none",
          borderRadius: 28,
          padding: "14px 22px",
          fontSize: 15,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow:
            `0 6px 16px ${BLUE}66`,
          cursor: "pointer",
          zIndex: 30,
        }}
      >
        <Plus size={18} />
        Add
      </button>
    </Page>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

const TENANT_STORAGE_KEYS = [
  "tenant",
  "currentTenant",
  "tenantData",
];

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function getStoredTenant() {
  for (const key of TENANT_STORAGE_KEYS) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;

    const parsed = safeParse(raw);

    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  }

  return null;
}

function normalizeGoat(goat) {
  if (!goat || typeof goat !== "object") return null;

  const id =
    goat.id ??
    goat._id ??
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

  if (!id && !name && !tagNumber) return null;

  return {
    ...goat,
    id: id || `goat-${Date.now()}-${Math.random()}`,
    name: name || `Goat #${tagNumber || "Unknown"}`,
    breed: breed || "Unknown breed",
    tagNumber: tagNumber || "",
  };
}

function getRealGoats() {
  const tenant = getStoredTenant();

  const list =
    Array.isArray(tenant?.data?.goats)
      ? tenant.data.goats
      : Array.isArray(tenant?.goats)
      ? tenant.goats
      : [];

  return list
    .map(normalizeGoat)
    .filter(Boolean);
}

export default function WeightlogPage({
  onBack,
}) {
  const [screen, setScreen] =
    useState("list");

  const [logs, setLogs] =
    useState(initialLogs);

  const [activeRecord, setActiveRecord] =
    useState(null);

  const [goats, setGoats] =
    useState(() => getRealGoats());

  useEffect(() => {
    const refreshGoats = () => {
      setGoats(getRealGoats());
    };

    window.addEventListener(
      "tenant-data-updated",
      refreshGoats
    );

    window.addEventListener(
      "storage",
      refreshGoats
    );

    const interval = setInterval(
      refreshGoats,
      1000
    );

    return () => {
      window.removeEventListener(
        "tenant-data-updated",
        refreshGoats
      );

      window.removeEventListener(
        "storage",
        refreshGoats
      );

      clearInterval(interval);
    };
  }, []);

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = (entry) => {
    setLogs((prev) => {
      const exists = prev.some(
        (item) =>
          item.id === entry.id
      );

      if (exists) {
        return prev.map((item) =>
          item.id === entry.id
            ? entry
            : item
        );
      }

      return [
        entry,
        ...prev,
      ];
    });

    setActiveRecord(null);
    setScreen("list");
  };

  /* =======================================================
     OPEN RECORD
  ======================================================= */

  const openRecord = (record) => {
    setActiveRecord(record);
    setScreen("form");
  };

  /* =======================================================
     ADD NEW
  ======================================================= */

  const openNew = () => {
    setActiveRecord(null);
    setScreen("form");
  };

  /* =======================================================
     BACK FROM FORM
     Form -> Milk Records
  ======================================================= */

  const handleFormBack = () => {
    setActiveRecord(null);
    setScreen("list");
  };

  /* =======================================================
     BACK FROM MILK RECORDS
     Milk Records -> ORIGINAL DASHBOARD
  ======================================================= */

  const handleRecordsBack = () => {
    /*
      If parent dashboard is controlling this page,
      call parent's onBack().
      
      Otherwise simply stay safe.
    */

    if (typeof onBack === "function") {
      onBack();
    }
  };

  /* =======================================================
     SCREEN
  ======================================================= */

  if (screen === "form") {
    return (
      <NewWeightForm
        onBack={handleFormBack}
        onSave={handleSave}
        goats={goats}
        record={activeRecord}
      />
    );
  }

  return (
    <WeightLogList
      logs={logs}
      onAdd={openNew}
      onOpen={openRecord}
      onDelete={(id) =>
        setLogs((prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
        )
      }
      onBack={handleRecordsBack}
    />
  );
}