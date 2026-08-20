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
} from "lucide-react";
import SelectModal from "../components/SelectModel.jsx";

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

const COLORS = {
  navy: "#142B57",
  blue: "#1D4ED8",
  lightBlue: "#EEF4FF",
  text: "#172033",
  muted: "#64748B",
  border: "#D9E2F0",
  bg: "#F5F7FB",
  white: "#FFFFFF",
  red: "#DC2626",
};

const TENANT_STORAGE_KEYS = [
  "tenant",
  "currentTenant",
  "tenantData",
];

/* =========================================================
   STORAGE HELPERS
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
    try {
      const value = localStorage.getItem(key);

      if (!value) continue;

      const parsed = safeParse(value);

      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    } catch {
      // ignore
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
    id: id || `goat-${Date.now()}-${Math.random()}`,
    name: name || `Goat #${tagNumber || "Unknown"}`,
    breed: breed || "Unknown breed",
    tagNumber: tagNumber || "",
  };
}

/* =========================================================
   EXTRACT GOATS
========================================================= */

function extractGoats(source) {
  if (
    source?.data &&
    Array.isArray(source.data.goats)
  ) {
    return source.data.goats
      .map(normalizeGoat)
      .filter(Boolean);
  }

  if (
    source &&
    Array.isArray(source.goats)
  ) {
    return source.goats
      .map(normalizeGoat)
      .filter(Boolean);
  }

  const storedTenant = getStoredTenant();

  if (
    storedTenant?.data &&
    Array.isArray(storedTenant.data.goats)
  ) {
    return storedTenant.data.goats
      .map(normalizeGoat)
      .filter(Boolean);
  }

  if (
    storedTenant &&
    Array.isArray(storedTenant.goats)
  ) {
    return storedTenant.goats
      .map(normalizeGoat)
      .filter(Boolean);
  }

  return [];
}

/* =========================================================
   EXTRACT EVENTS
========================================================= */

function extractEvents(source) {
  if (
    source?.data &&
    Array.isArray(source.data.events)
  ) {
    return source.data.events;
  }

  if (
    source &&
    Array.isArray(source.events)
  ) {
    return source.events;
  }

  const storedTenant = getStoredTenant();

  if (
    storedTenant?.data &&
    Array.isArray(storedTenant.data.events)
  ) {
    return storedTenant.data.events;
  }

  if (
    storedTenant &&
    Array.isArray(storedTenant.events)
  ) {
    return storedTenant.events;
  }

  return [];
}

/* =========================================================
   SAVE TENANT
========================================================= */

function saveTenantData(tenant, goats, events) {
  const existingTenant =
    tenant || getStoredTenant();

  if (
    !existingTenant ||
    typeof existingTenant !== "object"
  ) {
    return;
  }

  const updatedTenant = {
    ...existingTenant,

    data: {
      ...(existingTenant.data || {}),
      goats: Array.isArray(goats)
        ? goats
        : [],
      events: Array.isArray(events)
        ? events
        : [],
    },
  };

  try {
    let storageKey = "tenant";

    for (const key of TENANT_STORAGE_KEYS) {
      if (localStorage.getItem(key) !== null) {
        storageKey = key;
        break;
      }
    }

    localStorage.setItem(
      storageKey,
      JSON.stringify(updatedTenant)
    );

    window.dispatchEvent(
      new CustomEvent("tenant-data-updated", {
        detail: updatedTenant,
      })
    );
  } catch {
    // ignore
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function EventsPage({
  tenant,
  onBack,
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord,
}) {
  const [goatsData, setGoatsData] = useState(() =>
    extractGoats(tenant)
  );

  const [eventsData, setEventsData] = useState(() =>
    extractEvents(tenant)
  );

  const [eventType, setEventType] =
    useState("All Event Types");

  const [typeModalOpen, setTypeModalOpen] =
    useState(false);

  const [typeQuery, setTypeQuery] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [formOpen, setFormOpen] =
    useState(false);

  const [editingEvent, setEditingEvent] =
    useState(null);

  const [menuOpen, setMenuOpen] =
    useState(null);

  const [mode, setMode] =
    useState("individual");

  /* =======================================================
     LOAD DATA
  ======================================================= */

  const refreshData = () => {
    const latestTenant =
      getStoredTenant();

    const source =
      latestTenant || tenant;

    setGoatsData(
      extractGoats(source)
    );

    setEventsData(
      extractEvents(source)
    );
  };

  /* =======================================================
     TENANT CHANGE
  ======================================================= */

  useEffect(() => {
    setGoatsData(
      extractGoats(tenant)
    );

    setEventsData(
      extractEvents(tenant)
    );
  }, [tenant]);

  /* =======================================================
     LISTEN FOR UPDATES
  ======================================================= */

  useEffect(() => {
    const handleTenantUpdate = (event) => {
      const updatedTenant =
        event?.detail;

      if (
        updatedTenant &&
        typeof updatedTenant === "object"
      ) {
        setGoatsData(
          extractGoats(updatedTenant)
        );

        setEventsData(
          extractEvents(updatedTenant)
        );

        return;
      }

      refreshData();
    };

    const handleStorage = (event) => {
      if (
        event.key &&
        TENANT_STORAGE_KEYS.includes(
          event.key
        )
      ) {
        refreshData();
      }
    };

    window.addEventListener(
      "tenant-data-updated",
      handleTenantUpdate
    );

    window.addEventListener(
      "storage",
      handleStorage
    );

    /*
     * Keep this for syncing goat page data.
     * Important: this no longer resets selected goat
     * inside AddEventForm.
     */
    const interval = setInterval(
      refreshData,
      1000
    );

    return () => {
      window.removeEventListener(
        "tenant-data-updated",
        handleTenantUpdate
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );

      clearInterval(interval);
    };
  }, [tenant]);

  /* =======================================================
     REAL GOATS
  ======================================================= */

  const realGoats = useMemo(() => {
    return goatsData
      .map(normalizeGoat)
      .filter(Boolean)
      .filter((goat) => {
        return (
          goat.id ||
          goat.name ||
          goat.tagNumber
        );
      });
  }, [goatsData]);

  /* =======================================================
     FILTER EVENTS
  ======================================================= */

  const filteredEvents = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return [...eventsData]
      .filter((event) => {
        /*
         * Old records without mode are treated
         * as individual records.
         */
        const eventMode =
          event.mode || "individual";

        const modeMatch =
          eventMode === mode;

        const typeMatch =
          eventType ===
            "All Event Types" ||
          event.type === eventType;

        const massGoatNames =
          Array.isArray(event.goats)
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

        return (
          modeMatch &&
          typeMatch &&
          searchable.includes(query)
        );
      })
      .sort((a, b) => {
        return (
          new Date(
            b.eventDate || 0
          ) -
          new Date(
            a.eventDate || 0
          )
        );
      });
  }, [
    eventsData,
    eventType,
    search,
    mode,
  ]);

  /* =======================================================
     FIND GOAT
  ======================================================= */

  function findGoat(event) {
    if (!event) return null;

    const goatId =
      event.goatId ||
      event.goatID;

    if (goatId) {
      const byId =
        realGoats.find(
          (goat) =>
            String(goat.id) ===
            String(goatId)
        );

      if (byId) return byId;
    }

    const tag =
      event.goatTagNumber ||
      event.tagNumber;

    if (tag) {
      const byTag =
        realGoats.find(
          (goat) =>
            String(goat.tagNumber) ===
            String(tag)
        );

      if (byTag) return byTag;
    }

    const name =
      event.goatName?.trim();

    if (name) {
      const byName =
        realGoats.find(
          (goat) =>
            goat.name
              ?.trim()
              .toLowerCase() ===
            name.toLowerCase()
        );

      if (byName) return byName;
    }

    return null;
  }

  /* =======================================================
     ADD
  ======================================================= */

  function handleAddEvent(record) {
    const nextEvents = [
      record,
      ...eventsData,
    ];

    setEventsData(nextEvents);

    onAddRecord?.(record);

    saveTenantData(
      tenant,
      realGoats,
      nextEvents
    );

    closeForm();
  }

  /* =======================================================
     UPDATE
  ======================================================= */

  function handleUpdateEvent(record) {
    const nextEvents =
      eventsData.map((event) =>
        String(event.id) ===
        String(record.id)
          ? record
          : event
      );

    setEventsData(nextEvents);

    onUpdateRecord?.(record);

    saveTenantData(
      tenant,
      realGoats,
      nextEvents
    );

    closeForm();
  }

  /* =======================================================
     DELETE
  ======================================================= */

  function handleDeleteEvent(id) {
    const confirmed =
      window.confirm(
        "Are you sure you want to remove this event?"
      );

    if (!confirmed) return;

    const nextEvents =
      eventsData.filter(
        (event) =>
          String(event.id) !==
          String(id)
      );

    setEventsData(nextEvents);

    onDeleteRecord?.(id);

    saveTenantData(
      tenant,
      realGoats,
      nextEvents
    );

    setMenuOpen(null);
  }

  /* =======================================================
     FORM
  ======================================================= */

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

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <button
            onClick={onBack}
            style={styles.backButton}
          >
            <ArrowLeft size={20} />

            <div>
              <div style={styles.headerTitle}>
                Events
              </div>

              <div style={styles.headerSubtitle}>
                Track every event across
                your herd.
              </div>
            </div>
          </button>

          <div style={styles.headerActions}>
            <button
              onClick={() => {
                setSearch("");
                refreshData();
              }}
              style={styles.headerIcon}
            >
              <Search size={19} />
            </button>

            <button
              onClick={refreshData}
              style={styles.headerIcon}
            >
              <MoreVertical size={19} />
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main style={styles.content}>
        {/* SEARCH */}
        <div style={styles.searchBox}>
          <Search
            size={19}
            color="#64748B"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search events or goats..."
            style={styles.searchInput}
          />

          {search && (
            <button
              onClick={() =>
                setSearch("")
              }
              style={styles.clearSearch}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* TABS */}
        <div style={styles.tabs}>
          <button
            onClick={() => {
              setMode("individual");
              setEditingEvent(null);
              setFormOpen(false);
            }}
            style={{
              ...styles.tab,
              ...(mode === "individual"
                ? styles.activeTab
                : {}),
            }}
          >
            <User size={17} />
            Individual
          </button>

          <button
            onClick={() => {
              setMode("mass");
              setEditingEvent(null);
              setFormOpen(false);
            }}
            style={{
              ...styles.tab,
              ...(mode === "mass"
                ? styles.activeTab
                : {}),
            }}
          >
            <Users size={17} />
            Mass Event
          </button>
        </div>

        {/* SECTION */}
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>
              {mode === "individual"
                ? "Individual events"
                : "Mass events"}
            </h2>

            <p style={styles.sectionCount}>
              {filteredEvents.length}{" "}
              record
              {filteredEvents.length !== 1
                ? "s"
                : ""}{" "}
              on this herd
            </p>
          </div>

          <button
            onClick={openAddForm}
            style={styles.addButton}
          >
            + New Event
          </button>
        </div>

        {/* FILTER */}
        <button
          onClick={() =>
            setTypeModalOpen(true)
          }
          style={styles.filterButton}
        >
          <span>{eventType}</span>
          <ChevronDown size={19} />
        </button>

        {/* EVENTS */}
        {filteredEvents.length === 0 ? (
          <EmptyState mode={mode} />
        ) : (
          <div>
            {filteredEvents.map((event) => {
              const goat =
                findGoat(event);

              return (
                <EventCard
                  key={event.id}
                  event={event}
                  goat={goat}
                  menuOpen={menuOpen}
                  setMenuOpen={setMenuOpen}
                  onEdit={openEditForm}
                  onDelete={handleDeleteEvent}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* FLOATING BUTTON */}
      <button
        onClick={openAddForm}
        style={styles.floatingButton}
      >
        + Add Event
      </button>

      {/* TYPE MODAL */}
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

      {/* ADD / EDIT FORM */}
      {formOpen && (
        <AddEventForm
          goats={realGoats}
          initialData={editingEvent}
          mode={mode}
          onClose={closeForm}
          onSave={
            editingEvent
              ? handleUpdateEvent
              : handleAddEvent
          }
        />
      )}
    </div>
  );
}

/* =========================================================
   EVENT CARD
========================================================= */

function EventCard({
  event,
  goat,
  menuOpen,
  setMenuOpen,
  onEdit,
  onDelete,
}) {
  const isMass =
    event.mode === "mass";

  return (
    <div style={styles.eventCard}>
      <div style={styles.eventTop}>
        <div style={styles.eventIcon}>
          <CalendarDays size={20} />
        </div>

        <div style={styles.eventMain}>
          <h3 style={styles.eventTitle}>
            {event.title ||
              "Untitled Event"}
          </h3>

          {/* INDIVIDUAL */}
          {!isMass && (
            <div style={styles.goatInfo}>
              <span>
                🐐{" "}
                {event.goatName ||
                  "All goats"}
              </span>

              {goat?.breed && (
                <span>
                  · {goat.breed}
                </span>
              )}

              {goat?.tagNumber && (
                <span>
                  · Tag #
                  {goat.tagNumber}
                </span>
              )}
            </div>
          )}

          {/* MASS */}
          {isMass && (
            <div style={styles.massGoats}>
              <div style={styles.massGoatHeader}>
                <Users size={15} />
                <strong>
                  {event.goatCount ||
                    event.goats?.length ||
                    0}{" "}
                  goats
                </strong>
              </div>

              <div style={styles.massGoatList}>
                {Array.isArray(
                  event.goats
                ) &&
                  event.goats.map(
                    (item) => (
                      <span
                        key={
                          item.id ||
                          item.tagNumber ||
                          item.name
                        }
                        style={
                          styles.massGoatChip
                        }
                      >
                        🐐{" "}
                        {item.name}

                        {item.tagNumber
                          ? ` #${item.tagNumber}`
                          : ""}
                      </span>
                    )
                  )}
              </div>
            </div>
          )}

          <div style={styles.date}>
            {event.eventDate || "—"}
          </div>
        </div>

        <div style={styles.eventActions}>
          <span style={styles.typeBadge}>
            {event.type || "Other"}
          </span>

          <button
            onClick={() =>
              setMenuOpen(
                menuOpen === event.id
                  ? null
                  : event.id
              )
            }
            style={styles.moreButton}
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {event.notes && (
        <div style={styles.notes}>
          {event.notes}
        </div>
      )}

      {menuOpen === event.id && (
        <div style={styles.menu}>
          <button
            onClick={() =>
              onEdit(event)
            }
            style={styles.menuItem}
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={() =>
              onDelete(event.id)
            }
            style={{
              ...styles.menuItem,
              color: COLORS.red,
            }}
          >
            <Trash2 size={16} />
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({ mode }) {
  return (
    <div style={styles.empty}>
      {mode === "mass" ? (
        <Users
          size={42}
          color="#94A3B8"
        />
      ) : (
        <CalendarDays
          size={42}
          color="#94A3B8"
        />
      )}

      <strong>
        {mode === "mass"
          ? "No mass events found"
          : "No events found"}
      </strong>

      <span>
        Create your first event using
        the Add Event button.
      </span>
    </div>
  );
}

/* =========================================================
   ADD / EDIT EVENT FORM
========================================================= */

function AddEventForm({
  goats,
  initialData,
  mode,
  onClose,
  onSave,
}) {
  const isMass =
    mode === "mass" ||
    initialData?.mode === "mass";

  /* =======================================================
     INDIVIDUAL GOAT
  ======================================================= */

  const [selectedGoat, setSelectedGoat] =
    useState(null);

  /* =======================================================
     MASS GOATS
  ======================================================= */

  const [selectedGoats, setSelectedGoats] =
    useState([]);

  const [goatSearch, setGoatSearch] =
    useState("");

  const [title, setTitle] =
    useState(
      initialData?.title || ""
    );

  const [type, setType] =
    useState(
      initialData?.type || ""
    );

  const [eventDate, setEventDate] =
    useState(
      initialData?.eventDate || ""
    );

  const [notes, setNotes] =
    useState(
      initialData?.notes || ""
    );

  const [error, setError] =
    useState("");

  /* =======================================================
     INITIAL EDIT LOAD
     
     IMPORTANT:
     Do NOT reset selected goat every time `goats`
     changes. This fixes the 1-second clear issue.
  ======================================================= */

  useEffect(() => {
    if (!initialData) {
      return;
    }

    /*
     * MASS EVENT EDIT
     */
    if (
      initialData.mode === "mass" ||
      Array.isArray(initialData.goats)
    ) {
      const savedGoats =
        Array.isArray(
          initialData.goats
        )
          ? initialData.goats
          : [];

      const matchedGoats =
        savedGoats
          .map((savedGoat) => {
            return (
              goats.find(
                (goat) =>
                  String(goat.id) ===
                  String(
                    savedGoat.id
                  )
              ) ||
              goats.find(
                (goat) =>
                  String(
                    goat.tagNumber
                  ) ===
                  String(
                    savedGoat.tagNumber
                  )
              ) ||
              savedGoat
            );
          })
          .filter(Boolean);

      setSelectedGoats(
        matchedGoats
      );

      return;
    }

    /*
     * INDIVIDUAL EVENT EDIT
     */
    let found = null;

    const goatId =
      initialData.goatId ||
      initialData.goatID;

    if (goatId) {
      found = goats.find(
        (goat) =>
          String(goat.id) ===
          String(goatId)
      );
    }

    if (
      !found &&
      initialData.goatTagNumber
    ) {
      found = goats.find(
        (goat) =>
          String(
            goat.tagNumber
          ) ===
          String(
            initialData.goatTagNumber
          )
      );
    }

    if (
      !found &&
      initialData.goatName
    ) {
      found = goats.find(
        (goat) =>
          goat.name
            ?.trim()
            .toLowerCase() ===
          initialData.goatName
            ?.trim()
            .toLowerCase()
      );
    }

    setSelectedGoat(
      found || null
    );
  }, [initialData, goats]);

  /* =======================================================
     FILTER GOATS
  ======================================================= */

  const filteredGoats = useMemo(() => {
    if (!Array.isArray(goats)) {
      return [];
    }

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
          goat.breed,
          goat.tagNumber,
          goat.id,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return text.includes(query);
      }
    );
  }, [goats, goatSearch]);

  /* =======================================================
     MASS GOAT CHECK
  ======================================================= */

  function isGoatSelected(goat) {
    return selectedGoats.some(
      (item) =>
        String(item.id) ===
        String(goat.id)
    );
  }

  /* =======================================================
     TOGGLE MASS GOAT
  ======================================================= */

  function toggleGoat(goat) {
    setSelectedGoats((current) => {
      const exists = current.some(
        (item) =>
          String(item.id) ===
          String(goat.id)
      );

      if (exists) {
        return current.filter(
          (item) =>
            String(item.id) !==
            String(goat.id)
        );
      }

      return [
        ...current,
        goat,
      ];
    });
  }

  /* =======================================================
     SELECT ALL
  ======================================================= */

  function selectAllGoats() {
    setSelectedGoats(
      filteredGoats
    );
  }

  /* =======================================================
     CLEAR ALL
  ======================================================= */

  function clearAllGoats() {
    setSelectedGoats([]);
  }

  /* =======================================================
     SUBMIT
  ======================================================= */

  function submit(e) {
    e.preventDefault();

    setError("");

    if (!title.trim()) {
      setError(
        "Enter the event title."
      );
      return;
    }

    if (!type) {
      setError(
        "Select the event type."
      );
      return;
    }

    if (!eventDate) {
      setError(
        "Select the event date."
      );
      return;
    }

    /* =====================================================
       MASS EVENT
    ===================================================== */

    if (isMass) {
      if (
        selectedGoats.length === 0
      ) {
        setError(
          "Please select at least one goat."
        );
        return;
      }

      const record = {
        id:
          initialData?.id ||
          `event-${Date.now()}`,

        mode: "mass",

        title: title.trim(),

        type,

        eventDate,

        goatIds:
          selectedGoats.map(
            (goat) => goat.id
          ),

        goats:
          selectedGoats.map(
            (goat) => ({
              id: goat.id,
              name: goat.name,
              breed: goat.breed,
              tagNumber:
                goat.tagNumber,
            })
          ),

        goatCount:
          selectedGoats.length,

        notes: notes.trim(),
      };

      onSave(record);
      return;
    }

    /* =====================================================
       INDIVIDUAL EVENT
       KEEPING ORIGINAL BEHAVIOR
    ===================================================== */

    if (!selectedGoat) {
      setError(
        "Please select a goat."
      );
      return;
    }

    const record = {
      id:
        initialData?.id ||
        `event-${Date.now()}`,

      mode: "individual",

      title: title.trim(),

      type,

      eventDate,

      goatId:
        selectedGoat.id,

      goatName:
        selectedGoat.name,

      goatTagNumber:
        selectedGoat.tagNumber,

      notes: notes.trim(),
    };

    onSave(record);
  }

  /* =======================================================
     FORM
  ======================================================= */

  return (
    <div
      onClick={onClose}
      style={styles.overlay}
    >
      <form
        onClick={(e) =>
          e.stopPropagation()
        }
        onSubmit={submit}
        style={styles.form}
      >
        <div
          style={styles.formHandle}
        />

        {/* HEADER */}
        <div
          style={styles.formHeader}
        >
          <div>
            <small
              style={styles.formLabel}
            >
              {initialData
                ? "EDIT EVENT"
                : isMass
                ? "NEW MASS EVENT"
                : "NEW EVENT"}
            </small>

            <h2
              style={styles.formTitle}
            >
              {initialData
                ? isMass
                  ? "Edit Mass Event"
                  : "Edit Event"
                : isMass
                ? "Add Mass Event"
                : "Add Event"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={styles.closeButton}
          >
            <X size={18} />
          </button>
        </div>

        <div style={styles.formBody}>
          {/* =================================================
              MASS MODE
          ================================================= */}

          {isMass ? (
            <>
              <div
                style={
                  styles.massInfoBox
                }
              >
                <Users size={19} />

                <div>
                  <strong>
                    Mass Event
                  </strong>

                  <span>
                    Select multiple goats for
                    the same work on the same
                    date.
                  </span>
                </div>
              </div>

              {/* SELECTED COUNT */}
              <div
                style={
                  styles.selectionHeader
                }
              >
                <div>
                  <span
                    style={
                      styles.label
                    }
                  >
                    Select Goats
                  </span>

                  <div
                    style={
                      styles.selectedCount
                    }
                  >
                    {selectedGoats.length}{" "}
                    goat
                    {selectedGoats.length !==
                    1
                      ? "s"
                      : ""}{" "}
                    selected
                  </div>
                </div>

                <div
                  style={
                    styles.selectActions
                  }
                >
                  <button
                    type="button"
                    onClick={
                      selectAllGoats
                    }
                    style={
                      styles.smallAction
                    }
                  >
                    Select All
                  </button>

                  <button
                    type="button"
                    onClick={
                      clearAllGoats
                    }
                    style={{
                      ...styles.smallAction,
                      color: COLORS.red,
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* GOAT SEARCH */}
              <div
                style={
                  styles.goatSearch
                }
              >
                <Search
                  size={18}
                  color="#64748B"
                />

                <input
                  value={goatSearch}
                  onChange={(e) =>
                    setGoatSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search goat..."
                  style={
                    styles.searchInput
                  }
                />

                {goatSearch && (
                  <button
                    type="button"
                    onClick={() =>
                      setGoatSearch("")
                    }
                    style={
                      styles.clearSearch
                    }
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* SELECTED GOAT CHIPS */}
              {selectedGoats.length >
                0 && (
                <div
                  style={
                    styles.selectedMassBox
                  }
                >
                  {selectedGoats.map(
                    (goat) => (
                      <div
                        key={goat.id}
                        style={
                          styles.selectedMassChip
                        }
                      >
                        <span>
                          🐐{" "}
                          {goat.name}

                          {goat.tagNumber
                            ? ` #${goat.tagNumber}`
                            : ""}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            toggleGoat(
                              goat
                            )
                          }
                          style={
                            styles.chipRemove
                          }
                        >
                          <X
                            size={13}
                          />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}

              {/* GOAT LIST */}
              <div
                style={
                  styles.massGoatListForm
                }
              >
                {filteredGoats.length ===
                0 ? (
                  <div
                    style={
                      styles.noGoats
                    }
                  >
                    <Users
                      size={30}
                      color="#94A3B8"
                    />

                    <strong>
                      {goatSearch
                        ? "No goats found"
                        : "No goats created yet"}
                    </strong>

                    <span>
                      {goatSearch
                        ? "Try another name, breed or tag."
                        : "Add a goat first from the Goats page."}
                    </span>
                  </div>
                ) : (
                  filteredGoats.map(
                    (goat) => {
                      const checked =
                        isGoatSelected(
                          goat
                        );

                      return (
                        <button
                          key={
                            goat.id
                          }
                          type="button"
                          onClick={() =>
                            toggleGoat(
                              goat
                            )
                          }
                          style={{
                            ...styles.massGoatOption,
                            ...(checked
                              ? styles.massGoatOptionSelected
                              : {}),
                          }}
                        >
                          <div
                            style={
                              styles.goatAvatar
                            }
                          >
                            🐐
                          </div>

                          <div
                            style={
                              styles.goatDetails
                            }
                          >
                            <strong>
                              {
                                goat.name
                              }
                            </strong>

                            <span>
                              {
                                goat.breed
                              }

                              {goat.tagNumber
                                ? ` · Tag #${goat.tagNumber}`
                                : ""}
                            </span>
                          </div>

                          <div
                            style={{
                              ...styles.checkBox,
                              ...(checked
                                ? styles.checkBoxActive
                                : {}),
                            }}
                          >
                            {checked && (
                              <Check
                                size={
                                  15
                                }
                              />
                            )}
                          </div>
                        </button>
                      );
                    }
                  )
                )}
              </div>
            </>
          ) : (
            /* =================================================
               INDIVIDUAL MODE
            ================================================= */
            <>
              <label
                style={styles.label}
              >
                Select Goat
              </label>

              <div
                style={
                  styles.goatSearch
                }
              >
                <Search
                  size={18}
                  color="#64748B"
                />

                <input
                  value={goatSearch}
                  onChange={(e) =>
                    setGoatSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search goat..."
                  style={
                    styles.searchInput
                  }
                />

                {goatSearch && (
                  <button
                    type="button"
                    onClick={() =>
                      setGoatSearch("")
                    }
                    style={
                      styles.clearSearch
                    }
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* SELECTED GOAT */}
              {selectedGoat && (
                <div
                  style={
                    styles.selectedGoat
                  }
                >
                  <div
                    style={
                      styles.goatAvatar
                    }
                  >
                    🐐
                  </div>

                  <div
                    style={
                      styles.goatDetails
                    }
                  >
                    <strong>
                      {
                        selectedGoat.name
                      }
                    </strong>

                    <span>
                      {
                        selectedGoat.breed
                      }

                      {selectedGoat.tagNumber
                        ? ` · Tag #${selectedGoat.tagNumber}`
                        : ""}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedGoat(
                        null
                      )
                    }
                    style={
                      styles.removeGoat
                    }
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* GOAT LIST */}
              {!selectedGoat && (
                <div
                  style={
                    styles.goatList
                  }
                >
                  {filteredGoats.length ===
                  0 ? (
                    <div
                      style={
                        styles.noGoats
                      }
                    >
                      <Users
                        size={30}
                        color="#94A3B8"
                      />

                      <strong>
                        {goatSearch
                          ? "No goats found"
                          : "No goats created yet"}
                      </strong>

                      <span>
                        {goatSearch
                          ? "Try another name, breed or tag."
                          : "Add a goat first from the Goats page."}
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
                          }}
                          style={
                            styles.goatOption
                          }
                        >
                          <div
                            style={
                              styles.goatAvatar
                            }
                          >
                            🐐
                          </div>

                          <div
                            style={
                              styles.goatDetails
                            }
                          >
                            <strong>
                              {
                                goat.name
                              }
                            </strong>

                            <span>
                              {
                                goat.breed
                              }

                              {goat.tagNumber
                                ? ` · Tag #${goat.tagNumber}`
                                : ""}
                            </span>
                          </div>

                          <ChevronRight
                            size={18}
                            color="#94A3B8"
                          />
                        </button>
                      )
                    )
                  )}
                </div>
              )}
            </>
          )}

          {/* TITLE */}
          <Field label="Event title">
            <input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder={
                isMass
                  ? "Example: Vaccination for all selected goats"
                  : "Example: Vaccination completed"
              }
              style={styles.input}
            />
          </Field>

          {/* TYPE */}
          <Field label="Event type">
            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target.value
                )
              }
              style={styles.input}
            >
              <option value="">
                Select event type
              </option>

              {EVENT_TYPES.filter(
                (item) =>
                  item !==
                  "All Event Types"
              ).map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </Field>

          {/* DATE */}
          <Field label="Event date">
            <input
              type="date"
              value={eventDate}
              onChange={(e) =>
                setEventDate(
                  e.target.value
                )
              }
              style={styles.input}
            />
          </Field>

          {/* REMINDER */}
          <div
            style={styles.reminder}
          >
            <Bell size={18} />

            <div>
              <strong>
                Event reminder
              </strong>

              <span>
                You will get a browser
                notification on the
                selected date.
              </span>
            </div>
          </div>

          {/* NOTES */}
          <Field label="Notes (optional)">
            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              rows={3}
              placeholder="Add any details about this event"
              style={{
                ...styles.input,
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </Field>

          {/* ERROR */}
          {error && (
            <div
              style={styles.error}
            >
              {error}
            </div>
          )}

          {/* SAVE */}
          <button
            type="submit"
            style={
              styles.saveButton
            }
          >
            {initialData
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

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  children,
}) {
  return (
    <label style={styles.field}>
      <span style={styles.label}>
        {label}
      </span>

      {children}
    </label>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: COLORS.bg,
    color: COLORS.text,
  },

  header: {
    background:
      "linear-gradient(135deg,#142B57,#1D4386)",
    color: "#fff",
  },

  headerInner: {
    maxWidth: 1180,
    margin: "0 auto",
    minHeight: 78,
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    border: 0,
    background: "transparent",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: 800,
    textAlign: "left",
  },

  headerSubtitle: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 3,
  },

  headerActions: {
    display: "flex",
    gap: 8,
  },

  headerIcon: {
    width: 42,
    height: 42,
    border: 0,
    borderRadius: 12,
    background:
      "rgba(255,255,255,.1)",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },

  content: {
    maxWidth: 1140,
    margin: "0 auto",
    padding:
      "22px 20px 100px",
  },

  searchBox: {
    height: 46,
    background: "#fff",
    border:
      `1px solid ${COLORS.border}`,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "0 14px",
  },

  searchInput: {
    flex: 1,
    border: 0,
    outline: 0,
    background: "transparent",
    fontSize: 14,
    color: COLORS.text,
  },

  clearSearch: {
    border: 0,
    background: "transparent",
    cursor: "pointer",
    color: COLORS.muted,
    display: "grid",
    placeItems: "center",
  },

  tabs: {
    display: "inline-flex",
    marginTop: 16,
    background: "#E8EDF5",
    padding: 4,
    borderRadius: 12,
  },

  tab: {
    border: 0,
    background: "transparent",
    padding: "10px 18px",
    borderRadius: 9,
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 700,
    color: COLORS.navy,
    cursor: "pointer",
  },

  activeTab: {
    background: COLORS.blue,
    color: "#fff",
  },

  sectionHeader: {
    marginTop: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },

  sectionTitle: {
    margin: 0,
    fontSize: 20,
  },

  sectionCount: {
    margin: "5px 0 0",
    color: COLORS.muted,
    fontSize: 13,
  },

  addButton: {
    border:
      `1px solid ${COLORS.blue}`,
    background: "#fff",
    color: COLORS.blue,
    borderRadius: 12,
    padding: "10px 16px",
    fontWeight: 700,
    cursor: "pointer",
  },

  filterButton: {
    width: "100%",
    margin: "18px 0",
    background: "#fff",
    border:
      `1px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: "13px 15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: COLORS.navy,
    fontWeight: 700,
    cursor: "pointer",
  },

  eventCard: {
    position: "relative",
    background: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    border: "1px solid #E8EDF4",
    boxShadow:
      "0 3px 12px rgba(15,23,42,.04)",
  },

  eventTop: {
    display: "flex",
    gap: 13,
    alignItems: "flex-start",
  },

  eventIcon: {
    width: 44,
    height: 44,
    flexShrink: 0,
    borderRadius: 13,
    background:
      COLORS.lightBlue,
    color: COLORS.blue,
    display: "grid",
    placeItems: "center",
  },

  eventMain: {
    flex: 1,
    minWidth: 0,
  },

  eventTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 800,
  },

  goatInfo: {
    display: "flex",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 5,
    color: COLORS.muted,
    fontSize: 13,
  },

  date: {
    marginTop: 8,
    color: COLORS.muted,
    fontSize: 12,
  },

  eventActions: {
    display: "flex",
    alignItems: "center",
    gap: 7,
  },

  typeBadge: {
    background:
      COLORS.lightBlue,
    color: COLORS.blue,
    padding: "6px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 800,
    whiteSpace: "nowrap",
  },

  moreButton: {
    width: 34,
    height: 34,
    border: 0,
    borderRadius: 10,
    background: "#F1F5F9",
    color: "#475569",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },

  notes: {
    marginTop: 13,
    paddingTop: 12,
    borderTop:
      "1px solid #EEF2F7",
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 1.5,
  },

  menu: {
    position: "absolute",
    top: 58,
    right: 18,
    width: 145,
    background: "#fff",
    border:
      "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 5,
    boxShadow:
      "0 12px 30px rgba(15,23,42,.14)",
    zIndex: 20,
  },

  menuItem: {
    width: "100%",
    border: 0,
    background: "transparent",
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "10px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    textAlign: "left",
  },

  empty: {
    minHeight: 300,
    background: "#fff",
    borderRadius: 18,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    color: COLORS.muted,
  },

  floatingButton: {
    position: "fixed",
    right: 24,
    bottom: 22,
    border: 0,
    borderRadius: 30,
    background: COLORS.blue,
    color: "#fff",
    padding: "14px 22px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow:
      "0 10px 25px rgba(29,78,216,.28)",
    zIndex: 30,
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background:
      "rgba(15,23,42,.48)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    zIndex: 100,
  },

  form: {
    width: "100%",
    maxWidth: 500,
    maxHeight: "92vh",
    overflowY: "auto",
    background: "#fff",
    borderRadius:
      "20px 20px 0 0",
    boxShadow:
      "0 -10px 40px rgba(15,23,42,.2)",
  },

  formHandle: {
    width: 42,
    height: 4,
    borderRadius: 10,
    background: "#D8E0EC",
    margin: "10px auto 5px",
  },

  formHeader: {
    padding:
      "12px 22px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom:
      "1px solid #EEF2F7",
  },

  formLabel: {
    color: "#7890B2",
    fontWeight: 800,
    letterSpacing: 1,
    fontSize: 10,
  },

  formTitle: {
    margin: "4px 0 0",
    fontSize: 19,
  },

  closeButton: {
    width: 34,
    height: 34,
    border: 0,
    borderRadius: "50%",
    background:
      COLORS.lightBlue,
    color: "#64748B",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },

  formBody: {
    padding:
      "18px 22px 25px",
  },

  label: {
    display: "block",
    marginBottom: 7,
    fontSize: 13,
    fontWeight: 700,
    color: "#334155",
  },

  goatSearch: {
    height: 44,
    border:
      `1px solid ${COLORS.border}`,
    borderRadius: 11,
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "0 12px",
    marginBottom: 10,
  },

  goatList: {
    maxHeight: 190,
    overflowY: "auto",
    marginBottom: 17,
  },

  goatOption: {
    width: "100%",
    border:
      `1px solid ${COLORS.border}`,
    background: "#fff",
    borderRadius: 12,
    padding: 10,
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 7,
    cursor: "pointer",
    textAlign: "left",
  },

  selectedGoat: {
    border:
      "1px solid #BBD0F7",
    background: "#F5F8FF",
    borderRadius: 12,
    padding: 10,
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 17,
  },

  goatAvatar: {
    width: 40,
    height: 40,
    flexShrink: 0,
    borderRadius: 10,
    background:
      COLORS.lightBlue,
    display: "grid",
    placeItems: "center",
    fontSize: 20,
  },

  goatDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },

  removeGoat: {
    border: 0,
    background: "transparent",
    color: COLORS.muted,
    cursor: "pointer",
  },

  noGoats: {
    minHeight: 120,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    color: COLORS.muted,
    textAlign: "center",
  },

  field: {
    display: "block",
    marginBottom: 15,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    border:
      `1px solid ${COLORS.border}`,
    borderRadius: 11,
    padding: "12px",
    outline: "none",
    background: "#fff",
    color: COLORS.text,
    fontSize: 14,
  },

  reminder: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    background: "#EEF6FF",
    border: "1px solid #C9DFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    color: COLORS.blue,
  },

  reminderText: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },

  error: {
    color: "#B91C1C",
    fontSize: 13,
    marginBottom: 10,
  },

  saveButton: {
    width: "100%",
    border: 0,
    borderRadius: 12,
    padding: "13px",
    background: COLORS.blue,
    color: "#fff",
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
  },

  /* =====================================================
     MASS EVENT STYLES
  ===================================================== */

  massInfoBox: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    background: "#EEF4FF",
    border:
      "1px solid #C9D9FA",
    color: COLORS.blue,
    borderRadius: 12,
    padding: 12,
    marginBottom: 17,
  },

  selectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 10,
    marginBottom: 8,
  },

  selectedCount: {
    color: COLORS.blue,
    fontSize: 12,
    fontWeight: 700,
    marginTop: 2,
  },

  selectActions: {
    display: "flex",
    gap: 6,
  },

  smallAction: {
    border: 0,
    background: "#EEF4FF",
    color: COLORS.blue,
    borderRadius: 8,
    padding: "7px 9px",
    fontSize: 11,
    fontWeight: 800,
    cursor: "pointer",
  },

  selectedMassBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: 7,
    padding: 10,
    background: "#F8FAFF",
    border:
      "1px solid #DCE6F8",
    borderRadius: 12,
    marginBottom: 10,
  },

  selectedMassChip: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    background: "#fff",
    border:
      "1px solid #C8D7F2",
    color: COLORS.navy,
    borderRadius: 20,
    padding: "6px 8px 6px 10px",
    fontSize: 12,
    fontWeight: 700,
  },

  chipRemove: {
    width: 19,
    height: 19,
    border: 0,
    borderRadius: "50%",
    background: "#E8EEF9",
    color: COLORS.muted,
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    padding: 0,
  },

  massGoatListForm: {
    maxHeight: 240,
    overflowY: "auto",
    marginBottom: 17,
  },

  massGoatOption: {
    width: "100%",
    border:
      `1px solid ${COLORS.border}`,
    background: "#fff",
    borderRadius: 12,
    padding: 10,
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 7,
    cursor: "pointer",
    textAlign: "left",
  },

  massGoatOptionSelected: {
    border:
      "1px solid #9EBBF2",
    background: "#F5F8FF",
  },

  checkBox: {
    width: 22,
    height: 22,
    flexShrink: 0,
    border:
      "2px solid #CBD5E1",
    borderRadius: 7,
    display: "grid",
    placeItems: "center",
    color: "#fff",
  },

  checkBoxActive: {
    border:
      `2px solid ${COLORS.blue}`,
    background: COLORS.blue,
  },

  massGoats: {
    marginTop: 7,
  },

  massGoatHeader: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    color: COLORS.blue,
    fontSize: 12,
  },

  massGoatList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 7,
  },

  massGoatChip: {
    background: "#F1F5FF",
    border:
      "1px solid #D8E3F7",
    color: "#334155",
    borderRadius: 20,
    padding: "5px 8px",
    fontSize: 11,
    fontWeight: 600,
  },
};