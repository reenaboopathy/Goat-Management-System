import http from 'http';

async function runTests() {
  console.log('--- Starting Backend & Database Verification ---');

  // Start the server programmatically for testing
  const { default: app } = await import('./server.js');

  // Give 2 seconds for MongoDB memory server and seedData to settle
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const BASE_URL = 'http://localhost:5000/api';

  async function request(endpoint, options = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
  }

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // 1. Health Check
    const health = await request('/health');
    assert(health.status === 200 && health.data.status === 'ok', 'GET /api/health responds OK');

    // 2. Auth Login
    const login = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ farmId: 'green-valley-farm', username: 'farmer', password: 'farm123' }),
    });
    assert(login.status === 200 && login.data.token, 'POST /api/auth/login returns valid token');

    // 3. Get Goats List
    const goats = await request('/goats');
    assert(goats.status === 200 && Array.isArray(goats.data) && goats.data.length > 0, `GET /api/goats returns ${goats.data.length} goats`);

    // 4. Create New Goat
    const testTag = `TEST-${Date.now().toString().slice(-4)}`;
    const newGoat = await request('/goats', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Goat Mobile',
        tagNumber: testTag,
        breed: 'Boer',
        gender: 'Female',
        currentWeight: 30.5,
        stage: 'Doe',
        origin: 'Born on farm',
      }),
    });
    assert(newGoat.status === 201 && newGoat.data._id, `POST /api/goats creates new goat with Tag #${testTag}`);

    const createdId = newGoat.data._id;

    // 5. Weigh Goat
    const weighRes = await request('/weights', {
      method: 'POST',
      body: JSON.stringify({
        goatId: createdId,
        weight: 34.2,
        notes: 'ESP32 automated scale test weigh',
        source: 'ESP32_Scale',
      }),
    });
    assert(weighRes.status === 201 && weighRes.data.weightRecord.gainLoss === 'Gain', `POST /api/weights logs weight (gain: +${weighRes.data.weightRecord.difference} kg)`);

    // Verify goat currentWeight updated
    const updatedGoat = await request(`/goats/${createdId}`);
    assert(updatedGoat.data.currentWeight === 34.2, 'Goat currentWeight is synchronized in MongoDB');

    // 6. Log Event
    const eventRes = await request('/events', {
      method: 'POST',
      body: JSON.stringify({
        type: 'Vaccination',
        title: 'Anthrax Booster Dose',
        goatId: createdId,
        goatName: updatedGoat.data.name,
        goatTagNumber: updatedGoat.data.tagNumber,
        cost: 200,
        medicine: 'Anthrax Spore Vaccine',
      }),
    });
    assert(eventRes.status === 201 && eventRes.data._id, 'POST /api/events creates health event');

    // 7. Sell Goat
    const saleRes = await request('/sales', {
      method: 'POST',
      body: JSON.stringify({
        type: 'Sale',
        goatId: createdId,
        buyer: 'Ravi Agro Farms',
        amount: 14500,
        method: 'UPI',
        status: 'Paid',
      }),
    });
    assert(saleRes.status === 201 && saleRes.data.sale._id, 'POST /api/sales records sale transaction');

    // Verify goat status is now 'Sold' and cannot be sold again
    const soldGoat = await request(`/goats/${createdId}`);
    assert(soldGoat.data.status === 'Sold', 'Goat status automatically updated to "Sold" in MongoDB');

    const duplicateSale = await request('/sales', {
      method: 'POST',
      body: JSON.stringify({
        type: 'Sale',
        goatId: createdId,
        buyer: 'Second Buyer',
        amount: 15000,
      }),
    });
    assert(duplicateSale.status === 400, 'Duplicate sale rejected for already sold goat');

    // 8. Scale Hardware Ingest & Tare
    const scaleReading = await request('/scale/reading', {
      method: 'POST',
      body: JSON.stringify({ weight: 42.1, stable: true, deviceId: 'ESP32_SCALE_TEST' }),
    });
    assert(scaleReading.status === 200, 'POST /api/scale/reading processes ESP32 live reading');

    const scaleStatus = await request('/scale/status');
    assert(scaleStatus.data.lastReading === 42.1, 'GET /api/scale/status reflects latest weight');

    const tareRes = await request('/scale/tare', { method: 'POST' });
    assert(tareRes.status === 200, 'POST /api/scale/tare zeroes out scale');

    // 9. Dashboard Statistics
    const dashboardStats = await request('/dashboard/stats');
    assert(dashboardStats.status === 200 && dashboardStats.data.cards.totalGoats > 0, 'GET /api/dashboard/stats returns real herd metrics');

    // 10. Reports Summary
    const reportsSummary = await request('/reports/summary');
    assert(reportsSummary.status === 200 && reportsSummary.data.finance.totalRevenue >= 14500, 'GET /api/reports/summary reflects live sales revenue');

    console.log(`\n--- Verification Complete: ${passed} passed, ${failed} failed ---`);
    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

runTests();
