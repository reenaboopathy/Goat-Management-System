import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  Play,
  MoreVertical,
  ChevronDown,
  X,
  CalendarDays,
  Pencil,
  Trash2,
  Check,
  ChevronRight,
} from "lucide-react";
import SelectModal from "../components/SelectModel.jsx";

const BREEDING_TYPES = [
  "All Breeding Types",
  "Natural Mating",
  "Artificial Insemination",
  "Pregnancy Check",
  "Heat Detection",
  "Breeding Completed",
  "Other",
];

const breedingTypes = BREEDING_TYPES.filter(
  (type) => type !== "All Breeding Types"
);

export default function Breeding({
  tenant,
  onBack,
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord,
}) {
  const goats = tenant?.data?.goats ?? [];

  const tenantBreeding =
    tenant?.data?.breeding ??
    tenant?.data?.breedings ??
    [];

  const [records, setRecords] =
    useState(tenantBreeding);

  const [selectedType, setSelectedType] =
    useState("All Breeding Types");

  const [typeModalOpen, setTypeModalOpen] =
    useState(false);

  const [typeQuery, setTypeQuery] =
    useState("");

  const [addMode, setAddMode] =
    useState(false);

  const [selectedGoat, setSelectedGoat] =
    useState(null);

  const [selectedRecord, setSelectedRecord] =
    useState(null);

  const [menuOpen, setMenuOpen] =
    useState(null);

  useEffect(() => {
    setRecords(tenantBreeding);
  }, [tenantBreeding]);

  const filteredRecords = useMemo(() => {
    return [...records]
      .filter(
        (record) =>
          selectedType === "All Breeding Types" ||
          record.type === selectedType
      )
      .sort(
        (a, b) =>
          new Date(b.breedingDate || 0) -
          new Date(a.breedingDate || 0)
      );
  }, [records, selectedType]);

  const getGoat = (record) => {
    return goats.find(
      (goat) =>
        goat.id === record.goatId ||
        goat.name === record.goatName
    );
  };

  const handleSave = (record) => {
    setRecords((prev) => [record, ...prev]);

    onAddRecord?.(record);

    setSelectedGoat(null);
    setAddMode(false);
  };

  const handleUpdate = (record) => {
    setRecords((prev) =>
      prev.map((item) =>
        item.id === record.id ? record : item
      )
    );

    onUpdateRecord?.(record);

    setSelectedRecord(null);
  };

  const handleDelete = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this breeding record?"
      )
    ) {
      return;
    }

    setRecords((prev) =>
      prev.filter((item) => item.id !== id)
    );

    onDeleteRecord?.(id);

    setMenuOpen(null);
    setSelectedRecord(null);
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}

      <header style={styles.header}>
        <div style={styles.headerInner}>
          <button
            onClick={onBack}
            style={styles.backButton}
          >
            <ArrowLeft size={21} />
            <span>Breeding</span>
          </button>

          <div style={styles.headerActions}>
            <button style={styles.iconButton}>
              <Search size={19} />
            </button>

            <button style={styles.iconButton}>
              <Play size={19} />
            </button>

            <button style={styles.iconButton}>
              <MoreVertical size={19} />
            </button>
          </div>
        </div>
      </header>

      <main style={styles.content}>
        {/* FILTER */}

        <button
          onClick={() => setTypeModalOpen(true)}
          style={styles.filterButton}
        >
          <span>{selectedType}</span>
          <ChevronDown size={19} />
        </button>

        {/* ADD GOAT FLOW */}

        {addMode ? (
          <GoatSelector
            goats={goats}
            onSelect={setSelectedGoat}
            onClose={() => {
              setAddMode(false);
              setSelectedGoat(null);
            }}
          />
        ) : (
          <>
            {filteredRecords.length === 0 ? (
              <EmptyState />
            ) : (
              <div>
                {filteredRecords.map((record) => (
                  <BreedingCard
                    key={record.id}
                    record={record}
                    goat={getGoat(record)}
                    menuOpen={
                      menuOpen === record.id
                    }
                    onMenu={() =>
                      setMenuOpen((current) =>
                        current === record.id
                          ? null
                          : record.id
                      )
                    }
                    onOpen={() =>
                      setSelectedRecord(record)
                    }
                    onEdit={() => {
                      setSelectedRecord(record);
                      setMenuOpen(null);
                    }}
                    onDelete={() =>
                      handleDelete(record.id)
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ADD BUTTON */}

        {!addMode && (
          <button
            onClick={() => {
              setAddMode(true);
              setSelectedGoat(null);
            }}
            style={styles.addButton}
          >
            + Add
          </button>
        )}
      </main>

      {/* BREEDING TYPE FILTER */}

      {typeModalOpen && (
        <SelectModal
          title="Select breeding type"
          options={BREEDING_TYPES}
          selected={selectedType}
          query={typeQuery}
          onQueryChange={setTypeQuery}
          onPick={(type) => {
            setSelectedType(type);
            setTypeModalOpen(false);
            setTypeQuery("");
          }}
          onClose={() => {
            setTypeModalOpen(false);
            setTypeQuery("");
          }}
        />
      )}

      {/* BREEDING ENTRY */}

      {selectedGoat && (
        <BreedingEntry
          goat={selectedGoat}
          onClose={() => setSelectedGoat(null)}
          onSave={handleSave}
        />
      )}

      {/* DETAILS */}

      {selectedRecord && (
        <BreedingDetails
          record={selectedRecord}
          goat={getGoat(selectedRecord)}
          onClose={() =>
            setSelectedRecord(null)
          }
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

/* =========================================================
   GOAT SELECTOR
========================================================= */

function GoatSelector({
  goats,
  onSelect,
  onClose,
}) {
  return (
    <div style={styles.goatSelector}>
      <div style={styles.sectionHeader}>
        <div>
          <h2 style={styles.sectionTitle}>
            Select Goat
          </h2>

          <p style={styles.sectionSubtitle}>
            Choose the goat for breeding
          </p>
        </div>

        <button
          onClick={onClose}
          style={styles.smallClose}
        >
          <X size={17} />
        </button>
      </div>

      {goats.length === 0 ? (
        <div style={styles.noGoats}>
          <span style={styles.noGoatIcon}>
            🐐
          </span>

          <strong>No goats found</strong>

          <span>
            Create a goat first before adding
            a breeding record.
          </span>
        </div>
      ) : (
        <div style={styles.goatList}>
          {goats.map((goat) => (
            <button
              key={goat.id}
              onClick={() => onSelect(goat)}
              style={styles.goatRow}
            >
              <div style={styles.goatAvatar}>
                🐐
              </div>

              <div style={styles.goatInfo}>
                <strong>
                  {goat.name ||
                    "Unnamed Goat"}
                </strong>

                <span>
                  {goat.breed ||
                    "Unknown breed"}

                  {goat.tagNumber
                    ? ` · Tag #${goat.tagNumber}`
                    : ""}
                </span>
              </div>

              <ChevronRight
                size={20}
                color="#94A3B8"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   BREEDING ENTRY
========================================================= */

function BreedingEntry({
  goat,
  onClose,
  onSave,
}) {
  const [breedingDate, setBreedingDate] =
    useState("");

  const [breedingType, setBreedingType] =
    useState("");

  const [note, setNote] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSave = () => {
    if (!breedingDate) {
      setError("Select breeding date");
      return;
    }

    if (!breedingType) {
      setError("Select breeding type");
      return;
    }

    const record = {
      id: `breeding-${Date.now()}`,

      title: breedingType,

      type: breedingType,

      breedingDate,

      goatId: goat.id,

      goatName: goat.name,

      notes: note.trim(),
    };

    onSave(record);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.entry}>
        <div style={styles.entryHeader}>
          <div>
            <span style={styles.entryLabel}>
              ADD BREEDING RECORD
            </span>

            <h2 style={styles.entryGoat}>
              🐐 {goat.name}
            </h2>

            <p style={styles.entryTag}>
              {goat.breed ||
                "Unknown breed"}

              {goat.tagNumber
                ? ` · Tag #${goat.tagNumber}`
                : ""}
            </p>
          </div>

          <button
            onClick={onClose}
            style={styles.smallClose}
          >
            <X size={17} />
          </button>
        </div>

        <div style={styles.entryBody}>
          {/* DATE */}

          <label style={styles.field}>
            <span style={styles.label}>
              Breeding date
            </span>

            <input
              type="date"
              value={breedingDate}
              onChange={(e) =>
                setBreedingDate(
                  e.target.value
                )
              }
              style={styles.input}
            />
          </label>

          {/* TYPE */}

          <label style={styles.field}>
            <span style={styles.label}>
              Breeding type
            </span>

            <select
              value={breedingType}
              onChange={(e) =>
                setBreedingType(
                  e.target.value
                )
              }
              style={styles.input}
            >
              <option value="">
                Select breeding type
              </option>

              {breedingTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>
          </label>

          {/* NOTE */}

          <label style={styles.field}>
            <span style={styles.label}>
              Add a note
            </span>

            <textarea
              rows={3}
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              placeholder="Write a note..."
              style={{
                ...styles.input,
                resize: "none",
              }}
            />
          </label>

          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}

          {/* TICK */}

          <div style={styles.saveArea}>
            <button
              onClick={handleSave}
              style={styles.tickButton}
              title="Save breeding record"
            >
              <Check size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   BREEDING CARD
========================================================= */

function BreedingCard({
  record,
  goat,
  menuOpen,
  onMenu,
  onOpen,
  onEdit,
  onDelete,
}) {
  return (
    <article
      style={styles.card}
      onClick={onOpen}
    >
      <div style={styles.cardMain}>
        <div style={styles.eventIcon}>
          🐐
        </div>

        <div style={styles.cardInfo}>
          <h3 style={styles.title}>
            {record.title ||
              record.type ||
              "Breeding"}
          </h3>

          <p style={styles.eventGoat}>
            {goat?.name ||
              record.goatName ||
              "Unknown Goat"}

            {(goat?.tagNumber ||
              record.tagNumber) &&
              ` · Tag #${
                goat?.tagNumber ||
                record.tagNumber
              }`}
          </p>

          <p style={styles.date}>
            {formatDate(
              record.breedingDate
            )}
          </p>
        </div>

        <div style={styles.cardRight}>
          <span style={styles.typeBadge}>
            {record.type || "Breeding"}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onMenu();
            }}
            style={styles.menuButton}
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {record.notes && (
        <p style={styles.notes}>
          {record.notes}
        </p>
      )}

      {menuOpen && (
        <div
          style={styles.menu}
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          <button
            onClick={onEdit}
            style={styles.menuItem}
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={onDelete}
            style={{
              ...styles.menuItem,
              color: "#DC2626",
            }}
          >
            <Trash2 size={16} />
            Remove
          </button>
        </div>
      )}
    </article>
  );
}

/* =========================================================
   BREEDING DETAILS
========================================================= */

function BreedingDetails({
  record,
  goat,
  onClose,
  onUpdate,
  onDelete,
}) {
  const [editing, setEditing] =
    useState(false);

  const [date, setDate] =
    useState(
      record.breedingDate || ""
    );

  const [type, setType] =
    useState(record.type || "");

  const [note, setNote] =
    useState(record.notes || "");

  const saveChanges = () => {
    onUpdate({
      ...record,

      title: type,

      type,

      breedingDate: date,

      goatId:
        goat?.id || record.goatId,

      goatName:
        goat?.name || record.goatName,

      notes: note.trim(),
    });

    setEditing(false);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.details}>
        {/* HEADER */}

        <div style={styles.detailsHeader}>
          <button
            onClick={onClose}
            style={styles.backDetail}
          >
            <ArrowLeft size={20} />
          </button>

          <div style={{ flex: 1 }}>
            <span style={styles.entryLabel}>
              BREEDING DETAILS
            </span>

            <h2 style={styles.detailsTitle}>
              {goat?.name ||
                record.goatName ||
                "Unknown Goat"}
            </h2>
          </div>

          <button
            onClick={() =>
              setEditing(!editing)
            }
            style={styles.editButton}
          >
            <Pencil size={17} />
          </button>
        </div>

        {/* GOAT PROFILE */}

        <div style={styles.profileCard}>
          <div style={styles.bigGoat}>
            🐐
          </div>

          <div style={styles.profileInfo}>
            <strong>
              {goat?.name ||
                record.goatName ||
                "Unknown Goat"}
            </strong>

            <span>
              {goat?.breed ||
                "Unknown breed"}
            </span>

            {goat?.tagNumber && (
              <span>
                Tag #{goat.tagNumber}
              </span>
            )}
          </div>
        </div>

        {/* EDIT */}

        {editing ? (
          <div style={styles.editBody}>
            <label style={styles.field}>
              <span style={styles.label}>
                Breeding date
              </span>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                style={styles.input}
              />
            </label>

            <label style={styles.field}>
              <span style={styles.label}>
                Breeding type
              </span>

              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
                style={styles.input}
              >
                {breedingTypes.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </label>

            <label style={styles.field}>
              <span style={styles.label}>
                Note
              </span>

              <textarea
                rows={4}
                value={note}
                onChange={(e) =>
                  setNote(e.target.value)
                }
                style={{
                  ...styles.input,
                  resize: "none",
                }}
              />
            </label>

            <button
              onClick={saveChanges}
              style={styles.saveButton}
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div style={styles.detailBody}>
            <DetailRow
              label="Breeding type"
              value={
                record.type ||
                "Other"
              }
            />

            <DetailRow
              label="Breeding date"
              value={formatDate(
                record.breedingDate
              )}
            />

            <DetailRow
              label="Note"
              value={
                record.notes ||
                "No note added"
              }
            />

            <div style={styles.successBox}>
              <Check size={17} />
              Breeding record saved
            </div>

            <button
              onClick={() =>
                onDelete(record.id)
              }
              style={styles.deleteButton}
            >
              <Trash2 size={16} />
              Remove Breeding Record
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({
  label,
  value,
}) {
  return (
    <div style={styles.detailRow}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState() {
  return (
    <div style={styles.emptyState}>
      <span style={styles.emptyIcon}>
        🐐
      </span>

      <strong>
        No breeding records yet!
      </strong>

      <span>
        Click + Add to select a goat
        and create a breeding record.
      </span>
    </div>
  );
}

/* =========================================================
   DATE
========================================================= */

function formatDate(date) {
  if (!date) return "—";

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
   STYLES
========================================================= */

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg,#F7F9FC 0%,#F1F5F9 100%)",
  },

  header: {
    background:
      "linear-gradient(135deg,#1E3A5F 0%,#14283F 100%)",
    padding: "18px 16px",
    color: "#fff",
  },

  headerInner: {
    maxWidth: 1180,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    border: 0,
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 700,
  },

  headerActions: {
    display: "flex",
    gap: 10,
  },

  iconButton: {
    width: 40,
    height: 40,
    border: 0,
    borderRadius: 11,
    background:
      "rgba(255,255,255,0.16)",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },

  content: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "22px 16px",
  },

  filterButton: {
    width: "100%",
    background: "#fff",
    border: "1px solid #C7D2E0",
    borderRadius: 14,
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#1E3A5F",
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: 20,
  },

  /* GOAT SELECTOR */

  goatSelector: {
    background: "#fff",
    borderRadius: 18,
    padding: 18,
    boxShadow:
      "0 4px 18px rgba(15,23,42,0.06)",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  sectionTitle: {
    margin: 0,
    fontSize: 18,
    color: "#111827",
  },

  sectionSubtitle: {
    margin: "5px 0 0",
    fontSize: 13,
    color: "#64748B",
  },

  goatList: {
    display: "flex",
    flexDirection: "column",
    gap: 9,
  },

  goatRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 13,
    padding: 13,
    border:
      "1px solid #E5EAF1",
    background: "#fff",
    borderRadius: 13,
    cursor: "pointer",
    textAlign: "left",
  },

  goatAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "#EEF4FF",
    display: "grid",
    placeItems: "center",
    fontSize: 22,
    flexShrink: 0,
  },

  goatInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  noGoats: {
    minHeight: 220,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    color: "#64748B",
    textAlign: "center",
  },

  noGoatIcon: {
    fontSize: 38,
  },

  /* CARD */

  card: {
    position: "relative",
    background: "#fff",
    padding: 17,
    borderRadius: 16,
    marginBottom: 13,
    boxShadow:
      "0 2px 8px rgba(15,23,42,0.05)",
    cursor: "pointer",
  },

  cardMain: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  eventIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "#EEF4FF",
    display: "grid",
    placeItems: "center",
    fontSize: 23,
    flexShrink: 0,
  },

  cardInfo: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    margin: 0,
    color: "#111827",
    fontSize: 16,
  },

  eventGoat: {
    margin: "4px 0",
    color: "#334155",
    fontSize: 13,
    fontWeight: 600,
  },

  date: {
    margin: 0,
    color: "#64748B",
    fontSize: 12,
  },

  cardRight: {
    display: "flex",
    alignItems: "center",
    gap: 7,
  },

  typeBadge: {
    background: "#E8F0FA",
    color: "#1E3A5F",
    padding: "6px 9px",
    borderRadius: 999,
    fontSize: 10,
    fontWeight: 700,
    whiteSpace: "nowrap",
  },

  menuButton: {
    width: 34,
    height: 34,
    border: 0,
    borderRadius: 9,
    background: "#F3F6FA",
    color: "#475569",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },

  notes: {
    margin: "12px 0 0 56px",
    color: "#64748B",
    fontSize: 13,
    lineHeight: 1.5,
  },

  /* MENU */

  menu: {
    position: "absolute",
    top: 55,
    right: 15,
    width: 150,
    background: "#fff",
    border:
      "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 6,
    boxShadow:
      "0 10px 30px rgba(15,23,42,0.14)",
    zIndex: 20,
  },

  menuItem: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 11px",
    border: 0,
    background: "transparent",
    borderRadius: 8,
    cursor: "pointer",
    color: "#374151",
    fontSize: 14,
    fontWeight: 600,
    textAlign: "left",
  },

  /* OVERLAY */

  overlay: {
    position: "fixed",
    inset: 0,
    background:
      "rgba(15,23,42,0.48)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    zIndex: 60,
  },

  /* ENTRY */

  entry: {
    width: "100%",
    maxWidth: 480,
    background: "#fff",
    borderRadius:
      "22px 22px 0 0",
    boxShadow:
      "0 -8px 40px rgba(15,23,42,0.18)",
  },

  entryHeader: {
    padding:
      "20px 22px 15px",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "flex-start",
    borderBottom:
      "1px solid #EEF2F7",
  },

  entryLabel: {
    fontSize: 10,
    fontWeight: 800,
    color: "#94A3B8",
    letterSpacing: 0.8,
  },

  entryGoat: {
    margin: "4px 0",
    fontSize: 20,
    color: "#111827",
  },

  entryTag: {
    margin: 0,
    fontSize: 12,
    color: "#64748B",
  },

  smallClose: {
    width: 31,
    height: 31,
    border: 0,
    borderRadius: "50%",
    background: "#EEF2FA",
    color: "#64748B",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },

  entryBody: {
    padding:
      "18px 22px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    border:
      "1px solid #DDE3EC",
    borderRadius: 10,
    padding: "11px 12px",
    fontSize: 14,
    color: "#111827",
    outline: "none",
    background: "#fff",
    fontFamily: "inherit",
  },

  error: {
    margin: 0,
    color: "#B91C1C",
    fontSize: 13,
  },

  saveArea: {
    display: "flex",
    justifyContent: "flex-end",
  },

  tickButton: {
    width: 52,
    height: 52,
    border: 0,
    borderRadius: "50%",
    background: "#16A34A",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    boxShadow:
      "0 8px 18px rgba(22,163,74,0.25)",
  },

  /* DETAILS */

  details: {
    width: "100%",
    maxWidth: 520,
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#fff",
    borderRadius:
      "22px 22px 0 0",
    paddingBottom: 24,
  },

  detailsHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "18px 20px",
    borderBottom:
      "1px solid #EEF2F7",
  },

  backDetail: {
    width: 36,
    height: 36,
    border: 0,
    borderRadius: 10,
    background: "#F1F5F9",
    color: "#334155",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },

  detailsTitle: {
    margin: "3px 0 0",
    fontSize: 19,
    color: "#111827",
  },

  editButton: {
    width: 36,
    height: 36,
    border: 0,
    borderRadius: 10,
    background: "#EEF4FF",
    color: "#1D4ED8",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },

  profileCard: {
    margin: 18,
    padding: 15,
    borderRadius: 15,
    background:
      "linear-gradient(135deg,#EFF6FF,#F8FAFC)",
    display: "flex",
    alignItems: "center",
    gap: 13,
  },

  bigGoat: {
    width: 55,
    height: 55,
    borderRadius: 15,
    background: "#fff",
    display: "grid",
    placeItems: "center",
    fontSize: 29,
  },

  profileInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  detailBody: {
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
  },

  detailRow: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    padding: "14px 0",
    borderBottom:
      "1px solid #EEF2F7",
  },

  successBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: 11,
    background: "#ECFDF3",
    color: "#15803D",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    fontWeight: 600,
  },

  editBody: {
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  saveButton: {
    border: 0,
    borderRadius: 11,
    padding: 13,
    background: "#1D4ED8",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },

  deleteButton: {
    marginTop: 15,
    border:
      "1px solid #FECACA",
    background: "#FEF2F2",
    color: "#DC2626",
    padding: "11px 14px",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    fontWeight: 700,
    cursor: "pointer",
  },

  /* EMPTY */

  emptyState: {
    minHeight: 300,
    background: "#fff",
    borderRadius: 18,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 20,
    textAlign: "center",
  },

  emptyIcon: {
    fontSize: 42,
  },

  addButton: {
    position: "fixed",
    right: 22,
    bottom: 22,
    border: 0,
    borderRadius: 30,
    padding: "14px 24px",
    background: "#1E3A5F",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow:
      "0 10px 24px rgba(30,58,95,0.28)",
  },
};