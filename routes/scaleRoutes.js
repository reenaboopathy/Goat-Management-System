import express from 'express';

const router = express.Router();

// Shared in-memory live state for the ESP32 Weighing Scale
const scaleState = {
  connected: false,
  lastReading: 0,
  stable: false,
  unit: 'kg',
  deviceId: 'ESP32_SCALE_01',
  ipAddress: null,
  lastHeartbeat: null,
  tareOffset: 0,
  calibrationFactor: 1.0,
  mode: 'HARDWARE_READY', // 'HARDWARE_READY' or 'LIVE_STREAMING'
};

// Connected SSE clients for live weight streaming
const sseClients = new Set();

function broadcastWeight(data) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch {
      sseClients.delete(client);
    }
  }
}

// GET /api/scale/status - Check current scale status & latest reading
router.get('/status', (req, res) => {
  const now = Date.now();
  // If last heartbeat was within last 15 seconds, consider connected
  const isLive = scaleState.lastHeartbeat && now - scaleState.lastHeartbeat < 15000;
  res.json({
    ...scaleState,
    connected: Boolean(isLive),
    serverTime: new Date().toISOString(),
  });
});

// POST /api/scale/reading - ESP32 sends live weight readings via HTTP POST
router.post('/reading', (req, res) => {
  try {
    const { weight, stable, deviceId, unit, battery } = req.body;

    const numWeight = Number(weight);
    if (!Number.isFinite(numWeight)) {
      return res.status(400).json({ error: 'Valid numeric weight is required' });
    }

    scaleState.lastReading = Number((numWeight - scaleState.tareOffset).toFixed(2));
    scaleState.stable = Boolean(stable);
    scaleState.connected = true;
    scaleState.lastHeartbeat = Date.now();
    scaleState.ipAddress = req.ip || req.socket.remoteAddress;
    if (deviceId) scaleState.deviceId = deviceId;
    if (unit) scaleState.unit = unit;

    const updatePayload = {
      type: 'WEIGHT_UPDATE',
      weight: scaleState.lastReading,
      stable: scaleState.stable,
      unit: scaleState.unit,
      deviceId: scaleState.deviceId,
      timestamp: new Date().toISOString(),
    };

    broadcastWeight(updatePayload);

    res.json({
      success: true,
      acknowledged: true,
      tareOffset: scaleState.tareOffset,
    });
  } catch (error) {
    console.error('Scale reading ingest error:', error);
    res.status(500).json({ error: 'Failed to process scale reading' });
  }
});

// POST /api/scale/tare - Tare scale (zero out)
router.post('/tare', (req, res) => {
  scaleState.tareOffset = scaleState.lastReading + scaleState.tareOffset;
  scaleState.lastReading = 0;
  scaleState.stable = true;

  const updatePayload = {
    type: 'SCALE_TARED',
    weight: 0,
    stable: true,
    tareOffset: scaleState.tareOffset,
    timestamp: new Date().toISOString(),
  };

  broadcastWeight(updatePayload);

  res.json({
    success: true,
    message: 'Scale tared to 0.00 kg',
    tareOffset: scaleState.tareOffset,
  });
});

// POST /api/scale/calibrate - Calibration endpoint
router.post('/calibrate', (req, res) => {
  const { factor } = req.body;
  if (factor && Number(factor) > 0) {
    scaleState.calibrationFactor = Number(factor);
    return res.json({ success: true, factor: scaleState.calibrationFactor });
  }
  res.status(400).json({ error: 'Invalid calibration factor' });
});

// GET /api/scale/stream - Server-Sent Events stream for Mobile & Web real-time live weighing
router.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Send initial connection packet
  res.write(
    `data: ${JSON.stringify({
      type: 'CONNECTED',
      weight: scaleState.lastReading,
      stable: scaleState.stable,
      connected: scaleState.connected,
    })}\n\n`
  );

  sseClients.add(res);

  req.on('close', () => {
    sseClients.delete(res);
  });
});

export default router;
