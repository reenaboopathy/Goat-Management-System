import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  MoreVertical,
  ChevronDown,
  X,
  CalendarDays,
  Pencil,
  Trash2,
  Check,
  ChevronRight,
  Plus,
  Heart,
  Baby,
  Activity,
  Filter,
  Users,
} from "lucide-react";

import SelectModal from "../components/SelectModel.jsx";
// import "./Breeding.css";

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

  const [records, setRecords] = useState(tenantBreeding);
  const [selectedType, setSelectedType] =
    useState("All Breeding Types");

  const [typeModalOpen, setTypeModalOpen] =
    useState(false);

  const [typeQuery, setTypeQuery] = useState("");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [addMode, setAddMode] = useState(false);

  const [selectedGoat, setSelectedGoat] =
    useState(null);

  const [selectedRecord, setSelectedRecord] =
    useState(null);

  const [menuOpen, setMenuOpen] = useState(null);

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
      .filter((record) => {
        if (!searchQuery.trim()) return true;

        const goat = goats.find(
          (item) =>
            item.id === record.goatId ||
            item.name === record.goatName
        );

        const text = `
          ${record.type || ""}
          ${record.title || ""}
          ${record.goatName || ""}
          ${goat?.name || ""}
          ${goat?.tagNumber || ""}
        `.toLowerCase();

        return text.includes(searchQuery.toLowerCase());
      })
      .sort(
        (a, b) =>
          new Date(b.breedingDate || 0) -
          new Date(a.breedingDate || 0)
      );
  }, [
    records,
    selectedType,
    searchQuery,
    goats,
  ]);

  const stats = useMemo(() => {
    const natural = records.filter(
      (r) => r.type === "Natural Mating"
    ).length;

    const pregnancy = records.filter(
      (r) => r.type === "Pregnancy Check"
    ).length;

    const completed = records.filter(
      (r) => r.type === "Breeding Completed"
    ).length;

    return {
      total: records.length,
      natural,
      pregnancy,
      completed,
    };
  }, [records]);

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
    <div className="breeding-page">

      {/* ================= HEADER ================= */}

      <header className="breeding-header">
        <div className="breeding-header-inner">

          <button
            className="breeding-back-btn"
            onClick={onBack}
          >
            <ArrowLeft size={21} />
            <span>Breeding Management</span>
          </button>

          <div className="header-actions">

            <button
              className="header-icon-btn"
              onClick={() =>
                document
                  .getElementById("breeding-search")
                  ?.focus()
              }
            >
              <Search size={19} />
            </button>

            <button className="header-icon-btn">
              <MoreVertical size={19} />
            </button>

          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="breeding-container">

        {/* PAGE TITLE */}

        <section className="breeding-hero">

          <div>
            <div className="hero-label">
              LIVESTOCK MANAGEMENT
            </div>

            <h1>Breeding</h1>

            <p>
              Track mating, pregnancy checks,
              heat detection and breeding records
              for your goats.
            </p>
          </div>

          <button
            className="hero-add-btn"
            onClick={() => {
              setAddMode(true);
              setSelectedGoat(null);
            }}
          >
            <Plus size={19} />
            Add Breeding Record
          </button>

        </section>

        {/* ================= STATS ================= */}

        <section className="breeding-stats">

          <StatCard
            icon={<Heart size={21} />}
            label="Total Records"
            value={stats.total}
          />

          <StatCard
            icon={<Activity size={21} />}
            label="Natural Mating"
            value={stats.natural}
          />

          <StatCard
            icon={<Baby size={21} />}
            label="Pregnancy Checks"
            value={stats.pregnancy}
          />

          <StatCard
            icon={<Check size={21} />}
            label="Completed"
            value={stats.completed}
          />

        </section>

        {/* ================= TOOLBAR ================= */}

        <section className="breeding-toolbar">

          <div className="breeding-search">
            <Search size={18} />

            <input
              id="breeding-search"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search goat, tag or breeding type..."
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            className="filter-btn"
            onClick={() =>
              setTypeModalOpen(true)
            }
          >
            <Filter size={17} />
            <span>{selectedType}</span>
            <ChevronDown size={17} />
          </button>

        </section>

        {/* ================= CONTENT ================= */}

        <section className="breeding-content">

          <div className="content-heading">

            <div>
              <h2>Breeding Records</h2>

              <p>
                {filteredRecords.length} record
                {filteredRecords.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            </div>

            <button
              className="desktop-add-btn"
              onClick={() => {
                setAddMode(true);
                setSelectedGoat(null);
              }}
            >
              <Plus size={17} />
              Add Record
            </button>

          </div>

          {/* ADD FLOW */}

          {addMode ? (
            <GoatSelector
              goats={goats}
              onSelect={setSelectedGoat}
              onClose={() => {
                setAddMode(false);
                setSelectedGoat(null);
              }}
            />
          ) : filteredRecords.length === 0 ? (
            <EmptyState
              searchQuery={searchQuery}
              onAdd={() => {
                setAddMode(true);
                setSelectedGoat(null);
              }}
            />
          ) : (
            <div className="breeding-record-grid">

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

        </section>

      </main>

      {/* ================= FILTER MODAL ================= */}

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

      {/* ================= ENTRY ================= */}

      {selectedGoat && (
        <BreedingEntry
          goat={selectedGoat}
          onClose={() =>
            setSelectedGoat(null)
          }
          onSave={handleSave}
        />
      )}

      {/* ================= DETAILS ================= */}

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
   STAT CARD
========================================================= */

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

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
  const [query, setQuery] = useState("");

  const filteredGoats = goats.filter((goat) => {
    const text = `
      ${goat.name || ""}
      ${goat.tagNumber || ""}
      ${goat.breed || ""}
    `.toLowerCase();

    return text.includes(query.toLowerCase());
  });

  return (
    <div className="goat-selector">

      <div className="selector-header">

        <div>
          <span className="section-kicker">
            STEP 1
          </span>

          <h2>Select Goat</h2>

          <p>
            Choose the goat for this breeding
            record.
          </p>
        </div>

        <button
          className="close-btn"
          onClick={onClose}
        >
          <X size={18} />
        </button>

      </div>

      {goats.length > 0 && (
        <div className="goat-search">

          <Search size={17} />

          <input
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search goat or tag number..."
          />

        </div>
      )}

      {filteredGoats.length === 0 ? (
        <div className="no-goats">
          <div className="no-goat-icon">
            🐐
          </div>

          <h3>No goats found</h3>

          <p>
            Create a goat first before adding
            a breeding record.
          </p>
        </div>
      ) : (
        <div className="goat-grid">

          {filteredGoats.map((goat) => (
            <button
              key={goat.id}
              className="goat-select-card"
              onClick={() =>
                onSelect(goat)
              }
            >

              <div className="goat-avatar">
                🐐
              </div>

              <div className="goat-details">

                <strong>
                  {goat.name ||
                    "Unnamed Goat"}
                </strong>

                <span>
                  {goat.breed ||
                    "Unknown breed"}
                </span>

                {goat.tagNumber && (
                  <small>
                    Tag #{goat.tagNumber}
                  </small>
                )}

              </div>

              <ChevronRight size={19} />

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

  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {

    if (!breedingDate) {
      setError("Select breeding date.");
      return;
    }

    if (!breedingType) {
      setError("Select breeding type.");
      return;
    }

    const record = {
      id: `breeding-${Date.now()}`,
      title: breedingType,
      type: breedingType,
      breedingDate,
      goatId: goat.id,
      goatName: goat.name,
      tagNumber: goat.tagNumber || "",
      notes: note.trim(),
      createdAt:
        new Date().toISOString(),
    };

    onSave(record);
  };

  return (
    <div className="modal-overlay">

      <div className="breeding-entry-modal">

        <div className="modal-header">

          <div>
            <span className="section-kicker">
              STEP 2 · BREEDING RECORD
            </span>

            <h2>
              🐐 {goat.name}
            </h2>

            <p>
              {goat.breed ||
                "Unknown breed"}

              {goat.tagNumber &&
                ` · Tag #${goat.tagNumber}`}
            </p>
          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >
            <X size={18} />
          </button>

        </div>

        <div className="modal-body">

          <div className="selected-goat-banner">

            <div className="selected-goat-avatar">
              🐐
            </div>

            <div>
              <strong>
                {goat.name}
              </strong>

              <span>
                Selected goat
              </span>
            </div>

            <Check size={20} />

          </div>

          <label className="form-field">
            <span>Breeding Date</span>

            <div className="input-with-icon">
              <CalendarDays size={17} />

              <input
                type="date"
                value={breedingDate}
                onChange={(e) => {
                  setBreedingDate(
                    e.target.value
                  );
                  setError("");
                }}
              />
            </div>
          </label>

          <label className="form-field">
            <span>Breeding Type</span>

            <select
              value={breedingType}
              onChange={(e) => {
                setBreedingType(
                  e.target.value
                );
                setError("");
              }}
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

          <label className="form-field">
            <span>Notes</span>

            <textarea
              rows={4}
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              placeholder="Add any breeding notes..."
            />
          </label>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <button
            className="primary-save-btn"
            onClick={handleSave}
          >
            <Check size={18} />
            Save Breeding Record
          </button>

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
      className="breeding-card"
      onClick={onOpen}
    >

      <div className="card-top">

        <div className="card-goat-icon">
          🐐
        </div>

        <div className="card-main-info">

          <div className="card-title-row">

            <h3>
              {record.title ||
                record.type ||
                "Breeding"}
            </h3>

            <span className="type-badge">
              {record.type ||
                "Breeding"}
            </span>

          </div>

          <p className="card-goat-name">
            {goat?.name ||
              record.goatName ||
              "Unknown Goat"}
          </p>

          <div className="card-meta">

            {(goat?.tagNumber ||
              record.tagNumber) && (
              <span>
                Tag #
                {goat?.tagNumber ||
                  record.tagNumber}
              </span>
            )}

            <span>
              <CalendarDays size={13} />
              {formatDate(
                record.breedingDate
              )}
            </span>

          </div>

        </div>

        <button
          className="card-menu-btn"
          onClick={(e) => {
            e.stopPropagation();
            onMenu();
          }}
        >
          <MoreVertical size={18} />
        </button>

      </div>

      {record.notes && (
        <div className="card-note">
          {record.notes}
        </div>
      )}

      {menuOpen && (
        <div
          className="record-menu"
          onClick={(e) =>
            e.stopPropagation()
          }
        >

          <button onClick={onEdit}>
            <Pencil size={16} />
            Edit
          </button>

          <button
            className="danger"
            onClick={onDelete}
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
   DETAILS
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
    useState(record.breedingDate || "");

  const [type, setType] =
    useState(record.type || "");

  const [note, setNote] =
    useState(record.notes || "");

  const saveChanges = () => {

    if (!date || !type) {
      alert(
        "Breeding date and type are required."
      );
      return;
    }

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
    <div className="modal-overlay">

      <div className="details-modal">

        <div className="details-header">

          <button
            className="close-btn"
            onClick={onClose}
          >
            <ArrowLeft size={19} />
          </button>

          <div className="details-heading">

            <span className="section-kicker">
              BREEDING DETAILS
            </span>

            <h2>
              {goat?.name ||
                record.goatName ||
                "Unknown Goat"}
            </h2>

          </div>

          <button
            className="edit-icon-btn"
            onClick={() =>
              setEditing(!editing)
            }
          >
            <Pencil size={17} />
          </button>

        </div>

        <div className="details-content">

          <div className="goat-profile">

            <div className="profile-avatar">
              🐐
            </div>

            <div>

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
                <small>
                  Tag #{goat.tagNumber}
                </small>
              )}

            </div>

          </div>

          {editing ? (
            <div className="edit-form">

              <label className="form-field">
                <span>Breeding Date</span>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                />
              </label>

              <label className="form-field">
                <span>Breeding Type</span>

                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value)
                  }
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

              <label className="form-field">
                <span>Notes</span>

                <textarea
                  rows={4}
                  value={note}
                  onChange={(e) =>
                    setNote(e.target.value)
                  }
                />
              </label>

              <button
                className="primary-save-btn"
                onClick={saveChanges}
              >
                <Check size={18} />
                Save Changes
              </button>

            </div>
          ) : (
            <>

              <div className="detail-section">

                <DetailItem
                  label="Breeding Type"
                  value={
                    record.type ||
                    "Other"
                  }
                />

                <DetailItem
                  label="Breeding Date"
                  value={formatDate(
                    record.breedingDate
                  )}
                />

                <DetailItem
                  label="Notes"
                  value={
                    record.notes ||
                    "No note added"
                  }
                />

              </div>

              <div className="saved-status">
                <Check size={17} />
                Breeding record saved
              </div>

              <button
                className="remove-record-btn"
                onClick={() =>
                  onDelete(record.id)
                }
              >
                <Trash2 size={17} />
                Remove Breeding Record
              </button>

            </>
          )}

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  label,
  value,
}) {
  return (
    <div className="detail-item">

      <span>{label}</span>

      <strong>{value}</strong>

    </div>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyState({
  searchQuery,
  onAdd,
}) {
  return (
    <div className="empty-state">

      <div className="empty-illustration">
        🐐
      </div>

      <h3>
        {searchQuery
          ? "No matching records"
          : "No breeding records yet"}
      </h3>

      <p>
        {searchQuery
          ? "Try another goat name, tag number or breeding type."
          : "Start tracking your goat breeding activities by adding your first record."}
      </p>

      {!searchQuery && (
        <button
          className="empty-add-btn"
          onClick={onAdd}
        >
          <Plus size={17} />
          Add First Record
        </button>
      )}

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