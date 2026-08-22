import { useState, useEffect } from "react";

import {
  Bell,
  Activity,
  Droplet,
  Calendar,
  DollarSign,
  Wrench,
  BarChart3,
  Stethoscope,
  Scale,
  ArrowRight,
  LogOut,
  CheckCircle2,
} from "lucide-react";

import CenteredAuthShell from "./components/CenteredAuthShell.jsx";
import TenantLogin from "./components/TenantLogin.jsx";
import Breeding from "./components/BreedingPage.jsx";

import GoatsPage from "./components/GoatsPage.jsx";
import WeightLogPage from "./components/WeightlogPage.jsx";
import EventsPage from "./components/EventsPage.jsx";
import VaccinationsPage from "./components/VaccinationsPage.jsx";
import MedicalPage from "./components/MedicalPage.jsx";
import SalesPage from "./components/SalesPage.jsx";
import ReportsPage from "./components/ReportsPage.jsx";
import FarmSetupPage from "./components/FarmSetup.jsx";
import WeighingScalePage from "./components/WeighingScalePage.jsx";
import Subscription from "./components/Subscription.jsx";

import {
  DEMO_TENANTS,
  STORAGE_KEY,
  emptyTenantData,
  slugify,
} from "./data.js";

import {
  createTrialSubscription,
  getTrialDaysRemaining,
  isTrialActive,
  isTrialExpired,
  shouldShowTrialReminder,
} from "./utils/subscription.js";


/* =========================================================
   MAIN APP
========================================================= */

export default function App() {

  /* =========================================================
     SCREEN
  ========================================================= */

  const [screen, setScreen] = useState("tenant-login");


  /* =========================================================
     ACTIVE SECTION
  ========================================================= */

  const [activeSection, setActiveSection] =
    useState("dashboard");


  /* =========================================================
     TENANTS
  ========================================================= */

  const [tenants, setTenants] =
    useState(DEMO_TENANTS);


  /* =========================================================
     STORAGE
  ========================================================= */

  const [storageReady, setStorageReady] =
    useState(false);


  /* =========================================================
     SESSION
  ========================================================= */

  const [tenantSession, setTenantSession] =
    useState(null);


  /* =========================================================
     SAVE ERROR
  ========================================================= */

  const [saveError, setSaveError] =
    useState("");


  /* =========================================================
     SUBSCRIPTION CLOCK
  ========================================================= */

  const [, setSubscriptionTick] =
    useState(Date.now());


  /* =========================================================
     LOAD TENANTS
  ========================================================= */

  useEffect(() => {

    try {

      const stored =
        localStorage.getItem(STORAGE_KEY);

      if (stored) {

        setTenants(
          JSON.parse(stored)
        );

      }

    } catch (error) {

      console.error(
        "Failed to load tenant data:",
        error
      );

    } finally {

      setStorageReady(true);

    }

  }, []);


  /* =========================================================
     SAVE TENANTS
  ========================================================= */

  useEffect(() => {

    if (!storageReady) {
      return;
    }

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tenants)
      );

      setSaveError("");

    } catch (error) {

      console.error(
        "Failed to save tenant data:",
        error
      );

      setSaveError(
        "Running in this session only — saved changes may not survive a full reload."
      );

    }

  }, [
    tenants,
    storageReady,
  ]);


  /* =========================================================
     REAL TIME SUBSCRIPTION CHECK
  ========================================================= */

  useEffect(() => {

    const timer =
      setInterval(() => {

        setSubscriptionTick(
          Date.now()
        );

      }, 1000);

    return () => {

      clearInterval(timer);

    };

  }, []);


  /* =========================================================
     TENANT LOGIN
  ========================================================= */

  function tenantLogin(
    slug,
    loginId,
    password
  ) {

    const normalizedSlug =
      slugify(slug);

    const t =
      tenants[normalizedSlug];


    /* FARM NOT FOUND */

    if (!t) {

      return {
        ok: false,
        error:
          "No farm found with that name",
      };

    }


    /* FARM STATUS */

    if (t.status !== "Active") {

      return {
        ok: false,
        error:
          "This farm account is suspended",
      };

    }


    /* LOGIN ID */

    if (!loginId) {

      return {
        ok: false,
        error:
          "Enter a valid username or email",
      };

    }


    /* PASSWORD */

    if (!password) {

      return {
        ok: false,
        error:
          "Enter a valid password",
      };

    }


    /* FIND USER */

    const u =
      t.users?.find(
        (x) =>
          x.password === password &&
          (
            x.username === loginId ||
            x.email === loginId
          )
      );


    /* INVALID LOGIN */

    if (!u) {

      return {
        ok: false,
        error:
          "Wrong farm name or password",
      };

    }


    /* =====================================================
       CREATE TRIAL IF NEEDED
    ===================================================== */

    let loginTenant = t;

    if (
      !t.subscription ||
      !t.subscription.trialStartedAt ||
      !t.subscription.trialEndsAt
    ) {

      loginTenant = {

        ...t,

        subscription:
          createTrialSubscription(),

      };


      setTenants((prev) => ({

        ...prev,

        [normalizedSlug]:
          loginTenant,

      }));

    }


    /* =====================================================
       SESSION
    ===================================================== */

    setTenantSession({

      tenantId:
        normalizedSlug,

      username:
        u.username,

      name:
        u.name || u.username,

    });


    setScreen(
      "tenant-plain"
    );

    setActiveSection(
      "dashboard"
    );


    return {
      ok: true,
    };

  }


  /* =========================================================
     CREATE TENANT
  ========================================================= */

  function createTenant({
    farmId,
    username,
    email,
    password,
  }) {

    const normalizedSlug =
      slugify(farmId);


    if (!normalizedSlug) {

      return {
        ok: false,
        error:
          "Enter a valid farm name",
      };

    }


    if (tenants[normalizedSlug]) {

      return {
        ok: false,
        error:
          "This farm name already exists",
      };

    }


    if (!username) {

      return {
        ok: false,
        error:
          "Enter a valid username",
      };

    }


    if (!password) {

      return {
        ok: false,
        error:
          "Enter a valid password",
      };

    }


    /* =====================================================
       NEW TENANT
    ===================================================== */

    const newTenant = {

      name:
        username,

      status:
        "Active",

      createdAt:
        new Date()
          .toISOString()
          .slice(0, 10),

      users: [

        {

          username,

          email:
            email || "",

          password,

          name:
            username,

        },

      ],

      data:
        emptyTenantData(),

      subscription:
        createTrialSubscription(),

    };


    /* SAVE */

    setTenants((prev) => ({

      ...prev,

      [normalizedSlug]:
        newTenant,

    }));


    /* SESSION */

    setTenantSession({

      tenantId:
        normalizedSlug,

      username,

      name:
        username,

    });


    setScreen(
      "tenant-plain"
    );

    setActiveSection(
      "dashboard"
    );


    return {
      ok: true,
    };

  }


  /* =========================================================
     PASSWORD RECOVERY
  ========================================================= */

  function recoverPassword(
    farmId,
    loginId
  ) {

    const normalizedSlug =
      slugify(farmId);

    const t =
      tenants[normalizedSlug];


    if (!t) {

      return {
        ok: false,
        error:
          "No farm found with that name",
      };

    }


    if (!loginId) {

      return {
        ok: false,
        error:
          "Enter a valid username or email",
      };

    }


    const u =
      t.users?.find(
        (x) =>
          x.username === loginId ||
          x.email === loginId
      );


    if (!u) {

      return {
        ok: false,
        error:
          "No matching user found for that farm",
      };

    }


    return {

      ok: true,

      message:
        `Your password is: ${u.password}`,

    };

  }


  /* =========================================================
     ACTIVE TENANT
  ========================================================= */

  const activeTenant =
    tenantSession
      ? tenants[
          tenantSession.tenantId
        ]
      : null;


  /* =========================================================
     SUBSCRIPTION
  ========================================================= */

  const subscription =
    activeTenant?.subscription ||
    null;


  /* =========================================================
     TRIAL STATUS
  ========================================================= */

  const trialActive =
    isTrialActive(
      subscription
    );


  const trialExpired =
    isTrialExpired(
      subscription
    );


  const trialDaysRemaining =
    getTrialDaysRemaining(
      subscription
    );


  const showTrialReminder =
    shouldShowTrialReminder(
      subscription
    );


  /* =========================================================
     NAVIGATION
  ========================================================= */

  function goToSection(key) {

    const currentSubscription =
      activeTenant?.subscription ||
      null;


    const expired =
      isTrialExpired(
        currentSubscription
      );


    /* =====================================================
       TRIAL EXPIRED
    ===================================================== */

    if (
      expired &&
      key !== "subscription"
    ) {

      setActiveSection(
        "subscription"
      );

      return;

    }


    setActiveSection(key);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }


  /* =========================================================
     LOGOUT
  ========================================================= */

  function logout() {

    setTenantSession(null);

    setScreen(
      "tenant-login"
    );

    setActiveSection(
      "dashboard"
    );

  }


  /* =========================================================
     SAVE ERROR UI
  ========================================================= */

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #F8FAFF 0%, #EAF2FF 100%)",
      }}
    >

      {/* =====================================================
          SAVE ERROR
      ===================================================== */}

      {saveError && (

        <div
          style={{
            position: "fixed",
            top: 15,
            right: 15,
            maxWidth: 380,
            background: "#0F172A",
            color: "#fff",
            padding: "13px 16px",
            borderRadius: 12,
            fontSize: 12,
            zIndex: 100,
            display: "flex",
            gap: 10,
            alignItems: "center",
            boxShadow:
              "0 18px 45px rgba(15,23,42,0.2)",
          }}
        >

          <span
            style={{
              flex: 1,
            }}
          >
            {saveError}
          </span>


          <button
            onClick={() =>
              setSaveError("")
            }
            style={{
              border: "none",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Close
          </button>

        </div>

      )}


      {/* =====================================================
          TOP TRIAL ALERT
      ===================================================== */}

      {screen === "tenant-plain" &&
        tenantSession &&
        showTrialReminder && (

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 90,
              background:
                "linear-gradient(90deg,#92400E,#B45309)",
              color: "#fff",
              padding:
                "10px 16px",
              display: "flex",
              justifyContent:
                "center",
              alignItems:
                "center",
              gap: 12,
              fontSize: 13,
              fontWeight: 700,
            }}
          >

            <span>
              ⚠️ Your free trial ends tomorrow.
            </span>


            <button
              onClick={() =>
                goToSection(
                  "subscription"
                )
              }
              style={{
                border: "none",
                background: "#fff",
                color: "#92400E",
                padding:
                  "6px 12px",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              View Subscription
            </button>

          </div>

        )}


      {/* =====================================================
          LOGIN
      ===================================================== */}

      {screen === "tenant-login" && (

        <CenteredAuthShell>

          <TenantLogin
            onLogin={
              tenantLogin
            }

            onCreateTenant={
              createTenant
            }

            onRecoverPassword={
              recoverPassword
            }
          />

        </CenteredAuthShell>

      )}


      {/* =====================================================
          SUBSCRIPTION PAGE
      ===================================================== */}

      {screen === "tenant-plain" &&
        tenantSession &&
        activeSection === "subscription" && (

          <Subscription
            tenant={
              activeTenant
            }

            onBack={() => {

              if (trialExpired) {

                setActiveSection(
                  "subscription"
                );

                return;

              }

              goToSection(
                "dashboard"
              );

            }}
          />

        )}


      {/* =====================================================
          APP CONTENT
      ===================================================== */}

      {screen === "tenant-plain" &&
        tenantSession &&
        trialActive && (

          <>

            {/* =================================================
                GOATS
            ================================================= */}

            {activeSection === "goats" && (

              <GoatsPage
                tenant={
                  activeTenant
                }

                onBack={() =>
                  goToSection(
                    "dashboard"
                  )
                }

                onAdd={() => {}}
              />

            )}


            {/* =================================================
                MILK RECORDS
            ================================================= */}

            {activeSection === "weightlog" && (

              <WeightLogPage
                tenant={
                  activeTenant
                }

                onBack={() =>
                  goToSection(
                    "dashboard"
                  )
                }

                onAdd={() => {}}
              />

            )}


            {/* =================================================
                EVENTS
            ================================================= */}

            {activeSection === "breeding" && (

              <EventsPage
                onBack={() =>
                  goToSection(
                    "dashboard"
                  )
                }
              />

            )}


            {/* =================================================
                VACCINATIONS
            ================================================= */}

            {activeSection === "vaccinations" && (

              <VaccinationsPage
                tenant={
                  activeTenant
                }

                onBack={() =>
                  goToSection(
                    "dashboard"
                  )
                }

                onAdd={() => {}}
              />

            )}


            {/* =================================================
                MEDICAL
            ================================================= */}

            {activeSection === "medical" && (

              <MedicalPage
                tenant={
                  activeTenant
                }

                onBack={() =>
                  goToSection(
                    "dashboard"
                  )
                }

                onAdd={() => {}}
              />

            )}


            {/* =================================================
                FARM SETUP
            ================================================= */}

            {activeSection === "farm-setup" && (

              <FarmSetupPage
                tenant={
                  activeTenant
                }

                onBack={() =>
                  goToSection(
                    "dashboard"
                  )
                }
              />

            )}


            {/* =================================================
                SALES
            ================================================= */}

            {activeSection === "sales" && (

              <SalesPage
                tenant={
                  activeTenant
                }

                onBack={() =>
                  goToSection(
                    "dashboard"
                  )
                }

                onAdd={() => {}}
              />

            )}


            {/* =================================================
                REPORTS
            ================================================= */}

            {activeSection === "reports" && (

              <ReportsPage
                tenant={
                  activeTenant
                }

                onBack={() =>
                  goToSection(
                    "dashboard"
                  )
                }
              />

            )}


            {/* =================================================
                WEIGHING SCALE
                Separate Component
            ================================================= */}

            {activeSection === "weighing-scale" && (

              <WeighingScalePage
                tenant={
                  activeTenant
                }

                onBack={() =>
                  goToSection(
                    "dashboard"
                  )
                }
              />

            )}


            {/* =================================================
                DASHBOARD
            ================================================= */}

            {activeSection === "dashboard" && (

              <div
                style={{
                  minHeight: "100vh",
                  background:
                    "linear-gradient(180deg,#F8FAFF 0%,#EAF2FF 100%)",
                }}
              >

                {/* =================================================
                    HEADER
                ================================================= */}

                <header
                  style={{
                    background:
                      "linear-gradient(135deg,#0F2F73 0%,#1D4ED8 55%,#2563EB 100%)",
                    color: "#fff",
                    padding:
                      "26px 20px 42px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >

                  {/* Decorative circles */}

                  <div
                    style={{
                      position: "absolute",
                      width: 280,
                      height: 280,
                      borderRadius:
                        "50%",
                      background:
                        "rgba(255,255,255,0.06)",
                      right: -80,
                      top: -120,
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      width: 180,
                      height: 180,
                      borderRadius:
                        "50%",
                      background:
                        "rgba(255,255,255,0.05)",
                      left: -80,
                      bottom: -100,
                    }}
                  />


                  <div
                    style={{
                      maxWidth: 1180,
                      margin: "0 auto",
                      position:
                        "relative",
                      zIndex: 2,
                    }}
                  >

                    {/* TOP BAR */}

                    <div
                      style={{
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        gap: 15,
                        flexWrap:
                          "wrap",
                      }}
                    >

                      <div
                        style={{
                          display: "flex",
                          alignItems:
                            "center",
                          gap: 13,
                        }}
                      >

                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius:
                              15,
                            background:
                              "rgba(255,255,255,0.14)",
                            border:
                              "1px solid rgba(255,255,255,0.16)",
                            display:
                              "grid",
                            placeItems:
                              "center",
                          }}
                        >

                          <Activity
                            size={22}
                          />

                        </div>


                        <div>

                          <div
                            style={{
                              fontSize: 11,
                              letterSpacing:
                                1.4,
                              fontWeight:
                                800,
                              opacity: 0.7,
                            }}
                          >
                            GOAT FARM
                            MANAGEMENT
                          </div>


                          <h1
                            style={{
                              margin:
                                "3px 0 0",
                              fontSize: 24,
                              fontWeight:
                                900,
                            }}
                          >
                            My Goat Manager
                          </h1>

                        </div>

                      </div>


                      {/* RIGHT ACTIONS */}

                      <div
                        style={{
                          display: "flex",
                          alignItems:
                            "center",
                          gap: 9,
                          flexWrap:
                            "wrap",
                        }}
                      >

                        {/* SUBSCRIPTION */}

                        <button
                          onClick={() =>
                            goToSection(
                              "subscription"
                            )
                          }
                          style={{
                            border:
                              "1px solid rgba(255,255,255,0.2)",
                            background:
                              "rgba(255,255,255,0.12)",
                            color: "#fff",
                            padding:
                              "10px 14px",
                            borderRadius:
                              12,
                            cursor:
                              "pointer",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: 7,
                            fontSize: 12,
                            fontWeight:
                              800,
                          }}
                        >

                          Subscription

                          <ArrowRight
                            size={14}
                          />

                        </button>


                        {/* NOTIFICATION */}

                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius:
                              12,
                            background:
                              "rgba(255,255,255,0.12)",
                            display:
                              "grid",
                            placeItems:
                              "center",
                          }}
                        >

                          <Bell
                            size={18}
                          />

                        </div>


                        {/* STATUS */}

                        <div
                          style={{
                            padding:
                              "10px 13px",
                            borderRadius:
                              999,
                            background:
                              "rgba(16,185,129,0.18)",
                            color:
                              "#D1FAE5",
                            fontSize: 11,
                            fontWeight:
                              800,
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: 6,
                          }}
                        >

                          <span
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius:
                                "50%",
                              background:
                                "#34D399",
                            }}
                          />

                          Active

                        </div>

                      </div>

                    </div>


                    {/* GREETING */}

                    <div
                      style={{
                        marginTop: 32,
                        display: "flex",
                        alignItems:
                          "flex-end",
                        justifyContent:
                          "space-between",
                        gap: 20,
                        flexWrap:
                          "wrap",
                      }}
                    >

                      <div>

                        <div
                          style={{
                            fontSize: 13,
                            opacity: 0.7,
                            marginBottom:
                              6,
                          }}
                        >
                          Welcome back 👋
                        </div>


                        <div
                          style={{
                            fontSize: 30,
                            fontWeight:
                              900,
                            lineHeight:
                              1.15,
                          }}
                        >
                          Hello{" "}
                          {tenantSession.name}.
                        </div>


                        <p
                          style={{
                            margin:
                              "8px 0 0",
                            fontSize: 14,
                            opacity: 0.76,
                          }}
                        >
                          Ready to manage
                          your herd today?
                        </p>

                      </div>


                      {/* TRIAL */}

                      <div
                        style={{
                          padding:
                            "13px 16px",
                          borderRadius:
                            16,
                          background:
                            "rgba(255,255,255,0.1)",
                          border:
                            "1px solid rgba(255,255,255,0.14)",
                          minWidth: 180,
                        }}
                      >

                        <div
                          style={{
                            fontSize: 10,
                            opacity: 0.65,
                            letterSpacing:
                              1,
                            fontWeight:
                              800,
                          }}
                        >
                          FREE TRIAL
                        </div>


                        <div
                          style={{
                            marginTop: 5,
                            fontSize: 16,
                            fontWeight:
                              800,
                          }}
                        >
                          {trialDaysRemaining}
                          {" "}
                          days remaining
                        </div>

                      </div>

                    </div>

                  </div>

                </header>


                {/* =================================================
                    TRIAL REMINDER
                ================================================= */}

                {showTrialReminder && (

                  <div
                    style={{
                      maxWidth: 1180,
                      margin:
                        "-18px auto 0",
                      padding:
                        "0 16px",
                      position:
                        "relative",
                      zIndex: 5,
                    }}
                  >

                    <div
                      style={{
                        background:
                          "#fff7ed",
                        border:
                          "1px solid #fed7aa",
                        color:
                          "#9a3412",
                        borderRadius:
                          17,
                        padding:
                          "13px 16px",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        gap: 12,
                        flexWrap:
                          "wrap",
                        boxShadow:
                          "0 12px 30px rgba(15,23,42,0.06)",
                      }}
                    >

                      <strong
                        style={{
                          fontSize: 12,
                        }}
                      >
                        ⚠️ Your free trial
                        ends tomorrow.
                      </strong>


                      <button
                        onClick={() =>
                          goToSection(
                            "subscription"
                          )
                        }
                        style={{
                          border: "none",
                          background:
                            "#9a3412",
                          color: "#fff",
                          borderRadius: 9,
                          padding:
                            "8px 13px",
                          cursor:
                            "pointer",
                          fontWeight: 800,
                          fontSize: 11,
                        }}
                      >
                        View Plan
                      </button>

                    </div>

                  </div>

                )}


                {/* =================================================
                    MAIN DASHBOARD
                ================================================= */}

                <main
                  style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                    padding:
                      "26px 16px 50px",
                  }}
                >

                  {/* SECTION TITLE */}

                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "flex-end",
                      justifyContent:
                        "space-between",
                      gap: 15,
                      marginBottom:
                        16,
                      flexWrap:
                        "wrap",
                    }}
                  >

                    <div>

                      <div
                        style={{
                          color:
                            "#2563EB",
                          fontSize: 10,
                          letterSpacing:
                            1.4,
                          fontWeight:
                            900,
                        }}
                      >
                        FARM OPERATIONS
                      </div>


                      <h2
                        style={{
                          margin:
                            "5px 0 0",
                          fontSize: 21,
                          color:
                            "#0F172A",
                        }}
                      >
                        Quick access
                      </h2>

                    </div>


                    <div
                      style={{
                        color:
                          "#64748B",
                        fontSize: 12,
                      }}
                    >
                      Manage your farm
                      from one place
                    </div>

                  </div>


                  {/* =================================================
                      DASHBOARD CARDS
                  ================================================= */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(220px,1fr))",
                      gap: 17,
                    }}
                  >

                    {[
                      {
                        key: "goats",
                        label: "Goats",
                        description:
                          "Manage goat profiles, groups and herd information.",
                        icon: Activity,
                        accent: "#E0F2FE",
                        iconColor: "#0284C7",
                      },

                      {
                        key: "weightlog",
                        label: "Milk Records",
                        description:
                          "Track daily milk records and production updates.",
                        icon: Droplet,
                        accent: "#FEF3C7",
                        iconColor: "#D97706",
                      },

                      {
                        key: "breeding",
                        label: "Events",
                        description:
                          "Track important farm events and activities.",
                        icon: Calendar,
                        accent: "#F3E8FF",
                        iconColor: "#9333EA",
                      },

                      {
                        key: "sales",
                        label: "Transactions",
                        description:
                          "Manage sales, income and farm transactions.",
                        icon: DollarSign,
                        accent: "#DCFCE7",
                        iconColor: "#16A34A",
                      },

                      {
                        key: "farm-setup",
                        label: "Farm Setup",
                        description:
                          "Configure your farm details and preferences.",
                        icon: Wrench,
                        accent: "#E0E7FF",
                        iconColor: "#4F46E5",
                      },

                      {
                        key: "medical",
                        label: "Medical",
                        description:
                          "Manage treatments, vaccinations and medical records.",
                        icon: Stethoscope,
                        accent: "#DBEAFE",
                        iconColor: "#2563EB",
                      },

                      {
                        key: "reports",
                        label: "Reports",
                        description:
                          "View farm performance and important reports.",
                        icon: BarChart3,
                        accent: "#FCE7F3",
                        iconColor: "#DB2777",
                      },

                      {
                        key: "weighing-scale",
                        label: "Weighing Scale",
                        description:
                          "Connect and monitor your digital goat weighing scale.",
                        icon: Scale,
                        accent: "#CCFBF1",
                        iconColor: "#0F766E",
                      },

                    ].map(
                      (card) => {

                        const Icon =
                          card.icon;

                        return (

                          <button
                            key={
                              card.key
                            }
                            onClick={() =>
                              goToSection(
                                card.key
                              )
                            }
                            style={{
                              background:
                                "#fff",
                              border:
                                "1px solid rgba(15,23,42,0.045)",
                              borderRadius:
                                22,
                              padding:
                                20,
                              minHeight:
                                205,
                              textAlign:
                                "left",
                              cursor:
                                "pointer",
                              display:
                                "flex",
                              flexDirection:
                                "column",
                              justifyContent:
                                "space-between",
                              boxShadow:
                                "0 15px 40px rgba(15,23,42,0.07)",
                              transition:
                                "all 0.2s ease",
                            }}

                            onMouseEnter={(
                              e
                            ) => {

                              e.currentTarget.style.transform =
                                "translateY(-4px)";

                              e.currentTarget.style.boxShadow =
                                "0 22px 50px rgba(15,23,42,0.11)";

                            }}

                            onMouseLeave={(
                              e
                            ) => {

                              e.currentTarget.style.transform =
                                "translateY(0)";

                              e.currentTarget.style.boxShadow =
                                "0 15px 40px rgba(15,23,42,0.07)";

                            }}
                          >

                            <div>

                              <div
                                style={{
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  justifyContent:
                                    "space-between",
                                }}
                              >

                                <div
                                  style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius:
                                      16,
                                    background:
                                      card.accent,
                                    color:
                                      card.iconColor,
                                    display:
                                      "grid",
                                    placeItems:
                                      "center",
                                  }}
                                >

                                  <Icon
                                    size={21}
                                  />

                                </div>


                                <ArrowRight
                                  size={17}
                                  color="#94A3B8"
                                />

                              </div>


                              <h3
                                style={{
                                  margin:
                                    "17px 0 6px",
                                  fontSize: 16,
                                  color:
                                    "#111827",
                                }}
                              >
                                {card.label}
                              </h3>


                              <p
                                style={{
                                  margin: 0,
                                  color:
                                    "#64748B",
                                  fontSize: 12,
                                  lineHeight:
                                    1.6,
                                }}
                              >
                                {
                                  card.description
                                }
                              </p>

                            </div>


                            <div
                              style={{
                                marginTop: 15,
                                fontSize: 11,
                                color:
                                  card.iconColor,
                                fontWeight:
                                  800,
                              }}
                            >
                              Open{" "}
                              {card.label}
                              {" →"}
                            </div>

                          </button>

                        );

                      }
                    )}

                  </div>


                  {/* =================================================
                      BOTTOM INFO
                  ================================================= */}

                  <div
                    style={{
                      marginTop: 22,
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(260px,1fr))",
                      gap: 16,
                    }}
                  >

                    {/* SUBSCRIPTION */}

                    <button
                      onClick={() =>
                        goToSection(
                          "subscription"
                        )
                      }
                      style={{
                        border:
                          "1px solid #DBEAFE",
                        background:
                          "linear-gradient(135deg,#EFF6FF,#F8FAFF)",
                        borderRadius:
                          20,
                        padding: 18,
                        cursor:
                          "pointer",
                        textAlign:
                          "left",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        gap: 15,
                      }}
                    >

                      <div
                        style={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 12,
                        }}
                      >

                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius:
                              12,
                            background:
                              "#DBEAFE",
                            color:
                              "#2563EB",
                            display:
                              "grid",
                            placeItems:
                              "center",
                          }}
                        >

                          <CheckCircle2
                            size={19}
                          />

                        </div>


                        <div>

                          <strong
                            style={{
                              display:
                                "block",
                              color:
                                "#1E3A8A",
                              fontSize: 13,
                            }}
                          >
                            Subscription
                          </strong>


                          <span
                            style={{
                              color:
                                "#64748B",
                              fontSize: 11,
                            }}
                          >
                            {trialActive
                              ? `${trialDaysRemaining} days left in your trial`
                              : "View your plan"}
                          </span>

                        </div>

                      </div>


                      <ArrowRight
                        size={17}
                        color="#2563EB"
                      />

                    </button>


                    {/* LOGOUT */}

                    <button
                      onClick={logout}
                      style={{
                        border:
                          "1px solid #E5E7EB",
                        background:
                          "#fff",
                        borderRadius:
                          20,
                        padding: 18,
                        cursor:
                          "pointer",
                        textAlign:
                          "left",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        gap: 15,
                      }}
                    >

                      <div
                        style={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 12,
                        }}
                      >

                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius:
                              12,
                            background:
                              "#F1F5F9",
                            color:
                              "#475569",
                            display:
                              "grid",
                            placeItems:
                              "center",
                          }}
                        >

                          <LogOut
                            size={18}
                          />

                        </div>


                        <div>

                          <strong
                            style={{
                              display:
                                "block",
                              color:
                                "#334155",
                              fontSize: 13,
                            }}
                          >
                            Sign Out
                          </strong>


                          <span
                            style={{
                              color:
                                "#94A3B8",
                              fontSize: 11,
                            }}
                          >
                            Exit your farm
                            account
                          </span>

                        </div>

                      </div>


                      <ArrowRight
                        size={17}
                        color="#94A3B8"
                      />

                    </button>

                  </div>

                </main>

              </div>

            )}

          </>

        )}

    </div>

  );

}