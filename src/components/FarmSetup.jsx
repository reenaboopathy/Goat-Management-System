import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Home,
  Save,
  Zap,
  Bell,
  SlidersHorizontal,
  HeartPulse,
  Users,
  Baby,
  Activity,
  Scale,
  Smartphone,
  CheckCircle2,
  Info,
  RefreshCcw,
  Building2,
  CalendarDays,
  Settings2,
  ShieldCheck,
} from "lucide-react";

import "../components/FarmSetup.css";

/* =========================================================
   STORAGE
   SAME SOURCE OF TRUTH AS GOAT PAGE

   GoatPage stores real goats here:

   tenant.data.goats

   Do NOT create demo goats.
========================================================= */

const TENANT_STORAGE_KEYS = [
  "tenant",
  "currentTenant",
  "tenantData",
];

/* =========================================================
   SAFE STORAGE HELPERS
========================================================= */

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const getStoredTenant = () => {
  if (typeof window === "undefined") {
    return null;
  }

  for (const key of TENANT_STORAGE_KEYS) {
    const raw = localStorage.getItem(key);

    if (!raw) continue;

    const parsed = safeParse(raw);

    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  }

  return null;
};

const getTenantStorageKey = () => {
  if (typeof window === "undefined") {
    return "tenant";
  }

  for (const key of TENANT_STORAGE_KEYS) {
    if (localStorage.getItem(key) !== null) {
      return key;
    }
  }

  return "tenant";
};

const saveTenant = (tenant) => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const key = getTenantStorageKey();

    localStorage.setItem(
      key,
      JSON.stringify(tenant)
    );

    window.dispatchEvent(
      new CustomEvent("tenant-data-updated", {
        detail: tenant,
      })
    );

    return true;
  } catch (error) {
    console.error(
      "FarmSetup tenant save error:",
      error
    );

    return false;
  }
};

/* =========================================================
   REAL GOATS
   DIRECTLY FROM tenant.data.goats

   SAME AS GOAT PAGE
========================================================= */

const getRealGoats = () => {
  const tenant = getStoredTenant();

  if (
    tenant?.data &&
    Array.isArray(tenant.data.goats)
  ) {
    return tenant.data.goats;
  }

  return [];
};

/* =========================================================
   REAL FARM EVENTS

   Events may be stored in:
   tenant.data.events

   Goat-specific events remain inside:
   goat.events
========================================================= */

const getRealFarmEvents = () => {
  const tenant = getStoredTenant();

  if (
    tenant?.data &&
    Array.isArray(tenant.data.events)
  ) {
    return tenant.data.events;
  }

  return [];
};

/* =========================================================
   TEXT HELPERS
========================================================= */

const normalizeText = (value) => {
  return String(value ?? "")
    .trim()
    .toLowerCase();
};

/* =========================================================
   GOAT HELPERS
========================================================= */

const getGoatId = (goat) => {
  return (
    goat?.id ??
    goat?._id ??
    goat?.goatId ??
    goat?.goat_id ??
    goat?.tagNumber ??
    goat?.tag_number ??
    ""
  );
};

const getGoatName = (goat) => {
  return (
    goat?.name ??
    goat?.goatName ??
    goat?.goat_name ??
    goat?.displayName ??
    goat?.tagNumber ??
    goat?.tag_number ??
    "Unnamed Goat"
  );
};

const getGoatGender = (goat) => {
  return (
    goat?.gender ??
    goat?.sex ??
    goat?.Gender ??
    ""
  );
};

const getGoatStage = (goat) => {
  return (
    goat?.stage ??
    goat?.lifeStage ??
    goat?.life_stage ??
    goat?.category ??
    ""
  );
};

const getGoatStatus = (goat) => {
  return (
    goat?.status ??
    goat?.currentStatus ??
    goat?.current_status ??
    "active"
  );
};

/* =========================================================
   GOAT WEIGHT

   GoatPage saves current weight directly as:

   goat.weight
========================================================= */

const getGoatWeight = (goat) => {
  const values = [
    goat?.weight,
    goat?.currentWeight,
    goat?.current_weight,
    goat?.latestWeight,
    goat?.latest_weight,
  ];

  for (const value of values) {
    if (
      value !== null &&
      value !== undefined &&
      value !== ""
    ) {
      const number = Number(value);

      if (
        Number.isFinite(number) &&
        number >= 0
      ) {
        return number;
      }
    }
  }

  return null;
};

/* =========================================================
   ACTIVE GOAT
========================================================= */

const isActiveGoat = (goat) => {
  const status = normalizeText(
    getGoatStatus(goat)
  );

  const inactiveStatuses = [
    "sold",
    "dead",
    "deceased",
    "archived",
    "inactive",
    "removed",
  ];

  /*
    GoatPage uses archived boolean.
  */
  if (goat?.archived === true) {
    return false;
  }

  return !inactiveStatuses.includes(status);
};

/* =========================================================
   FEMALE
========================================================= */

const isFemaleGoat = (goat) => {
  const gender = normalizeText(
    getGoatGender(goat)
  );

  return (
    gender === "female" ||
    gender === "f" ||
    gender === "doe"
  );
};

/* =========================================================
   KID

   GoatPage stage values include:
   Kid / Doeling / Doe
   Kid / Buckling / Buck / Wether
========================================================= */

const isKidGoat = (goat) => {
  const stage = normalizeText(
    getGoatStage(goat)
  );

  return (
    stage === "kid" ||
    stage.includes("kid") ||
    stage.includes("young") ||
    stage.includes("baby")
  );
};

/* =========================================================
   FARM NAME
========================================================= */

const getFarmName = (tenant) => {
  return (
    tenant?.farmName ??
    tenant?.farm_name ??
    tenant?.name ??
    tenant?.ownerName ??
    tenant?.owner_name ??
    "My Farm"
  );
};

/* =========================================================
   EVENT HELPERS
========================================================= */

const isWeightEvent = (event) => {
  const type = normalizeText(
    event?.type ??
      event?.eventType ??
      event?.event_type ??
      event?.category
  );

  return (
    type === "weight" ||
    type.includes("weight") ||
    type.includes("weigh")
  );
};

const getAllGoatEvents = (goats) => {
  const events = [];

  goats.forEach((goat) => {
    if (
      Array.isArray(goat?.events)
    ) {
      goat.events.forEach((event) => {
        events.push({
          ...event,
          goatId: getGoatId(goat),
          goatName: getGoatName(goat),
        });
      });
    }
  });

  return events;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function FarmSetup({
  onBack,
}) {
  const [activeTab, setActiveTab] =
    useState("overview");

  const [goats, setGoats] = useState([]);
  const [events, setEvents] = useState([]);

  const [tenant, setTenant] = useState({});

  const [saveMessage, setSaveMessage] =
    useState("");

  const [farmProfile, setFarmProfile] =
    useState({
      farmName: "",
      location: "",
      ownerName: "",
      phone: "",
      description: "",
    });

  const [reminders, setReminders] =
    useState({
      weightCheck: true,
      weightDays: 7,

      vaccination: true,
      vaccinationDays: 30,

      healthCheck: true,
      healthDays: 7,

      breeding: false,
      breedingDays: 30,
    });

  const [preferences, setPreferences] =
    useState({
      liveData: true,
      autoRefresh: true,
      alerts: true,
    });

  /* =========================================================
     LOAD ACTUAL FARM DATA
  ========================================================= */

  const loadRealFarmData = () => {
    const currentTenant =
      getStoredTenant() || {};

    /*
      EXACT SOURCE:

      tenant.data.goats

      No sample data.
      No fake data.
      No fallback goats.
    */

    const realGoats =
      Array.isArray(
        currentTenant?.data?.goats
      )
        ? currentTenant.data.goats
        : [];

    /*
      Farm-wide events
    */

    const realEvents =
      Array.isArray(
        currentTenant?.data?.events
      )
        ? currentTenant.data.events
        : [];

    setTenant(currentTenant);

    setGoats(realGoats);

    setEvents(realEvents);

    /* =====================================================
       FARM PROFILE
    ===================================================== */

    setFarmProfile({
      farmName:
        currentTenant?.farmName ??
        currentTenant?.farm_name ??
        currentTenant?.name ??
        "",

      location:
        currentTenant?.location ??
        currentTenant?.farmLocation ??
        currentTenant?.farm_location ??
        "",

      ownerName:
        currentTenant?.ownerName ??
        currentTenant?.owner_name ??
        "",

      phone:
        currentTenant?.phone ??
        currentTenant?.mobile ??
        currentTenant?.phoneNumber ??
        "",

      description:
        currentTenant?.description ??
        currentTenant?.farmDescription ??
        "",
    });

    /* =====================================================
       REMINDERS
    ===================================================== */

    if (
      currentTenant?.reminders &&
      typeof currentTenant.reminders ===
        "object"
    ) {
      setReminders((previous) => ({
        ...previous,
        ...currentTenant.reminders,
      }));
    }

    /* =====================================================
       PREFERENCES
    ===================================================== */

    if (
      currentTenant?.preferences &&
      typeof currentTenant.preferences ===
        "object"
    ) {
      setPreferences((previous) => ({
        ...previous,
        ...currentTenant.preferences,
      }));
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    loadRealFarmData();
  }, []);

  /* =========================================================
     REAL-TIME SYNC

     GoatPage dispatches:

     tenant-data-updated

     with:

     detail: updatedTenant
  ========================================================= */

  useEffect(() => {
    const handleTenantUpdate = (event) => {
      const updatedTenant =
        event?.detail ||
        getStoredTenant();

      if (!updatedTenant) {
        loadRealFarmData();
        return;
      }

      const realGoats =
        Array.isArray(
          updatedTenant?.data?.goats
        )
          ? updatedTenant.data.goats
          : [];

      const realEvents =
        Array.isArray(
          updatedTenant?.data?.events
        )
          ? updatedTenant.data.events
          : [];

      setTenant(updatedTenant);

      setGoats(realGoats);

      setEvents(realEvents);
    };

    const handleStorageUpdate = (
      event
    ) => {
      if (
        !event.key ||
        TENANT_STORAGE_KEYS.includes(
          event.key
        )
      ) {
        loadRealFarmData();
      }
    };

    window.addEventListener(
      "tenant-data-updated",
      handleTenantUpdate
    );

    window.addEventListener(
      "storage",
      handleStorageUpdate
    );

    return () => {
      window.removeEventListener(
        "tenant-data-updated",
        handleTenantUpdate
      );

      window.removeEventListener(
        "storage",
        handleStorageUpdate
      );
    };
  }, []);

  /* =========================================================
     TOTAL GOATS
  ========================================================= */

  const totalGoats =
    goats.length;

  /* =========================================================
     ACTIVE GOATS
  ========================================================= */

  const activeGoats = useMemo(() => {
    return goats.filter(
      isActiveGoat
    );
  }, [goats]);

  const activeCount =
    activeGoats.length;

  /* =========================================================
     FEMALE
  ========================================================= */

  const femaleCount =
    useMemo(() => {
      return activeGoats.filter(
        isFemaleGoat
      ).length;
    }, [activeGoats]);

  /* =========================================================
     KIDS
  ========================================================= */

  const kidsCount =
    useMemo(() => {
      return activeGoats.filter(
        isKidGoat
      ).length;
    }, [activeGoats]);

  /* =========================================================
     ALL GOAT EVENTS

     This is important because GoatPage stores
     weight events inside each goat.
  ========================================================= */

  const goatEvents = useMemo(() => {
    return getAllGoatEvents(
      goats
    );
  }, [goats]);

  /* =========================================================
     WEIGHT EVENTS

     Includes actual Weight events from goats.
  ========================================================= */

  const weightEvents =
    useMemo(() => {
      return goatEvents.filter(
        isWeightEvent
      );
    }, [goatEvents]);

  /* =========================================================
     TOTAL WEIGHT RECORDS
  ========================================================= */

  const weightEventCount =
    weightEvents.length;

  /* =========================================================
     FARM HEALTH
  ========================================================= */

  const farmHealth =
    useMemo(() => {
      if (activeCount === 0) {
        return {
          score: 0,
          label: "Needs Attention",
        };
      }

      let score = 100;

      /* -----------------------------------------------
         Missing weight
      ----------------------------------------------- */

      const goatsWithoutWeight =
        activeGoats.filter(
          (goat) =>
            getGoatWeight(goat) ===
            null
        ).length;

      if (goatsWithoutWeight > 0) {
        const percentage =
          goatsWithoutWeight /
          activeCount;

        score -= Math.round(
          percentage * 25
        );
      }

      /* -----------------------------------------------
         Health-related status
      ----------------------------------------------- */

      const problemGoats =
        activeGoats.filter(
          (goat) => {
            const status =
              normalizeText(
                getGoatStatus(goat)
              );

            return (
              status.includes("sick") ||
              status.includes("ill") ||
              status.includes(
                "critical"
              ) ||
              status.includes(
                "quarantine"
              )
            );
          }
        ).length;

      if (problemGoats > 0) {
        const percentage =
          problemGoats /
          activeCount;

        score -= Math.round(
          percentage * 40
        );
      }

      score = Math.max(
        0,
        Math.min(100, score)
      );

      let label = "Excellent";

      if (score < 50) {
        label =
          "Needs Attention";
      } else if (score < 75) {
        label = "Good";
      } else if (score < 90) {
        label = "Very Good";
      }

      return {
        score,
        label,
      };
    }, [
      activeCount,
      activeGoats,
    ]);

  /* =========================================================
     FARM ALERTS
  ========================================================= */

  const farmAlerts =
    useMemo(() => {
      const alerts = [];

      /* -----------------------------------------------
         NO GOATS
      ----------------------------------------------- */

      if (totalGoats === 0) {
        alerts.push({
          id: "no-goats",
          type: "info",
          icon: Info,
          title:
            "No goat records found",
          description:
            "Add a real goat from Goat Management to see it here.",
        });

        return alerts;
      }

      /* -----------------------------------------------
         MISSING WEIGHT
      ----------------------------------------------- */

      const goatsWithoutWeight =
        activeGoats.filter(
          (goat) =>
            getGoatWeight(goat) ===
            null
        );

      if (
        goatsWithoutWeight.length >
        0
      ) {
        alerts.push({
          id: "missing-weight",
          type: "warning",
          icon: Scale,
          title:
            "Weight records need attention",
          description: `${
            goatsWithoutWeight.length
          } active goat${
            goatsWithoutWeight.length >
            1
              ? "s"
              : ""
          } ${
            goatsWithoutWeight.length >
            1
              ? "do"
              : "does"
          } not have a current weight record.`,
        });
      }

      /* -----------------------------------------------
         HEALTH STATUS
      ----------------------------------------------- */

      const problemGoats =
        activeGoats.filter(
          (goat) => {
            const status =
              normalizeText(
                getGoatStatus(goat)
              );

            return (
              status.includes("sick") ||
              status.includes("ill") ||
              status.includes(
                "critical"
              ) ||
              status.includes(
                "quarantine"
              )
            );
          }
        );

      if (
        problemGoats.length > 0
      ) {
        alerts.push({
          id: "health-alert",
          type: "critical",
          icon: HeartPulse,
          title:
            "Goat health records need attention",
          description: `${
            problemGoats.length
          } active goat${
            problemGoats.length >
            1
              ? "s"
              : ""
          } ${
            problemGoats.length >
            1
              ? "have"
              : "has"
          } a health-related status.`,
        });
      }

      /* -----------------------------------------------
         HEALTHY
      ----------------------------------------------- */

      if (alerts.length === 0) {
        alerts.push({
          id: "healthy",
          type: "info",
          icon: CheckCircle2,
          title:
            "No active farm alerts",
          description:
            "Your current real goat records do not show any alerts requiring attention.",
        });
      }

      return alerts;
    }, [
      activeGoats,
      totalGoats,
    ]);

  /* =========================================================
     WEIGHING DEVICE

     We only read existing device configuration.
     We do NOT create a fake device.
  ========================================================= */

  const weighingDevice =
    useMemo(() => {
      const possibleValues = [
        tenant?.weighingDevice,
        tenant?.weighing_device,
        tenant?.data?.weighingDevice,
        tenant?.data?.weighing_device,
        tenant?.data?.scaleDevice,
        tenant?.data?.scale_device,
        tenant?.data?.esp32Device,
        tenant?.data?.esp32_device,
      ];

      for (
        const value of possibleValues
      ) {
        if (
          value &&
          typeof value === "object"
        ) {
          return value;
        }
      }

      return null;
    }, [tenant]);

  /* =========================================================
     DEVICE STATUS
  ========================================================= */

  const deviceConnected =
    Boolean(
      weighingDevice?.connected ??
        weighingDevice?.isConnected ??
        weighingDevice?.is_connected ??
        false
    );

  /* =========================================================
     HERD SUMMARY
  ========================================================= */

  const herdSummary =
    useMemo(() => {
      return {
        total: totalGoats,
        active: activeCount,
        female: femaleCount,
        kids: kidsCount,
      };
    }, [
      totalGoats,
      activeCount,
      femaleCount,
      kidsCount,
    ]);

  /* =========================================================
     PROFILE CHANGE
  ========================================================= */

  const handleProfileChange = (
    field,
    value
  ) => {
    setFarmProfile(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );
  };

  /* =========================================================
     SAVE FARM SETTINGS

     IMPORTANT:

     goats are NOT overwritten here.

     GoatPage remains the goat source of truth.
  ========================================================= */

  const handleSave = () => {
    const currentTenant =
      getStoredTenant() || {};

    const updatedTenant = {
      ...currentTenant,

      farmName:
        farmProfile.farmName,

      location:
        farmProfile.location,

      ownerName:
        farmProfile.ownerName,

      phone:
        farmProfile.phone,

      description:
        farmProfile.description,

      reminders: {
        ...reminders,
      },

      preferences: {
        ...preferences,
      },

      updatedAt:
        new Date().toISOString(),

      /*
        VERY IMPORTANT:

        Preserve existing data,
        including tenant.data.goats.
      */

      data: {
        ...(currentTenant.data || {}),
        goats: Array.isArray(
          currentTenant?.data?.goats
        )
          ? currentTenant.data.goats
          : [],
        events: Array.isArray(
          currentTenant?.data?.events
        )
          ? currentTenant.data.events
          : [],
      },
    };

    const success =
      saveTenant(
        updatedTenant
      );

    if (success) {
      setTenant(
        updatedTenant
      );

      setGoats(
        Array.isArray(
          updatedTenant?.data?.goats
        )
          ? updatedTenant.data.goats
          : []
      );

      setEvents(
        Array.isArray(
          updatedTenant?.data?.events
        )
          ? updatedTenant.data.events
          : []
      );

      setSaveMessage(
        "Farm settings saved successfully"
      );

      window.setTimeout(() => {
        setSaveMessage("");
      }, 2500);
    }
  };

  /* =========================================================
     REFRESH
  ========================================================= */

  const handleRefresh = () => {
    loadRealFarmData();

    setSaveMessage(
      "Real farm data refreshed"
    );

    window.setTimeout(() => {
      setSaveMessage("");
    }, 1800);
  };

  /* =========================================================
     BACK
  ========================================================= */

  const handleBack = () => {
    if (
      typeof onBack ===
      "function"
    ) {
      onBack();
      return;
    }

    if (
      window.history.length > 1
    ) {
      window.history.back();
    }
  };

  /* =========================================================
     REMINDER TOGGLE
  ========================================================= */

  const toggleReminder = (
    field
  ) => {
    setReminders(
      (previous) => ({
        ...previous,
        [field]:
          !previous[field],
      })
    );
  };

  /* =========================================================
     PREFERENCE TOGGLE
  ========================================================= */

  const togglePreference = (
    field
  ) => {
    setPreferences(
      (previous) => ({
        ...previous,
        [field]:
          !previous[field],
      })
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="farm-setup-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="farm-setup-header">

        <div className="farm-header-left">

          <button
            className="farm-back-btn"
            onClick={handleBack}
            title="Go back"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="farm-header-icon">
            <Home size={22} />
          </div>

          <div>

            <span>
              FARM MANAGEMENT
            </span>

            <h1>
              Farm Setup
            </h1>

            <p>
              Configure and monitor your farm from one place.
            </p>

          </div>

        </div>

        <div className="farm-header-actions">

          <div className="farm-live-pill">
            <span />
            Live Data
          </div>

          <button
            className="farm-save-btn"
            onClick={handleSave}
          >
            <Save size={16} />
            Save Changes
          </button>

        </div>

      </header>

      {/* =====================================================
          SAVE MESSAGE
      ===================================================== */}

      {saveMessage && (
        <div className="farm-save-message">

          <CheckCircle2 size={17} />

          {saveMessage}

        </div>
      )}

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="farm-setup-container">

        {/* ===================================================
            HERO
        =================================================== */}

        <section className="farm-control-hero">

          <div>

            <div className="farm-hero-badge">

              <Zap size={13} />

              SMART FARM CONTROL CENTER

            </div>

            <h2>
              {getFarmName(tenant)}
            </h2>

            <p>
              Monitor your actual goat records,
              reminders, health and farm configuration.
            </p>

          </div>

          <div className="farm-health-score">

            <div className="farm-score-ring">

              <strong>
                {farmHealth.score}
              </strong>

              <span>
                / 100
              </span>

            </div>

            <div>

              <span>
                FARM HEALTH
              </span>

              <strong>
                {farmHealth.label}
              </strong>

            </div>

          </div>

        </section>

        {/* ===================================================
            REAL STATS
        =================================================== */}

        <section className="farm-stats-grid">

          {/* TOTAL */}

          <div className="farm-stat-card">

            <div className="farm-stat-icon">
              <Users size={21} />
            </div>

            <div className="farm-stat-content">

              <span>
                Total Goats
              </span>

              <strong>
                {totalGoats}
              </strong>

              <small>
                From your goat records
              </small>

            </div>

          </div>

          {/* ACTIVE */}

          <div className="farm-stat-card">

            <div className="farm-stat-icon">
              <HeartPulse size={21} />
            </div>

            <div className="farm-stat-content">

              <span>
                Active Herd
              </span>

              <strong>
                {activeCount}
              </strong>

              <small>
                Currently active goats
              </small>

            </div>

          </div>

          {/* FEMALE */}

          <div className="farm-stat-card">

            <div className="farm-stat-icon">
              <Users size={21} />
            </div>

            <div className="farm-stat-content">

              <span>
                Female
              </span>

              <strong>
                {femaleCount}
              </strong>

              <small>
                Actual female goats
              </small>

            </div>

          </div>

          {/* KIDS */}

          <div className="farm-stat-card">

            <div className="farm-stat-icon">
              <Baby size={21} />
            </div>

            <div className="farm-stat-content">

              <span>
                Kids
              </span>

              <strong>
                {kidsCount}
              </strong>

              <small>
                Actual young goats
              </small>

            </div>

          </div>

        </section>

        {/* ===================================================
            TABS
        =================================================== */}

        <div className="farm-tab-bar">

          <button
            className={
              activeTab ===
              "overview"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "overview"
              )
            }
          >
            <Zap size={15} />
            Overview
          </button>

          <button
            className={
              activeTab ===
              "profile"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "profile"
              )
            }
          >
            <Home size={15} />
            Farm Profile
          </button>

          <button
            className={
              activeTab ===
              "reminders"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "reminders"
              )
            }
          >
            <Bell size={15} />
            Reminders
          </button>

          <button
            className={
              activeTab ===
              "preferences"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "preferences"
              )
            }
          >
            <SlidersHorizontal
              size={15}
            />
            Preferences
          </button>

        </div>

        {/* ===================================================
            OVERVIEW
        =================================================== */}

        {activeTab ===
          "overview" && (
          <>

            <div className="farm-content-grid">

              {/* =================================================
                  ALERTS
              ================================================= */}

              <section className="farm-panel">

                <div className="farm-panel-head">

                  <div>

                    <span>
                      SMART MONITORING
                    </span>

                    <h3>
                      Farm Alerts
                    </h3>

                    <p>
                      Alerts generated from your actual farm
                      records.
                    </p>

                  </div>

                  <div className="farm-panel-icon">
                    <Bell size={19} />
                  </div>

                </div>

                <div className="farm-alert-list">

                  {farmAlerts.map(
                    (alert) => {

                      const AlertIcon =
                        alert.icon ||
                        Info;

                      return (
                        <div
                          className={`farm-alert ${alert.type}`}
                          key={
                            alert.id
                          }
                        >

                          <div className="farm-alert-icon">

                            <AlertIcon
                              size={17}
                            />

                          </div>

                          <div>

                            <strong>
                              {
                                alert.title
                              }
                            </strong>

                            <p>
                              {
                                alert.description
                              }
                            </p>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              </section>

              {/* =================================================
                  DEVICE
              ================================================= */}

              <section className="farm-panel">

                <div className="farm-panel-head">

                  <div>

                    <span>
                      DEVICE
                    </span>

                    <h3>
                      Weighing System
                    </h3>

                    <p>
                      Monitor your connected weighing device.
                    </p>

                  </div>

                  <div className="farm-panel-icon">
                    <Smartphone
                      size={19}
                    />
                  </div>

                </div>

                <div className="farm-device-card">

                  <div className="farm-device-status">

                    <div
                      className="farm-device-dot"
                      style={{
                        background:
                          deviceConnected
                            ? "#10b981"
                            : "#94a3b8",
                      }}
                    />

                    <div>

                      <strong>
                        {deviceConnected
                          ? "Weighing Device Connected"
                          : "Weighing Device Not Connected"}
                      </strong>

                      <span>
                        {deviceConnected
                          ? "Live weighing data available"
                          : "Connect ESP32 weighing system to start live data"}
                      </span>

                    </div>

                    <b
                      style={{
                        color:
                          deviceConnected
                            ? "#047857"
                            : "#64748b",
                      }}
                    >
                      {deviceConnected
                        ? "ONLINE"
                        : "OFFLINE"}
                    </b>

                  </div>

                  <div className="farm-device-info">

                    <div>

                      <span>
                        Device
                      </span>

                      <strong>
                        {weighingDevice?.name ??
                          weighingDevice?.deviceName ??
                          "Not configured"}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Connection
                      </span>

                      <strong>
                        {weighingDevice?.connectionType ??
                          weighingDevice?.connection_type ??
                          "USB / ESP32"}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Weight Records
                      </span>

                      <strong>
                        {weightEventCount}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Live Data
                      </span>

                      <strong>
                        {deviceConnected
                          ? "Available"
                          : "Waiting"}
                      </strong>

                    </div>

                  </div>

                  <button
                    className="farm-outline-btn"
                    onClick={
                      handleRefresh
                    }
                  >

                    <span>
                      Refresh device data
                    </span>

                    <RefreshCcw
                      size={14}
                    />

                  </button>

                </div>

              </section>

            </div>

            {/* =================================================
                HERD SUMMARY
            ================================================= */}

            <section className="farm-panel farm-large-panel">

              <div className="farm-panel-head">

                <div>

                  <span>
                    REAL GOAT RECORDS
                  </span>

                  <h3>
                    Herd Overview
                  </h3>

                  <p>
                    This section is calculated directly from
                    your existing goat records.
                  </p>

                </div>

                <div className="farm-panel-icon">
                  <Activity
                    size={19}
                  />
                </div>

              </div>

              <div className="farm-herd-grid">

                <div>

                  <strong>
                    {
                      herdSummary.total
                    }
                  </strong>

                  <span>
                    Total
                  </span>

                </div>

                <div>

                  <strong>
                    {
                      herdSummary.active
                    }
                  </strong>

                  <span>
                    Active
                  </span>

                </div>

                <div>

                  <strong>
                    {
                      herdSummary.female
                    }
                  </strong>

                  <span>
                    Female
                  </span>

                </div>

                <div>

                  <strong>
                    {
                      herdSummary.kids
                    }
                  </strong>

                  <span>
                    Kids
                  </span>

                </div>

              </div>

              <div
                className="farm-shed-summary"
                style={{
                  marginTop:
                    "12px",
                }}
              >

                <Activity
                  size={24}
                />

                <div>

                  <strong>
                    {activeCount}
                  </strong>

                  <span>
                    active goats currently available in
                    your actual farm records
                  </span>

                </div>

              </div>

            </section>

          </>
        )}

        {/* ===================================================
            FARM PROFILE
        =================================================== */}

        {activeTab ===
          "profile" && (
          <section className="farm-panel farm-large-panel">

            <div className="farm-panel-head">

              <div>

                <span>
                  FARM INFORMATION
                </span>

                <h3>
                  Farm Profile
                </h3>

                <p>
                  Update your farm information.
                </p>

              </div>

              <div className="farm-panel-icon">
                <Building2
                  size={19}
                />
              </div>

            </div>

            <div className="farm-form-grid">

              <label>

                Farm Name

                <input
                  type="text"
                  value={
                    farmProfile.farmName
                  }
                  onChange={(event) =>
                    handleProfileChange(
                      "farmName",
                      event.target.value
                    )
                  }
                  placeholder="Enter farm name"
                />

              </label>

              <label>

                Owner Name

                <input
                  type="text"
                  value={
                    farmProfile.ownerName
                  }
                  onChange={(event) =>
                    handleProfileChange(
                      "ownerName",
                      event.target.value
                    )
                  }
                  placeholder="Enter owner name"
                />

              </label>

              <label>

                Location

                <input
                  type="text"
                  value={
                    farmProfile.location
                  }
                  onChange={(event) =>
                    handleProfileChange(
                      "location",
                      event.target.value
                    )
                  }
                  placeholder="Enter farm location"
                />

              </label>

              <label>

                Phone

                <input
                  type="tel"
                  value={
                    farmProfile.phone
                  }
                  onChange={(event) =>
                    handleProfileChange(
                      "phone",
                      event.target.value
                    )
                  }
                  placeholder="Enter phone number"
                />

              </label>

              <label className="farm-full-field">

                Farm Description

                <textarea
                  rows="5"
                  value={
                    farmProfile.description
                  }
                  onChange={(event) =>
                    handleProfileChange(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Enter farm description"
                />

              </label>

            </div>

            <div className="farm-form-actions">

              <button
                className="farm-small-btn"
                onClick={
                  handleSave
                }
              >

                <Save size={14} />

                Save Profile

              </button>

            </div>

          </section>
        )}

        {/* ===================================================
            REMINDERS
        =================================================== */}

        {activeTab ===
          "reminders" && (
          <section className="farm-panel farm-large-panel">

            <div className="farm-panel-head">

              <div>

                <span>
                  SMART REMINDERS
                </span>

                <h3>
                  Farm Reminders
                </h3>

                <p>
                  Configure reminders for your farm records.
                </p>

              </div>

              <div className="farm-panel-icon">
                <Bell size={19} />
              </div>

            </div>

            {/* WEIGHT */}

            <div className="farm-reminder-row">

              <div className="farm-reminder-icon">
                <Scale size={18} />
              </div>

              <div className="farm-reminder-info">

                <strong>
                  Weight Check
                </strong>

                <span>
                  Reminder for regular goat weight records.
                </span>

              </div>

              <div className="farm-reminder-controls">

                <label>

                  Every

                  <input
                    type="number"
                    min="1"
                    value={
                      reminders.weightDays
                    }
                    onChange={(event) =>
                      setReminders(
                        (previous) => ({
                          ...previous,
                          weightDays:
                            Number(
                              event
                                .target
                                .value
                            ) || 1,
                        })
                      )
                    }
                  />

                  days

                </label>

                <button
                  className={`farm-toggle ${
                    reminders.weightCheck
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    toggleReminder(
                      "weightCheck"
                    )
                  }
                >
                  <span />
                </button>

              </div>

            </div>

            {/* VACCINATION */}

            <div className="farm-reminder-row">

              <div className="farm-reminder-icon">
                <ShieldCheck
                  size={18}
                />
              </div>

              <div className="farm-reminder-info">

                <strong>
                  Vaccination
                </strong>

                <span>
                  Reminder for vaccination records.
                </span>

              </div>

              <div className="farm-reminder-controls">

                <label>

                  Every

                  <input
                    type="number"
                    min="1"
                    value={
                      reminders.vaccinationDays
                    }
                    onChange={(event) =>
                      setReminders(
                        (previous) => ({
                          ...previous,
                          vaccinationDays:
                            Number(
                              event
                                .target
                                .value
                            ) || 1,
                        })
                      )
                    }
                  />

                  days

                </label>

                <button
                  className={`farm-toggle ${
                    reminders.vaccination
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    toggleReminder(
                      "vaccination"
                    )
                  }
                >
                  <span />
                </button>

              </div>

            </div>

            {/* HEALTH */}

            <div className="farm-reminder-row">

              <div className="farm-reminder-icon">
                <HeartPulse
                  size={18}
                />
              </div>

              <div className="farm-reminder-info">

                <strong>
                  Health Check
                </strong>

                <span>
                  Reminder for regular health monitoring.
                </span>

              </div>

              <div className="farm-reminder-controls">

                <label>

                  Every

                  <input
                    type="number"
                    min="1"
                    value={
                      reminders.healthDays
                    }
                    onChange={(event) =>
                      setReminders(
                        (previous) => ({
                          ...previous,
                          healthDays:
                            Number(
                              event
                                .target
                                .value
                            ) || 1,
                        })
                      )
                    }
                  />

                  days

                </label>

                <button
                  className={`farm-toggle ${
                    reminders.healthCheck
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    toggleReminder(
                      "healthCheck"
                    )
                  }
                >
                  <span />
                </button>

              </div>

            </div>

            {/* BREEDING */}

            <div className="farm-reminder-row">

              <div className="farm-reminder-icon">
                <CalendarDays
                  size={18}
                />
              </div>

              <div className="farm-reminder-info">

                <strong>
                  Breeding
                </strong>

                <span>
                  Reminder for breeding-related records.
                </span>

              </div>

              <div className="farm-reminder-controls">

                <label>

                  Every

                  <input
                    type="number"
                    min="1"
                    value={
                      reminders.breedingDays
                    }
                    onChange={(event) =>
                      setReminders(
                        (previous) => ({
                          ...previous,
                          breedingDays:
                            Number(
                              event
                                .target
                                .value
                            ) || 1,
                        })
                      )
                    }
                  />

                  days

                </label>

                <button
                  className={`farm-toggle ${
                    reminders.breeding
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    toggleReminder(
                      "breeding"
                    )
                  }
                >
                  <span />
                </button>

              </div>

            </div>

            <div className="farm-reminder-note">

              <Bell size={18} />

              <div>

                <strong>
                  Reminder settings
                </strong>

                <span>
                  These settings are saved with your farm
                  configuration. Goat-specific reminders continue
                  to use your actual goat and event records.
                </span>

              </div>

            </div>

          </section>
        )}

        {/* ===================================================
            PREFERENCES
        =================================================== */}

        {activeTab ===
          "preferences" && (
          <section className="farm-panel farm-large-panel">

            <div className="farm-panel-head">

              <div>

                <span>
                  FARM CONTROL
                </span>

                <h3>
                  Preferences
                </h3>

                <p>
                  Control how Farm Setup works with your live
                  farm data.
                </p>

              </div>

              <div className="farm-panel-icon">
                <Settings2
                  size={19}
                />
              </div>

            </div>

            {/* LIVE DATA */}

            <div className="farm-preference-row">

              <div className="farm-preference-icon">
                <Activity
                  size={18}
                />
              </div>

              <div>

                <strong>
                  Live Farm Data
                </strong>

                <span>
                  Read statistics from your actual goat records.
                </span>

              </div>

              <button
                className={`farm-toggle ${
                  preferences.liveData
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  togglePreference(
                    "liveData"
                  )
                }
              >
                <span />
              </button>

            </div>

            {/* AUTO REFRESH */}

            <div className="farm-preference-row">

              <div className="farm-preference-icon">
                <RefreshCcw
                  size={18}
                />
              </div>

              <div>

                <strong>
                  Automatic Updates
                </strong>

                <span>
                  Refresh when GoatPage or EventsPage changes
                  farm data.
                </span>

              </div>

              <button
                className={`farm-toggle ${
                  preferences.autoRefresh
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  togglePreference(
                    "autoRefresh"
                  )
                }
              >
                <span />
              </button>

            </div>

            {/* ALERTS */}

            <div className="farm-preference-row">

              <div className="farm-preference-icon">
                <Bell size={18} />
              </div>

              <div>

                <strong>
                  Farm Alerts
                </strong>

                <span>
                  Show alerts generated from actual farm records.
                </span>

              </div>

              <button
                className={`farm-toggle ${
                  preferences.alerts
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  togglePreference(
                    "alerts"
                  )
                }
              >
                <span />
              </button>

            </div>

            <div className="farm-reminder-note">

              <Info size={18} />

              <div>

                <strong>
                  Real data mode
                </strong>

                <span>
                  Farm Setup does not create or use sample goat
                  records. All goat statistics come directly from
                  tenant.data.goats used by GoatPage.
                </span>

              </div>

            </div>

            <div className="farm-form-actions">

              <button
                className="farm-small-btn"
                onClick={
                  handleSave
                }
              >

                <Save size={14} />

                Save Preferences

              </button>

            </div>

          </section>
        )}

      </main>

    </div>
  );
}