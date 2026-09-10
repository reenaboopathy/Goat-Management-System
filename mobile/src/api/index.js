import { apiRequest } from './client';

// ================= AUTH API =================
export const authApi = {
  login: (farmId, username, password) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: { farmId, username, password },
    }),

  register: (farmName, username, email, password) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: { farmName, username, email, password },
    }),

  checkSession: () => apiRequest('/auth/me'),
};

// ================= GOATS API =================
export const goatsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.breed && params.breed !== 'All Breeds') query.append('breed', params.breed);
    if (params.status && params.status !== 'All') query.append('status', params.status);
    if (params.gender && params.gender !== 'All') query.append('gender', params.gender);
    if (params.group && params.group !== 'All Groups') query.append('group', params.group);

    const qs = query.toString();
    return apiRequest(`/goats${qs ? '?' + qs : ''}`);
  },

  getById: (id) => apiRequest(`/goats/${id}`),

  create: (goatData) =>
    apiRequest('/goats', {
      method: 'POST',
      body: goatData,
    }),

  update: (id, goatData) =>
    apiRequest(`/goats/${id}`, {
      method: 'PUT',
      body: goatData,
    }),

  updateStatus: (id, status, reason) =>
    apiRequest(`/goats/${id}/status`, {
      method: 'PATCH',
      body: { status, reason },
    }),

  delete: (id) =>
    apiRequest(`/goats/${id}`, {
      method: 'DELETE',
    }),
};

// ================= WEIGHTS API =================
export const weightsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    if (params.goatId) query.append('goatId', params.goatId);
    if (params.limit) query.append('limit', String(params.limit));
    const qs = query.toString();
    return apiRequest(`/weights${qs ? '?' + qs : ''}`);
  },

  getHistory: () => apiRequest('/weights/history'),

  getByGoatId: (goatId) => apiRequest(`/weights/goat/${goatId}`),

  record: (data) =>
    apiRequest('/weights', {
      method: 'POST',
      body: data,
    }),

  delete: (id) =>
    apiRequest(`/weights/${id}`, {
      method: 'DELETE',
    }),
};

// ================= EVENTS API =================
export const eventsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    if (params.type && params.type !== 'All' && params.type !== 'All Event Types') {
      query.append('type', params.type);
    }
    if (params.mode && params.mode !== 'All') query.append('mode', params.mode);
    if (params.goatId) query.append('goatId', params.goatId);
    if (params.search) query.append('search', params.search);
    if (params.from) query.append('from', params.from);
    if (params.to) query.append('to', params.to);

    const qs = query.toString();
    return apiRequest(`/events${qs ? '?' + qs : ''}`);
  },

  getById: (id) => apiRequest(`/events/${id}`),

  create: (eventData) =>
    apiRequest('/events', {
      method: 'POST',
      body: eventData,
    }),

  update: (id, eventData) =>
    apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: eventData,
    }),

  delete: (id) =>
    apiRequest(`/events/${id}`, {
      method: 'DELETE',
    }),
};

// ================= SALES API =================
export const salesApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    if (params.type && params.type !== 'All') query.append('type', params.type);
    if (params.status && params.status !== 'All') query.append('status', params.status);
    if (params.search) query.append('search', params.search);
    if (params.from) query.append('from', params.from);
    if (params.to) query.append('to', params.to);

    const qs = query.toString();
    return apiRequest(`/sales${qs ? '?' + qs : ''}`);
  },

  getById: (id) => apiRequest(`/sales/${id}`),

  create: (saleData) =>
    apiRequest('/sales', {
      method: 'POST',
      body: saleData,
    }),

  update: (id, saleData) =>
    apiRequest(`/sales/${id}`, {
      method: 'PUT',
      body: saleData,
    }),

  delete: (id) =>
    apiRequest(`/sales/${id}`, {
      method: 'DELETE',
    }),
};

// ================= DASHBOARD STATS API =================
export const dashboardApi = {
  getStats: () => apiRequest('/dashboard/stats'),
};

// ================= REPORTS API =================
export const reportsApi = {
  getSummary: () => apiRequest('/reports/summary'),
  getWeights: (params = {}) => {
    const query = new URLSearchParams();
    if (params.goatId) query.append('goatId', params.goatId);
    if (params.from) query.append('from', params.from);
    if (params.to) query.append('to', params.to);
    const qs = query.toString();
    return apiRequest(`/reports/weights${qs ? '?' + qs : ''}`);
  },
  getSales: (params = {}) => {
    const query = new URLSearchParams();
    if (params.type) query.append('type', params.type);
    if (params.status) query.append('status', params.status);
    if (params.from) query.append('from', params.from);
    if (params.to) query.append('to', params.to);
    const qs = query.toString();
    return apiRequest(`/reports/sales${qs ? '?' + qs : ''}`);
  },
  getEvents: (params = {}) => {
    const query = new URLSearchParams();
    if (params.type) query.append('type', params.type);
    if (params.from) query.append('from', params.from);
    if (params.to) query.append('to', params.to);
    const qs = query.toString();
    return apiRequest(`/reports/events${qs ? '?' + qs : ''}`);
  },
};

// ================= SCALE API =================
export const scaleApi = {
  getStatus: () => apiRequest('/scale/status'),
  tare: () =>
    apiRequest('/scale/tare', {
      method: 'POST',
    }),
  sendReading: (weight, stable = true, deviceId = 'ESP32_APP') =>
    apiRequest('/scale/reading', {
      method: 'POST',
      body: { weight, stable, deviceId },
    }),
};
