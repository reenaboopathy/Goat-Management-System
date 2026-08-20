const API_BASE = 'http://localhost:5000/api';

export async function fetchApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`API call ${endpoint} failed:`, error.message);
    throw error;
  }
}

export const webApi = {
  // Health
  checkHealth: () => fetchApi('/health'),

  // Goats
  getGoats: () => fetchApi('/goats'),
  getGoat: (id) => fetchApi(`/goats/${id}`),
  createGoat: (goat) =>
    fetchApi('/goats', { method: 'POST', body: JSON.stringify(goat) }),
  updateGoat: (id, goat) =>
    fetchApi(`/goats/${id}`, { method: 'PUT', body: JSON.stringify(goat) }),
  deleteGoat: (id) =>
    fetchApi(`/goats/${id}`, { method: 'DELETE' }),

  // Weights
  getWeights: () => fetchApi('/weights'),
  saveWeight: (weightData) =>
    fetchApi('/weights', { method: 'POST', body: JSON.stringify(weightData) }),

  // Events
  getEvents: () => fetchApi('/events'),
  saveEvent: (eventData) =>
    fetchApi('/events', { method: 'POST', body: JSON.stringify(eventData) }),
  deleteEvent: (id) =>
    fetchApi(`/events/${id}`, { method: 'DELETE' }),

  // Sales
  getSales: () => fetchApi('/sales'),
  saveSale: (saleData) =>
    fetchApi('/sales', { method: 'POST', body: JSON.stringify(saleData) }),
  deleteSale: (id) =>
    fetchApi(`/sales/${id}`, { method: 'DELETE' }),

  // Dashboard & Reports
  getDashboardStats: () => fetchApi('/dashboard/stats'),
  getReportsSummary: () => fetchApi('/reports/summary'),
};
