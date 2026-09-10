import { DEFAULT_API_URL, STORAGE_KEYS } from '../constants/config';
import { storage } from '../utils/storage';

let currentBaseUrl = DEFAULT_API_URL;

export async function initApiClient() {
  const customUrl = await storage.get(STORAGE_KEYS.API_BASE_URL);
  if (customUrl) {
    currentBaseUrl = customUrl;
  }
}

export function setApiBaseUrl(url) {
  if (url && typeof url === 'string') {
    currentBaseUrl = url.replace(/\/+$/, '');
    storage.set(STORAGE_KEYS.API_BASE_URL, currentBaseUrl);
  }
}

export function getApiBaseUrl() {
  return currentBaseUrl;
}

export async function apiRequest(endpoint, options = {}) {
  const url = `${currentBaseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
  const token = await storage.get(STORAGE_KEYS.AUTH_TOKEN);

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage =
        data.error ||
        data.message ||
        `Request failed with status ${response.status}`;
      const err = new Error(errorMessage);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      const err = new Error('Connection timed out. Please check if the backend server is running.');
      err.isNetworkError = true;
      throw err;
    }

    if (error.message && (error.message.includes('Network request failed') || error.message.includes('Failed to fetch'))) {
      const err = new Error('Unable to connect to server. Please check your internet connection or server IP.');
      err.isNetworkError = true;
      throw err;
    }

    throw error;
  }
}
