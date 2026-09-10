const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/* =========================================================
   COMMON REQUEST
========================================================= */

async function request(endpoint, options = {}) {
  try {
    const response = await fetch(
      `${API_BASE}${endpoint}`,
      {
        ...options,

        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      }
    );

    /* -----------------------------------------------------
       Read JSON safely
    ----------------------------------------------------- */

    const data = await response
      .json()
      .catch(() => ({}));

    /* -----------------------------------------------------
       HANDLE HTTP ERRORS
       
       IMPORTANT:
       Keep status + backend error code.
       
       Example:
       402
       SUBSCRIPTION_EXPIRED
    ----------------------------------------------------- */

    if (!response.ok) {
      const error = new Error(
        data?.error ||
          data?.message ||
          `Request failed with status ${response.status}`
      );

      error.status = response.status;

      error.code =
        data?.code ||
        "";

      error.success =
        data?.success ??
        false;

      error.data =
        data;

      throw error;
    }

    return data;

  } catch (error) {

    /* -----------------------------------------------------
       Network / Backend connection error
    ----------------------------------------------------- */

    if (
      error?.status === undefined
    ) {
      const networkError =
        new Error(
          "Unable to connect to the backend server."
        );

      networkError.status =
        0;

      networkError.code =
        "NETWORK_ERROR";

      networkError.originalError =
        error;

      throw networkError;
    }

    throw error;
  }
}


/* =========================================================
   AUTH
========================================================= */

/* LOGIN */

export async function loginFarm({
  farmId,
  username,
  password,
}) {
  return request(
    "/auth/login",
    {
      method: "POST",

      credentials: "include",

      body: JSON.stringify({
        farmId: String(
          farmId || ""
        ).trim(),

        username: String(
          username || ""
        ).trim(),

        password: String(
          password || ""
        ),
      }),
    }
  );
}


/* REGISTER */

export async function registerFarm({
  farmName,
  username,
  email,
  password,
}) {
  return request(
    "/auth/register",
    {
      method: "POST",

      credentials: "include",

      body: JSON.stringify({
        farmName: String(
          farmName || ""
        ).trim(),

        username: String(
          username || ""
        ).trim(),

        email: String(
          email || ""
        ).trim(),

        password: String(
          password || ""
        ),
      }),
    }
  );
}


/* CURRENT USER */

export async function getCurrentUser() {
  return request(
    "/auth/me",
    {
      method: "GET",

      credentials: "include",
    }
  );
}


/* LOGOUT */

export async function logoutFarm() {
  return request(
    "/auth/logout",
    {
      method: "POST",

      credentials: "include",
    }
  );
}


/* =========================================================
   GOATS
========================================================= */

/* GET ALL GOATS */

export async function getGoats() {
  return request(
    "/goats",
    {
      method: "GET",

      credentials: "include",
    }
  );
}


/* GET SINGLE GOAT */

export async function getGoat(id) {
  return request(
    `/goats/${id}`,
    {
      method: "GET",

      credentials: "include",
    }
  );
}


/* CREATE GOAT */

export async function createGoat(
  goatData
) {
  return request(
    "/goats",
    {
      method: "POST",

      credentials: "include",

      body: JSON.stringify(
        goatData
      ),
    }
  );
}


/* UPDATE GOAT */

export async function updateGoat(
  id,
  goatData
) {
  return request(
    `/goats/${id}`,
    {
      method: "PUT",

      credentials: "include",

      body: JSON.stringify(
        goatData
      ),
    }
  );
}


/* DELETE GOAT */

export async function deleteGoat(
  id
) {
  return request(
    `/goats/${id}`,
    {
      method: "DELETE",

      credentials: "include",
    }
  );
}


/* UPDATE GOAT STATUS */

export async function updateGoatStatus(
  id,
  status,
  reason = ""
) {
  return request(
    `/goats/${id}/status`,
    {
      method: "PATCH",

      credentials: "include",

      body: JSON.stringify({
        status,
        reason,
      }),
    }
  );
}


/* =========================================================
   WEIGHTS
========================================================= */

/* GET WEIGHTS */

export async function getWeights(
  query = ""
) {
  return request(
    `/weights${query}`,
    {
      method: "GET",

      credentials: "include",
    }
  );
}


/* GET GOAT WEIGHTS */

export async function getGoatWeights(
  goatId
) {
  return request(
    `/weights/goat/${goatId}`,
    {
      method: "GET",

      credentials: "include",
    }
  );
}


/* GET SINGLE WEIGHT */

export async function getWeight(
  id
) {
  return request(
    `/weights/${id}`,
    {
      method: "GET",

      credentials: "include",
    }
  );
}


/* CREATE WEIGHT */

export async function createWeight(
  weightData
) {
  return request(
    "/weights",
    {
      method: "POST",

      credentials: "include",

      body: JSON.stringify(
        weightData
      ),
    }
  );
}


/* UPDATE WEIGHT */

export async function updateWeight(
  id,
  weightData
) {
  return request(
    `/weights/${id}`,
    {
      method: "PUT",

      credentials: "include",

      body: JSON.stringify(
        weightData
      ),
    }
  );
}


/* DELETE WEIGHT */

export async function deleteWeight(
  id
) {
  return request(
    `/weights/${id}`,
    {
      method: "DELETE",

      credentials: "include",
    }
  );
}


/* =========================================================
   EVENTS
========================================================= */

export async function getEvents(
  query = ""
) {
  return request(
    `/events${query}`,
    {
      method: "GET",

      credentials: "include",
    }
  );
}


export async function createEvent(
  eventData
) {
  return request(
    "/events",
    {
      method: "POST",

      credentials: "include",

      body: JSON.stringify(
        eventData
      ),
    }
  );
}


export async function updateEvent(
  id,
  eventData
) {
  return request(
    `/events/${id}`,
    {
      method: "PUT",

      credentials: "include",

      body: JSON.stringify(
        eventData
      ),
    }
  );
}


export async function deleteEvent(
  id
) {
  return request(
    `/events/${id}`,
    {
      method: "DELETE",

      credentials: "include",
    }
  );
}


/* =========================================================
   SALES
========================================================= */

export async function getSales(
  query = ""
) {
  return request(
    `/sales${query}`,
    {
      method: "GET",

      credentials: "include",
    }
  );
}


export async function createSale(
  saleData
) {
  return request(
    "/sales",
    {
      method: "POST",

      credentials: "include",

      body: JSON.stringify(
        saleData
      ),
    }
  );
}


export async function updateSale(
  id,
  saleData
) {
  return request(
    `/sales/${id}`,
    {
      method: "PUT",

      credentials: "include",

      body: JSON.stringify(
        saleData
      ),
    }
  );
}


export async function deleteSale(
  id
) {
  return request(
    `/sales/${id}`,
    {
      method: "DELETE",

      credentials: "include",
    }
  );
}


/* =========================================================
   MEDICAL RECORDS
========================================================= */

export async function getMedicalRecords(
  query = ""
) {
  return request(
    `/medical-records${query}`,
    {
      method: "GET",

      credentials: "include",
    }
  );
}


export async function createMedicalRecord(
  recordData
) {
  return request(
    "/medical-records",
    {
      method: "POST",

      credentials: "include",

      body: JSON.stringify(
        recordData
      ),
    }
  );
}


export async function updateMedicalRecord(
  id,
  recordData
) {
  return request(
    `/medical-records/${id}`,
    {
      method: "PUT",

      credentials: "include",

      body: JSON.stringify(
        recordData
      ),
    }
  );
}


export async function deleteMedicalRecord(
  id
) {
  return request(
    `/medical-records/${id}`,
    {
      method: "DELETE",

      credentials: "include",
    }
  );
}


/* =========================================================
   MILK RECORDS
========================================================= */

export async function getMilkRecords(
  query = ""
) {
  return request(
    `/milk-records${query}`,
    {
      method: "GET",

      credentials: "include",
    }
  );
}


export async function createMilkRecord(
  recordData
) {
  return request(
    "/milk-records",
    {
      method: "POST",

      credentials: "include",

      body: JSON.stringify(
        recordData
      ),
    }
  );
}


export async function updateMilkRecord(
  id,
  recordData
) {
  return request(
    `/milk-records/${id}`,
    {
      method: "PUT",

      credentials: "include",

      body: JSON.stringify(
        recordData
      ),
    }
  );
}


export async function deleteMilkRecord(
  id
) {
  return request(
    `/milk-records/${id}`,
    {
      method: "DELETE",

      credentials: "include",
    }
  );
}


/* =========================================================
   DASHBOARD
========================================================= */

export async function getDashboard(
  query = ""
) {
  return request(
    `/dashboard${query}`,
    {
      method: "GET",

      credentials: "include",
    }
  );
}


/* =========================================================
   REPORTS
========================================================= */

export async function getReports(
  query = ""
) {
  return request(
    `/reports${query}`,
    {
      method: "GET",

      credentials: "include",
    }
  );
}


/* =========================================================
   WEIGHING SCALE
========================================================= */

export async function getScaleStatus() {
  return request(
    "/scale/status",
    {
      method: "GET",

      credentials: "include",
    }
  );
}


export async function connectScale(
  scaleData = {}
) {
  return request(
    "/scale/connect",
    {
      method: "POST",

      credentials: "include",

      body: JSON.stringify(
        scaleData
      ),
    }
  );
}


export async function disconnectScale() {
  return request(
    "/scale/disconnect",
    {
      method: "POST",

      credentials: "include",
    }
  );
}


/* =========================================================
   SUBSCRIPTION
========================================================= */

/*
   IMPORTANT:

   These APIs intentionally DO NOT get blocked
   by subscription expiry.

   User must still be able to:
   - View subscription
   - Choose plan
   - Submit payment request
*/


/* GET MY SUBSCRIPTION */

export async function getMySubscription() {
  return request(
    "/subscriptions/me",
    {
      method: "GET",

      credentials: "include",
    }
  );
}


/* CREATE PAYMENT REQUEST */

export async function createPaymentRequest({
  plan,
  amount,
  paymentMethod,
  paymentReceiver = "",
}) {
  return request(
    "/subscriptions/payment-request",
    {
      method: "POST",

      credentials: "include",

      body: JSON.stringify({
        plan,
        amount,
        paymentMethod,
        paymentReceiver,
      }),
    }
  );
}


/* GET PAYMENT REQUEST STATUS */

export async function getPaymentRequestStatus() {
  return request(
    "/subscriptions/payment-request",
    {
      method: "GET",

      credentials: "include",
    }
  );
}


/* =========================================================
   GENERIC API
========================================================= */

export async function fetchApi(
  endpoint,
  options = {}
) {
  return request(
    endpoint,
    {
      ...options,

      credentials: "include",
    }
  );
}


/* =========================================================
   SUBSCRIPTION ERROR HELPERS
========================================================= */

export function isSubscriptionError(
  error
) {
  return (
    error?.status === 402 &&
    (
      error?.code ===
        "SUBSCRIPTION_EXPIRED" ||

      error?.code ===
        "SUBSCRIPTION_REQUIRED" ||

      error?.code ===
        "SUBSCRIPTION_INVALID" ||

      error?.code ===
        "TENANT_INACTIVE"
    )
  );
}


export function isAuthError(
  error
) {
  return (
    error?.status === 401 ||
    error?.code ===
      "AUTH_REQUIRED" ||
    error?.code ===
      "AUTH_FAILED"
  );
}


export function isNetworkError(
  error
) {
  return (
    error?.status === 0 ||
    error?.code ===
      "NETWORK_ERROR"
  );
}


/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default {

  /* AUTH */
  registerFarm,
  loginFarm,
  getCurrentUser,
  logoutFarm,

  /* GOATS */
  getGoats,
  getGoat,
  createGoat,
  updateGoat,
  deleteGoat,
  updateGoatStatus,

  /* WEIGHTS */
  getWeights,
  getGoatWeights,
  getWeight,
  createWeight,
  updateWeight,
  deleteWeight,

  /* EVENTS */
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,

  /* SALES */
  getSales,
  createSale,
  updateSale,
  deleteSale,

  /* MEDICAL */
  getMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,

  /* MILK */
  getMilkRecords,
  createMilkRecord,
  updateMilkRecord,
  deleteMilkRecord,

  /* DASHBOARD */
  getDashboard,

  /* REPORTS */
  getReports,

  /* SCALE */
  getScaleStatus,
  connectScale,
  disconnectScale,

  /* SUBSCRIPTION */
  getMySubscription,
  createPaymentRequest,
  getPaymentRequestStatus,

  /* GENERIC */
  fetchApi,

  /* ERROR HELPERS */
  isSubscriptionError,
  isAuthError,
  isNetworkError,
};