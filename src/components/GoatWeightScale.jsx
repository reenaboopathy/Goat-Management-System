import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Play,
  Scale,
  RefreshCw,
  Wifi,
  Save,
  CheckCircle,
  X,
} from "lucide-react";

function GoatWeightScale({ goat, onBack, onSave }) {
  const startingWeight =
    goat?.weight !== null &&
    goat?.weight !== undefined &&
    goat?.weight !== ""
      ? Number(goat.weight)
      : 0;

  const [weight, setWeight] = useState(startingWeight);
  const [stable, setStable] = useState(false);
  const [connected, setConnected] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [port, setPort] = useState(null);
  const [reader, setReader] = useState(null);

  const weightHistory = (goat?.events || [])
    .filter((e) => e.type === "Weight")
    .slice()
    .reverse();

  /* =====================================================
     REAL USB SERIAL SCALE
     ESP32 + HX711 -> USB -> Browser
  ===================================================== */

  async function connectScale() {
    setError("");

    if (!("serial" in navigator)) {
      setError(
        "Web Serial is not supported in this browser. Please use Google Chrome or Microsoft Edge."
      );
      return;
    }

    try {
      const selectedPort = await navigator.serial.requestPort();

      await selectedPort.open({
        baudRate: 115200,
      });

      setPort(selectedPort);
      setConnected(true);
      setDemoMode(false);

      const textDecoder = new TextDecoderStream();
      selectedPort.readable.pipeTo(textDecoder.writable);

      const serialReader = textDecoder.readable.getReader();
      setReader(serialReader);

      readSerialData(serialReader);
    } catch (err) {
      console.error("Scale connection error:", err);
      setError("Unable to connect to the weighing scale.");
      setConnected(false);
    }
  }

  async function readSerialData(serialReader) {
    let buffer = "";

    try {
      while (true) {
        const { value, done } = await serialReader.read();

        if (done) break;

        if (!value) continue;

        buffer += value;

        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() || "";

        for (const line of lines) {
          parseWeight(line);
        }
      }
    } catch (err) {
      console.error("Serial read error:", err);
      setConnected(false);
    }
  }

  function parseWeight(rawValue) {
    if (!rawValue) return;

    /*
      Supports values such as:

      42.35
      42.35 kg
      Weight: 42.35 kg
      42.35KG
      42.35 Kg
    */

    const match = String(rawValue).match(
      /(-?\d+(?:\.\d+)?)\s*(?:kg|kgs|kilograms)?/i
    );

    if (!match) return;

    const parsedWeight = Number(match[1]);

    if (!Number.isFinite(parsedWeight)) return;

    if (parsedWeight < 0) return;

    setWeight(Number(parsedWeight.toFixed(2)));
    setStable(true);
    setSaved(false);
  }

  async function disconnectScale() {
    try {
      if (reader) {
        await reader.cancel();
      }
    } catch (err) {
      console.warn("Reader close warning:", err);
    }

    try {
      if (port) {
        await port.close();
      }
    } catch (err) {
      console.warn("Port close warning:", err);
    }

    setReader(null);
    setPort(null);
    setConnected(false);
  }

  /* =====================================================
     TARE
  ===================================================== */

  async function tareScale() {
    setError("");

    /*
      If ESP32 firmware supports:
      TARE
      then send this command.
    */

    if (port?.writable) {
      try {
        const writer = port.writable.getWriter();
        const encoder = new TextEncoder();

        await writer.write(encoder.encode("TARE\n"));

        writer.releaseLock();

        setWeight(0);
        setStable(false);
        return;
      } catch (err) {
        console.error("Tare error:", err);
        setError("Unable to send tare command.");
        return;
      }
    }

    if (demoMode) {
      setWeight(0);
      setStable(true);
      return;
    }

    setError("Connect the weighing scale first.");
  }

  /* =====================================================
     DEMO MODE
     Hardware இல்லாமலும் UI test பண்ணலாம்
  ===================================================== */

  useEffect(() => {
    if (!demoMode) return;

    const timer = setInterval(() => {
      setWeight((old) => {
        const next = old || 30;
        return Number(
          Math.max(1, next + (Math.random() - 0.5) * 0.25).toFixed(2)
        );
      });

      setStable(Math.random() > 0.25);
    }, 700);

    return () => clearInterval(timer);
  }, [demoMode]);

  function startDemo() {
    if (connected) {
      disconnectScale();
    }

    setError("");
    setDemoMode(true);
    setConnected(false);
    setStable(true);

    if (!weight || weight <= 0) {
      setWeight(30);
    }
  }

  function stopDemo() {
    setDemoMode(false);
    setStable(false);
  }

  /* =====================================================
     SAVE WEIGHT
     Parent -> addWeight()
     goat.weight + goat.events update ஆகும்
  ===================================================== */

  function handleSave() {
    const finalWeight = Number(weight);

    if (!Number.isFinite(finalWeight) || finalWeight <= 0) {
      setError("Please place the goat on the scale and wait for a valid weight.");
      return;
    }

    onSave(Number(finalWeight.toFixed(2)));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  const hardwareFlow = [
    { label: "Load Cell", note: "Weight sensor" },
    { label: "HX711", note: "ADC amplifier" },
    { label: "ESP32", note: "Controller" },
    { label: "USB", note: "Serial data" },
    { label: "Goat profile", note: "Live weight" },
  ];

  return (
    <div className="gp-app">
      

      {/* ================= HEADER ================= */}

      <div className="gp-scale-header">
        <div className="gp-scale-header-inner">

          <button
            type="button"
            className="gp-scale-back"
            onClick={async () => {
              if (connected) {
                await disconnectScale();
              }

              setDemoMode(false);
              onBack();
            }}
          >
            <ArrowLeft size={20} />
            Back to {goat?.name || "goat"}
          </button>

          <div>
            <div className="gp-scale-title">
              Weighing Scale
            </div>

            <div className="gp-scale-subtitle">
              Real-time weight measurement
            </div>
          </div>

          <div
            className="gp-scale-connected"
            style={{
              background:
                connected || demoMode
                  ? "rgba(97,255,145,.16)"
                  : "rgba(255,200,87,.16)",
              color:
                connected || demoMode
                  ? "#61FF91"
                  : "#FFC857",
            }}
          >
            <Wifi size={15} />

            {connected
              ? "Scale Connected"
              : demoMode
              ? "Demo Scale"
              : "Scale Disconnected"}
          </div>

        </div>
      </div>

      {/* ================= BODY ================= */}

      <div className="gp-scale-body">

        {/* GOAT */}

        <div className="gp-scale-goat">

          <div className="gp-scale-avatar">
            {goat?.photo ? (
              <img
                src={goat.photo}
                alt={goat.name || "Goat"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 15,
                }}
              />
            ) : (
              "🐐"
            )}
          </div>

          <div style={{ flex: 1 }}>
            <div className="gp-scale-goat-name">
              {goat?.name || "Unnamed Goat"}
            </div>

            <div className="gp-scale-goat-meta">
              #{goat?.tagNumber || "—"} ·{" "}
              {goat?.breed || "Breed not specified"}
            </div>
          </div>

          <div className="gp-scale-last">
            <label>LAST RECORDED</label>

            <strong>
              {goat?.weight !== null &&
              goat?.weight !== undefined &&
              goat?.weight !== ""
                ? `${goat.weight} kg`
                : "—"}
            </strong>
          </div>

        </div>

        {/* ================= LIVE SCALE ================= */}

        <div className="gp-scale-card">

          <div className="gp-scale-heading">
            <Scale size={20} />
            LIVE WEIGHT
          </div>

          <div className="gp-scale-lcd">

            <div className="gp-scale-number">
              {Number(weight || 0).toFixed(2)}
              <span>kg</span>
            </div>

            {stable ? (
              <div className="gp-scale-status stable">
                <CheckCircle size={15} />
                Weight stable
              </div>
            ) : (
              <div className="gp-scale-status measuring">
                <RefreshCw
                  size={15}
                  style={{
                    animation:
                      "gp-pulse 1s ease-in-out infinite",
                  }}
                />
                Waiting for weight...
              </div>
            )}

          </div>

          {/* PLATFORM */}

          <div className="gp-scale-platform">

            <div className="gp-platform-top">
              🐐
            </div>

            <div className="gp-platform-mid">
              <div />
              <div />
              <div />
            </div>

            <div className="gp-platform-legs">
              <i />
              <i />
              <i />
              <i />
            </div>

          </div>

          <p className="gp-scale-instruction">
            Place {goat?.name || "the goat"} on the weighing platform
          </p>

        </div>

        {/* ================= CONTROLS ================= */}

        <div
          className="gp-scale-save"
          style={{
            gridTemplateColumns: "1fr",
          }}
        >

          <div>
            <h3>Scale Controls</h3>

            <p>
              Connect your ESP32 weighing scale to receive the
              real-time weight.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >

            {!connected && !demoMode && (
              <button
                type="button"
                className="gp-btn gp-btn-primary"
                onClick={connectScale}
              >
                <Wifi size={17} />
                Connect Real Scale
              </button>
            )}

            {connected && (
              <button
                type="button"
                className="gp-btn gp-btn-ghost"
                onClick={disconnectScale}
              >
                <Wifi size={17} />
                Disconnect
              </button>
            )}

            {!demoMode ? (
              <button
                type="button"
                className="gp-btn gp-btn-ghost"
                onClick={startDemo}
              >
                <Play size={17} />
                Test Without Hardware
              </button>
            ) : (
              <button
                type="button"
                className="gp-btn gp-btn-ghost"
                onClick={stopDemo}
              >
                <X size={17} />
                Stop Demo
              </button>
            )}

            <button
              type="button"
              className="gp-btn gp-btn-ghost"
              onClick={tareScale}
            >
              <RefreshCw size={17} />
              Tare
            </button>

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="gp-error">
            {error}
          </div>
        )}

        {/* ================= SAVE ================= */}

        <div className="gp-scale-save">

          <div>
            <h3>Weight reading</h3>

            <p>
              Save this reading to {goat?.name || "this goat"}'s
              weight history.
            </p>
          </div>

          <button
            type="button"
            className="gp-btn gp-btn-primary"
            onClick={handleSave}
            disabled={!stable || Number(weight) <= 0}
            style={{
              opacity:
                !stable || Number(weight) <= 0 ? 0.55 : 1,
              cursor:
                !stable || Number(weight) <= 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            <Save size={17} />
            Save Weight
          </button>

        </div>

        {/* SUCCESS */}

        {saved && (
          <div className="gp-scale-success">
            <CheckCircle size={18} />

            {Number(weight).toFixed(2)} kg saved to{" "}
            {goat?.name || "goat"}'s profile
          </div>
        )}

        {/* ================= CONNECTION FLOW ================= */}

        <div className="gp-scale-panel">

          <h3>Weighing scale connection</h3>

          <div className="gp-hw-flow">

            {hardwareFlow.map((node, index) => (
              <React.Fragment key={node.label}>

                <div className="gp-hw-node">
                  <b>{node.label}</b>
                  <small>{node.note}</small>
                </div>

                {index < hardwareFlow.length - 1 && (
                  <span className="gp-hw-arrow">
                    →
                  </span>
                )}

              </React.Fragment>
            ))}

          </div>

        </div>

        {/* ================= HISTORY ================= */}

        <div className="gp-scale-panel">

          <h3>Weight history</h3>

          {weightHistory.length === 0 ? (
            <p
              className="gp-hint"
              style={{ fontSize: 13 }}
            >
              No weight records yet for{" "}
              {goat?.name || "this goat"}.
            </p>
          ) : (
            weightHistory.map((item) => (
              <div
                className="gp-history-row"
                key={item.id}
              >
                <div>
                  <strong>
                    {item.title}
                  </strong>

                  <small>
                    {item.date}
                  </small>
                </div>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default GoatWeightScale;