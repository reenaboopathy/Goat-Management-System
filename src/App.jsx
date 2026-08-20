import { useState, useEffect } from "react";

import {
  Bell,
  Menu,
  Activity,
  Droplet,
  Calendar,
  DollarSign,
  Wrench,
  BarChart3,
  Stethoscope,
} from "lucide-react";

import CenteredAuthShell from "./components/CenteredAuthShell.jsx";
import TenantLogin from "./components/TenantLogin.jsx";
import Sidebar from "./components/SideBar.jsx";

import GoatsPage from "./components/GoatsPage.jsx";
import WeightLogPage from "./components/WeightlogPage.jsx";
import EventsPage from "./components/EventsPage.jsx";
import VaccinationsPage from "./components/VaccinationsPage.jsx";
import MedicalPage from "./components/MedicalPage.jsx";
import SalesPage from "./components/SalesPage.jsx";
import ReportsPage from "./components/ReportsPage.jsx";
import FarmSetupPage from "./components/FarmSetup.jsx";
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


export default function App() {

  /* =========================================================
     SCREEN
  ========================================================= */

  const [screen, setScreen] =
    useState("tenant-login");

  /* =========================================================
     ACTIVE SECTION
  ========================================================= */

  const [activeSection, setActiveSection] =
    useState("dashboard");

  /* =========================================================
     SIDEBAR
  ========================================================= */

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

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
     REAL TIME SUBSCRIPTION CLOCK
  ========================================================= */

  const [, setSubscriptionTick] =
    useState(Date.now());


  /* =========================================================
     LOAD TENANTS
  ========================================================= */

  useEffect(() => {

    try {

      const stored =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (stored) {

        setTenants(
          JSON.parse(stored)
        );

      }

    } catch {

      // No saved data

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

    } catch {

      setSaveError(
        "Running in this session only — saved changes may not survive a full reload."
      );

    }

  }, [
    tenants,
    storageReady,
  ]);


  /* =========================================================
     REAL TIME TRIAL CHECK
     
     Every second React re-checks subscription status.
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


    /* ---------------------------------------------------------
       FARM NOT FOUND
    --------------------------------------------------------- */

    if (!t) {

      return {
        ok: false,
        error:
          "No farm found with that name",
      };

    }


    /* ---------------------------------------------------------
       FARM STATUS
    --------------------------------------------------------- */

    if (t.status !== "Active") {

      return {
        ok: false,
        error:
          "This farm account is suspended",
      };

    }


    /* ---------------------------------------------------------
       LOGIN ID
    --------------------------------------------------------- */

    if (!loginId) {

      return {
        ok: false,
        error:
          "Enter a valid username or email",
      };

    }


    /* ---------------------------------------------------------
       PASSWORD
    --------------------------------------------------------- */

    if (!password) {

      return {
        ok: false,
        error:
          "Enter a valid password",
      };

    }


    /* ---------------------------------------------------------
       FIND USER
    --------------------------------------------------------- */

    const u =
      t.users.find(
        (x) =>
          x.password === password &&
          (
            x.username === loginId ||
            x.email === loginId
          )
      );


    /* ---------------------------------------------------------
       INVALID LOGIN
    --------------------------------------------------------- */

    if (!u) {

      return {
        ok: false,
        error:
          "Wrong farm name or password",
      };

    }


    /* =========================================================
       IMPORTANT:
       EXISTING TENANT WITHOUT SUBSCRIPTION
       GETS 14 DAY TRIAL ON FIRST LOGIN
    ========================================================= */

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


      /* -------------------------------------------------------
         SAVE TRIAL TO REAL TENANT STATE
      ------------------------------------------------------- */

      setTenants((prev) => ({

        ...prev,

        [normalizedSlug]:
          loginTenant,

      }));

    }


    /* =========================================================
       CREATE SESSION
    ========================================================= */

    setTenantSession({

      tenantId:
        normalizedSlug,

      username:
        u.username,

      name:
        u.name || u.username,

    });


    /* =========================================================
       ENTER APP
    ========================================================= */

    setScreen(
      "tenant-plain"
    );

    setActiveSection(
      "dashboard"
    );

    setSidebarOpen(false);


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


    if (
      tenants[normalizedSlug]
    ) {

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


    /* =========================================================
       CREATE REAL TENANT
       + IMMEDIATELY CREATE 14 DAY TRIAL
    ========================================================= */

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


      /* =====================================================
         14 DAY FREE TRIAL
      ===================================================== */

      subscription:
        createTrialSubscription(),

    };


    /* =========================================================
       SAVE TENANT
    ========================================================= */

    setTenants((prev) => ({

      ...prev,

      [normalizedSlug]:
        newTenant,

    }));


    /* =========================================================
       LOGIN SESSION
    ========================================================= */

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

    setSidebarOpen(false);


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
      t.users.find(
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
     
     IMPORTANT:
     If trial expired, every section except
     subscription redirects to subscription page.
  ========================================================= */

  function goToSection(key) {

    const currentSubscription =
      activeTenant?.subscription ||
      null;


    const expired =
      isTrialExpired(
        currentSubscription
      );


    /* ---------------------------------------------------------
       LOCK APP AFTER TRIAL EXPIRY
    --------------------------------------------------------- */

    if (
      expired &&
      key !== "subscription"
    ) {

      setActiveSection(
        "subscription"
      );

      setSidebarOpen(false);

      return;

    }


    /* ---------------------------------------------------------
       NORMAL NAVIGATION
    --------------------------------------------------------- */

    setActiveSection(key);

    setSidebarOpen(false);

  }


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div
      style={{
        minHeight:
          "100vh",

        background:
          "linear-gradient(180deg, #F8FAFF 0%, #E7F0FF 100%)",
      }}
    >

      {/* =====================================================
          SAVE ERROR
      ===================================================== */}

      {saveError && (

        <div
          style={{
            position: "fixed",
            top: 10,
            right: 10,
            left: 10,
            maxWidth: 360,
            marginLeft: "auto",
            background:
              "rgba(15,23,42,0.94)",
            color: "#fff",
            padding:
              "12px 16px",
            borderRadius: 10,
            fontSize: 12,
            zIndex: 100,
            display: "flex",
            gap: 10,
            alignItems: "center",
            boxShadow:
              "0 16px 40px rgba(15,23,42,0.18)",
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
              background:
                "transparent",
              border: "none",
              color: "#fff",
              opacity: 0.75,
              cursor: "pointer",
            }}
          >
            Close
          </button>

        </div>

      )}


      {/* =====================================================
          TRIAL REMINDER
          SHOW ONLY ONE DAY BEFORE EXPIRY
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
                "linear-gradient(90deg, #92400E, #B45309)",
              color: "#fff",
              padding:
                "11px 16px",
              display: "flex",
              justifyContent:
                "center",
              alignItems: "center",
              gap: 12,
              fontSize: 13,
              fontWeight: 700,
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.12)",
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
                  "6px 11px",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 800,
                fontSize: 12,
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
          SIDEBAR
      ===================================================== */}

      {screen === "tenant-plain" &&
        tenantSession && (

          <Sidebar
            open={
              sidebarOpen
            }

            onClose={() =>
              setSidebarOpen(false)
            }

            activeSection={
              activeSection
            }

            onNavigate={
              goToSection
            }

            tenantSession={
              tenantSession
            }
          />

        )}


      {/* =====================================================
          SUBSCRIPTION
          
          THIS IS ALWAYS ACCESSIBLE
      ===================================================== */}

      {screen === "tenant-plain" &&
        tenantSession &&
        activeSection ===
          "subscription" && (

          <Subscription
            tenant={
              activeTenant
            }

            onBack={() => {

              if (
                trialExpired
              ) {

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
          
          ONLY SHOW WHEN TRIAL IS ACTIVE
      ===================================================== */}

      {screen === "tenant-plain" &&
        tenantSession &&
        trialActive && (

          <>

            {/* =================================================
                GOATS
            ================================================= */}

            {activeSection ===
              "goats" && (

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
                WEIGHT LOG
            ================================================= */}

            {activeSection ===
              "weightlog" && (

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

            {activeSection ===
              "breeding" && (

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

            {activeSection ===
              "vaccinations" && (

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

            {activeSection ===
              "medical" && (

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

            {activeSection ===
              "farm-setup" && (

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

            {activeSection ===
              "sales" && (

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

            {activeSection ===
              "reports" && (

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
                DASHBOARD
            ================================================= */}

            {activeSection ===
              "dashboard" && (

              <div
                style={{
                  minHeight:
                    "100vh",

                  background:
                    "linear-gradient(180deg, #F8FAFF 0%, #E7F0FF 100%)",
                }}
              >

                {/* =========================================
                    HEADER
                ========================================= */}

                <div
                  style={{
                    background:
                      "#1E3A8A",
                    padding:
                      "26px 20px 30px",
                  }}
                >

                  <div
                    style={{
                      maxWidth: 1180,
                      margin:
                        "0 auto",
                      display:
                        "flex",
                      flexDirection:
                        "column",
                      gap: 22,
                    }}
                  >

                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        gap: 12,
                        flexWrap:
                          "wrap",
                      }}
                    >

                      <div
                        style={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 14,
                        }}
                      >

                        <button
                          onClick={() =>
                            setSidebarOpen(
                              true
                            )
                          }
                          aria-label="Open menu"
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 14,
                            backgroundColor:
                              "rgba(255,255,255,0.18)",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            border:
                              "none",
                            cursor:
                              "pointer",
                          }}
                        >

                          <Menu
                            size={18}
                            color="#fff"
                          />

                        </button>


                        <div>

                          <div
                            style={{
                              color:
                                "#fff",
                              fontSize:
                                22,
                              fontWeight:
                                800,
                              letterSpacing:
                                0.7,
                            }}
                          >
                            My Goat Manager
                          </div>


                          <div
                            style={{
                              color:
                                "rgba(255,255,255,0.82)",
                              fontSize:
                                14,
                              marginTop:
                                4,
                            }}
                          >
                            A modern dashboard
                            for your farm
                            operations.
                          </div>

                        </div>

                      </div>


                      <div
                        style={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 12,
                          flexWrap:
                            "wrap",
                        }}
                      >

                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 14,
                            backgroundColor:
                              "rgba(255,255,255,0.18)",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                          }}
                        >

                          <Bell
                            size={20}
                            color="#fff"
                          />

                        </div>


                        <div
                          style={{
                            padding:
                              "10px 14px",
                            borderRadius:
                              999,
                            background:
                              "rgba(255,255,255,0.12)",
                            color:
                              "#fff",
                            fontSize:
                              13,
                            fontWeight:
                              700,
                          }}
                        >
                          Active
                        </div>

                      </div>

                    </div>


                    {/* =====================================
                        GREETING
                    ===================================== */}

                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        gap: 14,
                        flexWrap:
                          "wrap",
                      }}
                    >

                      <div
                        style={{
                          color:
                            "rgba(255,255,255,0.9)",
                          fontSize:
                            15,
                        }}
                      >

                        Hello{" "}
                        {tenantSession.name}.
                        Ready to manage
                        your herd today?

                      </div>


                      <div
                        style={{
                          display:
                            "flex",
                          gap: 10,
                          flexWrap:
                            "wrap",
                        }}
                      >

                        <div
                          style={{
                            color:
                              "#fff",
                            fontSize:
                              13,
                            background:
                              "rgba(255,255,255,0.12)",
                            borderRadius:
                              14,
                            padding:
                              "10px 14px",
                          }}
                        >

                          Trial:
                          {" "}
                          {trialDaysRemaining}
                          {" "}
                          days left

                        </div>

                      </div>

                    </div>

                  </div>

                </div>


                {/* =========================================
                    TRIAL STATUS
                ========================================= */}

                {showTrialReminder && (

                  <div
                    style={{
                      maxWidth: 1180,
                      margin:
                        "-12px auto 0",
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
                          16,
                        padding:
                          "12px 16px",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        gap: 12,
                        flexWrap:
                          "wrap",
                      }}
                    >

                      <strong>
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
                          border:
                            "none",
                          background:
                            "#9a3412",
                          color:
                            "#fff",
                          borderRadius:
                            9,
                          padding:
                            "8px 12px",
                          cursor:
                            "pointer",
                          fontWeight:
                            700,
                        }}
                      >
                        View Plan
                      </button>

                    </div>

                  </div>

                )}


                {/* =========================================
                    DASHBOARD CARDS
                ========================================= */}

                <div
                  style={{
                    maxWidth:
                      1180,
                    margin:
                      "0 auto",
                    padding:
                      "22px 16px 32px",
                  }}
                >

                  <div
                    style={{
                      display:
                        "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: 20,
                    }}
                  >

                    {[
                      {
                        key:
                          "goats",
                        label:
                          "Goats",
                        icon:
                          Activity,
                        accent:
                          "#E0F2FE",
                      },

                      {
                        key:
                          "weightlog",
                        label:
                          "Milk Records",
                        icon:
                          Droplet,
                        accent:
                          "#FEF3C7",
                      },

                      {
                        key:
                          "breeding",
                        label:
                          "Events",
                        icon:
                          Calendar,
                        accent:
                          "#E9D5FF",
                      },

                      {
                        key:
                          "sales",
                        label:
                          "Transactions",
                        icon:
                          DollarSign,
                        accent:
                          "#FEF9C3",
                      },

                      {
                        key:
                          "farm-setup",
                        label:
                          "Farm Setup",
                        icon:
                          Wrench,
                        accent:
                          "#DCFCE7",
                      },

                      {
                        key:
                          "medical",
                        label:
                          "Medical",
                        icon:
                          Stethoscope,
                        accent:
                          "#DBEAFE",
                      },

                      {
                        key:
                          "reports",
                        label:
                          "Reports",
                        icon:
                          BarChart3,
                        accent:
                          "#F3E8FF",
                      },

                    ].map(
                      (card) => {

                        const Icon =
                          card.icon;

                        return (

                          <div
                            key={
                              card.key
                            }

                            role="button"

                            tabIndex={0}

                            onClick={() =>
                              goToSection(
                                card.key
                              )
                            }

                            onKeyDown={(
                              event
                            ) => {

                              if (
                                event.key ===
                                  "Enter" ||
                                event.key ===
                                  " "
                              ) {

                                goToSection(
                                  card.key
                                );

                              }

                            }}

                            style={{
                              background:
                                "#fff",
                              borderRadius:
                                24,
                              minHeight:
                                190,
                              padding:
                                24,
                              display:
                                "flex",
                              flexDirection:
                                "column",
                              justifyContent:
                                "space-between",
                              boxShadow:
                                "0 24px 60px rgba(15,23,42,0.08)",
                              border:
                                "1px solid rgba(15,23,42,0.04)",
                              cursor:
                                "pointer",
                            }}
                          >

                            <div
                              style={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: 14,
                              }}
                            >

                              <div
                                style={{
                                  width: 52,
                                  height: 52,
                                  borderRadius: 18,
                                  background:
                                    card.accent,
                                  display:
                                    "grid",
                                  placeItems:
                                    "center",
                                  color:
                                    "#1D4ED8",
                                }}
                              >

                                <Icon
                                  size={20}
                                />

                              </div>


                              <div
                                style={{
                                  fontSize:
                                    15,
                                  fontWeight:
                                    700,
                                  color:
                                    "#111827",
                                }}
                              >
                                {card.label}
                              </div>

                            </div>


                            <div
                              style={{
                                marginTop:
                                  18,
                                color:
                                  "#4B5563",
                                fontSize:
                                  13,
                                lineHeight:
                                  1.6,
                                textAlign:
                                  "center",
                              }}
                            >
                              Manage{" "}
                              {card.label.toLowerCase()}
                              {" "}
                              with fast
                              updates and
                              easy access.
                            </div>

                          </div>

                        );

                      }
                    )}

                  </div>

                </div>

              </div>

            )}

          </>

        )}

    </div>

  );

}