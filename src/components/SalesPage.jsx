import React, { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";

const BLUE = "#1d5fd6";
const DARK = "#123a8a";
const LIGHT = "#eaf1fd";

const TRANSACTIONS_KEY = "goatTransactions";

const TENANT_STORAGE_KEYS = [
  "tenant",
  "currentTenant",
  "tenantData",
];

const METHODS = ["Cash", "UPI", "Bank Transfer"];
const STATUS = ["Paid", "Pending", "Partial"];

const money = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN")}`;

const page = {
  minHeight: "100vh",
  background: "#f4f7fd",
  fontFamily: "'Segoe UI',system-ui,sans-serif",
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
  background: `linear-gradient(135deg,${BLUE},${DARK})`,
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
  height: 44,
  boxSizing: "border-box",
  border: "1px solid #dfe5ef",
  borderRadius: 10,
  padding: "0 13px",
  display: "flex",
  alignItems: "center",
  gap: 8,
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

const tag = {
  fontSize: 11,
  fontWeight: 700,
  color: "#71809a",
  background: "#f1f4f8",
  padding: "3px 7px",
  borderRadius: 5,
};

/* =========================================================
   ACTUAL GOATS
========================================================= */

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

function readGoats() {
  const tenant = getStoredTenant();

  const rawGoats =
    Array.isArray(tenant?.data?.goats)
      ? tenant.data.goats
      : [];

  return rawGoats
    .filter((goat) => !goat.archived)
    .map((goat) => ({
      ...goat,
      id:
        goat.id ??
        goat._id ??
        goat.tagNumber ??
        goat.tag ??
        `goat-${Date.now()}-${Math.random()}`,
      name:
        goat.name ||
        goat.goatName ||
        "Unnamed Goat",
      tag:
        goat.tagNumber ||
        goat.tag ||
        goat.tagNo ||
        "",
      breed:
        goat.breed ||
        "Unknown breed",
    }))
    .filter((goat) => goat.id || goat.name);
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
          background: `linear-gradient(135deg,${DARK},${BLUE})`,
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
            cursor: onBack ? "pointer" : "default",
          }}
        >
          {onBack && <ArrowLeft size={22} />}
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
   SUMMARY
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

      <small style={{ color: "#8492ac" }}>
        {subtitle}
      </small>
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function SelectField({
  title,
  value,
  onChange,
  options,
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={label}>{title}</label>

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
          const value =
            option.value ?? option;
          const text =
            option.label ?? option;

          return (
            <option key={value} value={value}>
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
========================================================= */

function GoatSelector({ goats, value, onChange }) {
  const [search, setSearch] = useState("");

  const selectedGoat =
    goats.find(
      (g) => String(g.id) === String(value)
    ) || null;

  const filteredGoats = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return goats;

    return goats.filter((goat) =>
      [
        goat.name,
        goat.breed,
        goat.tag,
        goat.id,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [goats, search]);

  if (selectedGoat) {
    return (
      <div style={{ marginBottom: 18 }}>
        <label style={label}>Select Goat *</label>

        <div
          style={{
            border: "1px solid #BBD0F7",
            background: LIGHT,
            borderRadius: 12,
            padding: 11,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: "#fff",
              display: "grid",
              placeItems: "center",
              fontSize: 21,
            }}
          >
            🐐
          </div>

          <div style={{ flex: 1 }}>
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
                marginTop: 3,
                color: "#65748c",
                fontSize: 12,
              }}
            >
              {selectedGoat.breed}
              {selectedGoat.tag
                ? ` • Tag #${selectedGoat.tag}`
                : ""}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onChange("")}
            style={{
              border: 0,
              background: "#fff",
              width: 34,
              height: 34,
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
              color: "#64748B",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 18 }}>
      <label style={label}>Select Goat *</label>

      <div
        style={{
          border: "1px solid #dfe5ef",
          borderRadius: 12,
          background: "#fff",
          padding: 10,
        }}
      >
        <div
          style={{
            ...fieldWrap,
            height: 42,
            marginBottom: 10,
          }}
        >
          <Search size={17} color="#8492ac" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search goat, breed or tag..."
            style={{
              border: 0,
              outline: 0,
              flex: 1,
              minWidth: 0,
              fontSize: 13,
              background: "transparent",
            }}
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
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

        <div
          style={{
            maxHeight: 190,
            overflowY: "auto",
          }}
        >
          {filteredGoats.length ? (
            filteredGoats.map((goat) => (
              <button
                key={goat.id}
                type="button"
                onClick={() => {
                  onChange(goat.id);
                  setSearch("");
                }}
                style={{
                  width: "100%",
                  border: "1px solid #e1e7f0",
                  background: "#fff",
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: 7,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: LIGHT,
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
                      fontSize: 14,
                    }}
                  >
                    {goat.name}
                  </div>

                  <div
                    style={{
                      marginTop: 3,
                      color: "#65748c",
                      fontSize: 12,
                    }}
                  >
                    {goat.breed}
                    {goat.tag
                      ? ` • Tag #${goat.tag}`
                      : ""}
                  </div>
                </div>

                <span
                  style={{
                    color: "#94A3B8",
                    fontSize: 20,
                  }}
                >
                  ›
                </span>
              </button>
            ))
          ) : (
            <div
              style={{
                minHeight: 100,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "#64748B",
                gap: 5,
              }}
            >
              <span style={{ fontSize: 25 }}>🐐</span>

              <strong style={{ fontSize: 13 }}>
                {search
                  ? "No goats found"
                  : "No goats created yet"}
              </strong>

              <span style={{ fontSize: 11 }}>
                {search
                  ? "Try another name, breed or tag."
                  : "Add a goat first from the Goats page."}
              </span>
            </div>
          )}
        </div>
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
}) {
  const [form, setForm] = useState({
    type: item?.type || "Purchase",
    goatId:
      item?.goatId ||
      goats[0]?.id ||
      "",
    date:
      item?.date ||
      new Date()
        .toISOString()
        .split("T")[0],
    amount: item?.amount || "",
    person: item?.person || "",
    status: item?.status || "Paid",
    method: item?.method || "Cash",
    notes: item?.notes || "",
  });

  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const goat =
    goats.find(
      (g) =>
        String(g.id) ===
        String(form.goatId)
    ) || goats[0];

  const save = () => {
    if (!goat) {
      setError(
        "No goats found. Please create a goat first."
      );
      return;
    }

    if (
      !form.goatId ||
      !form.date ||
      !form.amount ||
      !form.person
    ) {
      setError(
        "Please fill goat, date, amount and buyer/seller."
      );
      return;
    }

    const amount = Number(form.amount);

    if (amount <= 0) {
      setError("Enter a valid amount.");
      return;
    }

    onSave({
      ...form,
      id: item?.id || Date.now(),
      goatId: goat.id,
      goat: goat.name,
      goatName: goat.name,
      tag: goat.tag,
      goatTagNumber: goat.tag,
      breed: goat.breed,
      amount,
    });
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
        <div
          style={{
            padding: "20px 22px",
            borderBottom:
              "1px solid #edf1f7",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
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
                ? "Edit Transaction"
                : "New Transaction"}
            </h2>

            <p
              style={{
                margin: "4px 0 0",
                color: "#8492ac",
                fontSize: 13,
              }}
            >
              Record goat purchase or sale
            </p>
          </div>

          <button
            onClick={onClose}
            style={iconButton}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: 22 }}>
          <label style={label}>
            Transaction Type
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: 10,
              marginBottom: 18,
            }}
          >
            {["Purchase", "Sale"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() =>
                    update("type", type)
                  }
                  style={{
                    padding: 13,
                    borderRadius: 10,
                    border:
                      form.type === type
                        ? `1.5px solid ${BLUE}`
                        : "1px solid #dfe5ef",
                    background:
                      form.type === type
                        ? LIGHT
                        : "#fff",
                    color:
                      form.type === type
                        ? DARK
                        : "#65748c",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {type}
                </button>
              )
            )}
          </div>

          <GoatSelector
            goats={goats}
            value={form.goatId}
            onChange={(value) =>
              update("goatId", value)
            }
          />

          <label style={label}>
            Transaction Date
          </label>

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              update("date", e.target.value)
            }
            style={{
              ...input,
              marginBottom: 18,
            }}
          />

          <label style={label}>
            Amount
          </label>

          <div
            style={{
              ...fieldWrap,
              marginBottom: 18,
            }}
          >
            <b style={{ color: "#71809a" }}>
              ₹
            </b>

            <input
              type="number"
              min="0"
              value={form.amount}
              onChange={(e) =>
                update(
                  "amount",
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

          <label style={label}>
            {form.type === "Sale"
              ? "Buyer Name"
              : "Seller Name"}
          </label>

          <input
            value={form.person}
            onChange={(e) =>
              update(
                "person",
                e.target.value
              )
            }
            placeholder={
              form.type === "Sale"
                ? "Enter buyer name"
                : "Enter seller name"
            }
            style={{
              ...input,
              marginBottom: 18,
            }}
          />

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
              value={form.status}
              onChange={(v) =>
                update("status", v)
              }
              options={STATUS}
            />

            <SelectField
              title="Payment Method"
              value={form.method}
              onChange={(v) =>
                update("method", v)
              }
              options={METHODS}
            />
          </div>

          <label style={label}>
            Notes
          </label>

          <textarea
            value={form.notes}
            onChange={(e) =>
              update(
                "notes",
                e.target.value
              )
            }
            placeholder="Add transaction notes..."
            rows={4}
            style={{
              ...input,
              height: "auto",
              padding: 12,
              resize: "none",
              marginBottom: 18,
              fontFamily: "inherit",
            }}
          />

          {error && (
            <div
              style={{
                color: "#c0392b",
                background: "#fff3f1",
                padding: 10,
                borderRadius: 8,
                fontSize: 13,
                marginBottom: 14,
              }}
            >
              {error}
            </div>
          )}

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
              style={cancelButton}
            >
              Cancel
            </button>

            <button
              onClick={save}
              disabled={!goats.length}
              style={{
                ...button,
                opacity: goats.length
                  ? 1
                  : 0.5,
              }}
            >
              <Check size={17} />

              {item
                ? "Update"
                : "Save Transaction"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CARD
========================================================= */

function TransactionCard({
  item,
  onEdit,
  onDelete,
}) {
  const [open, setOpen] = useState(false);
  const sale = item.type === "Sale";

  return (
    <div
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
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 13,
          background: sale
            ? "#fff3e8"
            : LIGHT,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        {sale ? (
          <TrendingUp
            size={24}
            color="#e87524"
          />
        ) : (
          <ShoppingCart
            size={24}
            color={BLUE}
          />
        )}
      </div>

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
          <b>{item.goatName || item.goat}</b>

          <span style={tag}>
            #{item.goatTagNumber || item.tag}
          </span>
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#65748c",
            marginTop: 4,
          }}
        >
          {item.type} • {item.breed}
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#8b98ac",
            marginTop: 4,
          }}
        >
          {item.date} • {item.person}
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontSize: 17,
            fontWeight: 750,
            color: sale
              ? "#16824b"
              : "#c85d1d",
          }}
        >
          {sale ? "+" : "-"}
          {money(item.amount)}
        </div>

        <div
          style={{
            fontSize: 11,
            marginTop: 4,
            fontWeight: 700,
            color:
              item.status === "Paid"
                ? "#16824b"
                : item.status === "Partial"
                ? "#c77700"
                : "#c0392b",
          }}
        >
          {item.status}
        </div>
      </div>

      <div
        style={{
          position: "relative",
        }}
      >
        <button
          onClick={() =>
            setOpen((v) => !v)
          }
          style={iconButton}
        >
          <MoreVertical size={18} />
        </button>

        {open && (
          <div
            style={{
              position: "absolute",
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
              icon={<Pencil size={15} />}
              text="Edit"
              onClick={() => {
                setOpen(false);
                onEdit(item);
              }}
            />

            <Menu
              icon={<Trash2 size={15} />}
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
        padding: "11px 13px",
        display: "flex",
        gap: 8,
        alignItems: "center",
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
   PAGE
========================================================= */

export default function TransactionsPage({
  onBack,
}) {
  const [goats, setGoats] = useState([]);
  const [transactions, setTransactions] =
    useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem(
            TRANSACTIONS_KEY
          ) || "[]"
        );
      } catch {
        return [];
      }
    });

  const [filter, setFilter] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [modal, setModal] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  /* LOAD ACTUAL GOATS */

  useEffect(() => {
    const load = () => {
      setGoats(readGoats());
    };

    load();

    window.addEventListener(
      "storage",
      load
    );

    window.addEventListener(
      "tenant-data-updated",
      load
    );

    const timer = setInterval(
      load,
      1000
    );

    return () => {
      window.removeEventListener(
        "storage",
        load
      );

      window.removeEventListener(
        "tenant-data-updated",
        load
      );

      clearInterval(timer);
    };
  }, []);

  /* SAVE TRANSACTIONS */

  useEffect(() => {
    localStorage.setItem(
      TRANSACTIONS_KEY,
      JSON.stringify(transactions)
    );
  }, [transactions]);

  /* FILTER */

  const filtered = useMemo(() => {
    const q =
      search.trim().toLowerCase();

    return transactions.filter(
      (item) => {
        const type =
          filter === "All" ||
          item.type === filter;

        const match =
          !q ||
          item.goat
            ?.toLowerCase()
            .includes(q) ||
          String(item.tag || "")
            .toLowerCase()
            .includes(q) ||
          item.person
            ?.toLowerCase()
            .includes(q);

        return type && match;
      }
    );
  }, [
    transactions,
    filter,
    search,
  ]);

  /* TOTALS */

  const purchases =
    transactions
      .filter(
        (x) =>
          x.type === "Purchase"
      )
      .reduce(
        (sum, x) =>
          sum +
          Number(x.amount || 0),
        0
      );

  const sales =
    transactions
      .filter(
        (x) => x.type === "Sale"
      )
      .reduce(
        (sum, x) =>
          sum +
          Number(x.amount || 0),
        0
      );

  /* SAVE */

  const saveTransaction = (entry) => {
    setTransactions((prev) =>
      prev.some(
        (x) => x.id === entry.id
      )
        ? prev.map((x) =>
            x.id === entry.id
              ? entry
              : x
          )
        : [entry, ...prev]
    );

    setModal(false);
    setEditing(null);
  };

  /* DELETE */

  const deleteTransaction = (
    id
  ) => {
    if (
      !window.confirm(
        "Delete this transaction?"
      )
    ) {
      return;
    }

    setTransactions((prev) =>
      prev.filter(
        (x) => x.id !== id
      )
    );
  };

  const openNew = () => {
    setEditing(null);
    setModal(true);
  };

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
            Transactions
          </h1>

          <p
            style={{
              margin:
                "7px 0 0",
              color: "#71809a",
              fontSize: 14,
            }}
          >
            Manage goat purchases,
            sales and payments.
          </p>
        </div>

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
              <ShoppingCart
                size={22}
                color={BLUE}
              />
            }
            title="Total Purchases"
            value={purchases}
            subtitle="Money spent on goats"
          />

          <Summary
            icon={
              <TrendingUp
                size={22}
                color="#e87524"
              />
            }
            title="Total Sales"
            value={sales}
            subtitle="Money received from sales"
          />

          <Summary
            icon={
              <Wallet
                size={22}
                color="#16824b"
              />
            }
            title="Net Balance"
            value={
              sales - purchases
            }
            subtitle={
              sales >= purchases
                ? "Positive balance"
                : "More spent than earned"
            }
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
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              flexWrap: "wrap",
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
                Transaction History
              </h2>

              <small
                style={{
                  color: "#8492ac",
                }}
              >
                {filtered.length}{" "}
                records found
              </small>
            </div>

            <button
              onClick={openNew}
              style={button}
            >
              <Plus size={17} />
              Add Transaction
            </button>
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
              placeholder="Search goat, tag or buyer/seller..."
              style={{
                border: 0,
                outline: 0,
                background:
                  "transparent",
                flex: 1,
                fontSize: 14,
              }}
            />
          </div>

          {/* FILTER */}

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            {[
              "All",
              "Purchase",
              "Sale",
            ].map((item) => (
              <button
                key={item}
                onClick={() =>
                  setFilter(item)
                }
                style={{
                  padding:
                    "8px 14px",
                  borderRadius: 9,
                  border:
                    filter === item
                      ? `1px solid ${BLUE}`
                      : "1px solid #dfe5ef",
                  background:
                    filter === item
                      ? LIGHT
                      : "#fff",
                  color:
                    filter === item
                      ? DARK
                      : "#65748c",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor:
                    "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* LIST */}

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
                    key={item.id}
                    item={item}
                    onEdit={(x) => {
                      setEditing(x);
                      setModal(true);
                    }}
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
                No transactions
                found.
              </div>
            )}
          </div>
        </section>
      </main>

      {modal && (
        <TransactionModal
          item={editing}
          goats={goats}
          onClose={() => {
            setModal(false);
            setEditing(null);
          }}
          onSave={
            saveTransaction
          }
        />
      )}
    </div>
  );
}
