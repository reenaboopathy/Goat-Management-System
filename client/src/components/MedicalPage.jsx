import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Edit3,
  FileText,
  Heart,
  History,
  PawPrint,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Trash2,
  X,
} from "lucide-react";

import "./MedicalPage.css";
import { LAYOUT, COLORS, TYPOGRAPHY, createGlobalStyles } from '../styles/layoutSystem.js';

/* =========================================================
   API
========================================================= */

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/* =========================================================
   API REQUEST HELPER
========================================================= */

const apiRequest = async (
  endpoint,
  options = {}
) => {
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
      data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
};

/* =========================================================
   GENERAL HELPERS
========================================================= */

const getNestedValue = (
  obj,
  paths = []
) => {
  for (const path of paths) {
    const parts = path.split(".");
    let value = obj;

    for (const part of parts) {
      if (value == null) break;
      value = value[part];
    }

    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      return value;
    }
  }

  return null;
};

const asArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (
    value &&
    typeof value === "object"
  ) {
    return Object.values(value);
  }

  return [];
};

const normalizeText = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const todayInputValue = () => {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* =========================================================
   GOAT HELPERS
========================================================= */

const getGoatId = (
  goat,
  index = 0
) =>
  getNestedValue(goat, [
    "id",
    "_id",
    "goatId",
  ]) || `goat-${index}`;

const getGoatName = (goat) =>
  getNestedValue(goat, [
    "name",
    "goatName",
    "goat_name",
  ]) || "Unnamed Goat";

const getGoatTag = (goat) =>
  getNestedValue(goat, [
    "tagNumber",
    "tag",
    "tagId",
    "tag_number",
  ]) || "No tag";

const getGoatBreed = (goat) =>
  getNestedValue(goat, [
    "breed",
    "breedName",
  ]) || "Not specified";

const getGoatGender = (goat) =>
  getNestedValue(goat, [
    "gender",
    "sex",
  ]) || "Not specified";

const getGoatStage = (goat) =>
  getNestedValue(goat, [
    "stage",
    "lifeStage",
  ]) || "Not specified";

const getGoatWeight = (goat) => {
  const historySources = [
    goat?.weightHistory,
    goat?.weight_history,
    goat?.weights,
    goat?.weightRecords,
    goat?.weightHistoryRecords,
    goat?.weightChecks,
    goat?.weight_check_history,
  ];

  for (const source of historySources) {
    if (!Array.isArray(source)) {
      continue;
    }

    const valid = source
      .map((item) => {
        if (typeof item === "number") {
          return {
            value: item,
            date: null,
          };
        }

        return {
          value: getNestedValue(item, [
            "weight",
            "value",
            "weightKg",
            "kg",
            "currentWeight",
          ]),
          date: getNestedValue(item, [
            "date",
            "createdAt",
            "updatedAt",
            "timestamp",
            "recordedAt",
            "checkedAt",
            "weighedAt",
          ]),
        };
      })
      .map((item) => ({
        ...item,
        value: Number(item.value),
      }))
      .filter((item) =>
        Number.isFinite(item.value)
      )
      .sort(
        (a, b) =>
          new Date(
            b.date || 0
          ).getTime() -
          new Date(
            a.date || 0
          ).getTime()
      );

    if (valid.length > 0) {
      return valid[0].value;
    }
  }

  const direct = Number(
    getNestedValue(goat, [
      "weight",
      "currentWeight",
      "weightKg",
    ])
  );

  return Number.isFinite(direct)
    ? direct
    : null;
};

const normalizeGoat = (
  goat,
  index
) => ({
  ...goat,

  _medicalGoatId: String(
    getGoatId(goat, index)
  ),

  _name: getGoatName(goat),

  _tag: getGoatTag(goat),

  _breed: getGoatBreed(goat),

  _gender: getGoatGender(goat),

  _stage: getGoatStage(goat),

  _weight: getGoatWeight(goat),

  _photo:
    getNestedValue(goat, [
      "photo",
      "image",
      "imageUrl",
      "avatar",
      "profileImage",
    ]) || null,
});

/* =========================================================
   NORMALIZE MEDICAL RECORD
========================================================= */

const normalizeMedicalRecord = (
  record,
  index,
  goats
) => {
  const goatId = String(
    getNestedValue(record, [
      "goatId",
      "goat_id",
      "animalId",
      "animal_id",
      "goat.id",
      "goat._id",
    ]) || ""
  );

  const goat = goats.find(
    (item) =>
      String(
        item._medicalGoatId
      ) === goatId
  );

  return {
    ...record,

    _id:
      getNestedValue(record, [
        "id",
        "_id",
        "medicalId",
      ]) ||
      `medical-${index}`,

    _goatId: goatId,

    _goatName:
      getNestedValue(record, [
        "goatName",
        "animalName",
        "goat.name",
      ]) ||
      goat?._name ||
      "Unknown Goat",

    _tag:
      getNestedValue(record, [
        "tag",
        "tagNumber",
        "goatTag",
        "goat.tagNumber",
      ]) ||
      goat?._tag ||
      "No tag",

    _type:
      getNestedValue(record, [
        "type",
        "recordType",
        "medicalType",
        "category",
      ]) || "Treatment",

    _diagnosis:
      getNestedValue(record, [
        "diagnosis",
        "condition",
        "problem",
        "healthIssue",
      ]) || "",

    _treatment:
      getNestedValue(record, [
        "treatment",
        "treatmentName",
        "procedure",
      ]) || "",

    _medicine:
      getNestedValue(record, [
        "medicine",
        "medicineName",
        "medication",
        "drug",
      ]) || "",

    _vaccine:
      getNestedValue(record, [
        "vaccine",
        "vaccineName",
        "vaccination",
      ]) || "",

    _doctor:
      getNestedValue(record, [
        "doctor",
        "doctorName",
        "veterinarian",
        "vetName",
      ]) || "",

    _date:
      getNestedValue(record, [
        "date",
        "recordDate",
        "treatmentDate",
        "visitDate",
        "createdAt",
        "updatedAt",
      ]) || "",

    _nextDate:
      getNestedValue(record, [
        "nextDate",
        "nextVisit",
        "followUpDate",
        "nextTreatmentDate",
        "nextVaccinationDate",
      ]) || "",

    _status:
      getNestedValue(record, [
        "status",
        "healthStatus",
        "conditionStatus",
      ]) || "Completed",

    _notes:
      getNestedValue(record, [
        "notes",
        "note",
        "remarks",
        "description",
      ]) || "",
  };
};

/* =========================================================
   STAT CARD
========================================================= */

function MedicalStatCard({
  icon: Icon,
  label,
  value,
  sub,
}) {
  return (
    <div className="medical-stat-card">
      <div className="medical-stat-top">
        <div className="medical-stat-icon">
          <Icon size={20} />
        </div>

        <span className="medical-stat-label">
          {label}
        </span>
      </div>

      <div className="medical-stat-value">
        {value}
      </div>

      {sub && (
        <div className="medical-stat-sub">
          {sub}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function MedicalEmpty({
  icon: Icon = Stethoscope,
  title,
  description,
  action,
}) {
  return (
    <div className="medical-empty">
      <div className="medical-empty-icon">
        <Icon size={25} />
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      {action && (
        <button
          type="button"
          className="medical-primary-btn"
          onClick={action.onClick}
        >
          <Plus size={17} />
          {action.label}
        </button>
      )}
    </div>
  );
}

/* =========================================================
   MEDICAL MODAL
========================================================= */

function MedicalRecordModal({
  goats,
  initialRecord,
  onClose,
  onSave,
  saving,
}) {
  const editing = Boolean(
    initialRecord
  );

  const initialGoat = useMemo(() => {
    if (!initialRecord?._goatId) {
      return null;
    }

    return (
      goats.find(
        (goat) =>
          String(
            goat._medicalGoatId
          ) ===
          String(
            initialRecord._goatId
          )
      ) || null
    );
  }, [
    goats,
    initialRecord,
  ]);

  const [form, setForm] =
    useState(() => ({
      goatId:
        initialRecord?._goatId ||
        "",

      type:
        initialRecord?._type ||
        "Treatment",

      date: initialRecord?._date
        ? String(
            initialRecord._date
          ).slice(0, 10)
        : todayInputValue(),

      diagnosis:
        initialRecord?._diagnosis ||
        "",

      treatment:
        initialRecord?._treatment ||
        "",

      medicine:
        initialRecord?._medicine ||
        "",

      vaccine:
        initialRecord?._vaccine ||
        "",

      doctor:
        initialRecord?._doctor ||
        "",

      nextDate:
        initialRecord?._nextDate
          ? String(
              initialRecord._nextDate
            ).slice(0, 10)
          : "",

      status:
        initialRecord?._status ||
        "Completed",

      notes:
        initialRecord?._notes ||
        "",
    }));

  const [
    goatSearch,
    setGoatSearch,
  ] = useState(
    initialGoat
      ? `${initialGoat._name} — Tag ${initialGoat._tag}`
      : ""
  );

  const [
    showGoatResults,
    setShowGoatResults,
  ] = useState(false);

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
  };

  const filteredGoats = useMemo(() => {
    const query =
      normalizeText(
        goatSearch
      );

    if (!query) {
      return [];
    }

    return goats.filter(
      (goat) =>
        normalizeText(
          goat._name
        ).includes(query) ||
        normalizeText(
          goat._tag
        ).includes(query) ||
        normalizeText(
          goat._breed
        ).includes(query)
    );
  }, [
    goats,
    goatSearch,
  ]);

  useEffect(() => {
    const handleOutsideClick = (
      event
    ) => {
      if (
        !event.target.closest(
          ".medical-goat-search-wrapper"
        )
      ) {
        setShowGoatResults(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const selectGoat = (
    goat
  ) => {
    update(
      "goatId",
      goat._medicalGoatId
    );

    setGoatSearch(
      `${goat._name} — Tag ${goat._tag}`
    );

    setShowGoatResults(false);

    setError("");
  };

  const clearGoat = () => {
    setGoatSearch("");
    update(
      "goatId",
      ""
    );
    setShowGoatResults(false);
  };

  const submit = async () => {
    setError("");

    if (!form.goatId) {
      setError(
        "Please select a goat."
      );
      return;
    }

    if (!form.date) {
      setError(
        "Please select the medical date."
      );
      return;
    }

    if (
      !form.diagnosis.trim()
    ) {
      setError(
        "Please enter the diagnosis or health issue."
      );
      return;
    }

    const goat = goats.find(
      (item) =>
        String(
          item._medicalGoatId
        ) ===
        String(
          form.goatId
        )
    );

    if (!goat) {
      setError(
        "Selected goat was not found."
      );
      return;
    }

    const payload = {
      goatId:
        goat._medicalGoatId,

      goatName:
        goat._name,

      tagNumber:
        goat._tag,

      type:
        form.type,

      date:
        form.date,

      diagnosis:
        form.diagnosis.trim(),

      treatment:
        form.treatment.trim(),

      medicine:
        form.medicine.trim(),

      vaccine:
        form.vaccine.trim(),

      doctor:
        form.doctor.trim(),

      nextDate:
        form.nextDate || null,

      status:
        form.status,

      notes:
        form.notes.trim(),
    };

    try {
      await onSave(
        payload,
        initialRecord
      );
    } catch (err) {
      setError(
        err.message ||
          "Failed to save medical record."
      );
    }
  };

  return (
    <div
      className="medical-modal-backdrop"
      onMouseDown={onClose}
    >
      <div
        className="medical-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="medical-modal-head">
          <div>
            <span className="medical-eyebrow">
              MEDICAL RECORD
            </span>

            <h2>
              {editing
                ? "Edit medical record"
                : "Add medical record"}
            </h2>

            <p>
              Save actual health
              information for an
              existing goat.
            </p>
          </div>

          <button
            type="button"
            className="medical-icon-btn"
            onClick={onClose}
          >
            <X size={19} />
          </button>
        </div>

        {error && (
          <div className="medical-error">
            <AlertCircle size={17} />
            {error}
          </div>
        )}

        <div className="medical-form-grid">
          <label className="medical-goat-search-field">
            Goat *

            <div className="medical-goat-search-wrapper">
              <Search
                size={17}
                className="medical-goat-search-icon"
              />

              <input
                type="text"
                value={goatSearch}
                placeholder="Search goat name or tag..."
                autoComplete="off"
                onFocus={() => {
                  if (
                    goatSearch.trim()
                  ) {
                    setShowGoatResults(
                      true
                    );
                  }
                }}
                onChange={(e) => {
                  const value =
                    e.target.value;

                  setGoatSearch(
                    value
                  );

                  setShowGoatResults(
                    Boolean(
                      value.trim()
                    )
                  );

                  if (
                    form.goatId
                  ) {
                    const selectedGoat =
                      goats.find(
                        (goat) =>
                          String(
                            goat._medicalGoatId
                          ) ===
                          String(
                            form.goatId
                          )
                      );

                    const selectedText =
                      selectedGoat
                        ? `${selectedGoat._name} — Tag ${selectedGoat._tag}`
                        : "";

                    if (
                      value !==
                      selectedText
                    ) {
                      update(
                        "goatId",
                        ""
                      );
                    }
                  }
                }}
              />

              {goatSearch && (
                <button
                  type="button"
                  className="medical-goat-search-clear"
                  onClick={
                    clearGoat
                  }
                >
                  <X size={15} />
                </button>
              )}

              {showGoatResults &&
                goatSearch.trim() && (
                  <div className="medical-goat-results">
                    {filteredGoats.length ===
                    0 ? (
                      <div className="medical-goat-no-result">
                        <PawPrint
                          size={18}
                        />

                        <span>
                          No goat found
                        </span>
                      </div>
                    ) : (
                      filteredGoats.map(
                        (goat) => {
                          const selected =
                            String(
                              form.goatId
                            ) ===
                            String(
                              goat._medicalGoatId
                            );

                          return (
                            <button
                              type="button"
                              key={
                                goat._medicalGoatId
                              }
                              className={`medical-goat-result ${
                                selected
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                selectGoat(
                                  goat
                                )
                              }
                            >
                              <div className="medical-goat-result-avatar">
                                {goat._photo ? (
                                  <img
                                    src={
                                      goat._photo
                                    }
                                    alt={
                                      goat._name
                                    }
                                  />
                                ) : (
                                  <PawPrint
                                    size={
                                      17
                                    }
                                  />
                                )}
                              </div>

                              <div className="medical-goat-result-info">
                                <strong>
                                  {
                                    goat._name
                                  }
                                </strong>

                                <span>
                                  Tag:{" "}
                                  {
                                    goat._tag
                                  }
                                  {" • "}
                                  {
                                    goat._breed
                                  }
                                </span>
                              </div>

                              {selected && (
                                <Check
                                  size={
                                    17
                                  }
                                />
                              )}
                            </button>
                          );
                        }
                      )
                    )}
                  </div>
                )}
            </div>
          </label>

          <label>
            Medical Type

            <select
              value={form.type}
              onChange={(e) =>
                update(
                  "type",
                  e.target.value
                )
              }
            >
              <option value="Treatment">
                Treatment
              </option>

              <option value="Vaccination">
                Vaccination
              </option>

              <option value="Medicine">
                Medicine
              </option>

              <option value="Checkup">
                Health Checkup
              </option>

              <option value="Injury">
                Injury
              </option>

              <option value="Deworming">
                Deworming
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </label>

          <label>
            Date *

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                update(
                  "date",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Health Status

            <select
              value={form.status}
              onChange={(e) =>
                update(
                  "status",
                  e.target.value
                )
              }
            >
              <option value="Completed">
                Completed
              </option>

              <option value="Ongoing">
                Ongoing
              </option>

              <option value="Follow-up">
                Follow-up Required
              </option>

              <option value="Recovered">
                Recovered
              </option>

              <option value="Critical">
                Critical
              </option>
            </select>
          </label>

          <label className="medical-full-field">
            Diagnosis / Health Issue *

            <input
              value={
                form.diagnosis
              }
              onChange={(e) =>
                update(
                  "diagnosis",
                  e.target.value
                )
              }
              placeholder="Example: Fever, skin infection..."
            />
          </label>

          <label>
            Treatment

            <input
              value={
                form.treatment
              }
              onChange={(e) =>
                update(
                  "treatment",
                  e.target.value
                )
              }
              placeholder="Treatment given"
            />
          </label>

          <label>
            Medicine

            <input
              value={
                form.medicine
              }
              onChange={(e) =>
                update(
                  "medicine",
                  e.target.value
                )
              }
              placeholder="Medicine name"
            />
          </label>

          <label>
            Vaccine

            <input
              value={
                form.vaccine
              }
              onChange={(e) =>
                update(
                  "vaccine",
                  e.target.value
                )
              }
              placeholder="Vaccine name"
            />
          </label>

          <label>
            Veterinarian

            <input
              value={
                form.doctor
              }
              onChange={(e) =>
                update(
                  "doctor",
                  e.target.value
                )
              }
              placeholder="Veterinarian name"
            />
          </label>

          <label>
            Next Follow-up

            <input
              type="date"
              value={
                form.nextDate
              }
              onChange={(e) =>
                update(
                  "nextDate",
                  e.target.value
                )
              }
            />
          </label>

          <label className="medical-full-field">
            Notes

            <textarea
              rows="4"
              value={
                form.notes
              }
              onChange={(e) =>
                update(
                  "notes",
                  e.target.value
                )
              }
              placeholder="Additional medical notes..."
            />
          </label>
        </div>

        <div className="medical-modal-actions">
          <button
            type="button"
            className="medical-secondary-btn"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="button"
            className="medical-primary-btn"
            onClick={submit}
            disabled={saving}
          >
            {saving ? (
              <>
                <RefreshCw
                  size={17}
                  className="spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Check size={17} />
                {editing
                  ? "Update Record"
                  : "Save Record"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN MEDICAL
========================================================= */

export default function Medical({
  onBack,
}) {
  const [goats, setGoats] =
    useState([]);

  const [
    medicalRecords,
    setMedicalRecords,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [search, setSearch] =
    useState("");

  const [
    typeFilter,
    setTypeFilter,
  ] = useState("All");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");

  const [
    selectedGoatId,
    setSelectedGoatId,
  ] = useState("All");

  const [
    showFilters,
    setShowFilters,
  ] = useState(false);

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  const [
    editingRecord,
    setEditingRecord,
  ] = useState(null);

  const [
    selectedRecord,
    setSelectedRecord,
  ] = useState(null);

  const [
    selectedGoatDetails,
    setSelectedGoatDetails,
  ] = useState(null);

  /* =======================================================
     LOAD GOATS
  ======================================================= */

  const loadGoats =
    useCallback(async () => {
      const response =
        await apiRequest(
          "/goats"
        );

      const goatData =
        response?.goats ||
        response?.data ||
        response;

      const normalized =
        asArray(goatData).map(
          normalizeGoat
        );

      setGoats(normalized);
    }, []);

  /* =======================================================
     LOAD MEDICAL RECORDS
  ======================================================= */

  const loadMedicalRecords =
    useCallback(async () => {
      const response =
        await apiRequest(
          "/medical-records"
        );

      const records =
        response?.medicalRecords ||
        response?.records ||
        response?.data ||
        response;

      setMedicalRecords(
        asArray(records)
      );
    }, []);

  /* =======================================================
     LOAD ALL
  ======================================================= */

  const loadData =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        await Promise.all([
          loadGoats(),
          loadMedicalRecords(),
        ]);
      } catch (err) {
        console.error(
          "Medical load error:",
          err
        );

        setError(
          err.message ||
            "Unable to load medical data."
        );
      } finally {
        setLoading(false);
      }
    }, [
      loadGoats,
      loadMedicalRecords,
    ]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  /* =======================================================
     NORMALIZED RECORDS
  ======================================================= */

  const normalizedRecords =
    useMemo(() => {
      return medicalRecords
        .map(
          (record, index) =>
            normalizeMedicalRecord(
              record,
              index,
              goats
            )
        )
        .sort(
          (a, b) =>
            new Date(
              b._date || 0
            ).getTime() -
            new Date(
              a._date || 0
            ).getTime()
        );
    }, [
      medicalRecords,
      goats,
    ]);

  /* =======================================================
     TYPES
  ======================================================= */

  const medicalTypes =
    useMemo(() => {
      const types =
        normalizedRecords
          .map(
            (record) =>
              record._type
          )
          .filter(Boolean);

      return [
        "All",
        ...Array.from(
          new Set(types)
        ),
      ];
    }, [
      normalizedRecords,
    ]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredRecords =
    useMemo(() => {
      const query =
        normalizeText(search);

      return normalizedRecords.filter(
        (record) => {
          const matchesSearch =
            !query ||
            normalizeText(
              record._goatName
            ).includes(query) ||
            normalizeText(
              record._tag
            ).includes(query) ||
            normalizeText(
              record._diagnosis
            ).includes(query) ||
            normalizeText(
              record._medicine
            ).includes(query) ||
            normalizeText(
              record._vaccine
            ).includes(query) ||
            normalizeText(
              record._doctor
            ).includes(query);

          const matchesType =
            typeFilter ===
              "All" ||
            normalizeText(
              record._type
            ) ===
              normalizeText(
                typeFilter
              );

          const matchesStatus =
            statusFilter ===
              "All" ||
            normalizeText(
              record._status
            ) ===
              normalizeText(
                statusFilter
              );

          const matchesGoat =
            selectedGoatId ===
              "All" ||
            String(
              record._goatId
            ) ===
              String(
                selectedGoatId
              );

          return (
            matchesSearch &&
            matchesType &&
            matchesStatus &&
            matchesGoat
          );
        }
      );
    }, [
      normalizedRecords,
      search,
      typeFilter,
      statusFilter,
      selectedGoatId,
    ]);

  /* =======================================================
     STATISTICS
  ======================================================= */

  const statistics =
    useMemo(() => {
      const today =
        new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      const upcoming =
        normalizedRecords.filter(
          (record) => {
            if (
              !record._nextDate
            ) {
              return false;
            }

            const date =
              new Date(
                record._nextDate
              );

            date.setHours(
              0,
              0,
              0,
              0
            );

            return date >= today;
          }
        ).length;

      const critical =
        normalizedRecords.filter(
          (record) =>
            normalizeText(
              record._status
            ) === "critical"
        ).length;

      const vaccinations =
        normalizedRecords.filter(
          (record) =>
            normalizeText(
              record._type
            ).includes(
              "vaccin"
            )
        ).length;

      const treatments =
        normalizedRecords.filter(
          (record) =>
            normalizeText(
              record._type
            ).includes(
              "treatment"
            )
        ).length;

      const uniqueGoats =
        new Set(
          normalizedRecords
            .map(
              (record) =>
                record._goatId
            )
            .filter(Boolean)
        ).size;

      return {
        total:
          normalizedRecords.length,
        upcoming,
        critical,
        vaccinations,
        treatments,
        uniqueGoats,
      };
    }, [
      normalizedRecords,
    ]);

  /* =======================================================
     UPCOMING
  ======================================================= */

  const upcomingRecords =
    useMemo(() => {
      const now =
        new Date();

      now.setHours(
        0,
        0,
        0,
        0
      );

      return normalizedRecords
        .filter((record) => {
          if (
            !record._nextDate
          ) {
            return false;
          }

          const date =
            new Date(
              record._nextDate
            );

          date.setHours(
            0,
            0,
            0,
            0
          );

          return date >= now;
        })
        .sort(
          (a, b) =>
            new Date(
              a._nextDate
            ).getTime() -
            new Date(
              b._nextDate
            ).getTime()
        )
        .slice(0, 6);
    }, [
      normalizedRecords,
    ]);

  /* =======================================================
     CREATE / UPDATE
  ======================================================= */

  const saveMedicalRecord =
    useCallback(
      async (
        payload,
        initialRecord
      ) => {
        try {
          setSaving(true);
          setError("");

          if (
            initialRecord
          ) {
            const id =
              initialRecord._id;

            await apiRequest(
              `/medical-records/${id}`,
              {
                method: "PUT",
                body: JSON.stringify(
                  payload
                ),
              }
            );
          } else {
            await apiRequest(
              "/medical-records",
              {
                method: "POST",
                body: JSON.stringify(
                  payload
                ),
              }
            );
          }

          await loadMedicalRecords();

          setModalOpen(false);
          setEditingRecord(null);
        } catch (err) {
          console.error(
            "Medical save error:",
            err
          );

          throw err;
        } finally {
          setSaving(false);
        }
      },
      [
        loadMedicalRecords,
      ]
    );

  /* =======================================================
     DELETE
  ======================================================= */

  const deleteMedicalRecord =
    useCallback(
      async (record) => {
        const confirmed =
          window.confirm(
            `Delete medical record for ${record._goatName}?`
          );

        if (!confirmed) {
          return;
        }

        try {
          setError("");

          await apiRequest(
            `/medical-records/${record._id}`,
            {
              method: "DELETE",
            }
          );

          await loadMedicalRecords();

          setSelectedRecord(
            null
          );
        } catch (err) {
          console.error(
            "Medical delete error:",
            err
          );

          setError(
            err.message ||
              "Failed to delete medical record."
          );
        }
      },
      [
        loadMedicalRecords,
      ]
    );

  /* =======================================================
     EDIT
  ======================================================= */

  const openEdit = (
    record
  ) => {
    setEditingRecord(
      record
    );

    setModalOpen(true);
  };

  /* =======================================================
     GOAT DETAILS
  ======================================================= */

  const openGoatDetails = (
    goat
  ) => {
    setSelectedGoatDetails(
      goat
    );
  };

  /* =======================================================
     BACK
  ======================================================= */

  const handleBack = () => {
    if (
      typeof onBack ===
      "function"
    ) {
      onBack();
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="medical-page">

      {/* HEADER */}

      <header className="medical-header">
        <div className="medical-header-left">

          <button
            type="button"
            className="medical-back-arrow"
            onClick={
              handleBack
            }
          >
            <ArrowLeft
              size={20}
            />
          </button>

          <div className="medical-brand-icon">
            <Stethoscope
              size={24}
            />
          </div>

          <div>
            <span className="medical-eyebrow">
              LIVESTOCK HEALTH
            </span>

            <h1>
              Medical
            </h1>

            <p>
              Manage real goat
              health, treatment
              and vaccination
              records.
            </p>
          </div>

        </div>

        <div className="medical-header-actions">

          <button
            type="button"
            className="medical-secondary-btn"
            onClick={
              loadData
            }
            disabled={
              loading
            }
          >
            <RefreshCw
              size={17}
            />
            Refresh
          </button>

          <button
            type="button"
            className="medical-primary-btn"
            onClick={() => {
              setEditingRecord(
                null
              );
              setModalOpen(
                true
              );
            }}
            disabled={
              goats.length ===
                0 ||
              loading
            }
          >
            <Plus
              size={17}
            />
            Add Medical
            Record
          </button>

        </div>
      </header>

      {/* ERROR */}

      {error && (
        <div
          className="medical-error"
          style={{
            margin: "16px",
          }}
        >
          <AlertCircle
            size={17}
          />
          {error}
        </div>
      )}

      {/* HERO */}

      <section className="medical-hero">

        <div className="medical-hero-content">

          <div className="medical-hero-badge">
            <ShieldCheck
              size={15}
            />
            MongoDB medical
            data
          </div>

          <h2>
            Goat health center
          </h2>

          <p>
            Medical records are
            connected directly to
            your backend database.
            No medical records are
            stored in localStorage.
          </p>

          <div className="medical-meta-row">

            <span>
              <PawPrint
                size={15}
              />
              {goats.length}
              real goats
            </span>

            <span>
              <FileText
                size={15}
              />
              {
                normalizedRecords.length
              }
              medical records
            </span>

            <span>
              <Syringe
                size={15}
              />
              {
                statistics.vaccinations
              }
              vaccinations
            </span>

          </div>

        </div>

        <div className="medical-hero-side">

          <div className="medical-live-indicator">
            <span />
            Backend connected
          </div>

          <div className="medical-hero-total">

            <strong>
              {
                statistics.uniqueGoats
              }
            </strong>

            <span>
              Goats with medical
              history
            </span>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="medical-stats-grid">

        <MedicalStatCard
          icon={FileText}
          label="Total Records"
          value={
            statistics.total
          }
          sub="MongoDB records"
        />

        <MedicalStatCard
          icon={Syringe}
          label="Vaccinations"
          value={
            statistics.vaccinations
          }
          sub="Vaccination records"
        />

        <MedicalStatCard
          icon={Stethoscope}
          label="Treatments"
          value={
            statistics.treatments
          }
          sub="Treatment records"
        />

        <MedicalStatCard
          icon={CalendarDays}
          label="Upcoming"
          value={
            statistics.upcoming
          }
          sub="Follow-up dates"
        />

        <MedicalStatCard
          icon={AlertCircle}
          label="Critical"
          value={
            statistics.critical
          }
          sub="Needs attention"
        />

        <MedicalStatCard
          icon={PawPrint}
          label="Affected Goats"
          value={
            statistics.uniqueGoats
          }
          sub="Real goats"
        />

      </section>

      {/* SEARCH */}

      <section className="medical-panel">

        <div className="medical-panel-head">

          <div>
            <span className="medical-panel-kicker">
              MEDICAL SEARCH
            </span>

            <h3>
              Find medical
              records
            </h3>

            <p>
              Search medical
              records stored in
              MongoDB.
            </p>
          </div>

          <Heart size={20} />

        </div>

        <div className="medical-toolbar">

          <div className="medical-search">

            <Search
              size={18}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search goat, tag, diagnosis, medicine..."
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
              >
                <X size={16} />
              </button>
            )}

          </div>

          <button
            type="button"
            className={`medical-filter-btn ${
              showFilters
                ? "active"
                : ""
            }`}
            onClick={() =>
              setShowFilters(
                (prev) =>
                  !prev
              )
            }
          >
            <ChevronDown
              size={15}
            />
            Filters
          </button>

        </div>

        {showFilters && (
          <div className="medical-filter-panel">

            <label>
              Goat

              <select
                value={
                  selectedGoatId
                }
                onChange={(e) =>
                  setSelectedGoatId(
                    e.target.value
                  )
                }
              >
                <option value="All">
                  All goats
                </option>

                {goats.map(
                  (goat) => (
                    <option
                      key={
                        goat._medicalGoatId
                      }
                      value={
                        goat._medicalGoatId
                      }
                    >
                      {
                        goat._name
                      }{" "}
                      —{" "}
                      {
                        goat._tag
                      }
                    </option>
                  )
                )}
              </select>
            </label>

            <label>
              Type

              <select
                value={
                  typeFilter
                }
                onChange={(e) =>
                  setTypeFilter(
                    e.target.value
                  )
                }
              >
                {medicalTypes.map(
                  (type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  )
                )}
              </select>
            </label>

            <label>
              Status

              <select
                value={
                  statusFilter
                }
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >
                <option value="All">
                  All
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Ongoing">
                  Ongoing
                </option>

                <option value="Follow-up">
                  Follow-up
                </option>

                <option value="Recovered">
                  Recovered
                </option>

                <option value="Critical">
                  Critical
                </option>
              </select>
            </label>

            <button
              type="button"
              className="medical-clear-filter"
              onClick={() => {
                setSelectedGoatId(
                  "All"
                );
                setTypeFilter(
                  "All"
                );
                setStatusFilter(
                  "All"
                );
                setSearch("");
              }}
            >
              Clear
            </button>

          </div>
        )}

      </section>

      {/* LOADING */}

      {loading ? (
        <section className="medical-panel">
          <MedicalEmpty
            icon={RefreshCw}
            title="Loading medical data..."
            description="Fetching goats and medical records from MongoDB."
          />
        </section>
      ) : (
        <>
          {/* UPCOMING */}

          {upcomingRecords.length >
            0 && (
            <section className="medical-panel">

              <div className="medical-panel-head">

                <div>
                  <span className="medical-panel-kicker">
                    FOLLOW-UP
                  </span>

                  <h3>
                    Upcoming medical
                    dates
                  </h3>

                  <p>
                    Next treatment,
                    vaccination or
                    health follow-up
                    dates.
                  </p>
                </div>

                <Clock3 size={20} />

              </div>

              <div className="medical-upcoming-list">

                {upcomingRecords.map(
                  (record) => (
                    <button
                      type="button"
                      className="medical-upcoming-row"
                      key={
                        record._id
                      }
                      onClick={() =>
                        setSelectedRecord(
                          record
                        )
                      }
                    >

                      <div className="medical-upcoming-avatar">
                        <CalendarDays
                          size={17}
                        />
                      </div>

                      <div className="medical-upcoming-info">

                        <strong>
                          {
                            record._goatName
                          }
                        </strong>

                        <span>
                          {
                            record._type
                          }
                          {" • "}
                          {
                            record._diagnosis
                          }
                        </span>

                      </div>

                      <div className="medical-upcoming-date">
                        {formatDate(
                          record._nextDate
                        )}
                      </div>

                      <strong>
                        Follow-up
                      </strong>

                    </button>
                  )
                )}

              </div>

            </section>
          )}

          {/* HISTORY */}

          <section className="medical-panel">

            <div className="medical-panel-head">

              <div>
                <span className="medical-panel-kicker">
                  MEDICAL HISTORY
                </span>

                <h3>
                  Goat medical
                  records
                </h3>

                <p>
                  Actual records
                  stored in MongoDB.
                </p>
              </div>

              <div className="medical-goat-count">
                {
                  filteredRecords.length
                }

                <span>
                  /{" "}
                  {
                    normalizedRecords.length
                  }
                </span>
              </div>

            </div>

            {goats.length ===
            0 ? (
              <MedicalEmpty
                icon={PawPrint}
                title="No goats available"
                description="Add goats from the Goat Management page first."
              />
            ) : normalizedRecords.length ===
              0 ? (
              <MedicalEmpty
                icon={
                  Stethoscope
                }
                title="No medical records yet"
                description="Click Add Medical Record to save the first record into MongoDB."
                action={{
                  label:
                    "Add Medical Record",
                  onClick: () => {
                    setEditingRecord(
                      null
                    );
                    setModalOpen(
                      true
                    );
                  },
                }}
              />
            ) : filteredRecords.length ===
              0 ? (
              <MedicalEmpty
                icon={Search}
                title="No matching records"
                description="Try another goat, diagnosis, medicine or filter."
              />
            ) : (
              <div className="medical-table-wrap">

                <table className="medical-table">

                  <thead>
                    <tr>
                      <th>
                        Goat
                      </th>
                      <th>
                        Type
                      </th>
                      <th>
                        Date
                      </th>
                      <th>
                        Diagnosis
                      </th>
                      <th>
                        Medicine
                      </th>
                      <th>
                        Veterinarian
                      </th>
                      <th>
                        Next Date
                      </th>
                      <th>
                        Status
                      </th>
                      <th />
                    </tr>
                  </thead>

                  <tbody>

                    {filteredRecords.map(
                      (record) => {
                        const goat =
                          goats.find(
                            (item) =>
                              String(
                                item._medicalGoatId
                              ) ===
                              String(
                                record._goatId
                              )
                          );

                        return (
                          <tr
                            key={
                              record._id
                            }
                          >

                            <td>

                              <button
                                type="button"
                                className="medical-goat-button"
                                onClick={() => {
                                  if (
                                    goat
                                  ) {
                                    openGoatDetails(
                                      goat
                                    );
                                  }
                                }}
                              >

                                <div className="medical-goat-cell">

                                  <div className="medical-goat-avatar">

                                    {goat?._photo ? (
                                      <img
                                        src={
                                          goat._photo
                                        }
                                        alt={
                                          record._goatName
                                        }
                                      />
                                    ) : (
                                      <PawPrint
                                        size={
                                          17
                                        }
                                      />
                                    )}

                                  </div>

                                  <div>

                                    <strong>
                                      {
                                        record._goatName
                                      }
                                    </strong>

                                    <span>
                                      Tag:{" "}
                                      {
                                        record._tag
                                      }
                                    </span>

                                  </div>

                                </div>

                              </button>

                            </td>

                            <td>
                              <span className="medical-type-pill">
                                {
                                  record._type
                                }
                              </span>
                            </td>

                            <td>
                              {formatDate(
                                record._date
                              )}
                            </td>

                            <td>
                              {
                                record._diagnosis
                              }
                            </td>

                            <td>
                              {record._medicine ||
                                record._vaccine ||
                                record._treatment ||
                                "—"}
                            </td>

                            <td>
                              {
                                record._doctor ||
                                "—"
                              }
                            </td>

                            <td>
                              {record._nextDate
                                ? formatDate(
                                    record._nextDate
                                  )
                                : "—"}
                            </td>

                            <td>

                              <span
                                className={`medical-status-pill ${
                                  normalizeText(
                                    record._status
                                  ) ===
                                  "critical"
                                    ? "critical"
                                    : normalizeText(
                                        record._status
                                      ) ===
                                      "ongoing"
                                    ? "ongoing"
                                    : normalizeText(
                                        record._status
                                      ) ===
                                      "recovered"
                                    ? "recovered"
                                    : ""
                                }`}
                              >
                                <span />
                                {
                                  record._status
                                }
                              </span>

                            </td>

                            <td>

                              <div className="medical-row-actions">

                                <button
                                  type="button"
                                  className="medical-more-btn"
                                  title="View"
                                  onClick={() =>
                                    setSelectedRecord(
                                      record
                                    )
                                  }
                                >
                                  <FileText
                                    size={
                                      16
                                    }
                                  />
                                </button>

                                <button
                                  type="button"
                                  className="medical-more-btn"
                                  title="Edit"
                                  onClick={() =>
                                    openEdit(
                                      record
                                    )
                                  }
                                >
                                  <Edit3
                                    size={
                                      16
                                    }
                                  />
                                </button>

                                <button
                                  type="button"
                                  className="medical-more-btn delete"
                                  title="Delete"
                                  onClick={() =>
                                    deleteMedicalRecord(
                                      record
                                    )
                                  }
                                >
                                  <Trash2
                                    size={
                                      16
                                    }
                                  />
                                </button>

                              </div>

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

          {/* RECENT ACTIVITY */}

          <section className="medical-panel">

            <div className="medical-panel-head">

              <div>
                <span className="medical-panel-kicker">
                  RECENT ACTIVITY
                </span>

                <h3>
                  Latest medical
                  activity
                </h3>

                <p>
                  Most recent medical
                  records.
                </p>
              </div>

              <History size={20} />

            </div>

            {normalizedRecords.length ===
            0 ? (
              <MedicalEmpty
                icon={History}
                title="No history"
                description="Medical activity will appear here after a real record is saved."
              />
            ) : (
              <div className="medical-activity-list">

                {normalizedRecords
                  .slice(0, 8)
                  .map(
                    (record) => (
                      <div
                        className="medical-activity-item"
                        key={`activity-${record._id}`}
                      >

                        <div className="medical-activity-icon">

                          {normalizeText(
                            record._type
                          ).includes(
                            "vaccin"
                          ) ? (
                            <Syringe
                              size={
                                17
                              }
                            />
                          ) : (
                            <Stethoscope
                              size={
                                17
                              }
                            />
                          )}

                        </div>

                        <div className="medical-activity-content">

                          <strong>
                            {
                              record._goatName
                            }
                            {" — "}
                            {
                              record._type
                            }
                          </strong>

                          <p>
                            {
                              record._diagnosis
                            }

                            {record._medicine
                              ? ` • ${record._medicine}`
                              : ""}

                            {record._vaccine
                              ? ` • ${record._vaccine}`
                              : ""}
                          </p>

                        </div>

                        <time>
                          {formatDate(
                            record._date
                          )}
                        </time>

                      </div>
                    )
                  )}

              </div>
            )}

          </section>
        </>
      )}

      {/* =====================================================
          MEDICAL DETAIL DRAWER
      ===================================================== */}

      {selectedRecord && (
        <div
          className="medical-drawer-backdrop"
          onMouseDown={() =>
            setSelectedRecord(
              null
            )
          }
        >
          <aside
            className="medical-drawer"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            <div className="medical-drawer-head">

              <div>

                <span className="medical-eyebrow">
                  MEDICAL RECORD
                </span>

                <h2>
                  {
                    selectedRecord._goatName
                  }
                </h2>

                <p>
                  Tag:{" "}
                  {
                    selectedRecord._tag
                  }
                </p>

              </div>

              <button
                type="button"
                className="medical-icon-btn"
                onClick={() =>
                  setSelectedRecord(
                    null
                  )
                }
              >
                <X size={19} />
              </button>

            </div>

            <div className="medical-drawer-goat-card">

              <div className="medical-drawer-goat-avatar">
                <Stethoscope
                  size={28}
                />
              </div>

              <div>

                <strong>
                  {
                    selectedRecord._type
                  }
                </strong>

                <span>
                  {
                    selectedRecord._diagnosis
                  }
                </span>

              </div>

            </div>

            <div className="medical-drawer-info-grid">

              <div>
                <span>
                  Date
                </span>

                <strong>
                  {formatDate(
                    selectedRecord._date
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Status
                </span>

                <strong>
                  {
                    selectedRecord._status
                  }
                </strong>
              </div>

              <div>
                <span>
                  Medicine
                </span>

                <strong>
                  {
                    selectedRecord._medicine ||
                    "—"
                  }
                </strong>
              </div>

              <div>
                <span>
                  Vaccine
                </span>

                <strong>
                  {
                    selectedRecord._vaccine ||
                    "—"
                  }
                </strong>
              </div>

              <div>
                <span>
                  Treatment
                </span>

                <strong>
                  {
                    selectedRecord._treatment ||
                    "—"
                  }
                </strong>
              </div>

              <div>
                <span>
                  Veterinarian
                </span>

                <strong>
                  {
                    selectedRecord._doctor ||
                    "—"
                  }
                </strong>
              </div>

            </div>

            <div className="medical-drawer-section">

              <div className="medical-drawer-section-head">

                <div>
                  <span className="medical-panel-kicker">
                    FOLLOW-UP
                  </span>

                  <h3>
                    Next medical date
                  </h3>
                </div>

                <CalendarDays
                  size={18}
                />

              </div>

              <div className="medical-drawer-empty">

                {selectedRecord._nextDate
                  ? formatDate(
                      selectedRecord._nextDate
                    )
                  : "No follow-up date"}

              </div>

            </div>

            <div className="medical-drawer-section">

              <div className="medical-drawer-section-head">

                <div>
                  <span className="medical-panel-kicker">
                    NOTES
                  </span>

                  <h3>
                    Medical notes
                  </h3>
                </div>

                <FileText
                  size={18}
                />

              </div>

              <div className="medical-drawer-empty">

                {
                  selectedRecord._notes ||
                  "No additional notes."
                }

              </div>

            </div>

            <div className="medical-drawer-actions">

              <button
                type="button"
                className="medical-secondary-btn"
                onClick={() => {
                  setSelectedRecord(
                    null
                  );

                  openEdit(
                    selectedRecord
                  );
                }}
              >
                <Edit3
                  size={16}
                />
                Edit
              </button>

              <button
                type="button"
                className="medical-danger-btn"
                onClick={() =>
                  deleteMedicalRecord(
                    selectedRecord
                  )
                }
              >
                <Trash2
                  size={16}
                />
                Delete
              </button>

            </div>

          </aside>
        </div>
      )}

      {/* =====================================================
          GOAT DETAILS
      ===================================================== */}

      {selectedGoatDetails && (
        <div
          className="medical-drawer-backdrop"
          onMouseDown={() =>
            setSelectedGoatDetails(
              null
            )
          }
        >

          <aside
            className="medical-drawer"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            <div className="medical-drawer-head">

              <div>

                <span className="medical-eyebrow">
                  GOAT HEALTH
                </span>

                <h2>
                  {
                    selectedGoatDetails._name
                  }
                </h2>

                <p>
                  Tag:{" "}
                  {
                    selectedGoatDetails._tag
                  }
                </p>

              </div>

              <button
                type="button"
                className="medical-icon-btn"
                onClick={() =>
                  setSelectedGoatDetails(
                    null
                  )
                }
              >
                <X size={19} />
              </button>

            </div>

            <div className="medical-drawer-goat-card">

              <div className="medical-drawer-goat-avatar">

                {selectedGoatDetails._photo ? (
                  <img
                    src={
                      selectedGoatDetails._photo
                    }
                    alt={
                      selectedGoatDetails._name
                    }
                  />
                ) : (
                  <PawPrint
                    size={28}
                  />
                )}

              </div>

              <div>

                <strong>
                  {
                    selectedGoatDetails._name
                  }
                </strong>

                <span>
                  {
                    selectedGoatDetails._breed
                  }
                </span>

              </div>

            </div>

            <div className="medical-drawer-info-grid">

              <div>
                <span>
                  Gender
                </span>

                <strong>
                  {
                    selectedGoatDetails._gender
                  }
                </strong>
              </div>

              <div>
                <span>
                  Stage
                </span>

                <strong>
                  {
                    selectedGoatDetails._stage
                  }
                </strong>
              </div>

              <div>
                <span>
                  Weight
                </span>

                <strong>
                  {selectedGoatDetails._weight !==
                  null
                    ? `${selectedGoatDetails._weight} kg`
                    : "—"}
                </strong>
              </div>

              <div>
                <span>
                  Tag
                </span>

                <strong>
                  {
                    selectedGoatDetails._tag
                  }
                </strong>
              </div>

            </div>

            <div className="medical-drawer-section">

              <div className="medical-drawer-section-head">

                <div>

                  <span className="medical-panel-kicker">
                    HEALTH HISTORY
                  </span>

                  <h3>
                    Medical records
                  </h3>

                </div>

                <Heart size={18} />

              </div>

              {normalizedRecords.filter(
                (record) =>
                  String(
                    record._goatId
                  ) ===
                  String(
                    selectedGoatDetails._medicalGoatId
                  )
              ).length ===
              0 ? (
                <div className="medical-drawer-empty">
                  No medical records
                  available for this
                  goat.
                </div>
              ) : (
                <div className="medical-drawer-history">

                  {normalizedRecords
                    .filter(
                      (record) =>
                        String(
                          record._goatId
                        ) ===
                        String(
                          selectedGoatDetails._medicalGoatId
                        )
                    )
                    .slice(0, 10)
                    .map(
                      (record) => (
                        <button
                          type="button"
                          key={`goat-medical-${record._id}`}
                          className="medical-drawer-history-row"
                          onClick={() => {
                            setSelectedGoatDetails(
                              null
                            );

                            setSelectedRecord(
                              record
                            );
                          }}
                        >

                          <div>

                            <strong>
                              {
                                record._type
                              }
                            </strong>

                            <span>
                              {
                                record._diagnosis
                              }
                            </span>

                          </div>

                          <span>
                            {formatDate(
                              record._date
                            )}
                          </span>

                        </button>
                      )
                    )}

                </div>
              )}

            </div>

          </aside>

        </div>
      )}

      {/* =====================================================
          MODAL
      ===================================================== */}

      {modalOpen && (
        <MedicalRecordModal
          goats={goats}
          initialRecord={
            editingRecord
          }
          saving={saving}
          onClose={() => {
            if (!saving) {
              setModalOpen(
                false
              );

              setEditingRecord(
                null
              );
            }
          }}
          onSave={
            saveMedicalRecord
          }
        />
      )}

    </div>
  );
}