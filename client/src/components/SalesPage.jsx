import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  Plus,
  Search,
  MoreVertical,
  ShoppingCart,
  TrendingUp,
  Wallet,
  X,
  Check,
  Pencil,
  Trash2,
  RefreshCw,
} from "lucide-react";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const BLUE = "#1d5fd6";
const DARK = "#123a8a";
const LIGHT = "#eaf1fd";

const METHODS = [
  "Cash",
  "UPI",
  "Bank Transfer",
  "Other",
];

const STATUS = [
  "Paid",
  "Pending",
  "Partial",
];

/* =========================================================
   API REQUEST
========================================================= */

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE}${endpoint}`,
    {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    }
  );

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
        data?.message ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
}

/* =========================================================
   HELPERS
========================================================= */

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const page = {
  minHeight: "100vh",
  background: "#f4f7fd",
  fontFamily: "'Segoe UI', system-ui, sans-serif",
  color: "#12295c",
};

const input = {
  width: "100%",
  height: 44,
  boxSizing: "border-box",
  border: "1px solid #dfe5ef",
  borderRadius: 10,
  padding: "0 13px",
  outline: "none",
  background: "#fff",
  color: "#1e293b",
  fontSize: 14,
};

const button = {
  border: 0,
  borderRadius: 10,
  padding: "11px 16px",
  background: `linear-gradient(135deg, ${BLUE}, ${DARK})`,
  color: "#fff",
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  gap: 7,
  cursor: "pointer",
};

const label = {
  display: "block",
  marginBottom: 7,
  fontSize: 12,
  fontWeight: 700,
  color: "#687791",
};

const fieldWrap = {
  width: "100%",
  minHeight: 44,
  boxSizing: "border-box",
  border: "1px solid #dfe5ef",
  borderRadius: 10,
  padding: "0 13px",
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: "#fff",
};

const iconButton = {
  border: 0,
  background: "#f3f6fb",
  width: 36,
  height: 36,
  borderRadius: 9,
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  color: "#52627b",
};

const cancelButton = {
  padding: "11px 18px",
  borderRadius: 10,
  border: "1px solid #dfe5ef",
  background: "#fff",
  color: "#52627b",
  fontWeight: 700,
  cursor: "pointer",
};

/* =========================================================
   NORMALIZE GOAT
========================================================= */

function normalizeGoat(goat) {
  if (!goat) return null;

  const id = goat?._id ?? goat?.id ?? "";

  return {
    ...goat,

    id: String(id),

    name:
      goat?.name ||
      goat?.goatName ||
      "Unnamed Goat",

    tag:
      goat?.tagNumber ||
      goat?.tag ||
      goat?.tagNo ||
      "",

    breed:
      goat?.breed ||
      "Unknown breed",

    currentWeight: Number(
      goat?.currentWeight || 0
    ),
  };
}

/* =========================================================
   NORMALIZE SALE
========================================================= */

function normalizeSale(sale) {
  if (!sale) return null;

  const goat =
    sale?.goatId &&
    typeof sale.goatId === "object"
      ? sale.goatId
      : null;

  return {
    ...sale,

    id: String(
      sale?._id ??
        sale?.id ??
        ""
    ),

    goatId: String(
      goat?._id ??
        sale?.goatId ??
        ""
    ),

    goatName:
      sale?.goatName ||
      goat?.name ||
      "Unnamed Goat",

    goatTagNumber:
      sale?.goatTagNumber ||
      goat?.tagNumber ||
      goat?.tag ||
      "",

    breed:
      sale?.breed ||
      goat?.breed ||
      "Unknown breed",

    date:
      sale?.saleDate ||
      sale?.date ||
      "",

    person:
      sale?.buyerName ||
      sale?.person ||
      "",

    amount: Number(
      sale?.salePrice ??
        sale?.amount ??
        0
    ),

    status:
      sale?.paymentStatus ||
      sale?.status ||
      "Paid",

    method:
      sale?.paymentMethod ||
      sale?.method ||
      "Cash",

    weight: Number(
      sale?.weight || 0
    ),

    buyerPhone:
      sale?.buyerPhone || "",

    buyerAddress:
      sale?.buyerAddress || "",

    amountPaid: Number(
      sale?.amountPaid || 0
    ),

    notes:
      sale?.notes || "",
  };
}

/* =========================================================
   HEADER
========================================================= */

function Header({ onBack, onAdd }) {
  return (
    <>
      <header
        style={{
          minHeight: 70,
          padding: "0 24px",
          background:
            `linear-gradient(135deg, ${DARK}, ${BLUE})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#fff",
            fontSize: 21,
            fontWeight: 750,
            cursor: onBack
              ? "pointer"
              : "default",
          }}
        >
          {onBack && (
            <ArrowLeft size={22} />
          )}

          Transactions
        </div>

        <button
          onClick={onAdd}
          style={{
            ...button,
            background: "#fff",
            color: DARK,
          }}
        >
          <Plus size={17} />
          New
        </button>
      </header>

      <div
        style={{
          height: 4,
          background:
            "linear-gradient(90deg,#ffb648,#ff8a3d)",
        }}
      />
    </>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function Summary({
  icon,
  title,
  value,
  subtitle,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 20,
        boxShadow:
          "0 3px 14px rgba(20,30,60,.06)",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: LIGHT,
          display: "grid",
          placeItems: "center",
          marginBottom: 14,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontSize: 13,
          color: "#71809a",
        }}
      >
        {title}
      </div>

      <strong
        style={{
          display: "block",
          fontSize: 23,
          marginTop: 5,
        }}
      >
        {money(value)}
      </strong>

      <small
        style={{
          color: "#8492ac",
        }}
      >
        {subtitle}
      </small>
    </div>
  );
}

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  title,
  value,
  onChange,
  options,
}) {
  return (
    <div
      style={{
        marginBottom: 18,
      }}
    >
      <label style={label}>
        {title}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        style={{
          ...input,
          cursor: "pointer",
        }}
      >
        {options.map((option) => {
          const optionValue =
            option?.value ?? option;

          const text =
            option?.label ?? option;

          return (
            <option
              key={optionValue}
              value={optionValue}
            >
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
}

/* =========================================================
   GOAT SELECTOR
   SEARCH FIRST UX
========================================================= */

function GoatSelector({
  goats,
  value,
  onChange,
}) {
  const [search, setSearch] =
    useState("");

  const selectedGoat = goats.find(
    (goat) =>
      String(goat.id) ===
      String(value)
  );

  const filteredGoats = useMemo(() => {
    const q =
      search.trim().toLowerCase();

    if (!q) return [];

    return goats.filter((goat) => {
      const searchableText = [
        goat.name,
        goat.breed,
        goat.tag,
        goat.id,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(q);
    });
  }, [goats, search]);

  const hasSearch =
    search.trim().length > 0;

  /* =======================================================
     SELECTED GOAT
  ======================================================= */

  if (selectedGoat) {
    return (
      <div
        style={{
          marginBottom: 18,
        }}
      >
        <label style={label}>
          Select Goat *
        </label>

        <div
          style={{
            border:
              "1px solid #BBD0F7",
            background: LIGHT,
            borderRadius: 14,
            padding: 12,
            display: "flex",
            alignItems: "center",
            gap: 11,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 11,
              background: "#fff",
              display: "grid",
              placeItems: "center",
              fontSize: 22,
              flexShrink: 0,
              boxShadow:
                "0 2px 8px rgba(29,95,214,.08)",
            }}
          >
            🐐
          </div>

          <div
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontWeight: 750,
                color: DARK,
                fontSize: 14,
              }}
            >
              {selectedGoat.name}
            </div>

            <div
              style={{
                marginTop: 4,
                color: "#65748c",
                fontSize: 12,
              }}
            >
              {selectedGoat.breed}

              {selectedGoat.tag
                ? ` • Tag #${selectedGoat.tag}`
                : ""}
            </div>

            {selectedGoat.currentWeight >
              0 && (
              <div
                style={{
                  marginTop: 3,
                  color: "#8492ac",
                  fontSize: 11,
                }}
              >
                Current weight:{" "}
                {
                  selectedGoat.currentWeight
                }{" "}
                kg
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              onChange("");
              setSearch("");
            }}
            style={{
              border: 0,
              background: "#fff",
              width: 34,
              height: 34,
              borderRadius: 9,
              display: "grid",
              placeItems: "center",
              color: "#64748B",
              cursor: "pointer",
              flexShrink: 0,
            }}
            title="Change goat"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     SEARCH UI
  ======================================================= */

  return (
    <div
      style={{
        marginBottom: 18,
      }}
    >
      <label style={label}>
        Select Goat *
      </label>

      <div
        style={{
          border:
            "1px solid #dfe5ef",
          borderRadius: 14,
          background: "#fff",
          padding: 10,
          boxShadow: hasSearch
            ? "0 5px 18px rgba(20,30,60,.05)"
            : "none",
          transition:
            "all .2s ease",
        }}
      >
        {/* SEARCH INPUT */}

        <div
          style={{
            ...fieldWrap,
            height: 44,
            minHeight: 44,
            marginBottom: hasSearch
              ? 10
              : 0,
            border: hasSearch
              ? "1px solid #BBD0F7"
              : "1px solid #dfe5ef",
            boxShadow: hasSearch
              ? "0 0 0 3px rgba(29,95,214,.06)"
              : "none",
          }}
        >
          <Search
            size={17}
            color={
              hasSearch
                ? BLUE
                : "#8492ac"
            }
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search goat name, tag or breed..."
            style={{
              border: 0,
              outline: 0,
              flex: 1,
              minWidth: 0,
              fontSize: 13,
              background:
                "transparent",
              color: "#1e293b",
            }}
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                setSearch("")
              }
              style={{
                border: 0,
                background:
                  "transparent",
                color: "#64748B",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                padding: 2,
              }}
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* =================================================
            INITIAL EMPTY STATE
        ================================================= */}

        {!hasSearch && (
          <div
            style={{
              padding:
                "22px 10px 14px",
              textAlign: "center",
              color: "#8492ac",
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                margin:
                  "0 auto 10px",
                borderRadius: 13,
                background: LIGHT,
                display: "grid",
                placeItems: "center",
                fontSize: 22,
              }}
            >
              🐐
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#52627b",
              }}
            >
              Search for a goat
            </div>

            <div
              style={{
                marginTop: 4,
                fontSize: 11,
                color: "#94A3B8",
              }}
            >
              Type a goat name,
              tag number or breed
            </div>
          </div>
        )}

        {/* =================================================
            SEARCH RESULTS
        ================================================= */}

        {hasSearch && (
          <div
            style={{
              maxHeight: 210,
              overflowY: "auto",
              paddingRight: 2,
            }}
          >
            {filteredGoats.length ? (
              <>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#8492ac",
                    padding:
                      "2px 4px 8px",
                  }}
                >
                  {filteredGoats.length} goat
                  {filteredGoats.length !==
                  1
                    ? "s"
                    : ""}{" "}
                  found
                </div>

                {filteredGoats.map(
                  (goat) => (
                    <button
                      key={goat.id}
                      type="button"
                      onClick={() => {
                        onChange(
                          goat.id
                        );
                        setSearch("");
                      }}
                      style={{
                        width: "100%",
                        border:
                          "1px solid #e5eaf2",
                        background: "#fff",
                        borderRadius: 11,
                        padding: 10,
                        marginBottom: 7,
                        display: "flex",
                        alignItems:
                          "center",
                        gap: 10,
                        cursor: "pointer",
                        textAlign: "left",
                        transition:
                          "all .18s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "#f7faff";
                        e.currentTarget.style.borderColor =
                          "#BBD0F7";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "#fff";
                        e.currentTarget.style.borderColor =
                          "#e5eaf2";
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background:
                            LIGHT,
                          display:
                            "grid",
                          placeItems:
                            "center",
                          fontSize: 20,
                          flexShrink: 0,
                        }}
                      >
                        🐐
                      </div>

                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            color:
                              "#12295c",
                            fontSize: 13,
                          }}
                        >
                          {goat.name}
                        </div>

                        <div
                          style={{
                            marginTop: 3,
                            color:
                              "#65748c",
                            fontSize: 11,
                          }}
                        >
                          {goat.breed}

                          {goat.tag
                            ? ` • Tag #${goat.tag}`
                            : ""}
                        </div>

                        {goat.currentWeight >
                          0 && (
                          <div
                            style={{
                              marginTop: 2,
                              color:
                                "#94A3B8",
                              fontSize: 10,
                            }}
                          >
                            {
                              goat.currentWeight
                            }{" "}
                            kg
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background:
                            "#f3f6fb",
                          display:
                            "grid",
                          placeItems:
                            "center",
                          color:
                            "#64748B",
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                      >
                        ›
                      </div>
                    </button>
                  )
                )}
              </>
            ) : (
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
                  textAlign: "center",
                  color:
                    "#64748B",
                  gap: 5,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background:
                      "#f3f6fb",
                    display: "grid",
                    placeItems:
                      "center",
                    fontSize: 22,
                    marginBottom: 2,
                  }}
                >
                  🐐
                </div>

                <strong
                  style={{
                    fontSize: 13,
                    color:
                      "#52627b",
                  }}
                >
                  No goats found
                </strong>

                <span
                  style={{
                    fontSize: 11,
                    color:
                      "#94A3B8",
                  }}
                >
                  Try another goat
                  name, breed or
                  tag number.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   TRANSACTION MODAL
========================================================= */

function TransactionModal({
  item,
  goats,
  onClose,
  onSave,
  saving,
}) {
  const [form, setForm] =
    useState({
      goatId:
        item?.goatId || "",

      saleDate:
        item?.date ||
        new Date()
          .toISOString()
          .split("T")[0],

      salePrice:
        item?.amount ?? "",

      buyerName:
        item?.person || "",

      buyerPhone:
        item?.buyerPhone || "",

      buyerAddress:
        item?.buyerAddress || "",

      paymentStatus:
        item?.status || "Paid",

      paymentMethod:
        item?.method || "Cash",

      amountPaid:
        item?.amountPaid ?? "",

      weight:
        item?.weight ?? "",

      notes:
        item?.notes || "",
    });

  const [error, setError] =
    useState("");

  const update = (
    key,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setError("");
  };

  const selectedGoat =
    goats.find(
      (goat) =>
        String(goat.id) ===
        String(form.goatId)
    ) || null;

  const save = async () => {
    if (!form.goatId) {
      setError(
        "Please select a goat."
      );
      return;
    }

    if (!selectedGoat) {
      setError(
        "Selected goat was not found."
      );
      return;
    }

    if (!form.saleDate) {
      setError(
        "Please select sale date."
      );
      return;
    }

    if (
      form.salePrice === "" ||
      Number(form.salePrice) <= 0
    ) {
      setError(
        "Please enter a valid sale price."
      );
      return;
    }

    if (
      !form.buyerName.trim()
    ) {
      setError(
        "Please enter buyer name."
      );
      return;
    }

    const salePrice =
      Number(form.salePrice);

    const weight =
      form.weight === ""
        ? Number(
            selectedGoat.currentWeight ||
              0
          )
        : Number(form.weight);

    let amountPaid =
      form.amountPaid === ""
        ? form.paymentStatus ===
          "Paid"
          ? salePrice
          : 0
        : Number(
            form.amountPaid
          );

    if (
      !Number.isFinite(
        salePrice
      ) ||
      salePrice <= 0
    ) {
      setError(
        "Invalid sale price."
      );
      return;
    }

    if (
      !Number.isFinite(weight) ||
      weight < 0
    ) {
      setError(
        "Invalid weight."
      );
      return;
    }

    if (
      !Number.isFinite(
        amountPaid
      ) ||
      amountPaid < 0
    ) {
      setError(
        "Invalid amount paid."
      );
      return;
    }

    if (
      amountPaid > salePrice
    ) {
      setError(
        "Amount paid cannot be greater than sale price."
      );
      return;
    }

    let paymentStatus;

    if (amountPaid === salePrice) {
      paymentStatus = "Paid";
    } else if (amountPaid === 0) {
      paymentStatus = "Pending";
    } else {
      paymentStatus = "Partial";
    }

    const payload = {
      goatId:
        selectedGoat.id,

      saleDate:
        form.saleDate,

      buyerName:
        form.buyerName.trim(),

      buyerPhone:
        form.buyerPhone.trim(),

      buyerAddress:
        form.buyerAddress.trim(),

      weight,

      salePrice,

      paymentStatus,

      paymentMethod:
        form.paymentMethod,

      amountPaid,

      notes:
        form.notes.trim(),
    };

    try {
      await onSave(
        payload,
        item
      );
    } catch (err) {
      setError(
        err.message ||
          "Failed to save sale."
      );
    }
  };

  return (
    <div
      onMouseDown={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        padding: 20,
        background:
          "rgba(9,25,55,.48)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        onMouseDown={(e) =>
          e.stopPropagation()
        }
        style={{
          width: "100%",
          maxWidth: 600,
          maxHeight: "92vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 20,
        }}
      >
        {/* HEADER */}

        <div
          style={{
            padding:
              "20px 22px",
            borderBottom:
              "1px solid #edf1f7",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 20,
              }}
            >
              {item
                ? "Edit Sale"
                : "New Sale"}
            </h2>

            <p
              style={{
                margin:
                  "4px 0 0",
                color:
                  "#8492ac",
                fontSize: 13,
              }}
            >
              Record goat sale and
              payment
            </p>
          </div>

          <button
            onClick={onClose}
            style={iconButton}
          >
            <X size={18} />
          </button>
        </div>

        <div
          style={{
            padding: 22,
          }}
        >
          {/* GOAT */}

          <GoatSelector
            goats={goats}
            value={form.goatId}
            onChange={(value) =>
              update(
                "goatId",
                value
              )
            }
          />

          {/* SALE DATE */}

          <label style={label}>
            Sale Date *
          </label>

          <input
            type="date"
            value={
              form.saleDate
            }
            onChange={(e) =>
              update(
                "saleDate",
                e.target.value
              )
            }
            style={{
              ...input,
              marginBottom: 18,
            }}
          />

          {/* SALE PRICE */}

          <label style={label}>
            Sale Price *
          </label>

          <div
            style={{
              ...fieldWrap,
              marginBottom: 18,
            }}
          >
            <b
              style={{
                color:
                  "#71809a",
              }}
            >
              ₹
            </b>

            <input
              type="number"
              min="0"
              step="0.01"
              value={
                form.salePrice
              }
              onChange={(e) =>
                update(
                  "salePrice",
                  e.target.value
                )
              }
              placeholder="0.00"
              style={{
                border: 0,
                outline: 0,
                flex: 1,
                fontSize: 14,
              }}
            />
          </div>

          {/* BUYER NAME */}

          <label style={label}>
            Buyer Name *
          </label>

          <input
            value={
              form.buyerName
            }
            onChange={(e) =>
              update(
                "buyerName",
                e.target.value
              )
            }
            placeholder="Enter buyer name"
            style={{
              ...input,
              marginBottom: 18,
            }}
          />

          {/* PHONE */}

          <label style={label}>
            Buyer Phone
          </label>

          <input
            type="tel"
            value={
              form.buyerPhone
            }
            onChange={(e) =>
              update(
                "buyerPhone",
                e.target.value
              )
            }
            placeholder="Enter buyer phone"
            style={{
              ...input,
              marginBottom: 18,
            }}
          />

          {/* ADDRESS */}

          <label style={label}>
            Buyer Address
          </label>

          <input
            value={
              form.buyerAddress
            }
            onChange={(e) =>
              update(
                "buyerAddress",
                e.target.value
              )
            }
            placeholder="Enter buyer address"
            style={{
              ...input,
              marginBottom: 18,
            }}
          />

          {/* WEIGHT */}

          <label style={label}>
            Weight at Sale
          </label>

          <div
            style={{
              ...fieldWrap,
              marginBottom: 18,
            }}
          >
            <input
              type="number"
              min="0"
              step="0.01"
              value={
                form.weight
              }
              onChange={(e) =>
                update(
                  "weight",
                  e.target.value
                )
              }
              placeholder={
                selectedGoat
                  ? String(
                      selectedGoat.currentWeight ||
                        0
                    )
                  : "0"
              }
              style={{
                border: 0,
                outline: 0,
                flex: 1,
                fontSize: 14,
              }}
            />

            <span
              style={{
                color:
                  "#71809a",
                fontSize: 13,
              }}
            >
              kg
            </span>
          </div>

          {/* PAYMENT */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: 14,
            }}
          >
            <SelectField
              title="Payment Status"
              value={
                form.paymentStatus
              }
              onChange={(value) =>
                update(
                  "paymentStatus",
                  value
                )
              }
              options={STATUS}
            />

            <SelectField
              title="Payment Method"
              value={
                form.paymentMethod
              }
              onChange={(value) =>
                update(
                  "paymentMethod",
                  value
                )
              }
              options={METHODS}
            />
          </div>

          {/* AMOUNT PAID */}

          <label style={label}>
            Amount Paid
          </label>

          <div
            style={{
              ...fieldWrap,
              marginBottom: 18,
            }}
          >
            <b
              style={{
                color:
                  "#71809a",
              }}
            >
              ₹
            </b>

            <input
              type="number"
              min="0"
              step="0.01"
              value={
                form.amountPaid
              }
              onChange={(e) =>
                update(
                  "amountPaid",
                  e.target.value
                )
              }
              placeholder="0.00"
              style={{
                border: 0,
                outline: 0,
                flex: 1,
                fontSize: 14,
              }}
            />
          </div>

          {/* NOTES */}

          <label style={label}>
            Notes
          </label>

          <textarea
            value={
              form.notes
            }
            onChange={(e) =>
              update(
                "notes",
                e.target.value
              )
            }
            placeholder="Add sale notes..."
            rows={4}
            style={{
              ...input,
              height: "auto",
              padding: 12,
              resize: "none",
              marginBottom: 18,
              fontFamily:
                "inherit",
            }}
          />

          {/* ERROR */}

          {error && (
            <div
              style={{
                color:
                  "#c0392b",
                background:
                  "#fff3f1",
                padding: 10,
                borderRadius: 8,
                fontSize: 13,
                marginBottom: 14,
              }}
            >
              {error}
            </div>
          )}

          {/* ACTIONS */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "flex-end",
              gap: 10,
            }}
          >
            <button
              onClick={onClose}
              disabled={saving}
              style={
                cancelButton
              }
            >
              Cancel
            </button>

            <button
              onClick={save}
              disabled={
                saving ||
                !goats.length
              }
              style={{
                ...button,
                opacity:
                  saving ||
                  !goats.length
                    ? 0.5
                    : 1,
              }}
            >
              <Check size={17} />

              {saving
                ? "Saving..."
                : item
                ? "Update Sale"
                : "Save Sale"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TRANSACTION CARD
========================================================= */

function TransactionCard({
  item,
  onEdit,
  onDelete,
}) {
  const [open, setOpen] =
    useState(false);

  const statusColor =
    item.status === "Paid"
      ? "#16824b"
      : item.status === "Partial"
      ? "#c77700"
      : "#c0392b";

  return (
    <div
      className="transaction-card"
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 16,
        boxShadow:
          "0 3px 12px rgba(20,30,60,.06)",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      {/* ICON */}

      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 13,
          background:
            "#fff3e8",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <TrendingUp
          size={24}
          color="#e87524"
        />
      </div>

      {/* DETAILS */}

      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <b>
            {item.goatName}
          </b>

          {item.goatTagNumber && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#71809a",
                background:
                  "#f1f4f8",
                padding:
                  "3px 7px",
                borderRadius: 5,
              }}
            >
              #{item.goatTagNumber}
            </span>
          )}
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#65748c",
            marginTop: 4,
          }}
        >
          Sale • {item.breed}
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#8b98ac",
            marginTop: 4,
          }}
        >
          {item.date || "-"}
          {" • "}
          {item.person ||
            "No buyer"}
        </div>

        {item.weight > 0 && (
          <div
            style={{
              fontSize: 11,
              color: "#8b98ac",
              marginTop: 3,
            }}
          >
            Weight:{" "}
            {item.weight} kg
            {" • "}
            {item.method}
          </div>
        )}
      </div>

      {/* AMOUNT */}

      <div
        style={{
          textAlign: "right",
          minWidth: 110,
        }}
      >
        <div
          style={{
            fontSize: 17,
            fontWeight: 750,
            color: "#16824b",
          }}
        >
          +{money(item.amount)}
        </div>

        <div
          style={{
            fontSize: 11,
            marginTop: 4,
            fontWeight: 700,
            color: statusColor,
          }}
        >
          {item.status}
        </div>

        <div
          style={{
            fontSize: 10,
            color: "#8b98ac",
            marginTop: 3,
          }}
        >
          Paid:{" "}
          {money(
            item.amountPaid
          )}
        </div>
      </div>

      {/* MENU */}

      <div
        style={{
          position: "relative",
        }}
      >
        <button
          onClick={() =>
            setOpen(
              (value) => !value
            )
          }
          style={iconButton}
        >
          <MoreVertical
            size={18}
          />
        </button>

        {open && (
          <div
            style={{
              position:
                "absolute",
              right: 0,
              top: 38,
              width: 130,
              background: "#fff",
              borderRadius: 10,
              boxShadow:
                "0 10px 28px rgba(20,30,60,.18)",
              overflow: "hidden",
              zIndex: 20,
            }}
          >
            <Menu
              icon={
                <Pencil
                  size={15}
                />
              }
              text="Edit"
              onClick={() => {
                setOpen(false);
                onEdit(item);
              }}
            />

            <Menu
              icon={
                <Trash2
                  size={15}
                />
              }
              text="Delete"
              danger
              onClick={() => {
                setOpen(false);
                onDelete(item.id);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   MENU
========================================================= */

function Menu({
  icon,
  text,
  danger,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        border: 0,
        background: "#fff",
        padding:
          "11px 13px",
        display: "flex",
        gap: 8,
        alignItems:
          "center",
        color: danger
          ? "#c0392b"
          : "#52627b",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {icon}
      {text}
    </button>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function TransactionsPage({
  onBack,
}) {
  const [goats, setGoats] =
    useState([]);

  const [
    transactions,
    setTransactions,
  ] = useState([]);

  const [filter, setFilter] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [modal, setModal] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =======================================================
     LOAD DATA FROM MONGODB
  ======================================================= */

  const loadData =
    useCallback(
      async () => {
        try {
          setError("");
          setLoading(true);

          const [
            goatsResponse,
            salesResponse,
          ] = await Promise.all([
            apiRequest("/goats"),
            apiRequest("/sales"),
          ]);

          const goatsArray =
            Array.isArray(
              goatsResponse
            )
              ? goatsResponse
              : Array.isArray(
                  goatsResponse?.goats
                )
              ? goatsResponse.goats
              : [];

          const salesArray =
            Array.isArray(
              salesResponse
            )
              ? salesResponse
              : Array.isArray(
                  salesResponse?.sales
                )
              ? salesResponse.sales
              : [];

          const normalizedGoats =
            goatsArray
              .map(
                normalizeGoat
              )
              .filter(
                (goat) =>
                  goat?.id
              );

          const normalizedSales =
            salesArray
              .map(
                normalizeSale
              )
              .filter(
                (sale) =>
                  sale?.id
              );

          setGoats(
            normalizedGoats
          );

          setTransactions(
            normalizedSales
          );
        } catch (err) {
          console.error(
            "LOAD TRANSACTIONS ERROR:",
            err
          );

          setError(
            err.message ||
              "Unable to load sales from MongoDB."
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    loadData();
  }, [loadData]);

  /* =======================================================
     SAVE SALE
  ======================================================= */

  const saveTransaction =
    async (
      payload,
      item
    ) => {
      try {
        setSaving(true);
        setError("");

        if (item?.id) {
          await apiRequest(
            `/sales/${item.id}`,
            {
              method: "PUT",
              body:
                JSON.stringify(
                  payload
                ),
            }
          );
        } else {
          await apiRequest(
            "/sales",
            {
              method: "POST",
              body:
                JSON.stringify(
                  payload
                ),
            }
          );
        }

        await loadData();

        setModal(false);
        setEditing(null);
      } catch (err) {
        console.error(
          "SAVE SALE ERROR:",
          err
        );

        throw err;
      } finally {
        setSaving(false);
      }
    };

  /* =======================================================
     DELETE SALE
  ======================================================= */

  const deleteTransaction =
    async (id) => {
      if (!id) return;

      const confirmed =
        window.confirm(
          "Delete this sale record permanently?"
        );

      if (!confirmed) return;

      try {
        setError("");

        await apiRequest(
          `/sales/${id}`,
          {
            method: "DELETE",
          }
        );

        await loadData();
      } catch (err) {
        console.error(
          "DELETE SALE ERROR:",
          err
        );

        setError(
          err.message ||
            "Failed to delete sale."
        );
      }
    };

  /* =======================================================
     FILTER + SEARCH
  ======================================================= */

  const filtered =
    useMemo(() => {
      const q =
        search
          .trim()
          .toLowerCase();

      return transactions.filter(
        (item) => {
          const matchesFilter =
            filter === "All" ||
            filter === "Sale";

          const matchesSearch =
            !q ||
            item.goatName
              ?.toLowerCase()
              .includes(q) ||
            String(
              item.goatTagNumber ||
                ""
            )
              .toLowerCase()
              .includes(q) ||
            item.person
              ?.toLowerCase()
              .includes(q) ||
            item.breed
              ?.toLowerCase()
              .includes(q) ||
            item.status
              ?.toLowerCase()
              .includes(q);

          return (
            matchesFilter &&
            matchesSearch
          );
        }
      );
    }, [
      transactions,
      filter,
      search,
    ]);

  /* =======================================================
     SUMMARY
  ======================================================= */

  const sales =
    transactions.reduce(
      (sum, item) =>
        sum +
        Number(
          item.amount || 0
        ),
      0
    );

  const totalPaid =
    transactions.reduce(
      (sum, item) =>
        sum +
        Number(
          item.amountPaid || 0
        ),
      0
    );

  const pending = Math.max(
    sales - totalPaid,
    0
  );

  /* =======================================================
     OPEN NEW
  ======================================================= */

  const openNew = () => {
    setEditing(null);
    setModal(true);
    setError("");
  };

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  const openEdit = (
    item
  ) => {
    setEditing(item);
    setModal(true);
    setError("");
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    if (saving) return;

    setModal(false);
    setEditing(null);
    setError("");
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div style={page}>
      <Header
        onBack={onBack}
        onAdd={openNew}
      />

      <main
        style={{
          maxWidth: 1100,
          margin: "auto",
          padding:
            "28px 24px 80px",
        }}
      >
        {/* TITLE */}

        <div
          style={{
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 28,
            }}
          >
            Sales
          </h1>

          <p
            style={{
              margin:
                "7px 0 0",
              color:
                "#71809a",
              fontSize: 14,
            }}
          >
            Manage real goat
            sales and payments
            stored in MongoDB.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div
            style={{
              marginBottom: 18,
              padding: 13,
              borderRadius: 10,
              background:
                "#fff3f1",
              color:
                "#c0392b",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}

        {/* SUMMARY */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(210px,1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <Summary
            icon={
              <TrendingUp
                size={22}
                color="#e87524"
              />
            }
            title="Total Sales"
            value={sales}
            subtitle="Total sale value"
          />

          <Summary
            icon={
              <Wallet
                size={22}
                color="#16824b"
              />
            }
            title="Amount Received"
            value={totalPaid}
            subtitle="Payments received"
          />

          <Summary
            icon={
              <ShoppingCart
                size={22}
                color={BLUE}
              />
            }
            title="Pending Amount"
            value={pending}
            subtitle="Amount remaining"
          />
        </div>

        {/* HISTORY */}

        <section
          style={{
            background: "#fff",
            borderRadius: 18,
            padding: 20,
            boxShadow:
              "0 4px 18px rgba(20,30,60,.06)",
          }}
        >
          {/* SECTION HEADER */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              flexWrap:
                "wrap",
              gap: 14,
              marginBottom: 18,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 18,
                }}
              >
                Sale History
              </h2>

              <small
                style={{
                  color:
                    "#8492ac",
                }}
              >
                {filtered.length}{" "}
                records found
              </small>
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
              }}
            >
              <button
                onClick={
                  loadData
                }
                disabled={loading}
                style={{
                  ...iconButton,
                  opacity:
                    loading
                      ? 0.5
                      : 1,
                }}
                title="Refresh"
              >
                <RefreshCw
                  size={17}
                />
              </button>

              <button
                onClick={
                  openNew
                }
                style={button}
              >
                <Plus
                  size={17}
                />
                Add Sale
              </button>
            </div>
          </div>

          {/* SEARCH */}

          <div
            style={{
              ...fieldWrap,
              marginBottom: 12,
            }}
          >
            <Search
              size={18}
              color="#8492ac"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search goat, tag, buyer, breed or status..."
              style={{
                border: 0,
                outline: 0,
                background:
                  "transparent",
                flex: 1,
                fontSize: 14,
              }}
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                style={{
                  border: 0,
                  background:
                    "transparent",
                  cursor:
                    "pointer",
                  color:
                    "#64748B",
                }}
              >
                <X
                  size={16}
                />
              </button>
            )}
          </div>

          {/* FILTER */}

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap:
                "wrap",
              marginBottom: 18,
            }}
          >
            {[
              "All",
              "Sale",
            ].map(
              (filterName) => (
                <button
                  key={
                    filterName
                  }
                  onClick={() =>
                    setFilter(
                      filterName
                    )
                  }
                  style={{
                    padding:
                      "8px 14px",
                    borderRadius: 9,
                    border:
                      filter ===
                      filterName
                        ? `1px solid ${BLUE}`
                        : "1px solid #dfe5ef",
                    background:
                      filter ===
                      filterName
                        ? LIGHT
                        : "#fff",
                    color:
                      filter ===
                      filterName
                        ? DARK
                        : "#65748c",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor:
                      "pointer",
                  }}
                >
                  {filterName ===
                  "Sale"
                    ? "Sales"
                    : "All"}
                </button>
              )
            )}
          </div>

          {/* LOADING */}

          {loading ? (
            <div
              style={{
                padding: 50,
                textAlign:
                  "center",
                color:
                  "#71809a",
              }}
            >
              <RefreshCw
                size={24}
                style={{
                  animation:
                    "spin 1s linear infinite",
                  marginBottom: 10,
                }}
              />

              <div>
                Loading real
                sales from
                MongoDB...
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection:
                  "column",
                gap: 12,
              }}
            >
              {filtered.length ? (
                filtered.map(
                  (item) => (
                    <TransactionCard
                      key={
                        item.id
                      }
                      item={item}
                      onEdit={
                        openEdit
                      }
                      onDelete={
                        deleteTransaction
                      }
                    />
                  )
                )
              ) : (
                <div
                  style={{
                    padding: 50,
                    textAlign:
                      "center",
                    color:
                      "#71809a",
                  }}
                >
                  <div
                    style={{
                      fontSize: 36,
                      marginBottom: 8,
                    }}
                  >
                    🐐
                  </div>

                  <strong>
                    No sales found
                  </strong>

                  <div
                    style={{
                      marginTop: 5,
                      fontSize: 13,
                    }}
                  >
                    No demo data is
                    being used.
                    Create a real
                    sale to see it
                    here.
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* MODAL */}

      {modal && (
        <TransactionModal
          item={editing}
          goats={goats}
          saving={saving}
          onClose={
            closeModal
          }
          onSave={
            saveTransaction
          }
        />
      )}

      {/* RESPONSIVE + SPINNER */}

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 700px) {
            main {
              padding-left: 14px !important;
              padding-right: 14px !important;
            }

            header {
              padding-left: 14px !important;
              padding-right: 14px !important;
            }
          }

          @media (max-width: 560px) {
            .transaction-card {
              flex-wrap: wrap;
            }
          }
        `}
      </style>
    </div>
  );
}