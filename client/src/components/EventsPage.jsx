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
  User,
  Users,
  ChevronRight,
  Bell,
  Check,
  RefreshCw,
} from "lucide-react";
import SelectModal from "../components/SelectModel.jsx";
import "./Events.css";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const EVENT_TYPES = [
  "All Event Types",
  "Vaccination",
  "Health Check",
  "Mating",
  "Birth",
  "Purchase",
  "Sale",
  "Weight Check",
  "Milking",
  "Other",
];

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
}

function extractArray(response, possibleKeys = []) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;

  for (const key of possibleKeys) {
    if (Array.isArray(response?.[key])) return response[key];
    if (Array.isArray(response?.data?.[key])) return response.data[key];
  }

  return [];
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
    id: String(id || `goat-${Date.now()}-${Math.random()}`),
    name: name || `Goat #${tagNumber || "Unknown"}`,
    breed: breed || "Unknown breed",
    tagNumber: tagNumber || "",
  };
}

function normalizeEvent(event) {
  if (!event || typeof event !== "object") return null;

  return {
    ...event,
    id:
      event.id ??
      event._id ??
      `event-${Date.now()}-${Math.random()}`,
    mode: event.mode || "individual",
    title: event.title || "",
    type: event.type || "Other",
    eventDate: event.eventDate || event.date || "",
    goatId: event.goatId ?? event.goatID ?? null,
    goatName: event.goatName || "",
    goatTagNumber: event.goatTagNumber || event.tagNumber || "",
    goatIds: Array.isArray(event.goatIds) ? event.goatIds : [],
    goats: Array.isArray(event.goats) ? event.goats : [],
    goatCount:
      event.goatCount ??
      (Array.isArray(event.goats) ? event.goats.length : 0),
    notes: event.notes || "",
  };
}

export default function EventsPage({
  tenant,
  onBack,
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord,
}) {
  const [goatsData, setGoatsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [eventType, setEventType] = useState("All Event Types");
  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const [typeQuery, setTypeQuery] = useState("");
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [mode, setMode] = useState("individual");

  async function loadGoats() {
    try {
      const response = await apiRequest("/goats");
      const goats = extractArray(response, ["goats"])
        .map(normalizeGoat)
        .filter(Boolean);
      setGoatsData(goats);
      return goats;
    } catch (error) {
      console.error("Failed to load goats:", error);
      setGoatsData([]);
      throw error;
    }
  }

  async function loadEvents() {
    try {
      const response = await apiRequest("/events");
      const events = extractArray(response, ["events"])
        .map(normalizeEvent)
        .filter(Boolean);
      setEventsData(events);
      return events;
    } catch (error) {
      console.error("Failed to load events:", error);
      setEventsData([]);
      throw error;
    }
  }

  async function refreshData() {
    setLoading(true);
    setErrorMessage("");

    try {
      await Promise.all([loadGoats(), loadEvents()]);
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to load data from backend."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshData();
  }, [tenant]);

  const realGoats = useMemo(
    () =>
      goatsData
        .map(normalizeGoat)
        .filter(Boolean)
        .filter((goat) => goat.id || goat.name || goat.tagNumber),
    [goatsData]
  );

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...eventsData]
      .filter((event) => {
        const eventMode = event.mode || "individual";
        const modeMatch = eventMode === mode;
        const typeMatch =
          eventType === "All Event Types" || event.type === eventType;

        const massGoatNames = Array.isArray(event.goats)
          ? event.goats
              .map((goat) => goat?.name)
              .filter(Boolean)
              .join(" ")
          : "";

        const searchable = [
          event.title,
          event.type,
          event.goatName,
          event.goatTagNumber,
          event.notes,
          event.eventDate,
          massGoatNames,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return modeMatch && typeMatch && searchable.includes(query);
      })
      .sort(
        (a, b) =>
          new Date(b.eventDate || 0) - new Date(a.eventDate || 0)
      );
  }, [eventsData, eventType, search, mode]);

  function findGoat(event) {
    if (!event) return null;

    const goatId = event.goatId || event.goatID;
    if (goatId) {
      const byId = realGoats.find(
        (goat) => String(goat.id) === String(goatId)
      );
      if (byId) return byId;
    }

    const tag = event.goatTagNumber || event.tagNumber;
    if (tag) {
      const byTag = realGoats.find(
        (goat) => String(goat.tagNumber) === String(tag)
      );
      if (byTag) return byTag;
    }

    const name = event.goatName?.trim();
    if (name) {
      return (
        realGoats.find(
          (goat) =>
            goat.name?.trim().toLowerCase() === name.toLowerCase()
        ) || null
      );
    }

    return null;
  }

  async function handleAddEvent(record) {
    try {
      setErrorMessage("");

      const response = await apiRequest("/events", {
        method: "POST",
        body: JSON.stringify(record),
      });

      const savedEvent = normalizeEvent(
        response?.event || response?.data || response
      );

      if (!savedEvent) {
        throw new Error("Backend did not return the created event.");
      }

      setEventsData((current) => [savedEvent, ...current]);
      onAddRecord?.(savedEvent);
      closeForm();
    } catch (error) {
      console.error("Add event failed:", error);
      setErrorMessage(error.message || "Failed to save event.");
      throw error;
    }
  }

  async function handleUpdateEvent(record) {
    try {
      setErrorMessage("");

      const id = record.id || record._id;
      if (!id) throw new Error("Event ID is missing.");

      const response = await apiRequest(`/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(record),
      });

      const updatedEvent = normalizeEvent(
        response?.event || response?.data || response
      );

      if (!updatedEvent) {
        throw new Error("Backend did not return the updated event.");
      }

      setEventsData((current) =>
        current.map((event) =>
          String(event.id) === String(id) ? updatedEvent : event
        )
      );

      onUpdateRecord?.(updatedEvent);
      closeForm();
    } catch (error) {
      console.error("Update event failed:", error);
      setErrorMessage(error.message || "Failed to update event.");
      throw error;
    }
  }

  async function handleDeleteEvent(id) {
    if (!window.confirm("Are you sure you want to remove this event?")) {
      return;
    }

    try {
      setErrorMessage("");

      await apiRequest(`/events/${id}`, {
        method: "DELETE",
      });

      setEventsData((current) =>
        current.filter((event) => String(event.id) !== String(id))
      );

      onDeleteRecord?.(id);
      setMenuOpen(null);
    } catch (error) {
      console.error("Delete event failed:", error);
      setErrorMessage(error.message || "Failed to delete event.");
    }
  }

  function openAddForm() {
    setEditingEvent(null);
    setFormOpen(true);
  }

  function openEditForm(event) {
    setEditingEvent(event);
    setFormOpen(true);
    setMenuOpen(null);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingEvent(null);
  }

  return (
    <div className="events-page">
      <header className="events-header">
        <div className="events-header-inner">
          <button className="events-back-button" onClick={onBack} type="button">
            <span className="events-back-icon">
              <ArrowLeft size={20} />
            </span>
            <span>
              <strong className="events-header-title">Events</strong>
              <small className="events-header-subtitle">
                Track every event across your herd.
              </small>
            </span>
          </button>

          <div className="events-header-actions">
            <button
              className="events-icon-button"
              onClick={() => {
                setSearch("");
                refreshData();
              }}
              type="button"
              title="Refresh"
            >
              <RefreshCw size={18} />
            </button>
            <button
              className="events-icon-button"
              onClick={openAddForm}
              type="button"
              title="New event"
            >
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="events-content">
        <div className="events-main-search">
          <Search size={20} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events or goats..."
          />
          {search && (
            <button
              type="button"
              className="events-clear-search"
              onClick={() => setSearch("")}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="events-tabs">
          <button
            className={mode === "individual" ? "events-tab active" : "events-tab"}
            onClick={() => {
              setMode("individual");
              setEditingEvent(null);
              setFormOpen(false);
            }}
            type="button"
          >
            <User size={17} />
            Individual
          </button>

          <button
            className={mode === "mass" ? "events-tab active" : "events-tab"}
            onClick={() => {
              setMode("mass");
              setEditingEvent(null);
              setFormOpen(false);
            }}
            type="button"
          >
            <Users size={17} />
            Mass Event
          </button>
        </div>

        <div className="events-section-header">
          <div>
            <h2>
              {mode === "individual" ? "Individual events" : "Mass events"}
            </h2>
            <p>
              {filteredEvents.length} record
              {filteredEvents.length !== 1 ? "s" : ""} on this herd
            </p>
          </div>

          <button className="events-add-button" onClick={openAddForm} type="button">
            + New Event
          </button>
        </div>

        <button
          className="events-filter-button"
          onClick={() => setTypeModalOpen(true)}
          type="button"
        >
          <span>{eventType}</span>
          <ChevronDown size={19} />
        </button>

        {errorMessage && (
          <div className="events-page-error">{errorMessage}</div>
        )}

        {loading ? (
          <div className="events-loading">
            <div className="events-spinner" />
            <strong>Loading events...</strong>
            <span>Fetching goats and events from MongoDB.</span>
          </div>
        ) : filteredEvents.length === 0 ? (
          <EmptyState mode={mode} onAdd={openAddForm} />
        ) : (
          <div className="events-list">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                goat={findGoat(event)}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                onEdit={openEditForm}
                onDelete={handleDeleteEvent}
              />
            ))}
          </div>
        )}
      </main>

      <button className="events-floating" onClick={openAddForm} type="button">
        + Add Event
      </button>

      {typeModalOpen && (
        <SelectModal
          title="Select event type"
          options={EVENT_TYPES}
          selected={eventType}
          query={typeQuery}
          onQueryChange={setTypeQuery}
          onPick={(value) => {
            setEventType(value);
            setTypeModalOpen(false);
            setTypeQuery("");
          }}
          onClose={() => {
            setTypeModalOpen(false);
            setTypeQuery("");
          }}
        />
      )}

      {formOpen && (
        <AddEventForm
          goats={realGoats}
          initialData={editingEvent}
          mode={mode}
          onClose={closeForm}
          onSave={editingEvent ? handleUpdateEvent : handleAddEvent}
        />
      )}
    </div>
  );
}

function EventCard({
  event,
  goat,
  menuOpen,
  setMenuOpen,
  onEdit,
  onDelete,
}) {
  const isMass = event.mode === "mass";

  return (
    <article className="events-card">
      <div className="events-card-top">
        <div className="events-event-icon">
          <CalendarDays size={20} />
        </div>

        <div className="events-event-main">
          <h3>{event.title || "Untitled Event"}</h3>

          {!isMass && (
            <div className="events-goat-info">
              <span>🐐 {event.goatName || "Unknown goat"}</span>
              {goat?.breed && <span>· {goat.breed}</span>}
              {goat?.tagNumber && <span>· Tag #{goat.tagNumber}</span>}
            </div>
          )}

          {isMass && (
            <div className="events-mass-goats">
              <div className="events-mass-header">
                <Users size={15} />
                <strong>
                  {event.goatCount || event.goats?.length || 0} goats
                </strong>
              </div>
              <div className="events-mass-list">
                {Array.isArray(event.goats) &&
                  event.goats.map((item, index) => (
                    <span className="events-mass-chip" key={item.id || item._id || item.tagNumber || index}>
                      🐐 {item.name || "Goat"}
                      {item.tagNumber ? ` #${item.tagNumber}` : ""}
                    </span>
                  ))}
              </div>
            </div>
          )}

          <div className="events-date">{event.eventDate || "No date"}</div>
        </div>

        <div className="events-card-actions">
          <span className="events-type-badge">{event.type || "Other"}</span>
          <button
            className="events-more-button"
            onClick={() =>
              setMenuOpen(menuOpen === event.id ? null : event.id)
            }
            type="button"
            title="More"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {event.notes && <div className="events-notes">{event.notes}</div>}

      {menuOpen === event.id && (
        <div className="events-menu">
          <button onClick={() => onEdit(event)} type="button">
            <Pencil size={16} />
            Edit
          </button>
          <button className="danger" onClick={() => onDelete(event.id)} type="button">
            <Trash2 size={16} />
            Remove
          </button>
        </div>
      )}
    </article>
  );
}

function EmptyState({ mode, onAdd }) {
  return (
    <div className="events-empty">
      <div className="events-empty-icon">
        {mode === "mass" ? <Users size={34} /> : <CalendarDays size={34} />}
      </div>
      <strong>
        {mode === "mass" ? "No mass events found" : "No events found"}
      </strong>
      <span>
        {mode === "mass"
          ? "Create a mass event for multiple goats."
          : "Create your first event to start tracking your herd."}
      </span>
      <button onClick={onAdd} type="button">
        + Create Event
      </button>
    </div>
  );
}

function AddEventForm({ goats, initialData, mode, onClose, onSave }) {
  const isMass = mode === "mass" || initialData?.mode === "mass";

  const [selectedGoat, setSelectedGoat] = useState(null);
  const [selectedGoats, setSelectedGoats] = useState([]);
  const [goatSearch, setGoatSearch] = useState("");
  const [title, setTitle] = useState(initialData?.title || "");
  const [type, setType] = useState(initialData?.type || "");
  const [eventDate, setEventDate] = useState(initialData?.eventDate || "");
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!initialData) {
      setSelectedGoat(null);
      setSelectedGoats([]);
      return;
    }

    if (initialData.mode === "mass" || Array.isArray(initialData.goats)) {
      const savedGoats = Array.isArray(initialData.goats)
        ? initialData.goats
        : [];

      const matchedGoats = savedGoats
        .map(
          (savedGoat) =>
            goats.find(
              (goat) =>
                String(goat.id) === String(savedGoat.id || savedGoat._id)
            ) ||
            goats.find(
              (goat) =>
                String(goat.tagNumber) === String(savedGoat.tagNumber)
            ) ||
            savedGoat
        )
        .filter(Boolean);

      setSelectedGoats(matchedGoats);
      return;
    }

    const goatId = initialData.goatId || initialData.goatID;

    let found = goatId
      ? goats.find((goat) => String(goat.id) === String(goatId))
      : null;

    if (!found && initialData.goatTagNumber) {
      found = goats.find(
        (goat) =>
          String(goat.tagNumber) === String(initialData.goatTagNumber)
      );
    }

    if (!found && initialData.goatName) {
      found = goats.find(
        (goat) =>
          goat.name?.trim().toLowerCase() ===
          initialData.goatName?.trim().toLowerCase()
      );
    }

    setSelectedGoat(found || null);
  }, [initialData, goats]);

  const filteredGoats = useMemo(() => {
    const query = goatSearch.trim().toLowerCase();

    // KEY UX:
    // Do not show any goat until the user types.
    if (!query) return [];

    return goats.filter((goat) => {
      const name = String(goat.name || "").toLowerCase();
      const tag = String(goat.tagNumber || "").toLowerCase();

      return name.includes(query) || tag.includes(query);
    });
  }, [goats, goatSearch]);

  function isGoatSelected(goat) {
    return selectedGoats.some(
      (item) =>
        String(item.id || item._id) === String(goat.id || goat._id)
    );
  }

  function toggleGoat(goat) {
    setSelectedGoats((current) => {
      const exists = current.some(
        (item) =>
          String(item.id || item._id) === String(goat.id || goat._id)
      );

      if (exists) {
        return current.filter(
          (item) =>
            String(item.id || item._id) !== String(goat.id || goat._id)
        );
      }

      return [...current, goat];
    });
  }

  function selectAllGoats() {
    if (!goatSearch.trim()) return;

    setSelectedGoats((current) => {
      const map = new Map();

      current.forEach((goat) => {
        map.set(String(goat.id || goat._id), goat);
      });

      filteredGoats.forEach((goat) => {
        map.set(String(goat.id || goat._id), goat);
      });

      return Array.from(map.values());
    });
  }

  function clearAllGoats() {
    setSelectedGoats([]);
  }

  async function submit(e) {
    e.preventDefault();
    if (saving) return;

    setError("");

    if (!title.trim()) {
      setError("Enter the event title.");
      return;
    }

    if (!type) {
      setError("Select the event type.");
      return;
    }

    if (!eventDate) {
      setError("Select the event date.");
      return;
    }

    if (isMass) {
      if (selectedGoats.length === 0) {
        setError("Please select at least one goat.");
        return;
      }

      const record = {
        id: initialData?.id || initialData?._id,
        mode: "mass",
        title: title.trim(),
        type,
        eventDate,
        goatIds: selectedGoats.map((goat) => goat.id || goat._id),
        goats: selectedGoats.map((goat) => ({
          id: goat.id || goat._id,
          name: goat.name,
          breed: goat.breed,
          tagNumber: goat.tagNumber,
        })),
        goatCount: selectedGoats.length,
        notes: notes.trim(),
      };

      try {
        setSaving(true);
        await onSave(record);
      } catch (saveError) {
        setError(saveError.message || "Failed to save event.");
      } finally {
        setSaving(false);
      }

      return;
    }

    if (!selectedGoat) {
      setError("Please select a goat.");
      return;
    }

    const record = {
      id: initialData?.id || initialData?._id,
      mode: "individual",
      title: title.trim(),
      type,
      eventDate,
      goatId: selectedGoat.id || selectedGoat._id,
      goatName: selectedGoat.name,
      goatTagNumber: selectedGoat.tagNumber,
      notes: notes.trim(),
    };

    try {
      setSaving(true);
      await onSave(record);
    } catch (saveError) {
      setError(saveError.message || "Failed to save event.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="events-overlay" onClick={onClose}>
      <form
        className="events-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
      >
        <div className="events-form-handle" />

        <div className="events-form-header">
          <div>
            <small>
              {initialData
                ? "EDIT EVENT"
                : isMass
                ? "NEW MASS EVENT"
                : "NEW EVENT"}
            </small>
            <h2>
              {initialData
                ? isMass
                  ? "Edit Mass Event"
                  : "Edit Event"
                : isMass
                ? "Add Mass Event"
                : "Add Event"}
            </h2>
          </div>

          <button className="events-form-close" type="button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="events-form-body">
          {isMass ? (
            <>
              <div className="events-info-box">
                <div className="events-info-icon">
                  <Users size={18} />
                </div>
                <div>
                  <strong>Mass Event</strong>
                  <span>Select multiple goats for the same activity.</span>
                </div>
              </div>

              <div className="events-selection-header">
                <div>
                  <span className="events-field-label">Select Goats</span>
                  <small>
                    {selectedGoats.length} goat
                    {selectedGoats.length !== 1 ? "s" : ""} selected
                  </small>
                </div>

                <div className="events-select-actions">
                  <button
                    type="button"
                    onClick={selectAllGoats}
                    disabled={!goatSearch.trim() || filteredGoats.length === 0}
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    className="danger"
                    onClick={clearAllGoats}
                    disabled={selectedGoats.length === 0}
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="events-goat-search">
                <Search size={18} />
                <input
                  value={goatSearch}
                  onChange={(e) => setGoatSearch(e.target.value)}
                  placeholder="Search by goat name or tag number..."
                />
                {goatSearch && (
                  <button
                    type="button"
                    className="events-search-clear"
                    onClick={() => setGoatSearch("")}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {selectedGoats.length > 0 && (
                <div className="events-selected-mass">
                  {selectedGoats.map((goat) => (
                    <div
                      className="events-selected-chip"
                      key={goat.id || goat._id}
                    >
                      <span>
                        🐐 {goat.name}
                        {goat.tagNumber ? ` #${goat.tagNumber}` : ""}
                      </span>
                      <button type="button" onClick={() => toggleGoat(goat)}>
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="events-goat-results">
                {!goatSearch.trim() ? (
                  <NoGoats searching={false} />
                ) : filteredGoats.length === 0 ? (
                  <NoGoats searching />
                ) : (
                  filteredGoats.map((goat) => {
                    const checked = isGoatSelected(goat);

                    return (
                      <button
                        className={
                          checked
                            ? "events-goat-option selected"
                            : "events-goat-option"
                        }
                        key={goat.id || goat._id}
                        type="button"
                        onClick={() => toggleGoat(goat)}
                      >
                        <div className="events-goat-avatar">🐐</div>
                        <div className="events-goat-details">
                          <strong>{goat.name}</strong>
                          <span>
                            {goat.breed}
                            {goat.tagNumber ? ` · Tag #${goat.tagNumber}` : ""}
                          </span>
                        </div>
                        <div className={checked ? "events-checkbox checked" : "events-checkbox"}>
                          {checked && <Check size={15} />}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </>
          ) : (
            <>
              <span className="events-field-label">Select Goat</span>

              <div className="events-goat-search">
                <Search size={18} />
                <input
                  value={goatSearch}
                  onChange={(e) => setGoatSearch(e.target.value)}
                  placeholder="Search by goat name or tag number..."
                />
                {goatSearch && (
                  <button
                    type="button"
                    className="events-search-clear"
                    onClick={() => setGoatSearch("")}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {selectedGoat && (
                <div className="events-selected-goat">
                  <div className="events-goat-avatar">🐐</div>
                  <div className="events-goat-details">
                    <strong>{selectedGoat.name}</strong>
                    <span>
                      {selectedGoat.breed}
                      {selectedGoat.tagNumber
                        ? ` · Tag #${selectedGoat.tagNumber}`
                        : ""}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="events-remove-goat"
                    onClick={() => {
                      setSelectedGoat(null);
                      setGoatSearch("");
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {!selectedGoat && (
                <div className="events-goat-results">
                  {!goatSearch.trim() ? (
                    <NoGoats searching={false} />
                  ) : filteredGoats.length === 0 ? (
                    <NoGoats searching />
                  ) : (
                    filteredGoats.map((goat) => (
                      <button
                        className="events-goat-option"
                        key={goat.id || goat._id}
                        type="button"
                        onClick={() => {
                          setSelectedGoat(goat);
                          setGoatSearch("");
                        }}
                      >
                        <div className="events-goat-avatar">🐐</div>
                        <div className="events-goat-details">
                          <strong>{goat.name}</strong>
                          <span>
                            {goat.breed}
                            {goat.tagNumber
                              ? ` · Tag #${goat.tagNumber}`
                              : ""}
                          </span>
                        </div>
                        <ChevronRight size={18} className="events-goat-arrow" />
                      </button>
                    ))
                  )}
                </div>
              )}
            </>
          )}

          <Field label="Event title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                isMass
                  ? "Example: Vaccination for selected goats"
                  : "Example: Vaccination completed"
              }
            />
          </Field>

          <Field label="Event type">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Select event type</option>
              {EVENT_TYPES.filter((item) => item !== "All Event Types").map(
                (item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
              )}
            </select>
          </Field>

          <Field label="Event date">
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </Field>

          <div className="events-reminder">
            <Bell size={18} />
            <div>
              <strong>Event reminder</strong>
              <span>
                Browser reminders can be connected later to your notification system.
              </span>
            </div>
          </div>

          <Field label="Notes (optional)">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add any details about this event"
            />
          </Field>

          {error && <div className="events-form-error">{error}</div>}

          <button className="events-save-button" disabled={saving} type="submit">
            {saving
              ? "Saving..."
              : initialData
              ? isMass
                ? "Update Mass Event"
                : "Update Event"
              : isMass
              ? `Save Mass Event${
                  selectedGoats.length
                    ? ` (${selectedGoats.length} goats)`
                    : ""
                }`
              : "Save Event"}
          </button>
        </div>
      </form>
    </div>
  );
}

function NoGoats({ searching }) {
  return (
    <div className="events-no-goats">
      <div className="events-no-goats-icon">
        <Search size={23} />
      </div>
      <strong>{searching ? "No goats found" : "Find a goat"}</strong>
      <span>
        {searching
          ? "Try another goat name or tag number."
          : "Start typing a goat name or tag number to select a goat."}
      </span>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="events-field">
      <span className="events-field-label">{label}</span>
      {children}
    </label>
  );
}
