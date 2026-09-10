import { useEffect, useMemo, useRef, useState } from "react";

import {
  ArrowLeft,
  Scale,
  Wifi,
  WifiOff,
  RefreshCw,
  Save,
  Activity,
  CheckCircle2,
  Clock3,
  Search,
  X,
} from "lucide-react";

import "./WeighingScalePage.css";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* =========================================================
   SCALE STABILITY SETTINGS
========================================================= */

const STABLE_READING_COUNT = 3;
const STABLE_TOLERANCE_KG = 0.05;

/* =========================================================
   PAGE
========================================================= */

export default function WeighingScalePage({
  tenant,
  onBack,
}) {
  /* =======================================================
     GOATS
  ======================================================= */

  const [goats, setGoats] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGoat, setSelectedGoat] = useState(null);

  /* =======================================================
     WEIGHT
  ======================================================= */

  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");

  /* =======================================================
     SCALE CONNECTION
  ======================================================= */

  const [connected, setConnected] = useState(false);
  const [serialPort, setSerialPort] = useState(null);
  const [baudRate, setBaudRate] = useState("9600");

  const serialPortRef = useRef(null);
  const serialReaderRef = useRef(null);
  const serialBufferRef = useRef("");
  const mountedRef = useRef(true);

  /* =======================================================
     STABLE READING
  ======================================================= */

  const stableReadingsRef = useRef([]);

  const [isStable, setIsStable] = useState(false);
  const [liveReading, setLiveReading] = useState(null);
  const [weightSource, setWeightSource] = useState("manual");

  /* =======================================================
     PAGE STATE
  ======================================================= */

  const [saving, setSaving] = useState(false);
  const [loadingGoats, setLoadingGoats] = useState(true);
  const [loadingWeights, setLoadingWeights] =
    useState(true);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("error");

  const [savedWeights, setSavedWeights] =
    useState([]);

  /* =======================================================
     API
  ======================================================= */

  async function apiFetch(url, options = {}) {
    return fetch(`${API_BASE}${url}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
  }

  /* =======================================================
     MESSAGE
  ======================================================= */

  function showMessage(text, type = "error") {
    if (!mountedRef.current) return;

    setMessage(text);
    setMessageType(type);
  }

  /* =======================================================
     RESET STABILITY
  ======================================================= */

  function resetStability() {
    stableReadingsRef.current = [];
    setIsStable(false);
    setLiveReading(null);
  }

  /* =======================================================
     LOAD GOATS
  ======================================================= */

  async function loadGoats() {
    try {
      setLoadingGoats(true);

      const response = await apiFetch("/goats");

      const data = await response.json().catch(() => ({}));

      console.log("[SCALE] GET GOATS:", response.status, data);

      if (response.status === 402) {
        showMessage(
          "Farm subscription is expired.",
          "error"
        );
        return;
      }

      if (response.status === 401) {
        showMessage(
          "Session expired. Please login again.",
          "error"
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to load goats"
        );
      }

      const goatList = Array.isArray(data)
        ? data
        : Array.isArray(data.goats)
        ? data.goats
        : Array.isArray(data.data)
        ? data.data
        : [];

      setGoats(goatList);
    } catch (error) {
      console.error("[SCALE] LOAD GOATS ERROR:", error);

      showMessage(
        error.message || "Unable to load goats",
        "error"
      );
    } finally {
      if (mountedRef.current) {
        setLoadingGoats(false);
      }
    }
  }

  /* =======================================================
     LOAD SAVED WEIGHTS
  ======================================================= */

  async function loadSavedWeights() {
    try {
      setLoadingWeights(true);

      const response = await apiFetch("/weights");

      const data = await response.json().catch(() => ({}));

      console.log(
        "[SCALE] GET WEIGHTS:",
        response.status,
        data
      );

      if (response.status === 402) {
        showMessage(
          "Farm subscription is expired.",
          "error"
        );
        return;
      }

      if (response.status === 401) {
        showMessage(
          "Session expired. Please login again.",
          "error"
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to load weight records"
        );
      }

      const weightList = Array.isArray(data)
        ? data
        : Array.isArray(data.weights)
        ? data.weights
        : Array.isArray(data.data)
        ? data.data
        : [];

      setSavedWeights(weightList);
    } catch (error) {
      console.error(
        "[SCALE] LOAD WEIGHTS ERROR:",
        error
      );

      showMessage(
        error.message ||
          "Unable to load weight records",
        "error"
      );
    } finally {
      if (mountedRef.current) {
        setLoadingWeights(false);
      }
    }
  }

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    mountedRef.current = true;

    loadGoats();
    loadSavedWeights();

    function handleTenantUpdate() {
      loadGoats();
      loadSavedWeights();
    }

    window.addEventListener(
      "tenant-data-updated",
      handleTenantUpdate
    );

    return () => {
      mountedRef.current = false;

      window.removeEventListener(
        "tenant-data-updated",
        handleTenantUpdate
      );
    };
  }, []);

  /* =======================================================
     SEARCH GOATS
  ======================================================= */

  const filteredGoats = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return [];
    }

    return goats.filter((goat) => {
      const name = String(
        goat.name || ""
      ).toLowerCase();

      const tag = String(
        goat.tagNumber ||
          goat.tag ||
          goat.tagNo ||
          goat.tag_number ||
          ""
      ).toLowerCase();

      return (
        name.includes(value) ||
        tag.includes(value)
      );
    });
  }, [goats, search]);

  /* =======================================================
     SELECT GOAT
  ======================================================= */

  function handleSelectGoat(goat) {
    setSelectedGoat(goat);
    setSearch("");

    resetStability();

    setWeight("");
    setWeightSource("manual");

    showMessage(
      `${goat.name || "Goat"} selected`,
      "success"
    );
  }

  /* =======================================================
     CLEAR GOAT
  ======================================================= */

  function handleClearGoat() {
    setSelectedGoat(null);
    setSearch("");
    setWeight("");

    resetStability();

    setWeightSource("manual");
    setMessage("");
  }

  /* =======================================================
     PARSE NUMBER
  ======================================================= */

  function extractWeightValue(rawText) {
    if (!rawText) return null;

    let text = String(rawText)
      .replace(/\0/g, " ")
      .replace(/[^\x20-\x7E]/g, " ")
      .trim();

    if (!text) return null;

    console.log(
      "[SCALE] RAW DATA:",
      JSON.stringify(text)
    );

    /*
      Examples supported:

      25.50
      25.50 kg
      WT 25.50 KG
      ST,GS,25.50kg
      25.50kg
      0012.50
    */

    const matches = text.match(
      /[-+]?\d+(?:\.\d+)?/g
    );

    if (!matches || matches.length === 0) {
      return null;
    }

    const rawNumber =
      matches[matches.length - 1];

    let numericValue =
      Number(rawNumber);

    if (!Number.isFinite(numericValue)) {
      return null;
    }

    if (numericValue <= 0 || numericValue > 1000) {
      return null;
    }

    /*
      If scale sends LB,
      convert to KG.
    */

    const lowerText =
      text.toLowerCase();

    if (
      lowerText.includes("lb") ||
      lowerText.includes("lbs") ||
      lowerText.includes("pound")
    ) {
      numericValue =
        numericValue * 0.45359237;
    }

    return Number(
      numericValue.toFixed(2)
    );
  }

  /* =======================================================
     STABLE READING PROCESS
  ======================================================= */

  function handleScaleReading(value) {
    if (!Number.isFinite(value)) {
      return;
    }

    console.log(
      "[SCALE] PARSED KG:",
      value
    );

    setLiveReading(value);
    setWeightSource("scale");

    /*
      Keep latest 3 readings.
    */

    const readings =
      stableReadingsRef.current;

    /*
      If current value is far from
      previous value, start stability again.
    */

    if (readings.length > 0) {
      const previous =
        readings[readings.length - 1];

      if (
        Math.abs(value - previous) >
        STABLE_TOLERANCE_KG
      ) {
        stableReadingsRef.current = [value];

        setIsStable(false);

        setWeight(
          value.toFixed(2)
        );

        showMessage(
          `Live weight: ${value.toFixed(
            2
          )} kg — waiting for stable reading...`,
          "error"
        );

        return;
      }
    }

    readings.push(value);

    /*
      Keep only last 3.
    */

    if (
      readings.length >
      STABLE_READING_COUNT
    ) {
      readings.shift();
    }

    /*
      Check stable.
    */

    if (
      readings.length >=
      STABLE_READING_COUNT
    ) {
      const min =
        Math.min(...readings);

      const max =
        Math.max(...readings);

      const difference =
        max - min;

      if (
        difference <=
        STABLE_TOLERANCE_KG
      ) {
        const average =
          readings.reduce(
            (sum, item) =>
              sum + item,
            0
          ) / readings.length;

        const stableWeight =
          Number(
            average.toFixed(2)
          );

        setWeight(
          stableWeight.toFixed(2)
        );

        setIsStable(true);

        showMessage(
          `✓ Stable weight: ${stableWeight.toFixed(
            2
          )} kg — ready to save`,
          "success"
        );

        console.log(
          "[SCALE] STABLE WEIGHT:",
          stableWeight
        );

        return;
      }
    }

    /*
      Not stable yet.
    */

    setIsStable(false);

    setWeight(
      value.toFixed(2)
    );

    showMessage(
      `Live weight: ${value.toFixed(
        2
      )} kg — waiting for stable reading...`,
      "error"
    );
  }

  /* =======================================================
     PROCESS SERIAL DATA
  ======================================================= */

  function processScaleData(text) {
    if (!text) return;

    serialBufferRef.current += text;

    const buffer =
      serialBufferRef.current;

    /*
      Most weighing scales send
      CR / LF after every reading.
    */

    const lines =
      buffer.split(/\r\n|\n|\r/);

    /*
      Keep incomplete last line.
    */

    serialBufferRef.current =
      lines.pop() || "";

    for (const line of lines) {
      const value =
        extractWeightValue(line);

      if (value !== null) {
        handleScaleReading(value);
      }
    }

    /*
      Some scales do not send line breaks.
      If the buffer contains a complete
      number + kg/lb, process it.
    */

    const incomplete =
      serialBufferRef.current;

    if (incomplete) {
      const value =
        extractWeightValue(
          incomplete
        );

      if (value !== null) {
        /*
          Only process if the buffer
          looks like a complete scale
          reading.
        */

        if (
          /kg|kgs|lb|lbs|\d+\.\d+/i.test(
            incomplete
          )
        ) {
          handleScaleReading(value);

          serialBufferRef.current = "";
        }
      }
    }
  }

  /* =======================================================
     READ SERIAL
  ======================================================= */

  async function readSerialData(port) {
    if (!port) return;

    const decoder =
      new TextDecoder();

    try {
      while (
        mountedRef.current &&
        port.readable
      ) {
        const reader =
          port.readable.getReader();

        serialReaderRef.current =
          reader;

        try {
          while (true) {
            const {
              value,
              done,
            } =
              await reader.read();

            if (done) {
              break;
            }

            if (value) {
              const text =
                decoder.decode(
                  value,
                  {
                    stream: true,
                  }
                );

              console.log(
                "[SCALE] SERIAL CHUNK:",
                JSON.stringify(text)
              );

              processScaleData(text);
            }
          }
        } finally {
          reader.releaseLock();

          if (
            serialReaderRef.current ===
            reader
          ) {
            serialReaderRef.current =
              null;
          }
        }

        break;
      }
    } catch (error) {
      console.error(
        "[SCALE] SERIAL READ ERROR:",
        error
      );

      if (mountedRef.current) {
        setConnected(false);

        showMessage(
          `Scale connection lost: ${
            error.message || "Serial read error"
          }`,
          "error"
        );
      }
    }
  }

  /* =======================================================
     CONNECT SCALE
  ======================================================= */

  async function connectScale() {
    if (
      !("serial" in navigator)
    ) {
      showMessage(
        "Web Serial is not supported. Please use Chrome or Edge.",
        "error"
      );
      return;
    }

    try {
      console.log(
        "[SCALE] Opening serial port selector..."
      );

      /*
        Stop previous reader.
      */

      if (
        serialReaderRef.current
      ) {
        try {
          await serialReaderRef.current.cancel();
        } catch {}
      }

      /*
        Close old port.
      */

      if (
        serialPortRef.current
      ) {
        try {
          if (
            serialPortRef.current.readable
          ) {
            await serialPortRef.current.close();
          }
        } catch {}
      }

      resetStability();

      serialBufferRef.current = "";

      /*
        User selects COM port.
      */

      const port =
        await navigator.serial.requestPort();

      console.log(
        "[SCALE] Port selected:",
        port
      );

      /*
        IMPORTANT:
        Use 9600 first.

        If your scale uses another
        baud rate, change from UI.
      */

      console.log(
        `[SCALE] Opening port with baud rate: ${baudRate}`
      );

      await port.open({
        baudRate: Number(baudRate),
        dataBits: 8,
        stopBits: 1,
        parity: "none",
        flowControl: "none",
      });

      console.log(
        "[SCALE] SERIAL PORT OPENED SUCCESSFULLY"
      );

      serialPortRef.current =
        port;

      setSerialPort(port);
      setConnected(true);

      resetStability();

      showMessage(
        "Scale connected. Place the goat on the scale and wait for a stable reading.",
        "success"
      );

      /*
        Start reading.
      */

      readSerialData(port);
    } catch (error) {
      console.error(
        "[SCALE] CONNECTION ERROR:",
        error
      );

      setConnected(false);
      setSerialPort(null);

      /*
        User cancelled selector.
      */

      if (
        error?.name ===
        "NotFoundError"
      ) {
        showMessage(
          "No COM port selected.",
          "error"
        );
        return;
      }

      /*
        Port is commonly busy when
        another serial monitor/application
        already opened COM3/COM4.
      */

      if (
        error?.name ===
          "NetworkError" ||
        String(
          error?.message || ""
        )
          .toLowerCase()
          .includes("failed to open serial port")
      ) {
        showMessage(
          "COM port could not be opened. Close any Serial Monitor / terminal using COM3 or COM4, then connect again.",
          "error"
        );
        return;
      }

      showMessage(
        error?.message ||
          "Unable to connect to weighing scale.",
        "error"
      );
    }
  }

  /* =======================================================
     DISCONNECT
  ======================================================= */

  async function disconnectScale() {
    try {
      console.log(
        "[SCALE] Disconnecting..."
      );

      if (
        serialReaderRef.current
      ) {
        try {
          await serialReaderRef.current.cancel();
        } catch {}
      }

      const port =
        serialPortRef.current;

      if (port) {
        try {
          if (port.readable) {
            await port.close();
          }
        } catch (error) {
          console.warn(
            "[SCALE] PORT CLOSE WARNING:",
            error
          );
        }
      }
    } finally {
      serialReaderRef.current =
        null;

      serialPortRef.current =
        null;

      serialBufferRef.current =
        "";

      setSerialPort(null);
      setConnected(false);

      resetStability();

      showMessage(
        "Scale disconnected.",
        "error"
      );
    }
  }

  /* =======================================================
     MANUAL WEIGHT CHANGE
  ======================================================= */

  function handleWeightChange(event) {
    const value =
      event.target.value;

    setWeight(value);

    /*
      User manually changed weight,
      so it is no longer considered
      a scale-stable reading.
    */

    setWeightSource("manual");
    setIsStable(false);

    stableReadingsRef.current = [];
  }

  /* =======================================================
     UNIT CHANGE
  ======================================================= */

  function handleUnitChange(event) {
    const newUnit =
      event.target.value;

    setUnit(newUnit);

    resetStability();
  }

  /* =======================================================
     SAVE WEIGHT
  ======================================================= */

  async function handleSaveWeight() {
    console.log(
      "[SCALE] SAVE CLICKED"
    );

    console.log(
      "[SCALE] Selected goat:",
      selectedGoat
    );

    console.log(
      "[SCALE] Weight:",
      weight
    );

    console.log(
      "[SCALE] Unit:",
      unit
    );

    console.log(
      "[SCALE] Stable:",
      isStable
    );

    console.log(
      "[SCALE] Source:",
      weightSource
    );

    if (!selectedGoat) {
      showMessage(
        "Please select a goat first.",
        "error"
      );
      return;
    }

    if (
      weight === "" ||
      weight === null ||
      weight === undefined
    ) {
      showMessage(
        "Please enter or receive a weight.",
        "error"
      );
      return;
    }

    /*
      If weight came from scale,
      do NOT save until stable.
    */

    if (
      weightSource === "scale" &&
      !isStable
    ) {
      showMessage(
        "Please wait until the scale shows a stable reading.",
        "error"
      );
      return;
    }

    let numericWeight =
      Number(weight);

    if (
      !Number.isFinite(numericWeight) ||
      numericWeight <= 0
    ) {
      showMessage(
        "Please enter a valid weight.",
        "error"
      );
      return;
    }

    /*
      Convert LB to KG before sending
      because backend stores KG.
    */

    if (unit === "lb") {
      numericWeight =
        numericWeight * 0.45359237;
    }

    numericWeight =
      Number(
        numericWeight.toFixed(2)
      );

    if (
      numericWeight <= 0 ||
      numericWeight > 1000
    ) {
      showMessage(
        "Weight must be between 0 and 1000 kg.",
        "error"
      );
      return;
    }

    setSaving(true);

    /*
      IMPORTANT:
      Your WeightSchema only accepts:

      ESP32_Scale
      Manual
      USB_Serial

      Therefore Bluetooth scale is saved
      as USB_Serial.
    */

    const source =
      weightSource === "scale"
        ? "USB_Serial"
        : "Manual";

    const payload = {
      goatId:
        selectedGoat._id ||
        selectedGoat.id,

      weight:
        numericWeight,

      recordedAt:
        new Date().toISOString(),

      notes:
        weightSource === "scale"
          ? "Stable weight received from Bluetooth serial weighing scale"
          : "Weight entered manually",

      source,
    };

    console.log(
      "[SCALE] POST /weights PAYLOAD:",
      payload
    );

    try {
      const response =
        await apiFetch("/weights", {
          method: "POST",
          body: JSON.stringify(
            payload
          ),
        });

      const data =
        await response
          .json()
          .catch(() => ({}));

      console.log(
        "[SCALE] SAVE RESPONSE:",
        response.status,
        data
      );

      if (
        response.status === 402
      ) {
        showMessage(
          "Farm subscription is expired. Weight cannot be saved.",
          "error"
        );
        return;
      }

      if (
        response.status === 401
      ) {
        showMessage(
          "Session expired. Please login again.",
          "error"
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.details ||
            "Failed to save weight"
        );
      }

      /*
        Backend returns:
        {
          success: true,
          weight: weightRecord,
          goat: {...}
        }
      */

      const savedRecord =
        data?.weight;

      if (savedRecord) {
        setSavedWeights(
          (previous) => [
            savedRecord,
            ...previous,
          ]
        );
      } else {
        /*
          Refresh from MongoDB
          if response does not contain
          weight object.
        */

        await loadSavedWeights();
      }

      /*
        Update goat locally.
      */

      const goatId =
        selectedGoat._id ||
        selectedGoat.id;

      setGoats(
        (previous) =>
          previous.map((goat) => {
            const currentId =
              goat._id ||
              goat.id;

            if (
              String(currentId) !==
              String(goatId)
            ) {
              return goat;
            }

            return {
              ...goat,
              currentWeight:
                numericWeight,
              weight:
                numericWeight,
            };
          })
      );

      setSelectedGoat(
        (previous) =>
          previous
            ? {
                ...previous,
                currentWeight:
                  numericWeight,
                weight:
                  numericWeight,
              }
            : previous
      );

      showMessage(
        `✓ ${numericWeight.toFixed(
          2
        )} kg saved successfully in MongoDB.`,
        "success"
      );

      /*
        Clear current reading after
        successful save.
      */

      setWeight("");
      resetStability();

      /*
        Refresh history from backend
        to confirm MongoDB save.
      */

      await loadSavedWeights();
    } catch (error) {
      console.error(
        "[SCALE] SAVE WEIGHT ERROR:",
        error
      );

      showMessage(
        error.message ||
          "Failed to save weight.",
        "error"
      );
    } finally {
      if (mountedRef.current) {
        setSaving(false);
      }
    }
  }

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      mountedRef.current = false;

      if (
        serialReaderRef.current
      ) {
        serialReaderRef.current
          .cancel()
          .catch(() => {});
      }

      const port =
        serialPortRef.current;

      if (port) {
        port
          .close()
          .catch(() => {});
      }
    };
  }, []);

  /* =======================================================
     HELPERS
  ======================================================= */

  function formatDate(value) {
    if (!value) return "-";

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "-";
    }

    return date.toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  }

  function getGoatName(record) {
    return (
      record?.goatName ||
      record?.goat?.name ||
      "Unknown Goat"
    );
  }

  function getTagNumber(record) {
    return (
      record?.goatTagNumber ||
      record?.goat?.tagNumber ||
      "-"
    );
  }

  function getGoatId(goat) {
    return goat?._id || goat?.id;
  }

  /* =======================================================
     RECENT WEIGHTS
  ======================================================= */

  const recentWeights =
    useMemo(() => {
      return [...savedWeights]
        .sort((a, b) => {
          const dateA =
            new Date(
              a.recordedAt ||
                a.createdAt ||
                0
            ).getTime();

          const dateB =
            new Date(
              b.recordedAt ||
                b.createdAt ||
                0
            ).getTime();

          return dateB - dateA;
        })
        .slice(0, 5);
    }, [savedWeights]);

  /* =======================================================
     STATS
  ======================================================= */

  const totalRecords =
    savedWeights.length;

  const latestWeight =
    recentWeights.length > 0
      ? Number(
          recentWeights[0].weight || 0
        ).toFixed(2)
      : "0.00";

  const stableCount =
    savedWeights.filter(
      (item) =>
        item.gainLoss ===
        "Stable"
    ).length;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="weighing-page">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="weighing-header">
        <div className="weighing-header-left">
          <button
            type="button"
            className="weighing-back-btn"
            onClick={onBack}
          >
            <ArrowLeft size={20} />
          </button>

          <div className="weighing-header-icon">
            <Scale size={25} />
          </div>

          <div>
            <span className="weighing-eyebrow">
              SELSOLVE • SMART FARM
            </span>

            <h1>
              Weighing Scale
            </h1>

            <p>
              Capture accurate goat weight
              directly from your digital scale.
            </p>
          </div>
        </div>

        <div
          className={`scale-status ${
            connected
              ? "connected"
              : "disconnected"
          }`}
        >
          {connected ? (
            <>
              <Wifi size={15} />
              Scale Connected
            </>
          ) : (
            <>
              <WifiOff size={15} />
              Scale Disconnected
            </>
          )}
        </div>
      </header>

      {/* ===================================================
          CONTAINER
      =================================================== */}

      <main className="weighing-container">
        {/* =================================================
            HERO
        ================================================= */}

        <section className="weighing-hero">
          <div className="weighing-hero-content">
            <div className="hero-badge">
              <Activity size={13} />
              LIVE WEIGHT CAPTURE
            </div>

            <h2>
              Weigh smarter.
              <br />
              Save accurately.
            </h2>

            <p>
              Connect your Bluetooth serial
              weighing scale, wait for a stable
              reading, select the goat and save
              the final weight directly to MongoDB.
            </p>
          </div>

          <div className="hero-scale-visual">
            <div className="scale-circle">
              <Scale size={30} />
            </div>

            <div>
              <span>
                CURRENT READING
              </span>

              <strong>
                {weight
                  ? `${Number(
                      weight
                    ).toFixed(2)} ${unit}`
                  : "--.-- kg"}
              </strong>
            </div>
          </div>
        </section>

        {/* =================================================
            STATS
        ================================================= */}

        <section className="weighing-stats">
          <div className="weight-stat-card">
            <div className="weight-stat-icon blue">
              <Scale size={21} />
            </div>

            <div>
              <span>
                Total Records
              </span>

              <strong>
                {totalRecords}
              </strong>
            </div>
          </div>

          <div className="weight-stat-card">
            <div className="weight-stat-icon green">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <span>
                Latest Weight
              </span>

              <strong>
                {latestWeight} kg
              </strong>
            </div>
          </div>

          <div className="weight-stat-card">
            <div className="weight-stat-icon purple">
              <Activity size={21} />
            </div>

            <div>
              <span>
                Stable Records
              </span>

              <strong>
                {stableCount}
              </strong>
            </div>
          </div>
        </section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <section className="weighing-content">
          {/* ===============================================
              RECORD PANEL
          =============================================== */}

          <div className="weighing-panel">
            <div className="panel-heading">
              <div>
                <span>
                  RECORD WEIGHT
                </span>

                <h3>
                  Add Goat Weight
                </h3>

                <p>
                  Select a goat and capture
                  the stable scale reading.
                </p>
              </div>

              <div className="panel-icon">
                <Save size={19} />
              </div>
            </div>

            {/* GOAT SEARCH */}

            <div className="field-group">
              <label>
                Search Goat
              </label>

              {!selectedGoat ? (
                <div className="goat-search-wrapper">
                  <Search
                    size={17}
                    style={{
                      position:
                        "absolute",
                      left: "15px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      color:
                        "#94a3b8",
                      pointerEvents:
                        "none",
                      zIndex: 2,
                    }}
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value
                      )
                    }
                    placeholder="Search by goat name or tag number..."
                  />

                  {search.trim() && (
                    <div className="goat-search-results">
                      {loadingGoats ? (
                        <div className="goat-search-empty">
                          <RefreshCw
                            size={18}
                            className="spin"
                          />

                          <strong>
                            Loading goats...
                          </strong>
                        </div>
                      ) : filteredGoats.length ===
                        0 ? (
                        <div className="goat-search-empty">
                          <Search size={18} />

                          <strong>
                            No goat found
                          </strong>

                          <span>
                            Try another goat
                            name or tag number.
                          </span>
                        </div>
                      ) : (
                        filteredGoats.map(
                          (goat) => {
                            const goatId =
                              getGoatId(
                                goat
                              );

                            const name =
                              goat.name ||
                              "Unnamed Goat";

                            const tag =
                              goat.tagNumber ||
                              goat.tag ||
                              goat.tagNo ||
                              "-";

                            return (
                              <button
                                key={String(
                                  goatId
                                )}
                                type="button"
                                className="goat-search-result"
                                onClick={() =>
                                  handleSelectGoat(
                                    goat
                                  )
                                }
                              >
                                <div className="goat-result-avatar">
                                  {name
                                    .charAt(
                                      0
                                    )
                                    .toUpperCase()}
                                </div>

                                <div className="goat-result-info">
                                  <strong>
                                    {name}
                                  </strong>

                                  <span>
                                    Tag:{" "}
                                    {tag}
                                  </span>
                                </div>

                                <span className="select-goat-text">
                                  Select
                                </span>
                              </button>
                            );
                          }
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="selected-goat-card">
                  <div className="selected-goat-left">
                    <div className="selected-goat-avatar">
                      {String(
                        selectedGoat.name ||
                          "G"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="selected-goat-info">
                      <strong>
                        {
                          selectedGoat.name
                        }
                      </strong>

                      <span>
                        Tag:{" "}
                        {selectedGoat.tagNumber ||
                          selectedGoat.tag ||
                          "-"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="change-goat-btn"
                    onClick={
                      handleClearGoat
                    }
                  >
                    <X
                      size={12}
                      style={{
                        marginRight: 4,
                        verticalAlign:
                          "middle",
                      }}
                    />
                    Change
                  </button>
                </div>
              )}
            </div>

            {/* WEIGHT */}

            <div className="weight-input-section">
              <div className="field-group">
                <label>
                  Weight
                  {isStable &&
                    weightSource ===
                      "scale" && (
                      <span
                        style={{
                          marginLeft:
                            "8px",
                          color:
                            "#047857",
                          fontSize:
                            "10px",
                        }}
                      >
                        ✓ STABLE
                      </span>
                    )}
                </label>

                <div className="weight-input-wrapper">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={weight}
                    onChange={
                      handleWeightChange
                    }
                    placeholder="0.00"
                  />

                  <select
                    value={unit}
                    onChange={
                      handleUnitChange
                    }
                  >
                    <option value="kg">
                      kg
                    </option>

                    <option value="lb">
                      lb
                    </option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                className="read-scale-btn"
                onClick={
                  connected
                    ? () => {
                        resetStability();

                        showMessage(
                          "Waiting for stable scale reading...",
                          "error"
                        );
                      }
                    : connectScale
                }
                disabled={
                  false
                }
              >
                {connected ? (
                  <>
                    <RefreshCw
                      size={15}
                    />
                    Read Scale
                  </>
                ) : (
                  <>
                    <Scale
                      size={15}
                    />
                    Connect Scale
                  </>
                )}
              </button>
            </div>

            {/* MESSAGE */}

            {message && (
              <div
                className={`weight-message ${
                  messageType ===
                  "success"
                    ? "success"
                    : ""
                }`}
              >
                {message}
              </div>
            )}

            {/* SAVE */}

            <button
              type="button"
              className="save-weight-btn"
              onClick={
                handleSaveWeight
              }
              disabled={
                saving ||
                !selectedGoat ||
                !weight ||
                (weightSource ===
                  "scale" &&
                  !isStable)
              }
            >
              {saving ? (
                <>
                  <RefreshCw
                    size={16}
                    className="spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {weightSource ===
                    "scale" &&
                  !isStable
                    ? "Waiting for Stable Weight"
                    : "Save Weight"}
                </>
              )}
            </button>
          </div>

          {/* ===============================================
              DEVICE PANEL
          =============================================== */}

          <div className="weighing-panel">
            <div className="panel-heading">
              <div>
                <span>
                  SCALE CONNECTION
                </span>

                <h3>
                  Digital Scale
                </h3>

                <p>
                  Bluetooth serial connection
                  through Windows COM port.
                </p>
              </div>

              <div className="panel-icon">
                {connected ? (
                  <Wifi size={19} />
                ) : (
                  <WifiOff size={19} />
                )}
              </div>
            </div>

            <div className="device-card">
              <div className="device-top">
                <div className="device-status-icon">
                  <Scale size={21} />
                </div>

                <div>
                  <strong>
                    Bluetooth Serial
                  </strong>

                  <span>
                    Standard Serial over Bluetooth
                  </span>
                </div>

                <div
                  className={`device-dot ${
                    connected
                      ? "active"
                      : ""
                  }`}
                />
              </div>

              <div className="device-details">
                <div>
                  <span>
                    STATUS
                  </span>

                  <strong>
                    {connected
                      ? "Connected"
                      : "Disconnected"}
                  </strong>
                </div>

                <div>
                  <span>
                    UNIT
                  </span>

                  <strong>
                    KG
                  </strong>
                </div>

                <div>
                  <span>
                    READING
                  </span>

                  <strong>
                    {liveReading !==
                    null
                      ? `${liveReading.toFixed(
                          2
                        )} kg`
                      : "--.-- kg"}
                  </strong>
                </div>

                <div>
                  <span>
                    BAUD RATE
                  </span>

                  <select
                    value={baudRate}
                    onChange={(event) =>
                      setBaudRate(
                        event.target.value
                      )
                    }
                    disabled={
                      connected
                    }
                    style={{
                      border: "none",
                      outline:
                        "none",
                      background:
                        "transparent",
                      width: "100%",
                      fontWeight: 800,
                      fontSize:
                        "11px",
                    }}
                  >
                    <option value="9600">
                      9600
                    </option>

                    <option value="4800">
                      4800
                    </option>

                    <option value="19200">
                      19200
                    </option>

                    <option value="38400">
                      38400
                    </option>

                    <option value="57600">
                      57600
                    </option>

                    <option value="115200">
                      115200
                    </option>
                  </select>
                </div>

                <div>
                  <span>
                    DEVICE
                  </span>

                  <strong>
                    {serialPort
                      ? "Selected COM Port"
                      : "COM3 / COM4"}
                  </strong>
                </div>

                <div>
                  <span>
                    STABILITY
                  </span>

                  <strong
                    style={{
                      color:
                        isStable
                          ? "#047857"
                          : "#c2410c",
                    }}
                  >
                    {isStable
                      ? "Stable"
                      : connected
                      ? "Waiting..."
                      : "Not connected"}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className="connection-btn"
                onClick={
                  connected
                    ? disconnectScale
                    : connectScale
                }
              >
                {connected ? (
                  <>
                    <WifiOff
                      size={15}
                    />
                    Disconnect Scale
                  </>
                ) : (
                  <>
                    <Wifi
                      size={15}
                    />
                    Connect Scale
                  </>
                )}
              </button>
            </div>

            <div className="scale-tip">
              <div className="tip-icon">
                <Activity size={17} />
              </div>

              <div>
                <strong>
                  Stable reading
                </strong>

                <p>
                  Keep the goat still on the
                  scale. SelSolve waits for 3
                  consecutive readings within
                  0.05 kg before enabling Save.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            RECENT WEIGHTS
        ================================================= */}

        <section className="weighing-panel recent-panel">
          <div className="panel-heading">
            <div>
              <span>
                HISTORY
              </span>

              <h3>
                Recent Weight Records
              </h3>

              <p>
                Latest weight records saved
                from MongoDB.
              </p>
            </div>

            <div className="panel-icon">
              <Clock3 size={19} />
            </div>
          </div>

          {loadingWeights ? (
            <div className="empty-weight-state">
              <RefreshCw
                size={24}
                className="spin"
              />

              <strong>
                Loading records...
              </strong>
            </div>
          ) : recentWeights.length ===
            0 ? (
            <div className="empty-weight-state">
              <div className="empty-icon">
                <Scale size={23} />
              </div>

              <strong>
                No weight records yet
              </strong>

              <span>
                Saved weight records will
                appear here.
              </span>
            </div>
          ) : (
            <div className="weight-table">
              <div className="weight-table-head">
                <span>
                  Goat
                </span>

                <span>
                  Weight
                </span>

                <span>
                  Change
                </span>

                <span>
                  Recorded
                </span>
              </div>

              {recentWeights.map(
                (record) => (
                  <div
                    className="weight-table-row"
                    key={
                      record._id ||
                      record.id
                    }
                  >
                    <div className="goat-cell">
                      <div className="goat-avatar">
                        {String(
                          getGoatName(
                            record
                          )
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div
                        style={{
                          minWidth: 0,
                        }}
                      >
                        <strong>
                          {getGoatName(
                            record
                          )}
                        </strong>

                        <div
                          style={{
                            marginTop:
                              "3px",
                            fontSize:
                              "9px",
                            color:
                              "#94a3b8",
                          }}
                        >
                          Tag:{" "}
                          {getTagNumber(
                            record
                          )}
                        </div>
                      </div>
                    </div>

                    <strong>
                      {Number(
                        record.weight ||
                          0
                      ).toFixed(2)}{" "}
                      kg
                    </strong>

                    <span>
                      {Number(
                        record.difference ||
                          0
                      ) > 0
                        ? `+${Number(
                            record.difference
                          ).toFixed(2)} kg`
                        : `${Number(
                            record.difference ||
                              0
                          ).toFixed(2)} kg`}
                    </span>

                    <span>
                      {formatDate(
                        record.recordedAt ||
                          record.createdAt
                      )}
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}