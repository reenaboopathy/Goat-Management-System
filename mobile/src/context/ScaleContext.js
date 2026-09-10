import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { scaleApi } from '../api';
import { getApiBaseUrl } from '../api/client';

const ScaleContext = createContext({
  connected: false,
  liveWeight: 0,
  isStable: false,
  unit: 'kg',
  deviceId: 'ESP32_SCALE_01',
  tareOffset: 0,
  error: null,
  connectScale: async () => {},
  disconnectScale: () => {},
  tareScale: async () => {},
  setManualWeight: () => {},
});

export function ScaleProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const [liveWeight, setLiveWeight] = useState(0);
  const [isStable, setIsStable] = useState(false);
  const [unit, setUnit] = useState('kg');
  const [deviceId, setDeviceId] = useState('ESP32_SCALE_01');
  const [tareOffset, setTareOffset] = useState(0);
  const [error, setError] = useState(null);

  const checkScaleStatus = useCallback(async () => {
    try {
      const status = await scaleApi.getStatus();
      if (status) {
        setConnected(Boolean(status.connected));
        if (status.connected) {
          setLiveWeight(status.lastReading || 0);
          setIsStable(Boolean(status.stable));
          setUnit(status.unit || 'kg');
          setDeviceId(status.deviceId || 'ESP32_SCALE_01');
          setTareOffset(status.tareOffset || 0);
        }
      }
    } catch {
      setConnected(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(checkScaleStatus, 2000);
    return () => clearInterval(interval);
  }, [checkScaleStatus]);

  const connectScale = async () => {
    setError(null);
    try {
      const status = await scaleApi.getStatus();
      if (status && status.connected) {
        setConnected(true);
        setLiveWeight(status.lastReading || 0);
        setIsStable(Boolean(status.stable));
        return { success: true };
      }

      setError('ESP32 scale is not connected. Use manual weight entry instead.');
      return { success: false, message: 'Scale offline' };
    } catch (err) {
      setError('Unable to query scale status.');
      return { success: false, error: err.message };
    }
  };

  const disconnectScale = () => {
    setConnected(false);
  };

  const tareScale = async () => {
    try {
      const res = await scaleApi.tare();
      setLiveWeight(0);
      setIsStable(true);
      if (res && res.tareOffset !== undefined) {
        setTareOffset(res.tareOffset);
      }
      return { success: true };
    } catch (err) {
      setError('Failed to tare scale.');
      return { success: false, error: err.message };
    }
  };

  const setManualWeight = (w) => {
    const num = Number(w);
    if (Number.isFinite(num)) {
      setLiveWeight(Number(num.toFixed(2)));
      setIsStable(true);
    }
  };

  return (
    <ScaleContext.Provider
      value={{
        connected,
        liveWeight,
        isStable,
        unit,
        deviceId,
        tareOffset,
        error,
        connectScale,
        disconnectScale,
        tareScale,
        setManualWeight,
      }}
    >
      {children}
    </ScaleContext.Provider>
  );
}

export function useScale() {
  return useContext(ScaleContext);
}
