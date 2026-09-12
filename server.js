import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// =========================================================
// ROUTES
// =========================================================

import medicalRecordRoutes from "./routes/medicalRecordRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import goatRoutes from "./routes/goatRoutes.js";
import weightRoutes from "./routes/weightRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import scaleRoutes from "./routes/scaleRoutes.js";
import milkRecordRoutes from "./routes/milkRecordRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import ownerAuthRoutes from "./routes/ownerAuthRoutes.js";
import ownerAdminRoutes from "./routes/ownerAdminRoutes.js";

import { requireOwner } from "./middleware/authMiddleware.js";

// =========================================================
// MODELS
// =========================================================

import Tenant from "./models/Tenant.js";

// =========================================================
// APP
// =========================================================

const app = express();

// =========================================================
// CONFIG
// =========================================================

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/selsolve";

let httpServer = null;

// =========================================================
// CORS
// =========================================================

app.use(
  cors({
    origin: true,
    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-tenant-id",
    ],
  })
);

// =========================================================
// BODY PARSER
// =========================================================

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// =========================================================
// COOKIE PARSER
// =========================================================

app.use(cookieParser());

// =========================================================
// REQUEST LOGGER
// =========================================================

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    if (
      req.originalUrl.startsWith("/api") &&
      req.originalUrl !== "/api/scale/status"
    ) {
      console.log(
        `[${new Date()
          .toISOString()
          .slice(11, 19)}] ${req.method} ${
          req.originalUrl
        } - ${res.statusCode} (${duration}ms)`
      );
    }
  });

  next();
});

// =========================================================
// DATABASE
// =========================================================

async function connectDatabase() {
  try {
    console.log("");
    console.log("==========================================");
    console.log("Connecting to MongoDB...");
    console.log("==========================================");

    console.log(`MongoDB URL: ${MONGO_URI}`);

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully.");

    console.log(
      `Database: ${mongoose.connection.name}`
    );

    console.log(
      `Host: ${mongoose.connection.host}`
    );

    console.log("REAL MONGODB MODE: ENABLED");

    console.log("==========================================");
    console.log("");
  } catch (error) {
    console.error("");
    console.error(
      "=========================================="
    );

    console.error("MONGODB CONNECTION FAILED");

    console.error(
      "=========================================="
    );

    console.error(error.message);

    console.error(
      "Make sure MongoDB is running or MONGO_URI is configured."
    );

    process.exit(1);
  }
}

// =========================================================
// HEALTH
// =========================================================

app.get("/api/health", (req, res) => {
  const connected =
    mongoose.connection.readyState === 1;

  return res.json({
    status: "ok",

    database: connected
      ? "connected"
      : "disconnected",

    databaseName:
      mongoose.connection.name || null,

    timestamp: new Date().toISOString(),

    service: "SelSolve Unified API",
  });
});

// =========================================================
// TENANTS
// =========================================================

app.get(
  "/api/tenants",
  requireOwner,
  async (req, res) => {
    try {
      const tenants = await Tenant.find().sort({
        createdAt: -1,
      });

      return res.json({
        success: true,
        count: tenants.length,
        tenants,
      });
    } catch (error) {
      console.error(
        "GET TENANTS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        error: "Unable to load tenants",
      });
    }
  }
);

app.post(
  "/api/tenants",
  requireOwner,
  async (req, res) => {
    try {
      const tenant = new Tenant(req.body);

      await tenant.save();

      console.log(
        `TENANT CREATED → ${tenant.name}`
      );

      return res.status(201).json({
        success: true,
        message: "Tenant created successfully",
        tenant,
      });
    } catch (error) {
      console.error(
        "CREATE TENANT ERROR:",
        error
      );

      return res.status(400).json({
        success: false,
        error:
          error.message ||
          "Invalid tenant data",
      });
    }
  }
);

// =========================================================
// AUTH
// =========================================================

app.use(
  "/api/auth",
  authRoutes
);

// =========================================================
// OWNER AUTH
// =========================================================

app.use(
  "/api/owner/auth",
  ownerAuthRoutes
);

// =========================================================
// OWNER ADMIN
// =========================================================

app.use(
  "/api/owner",
  ownerAdminRoutes
);

// =========================================================
// SUBSCRIPTIONS
// =========================================================

app.use(
  "/api/subscriptions",
  subscriptionRoutes
);

// =========================================================
// GOATS
// =========================================================

app.use(
  "/api/goats",
  goatRoutes
);

// =========================================================
// WEIGHTS
// =========================================================

app.use(
  "/api/weights",
  weightRoutes
);

// =========================================================
// EVENTS
// =========================================================

app.use(
  "/api/events",
  eventRoutes
);

// =========================================================
// SALES
// =========================================================

app.use(
  "/api/sales",
  saleRoutes
);

// =========================================================
// MEDICAL RECORDS
// =========================================================

app.use(
  "/api/medical-records",
  medicalRecordRoutes
);

app.use(
  "/api/medical",
  medicalRecordRoutes
);

// =========================================================
// MILK RECORDS
// =========================================================

app.use(
  "/api/milk-records",
  milkRecordRoutes
);

// =========================================================
// DASHBOARD
// =========================================================

app.use(
  "/api/dashboard",
  dashboardRoutes
);

// =========================================================
// REPORTS
// =========================================================

app.use(
  "/api/reports",
  reportRoutes
);

// =========================================================
// SCALE
// =========================================================

app.use(
  "/api/scale",
  scaleRoutes
);

// =========================================================
// 404
// =========================================================

app.use((req, res) => {
  console.log(
    `404 API ROUTE -> ${req.method} ${req.originalUrl}`
  );

  return res.status(404).json({
    success: false,

    error:
      `API route ${req.method} ${req.originalUrl} not found`,
  });
});

// =========================================================
// GLOBAL ERROR
// =========================================================

app.use(
  (error, req, res, next) => {
    console.error(
      "GLOBAL SERVER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      error:
        error.message ||
        "Internal server error",
    });
  }
);

// =========================================================
// MONGOOSE EVENTS
// =========================================================

mongoose.connection.on(
  "connected",
  () => {
    console.log(
      "Mongoose event: MongoDB connected"
    );
  }
);

mongoose.connection.on(
  "disconnected",
  () => {
    console.warn(
      "Mongoose event: MongoDB disconnected"
    );
  }
);

mongoose.connection.on(
  "error",
  (error) => {
    console.error(
      "Mongoose MongoDB error:",
      error.message
    );
  }
);

// =========================================================
// START SERVER
// =========================================================

async function startServer() {
  try {
    await connectDatabase();

    httpServer = app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log("");
        console.log(
          "=========================================="
        );

        console.log(
          `SelSolve Unified API Server running on port ${PORT}`
        );

        console.log(
          `Local API: http://localhost:${PORT}`
        );

        console.log(
          `Health: http://localhost:${PORT}/api/health`
        );

        console.log(
          `Database: ${mongoose.connection.name}`
        );

        console.log(
          "Database Mode: REAL MONGODB"
        );

        console.log(
          "Authentication: ENABLED"
        );

        console.log(
          "Goats API: /api/goats"
        );

        console.log(
          "Weights API: /api/weights"
        );

        console.log(
          "Events API: /api/events"
        );

        console.log(
          "Sales API: /api/sales"
        );

        console.log(
          "Medical API: /api/medical"
        );

        console.log(
          "Medical Records API: /api/medical-records"
        );

        console.log(
          "Milk API: /api/milk-records"
        );

        console.log(
          "Dashboard API: /api/dashboard"
        );

        console.log(
          "Reports API: /api/reports"
        );

        console.log(
          "Scale API: /api/scale"
        );

        console.log(
          "Subscriptions API: /api/subscriptions"
        );

        console.log(
          "Owner Auth API: /api/owner/auth"
        );

        console.log(
          "Owner Admin API: /api/owner"
        );

        console.log(
          "=========================================="
        );

        console.log("");
      }
    );

    httpServer.on(
      "error",
      (error) => {
        if (
          error.code === "EADDRINUSE"
        ) {
          console.error(
            `Port ${PORT} is already in use. Stop the existing API process before starting another one.`
          );

          return;
        }

        console.error(
          "SERVER LISTEN ERROR:",
          error
        );

        process.exitCode = 1;
      }
    );
  } catch (error) {
    console.error(
      "SERVER STARTUP FAILED:",
      error
    );

    process.exit(1);
  }
}

// =========================================================
// START
// =========================================================

startServer();

// =========================================================
// GRACEFUL SHUTDOWN
// =========================================================

async function shutdown(signal) {
  console.log(
    `\n${signal} received. Shutting down...`
  );

  try {
    if (httpServer) {
      await new Promise(
        (resolve, reject) => {
          httpServer.close(
            (error) => {
              if (
                error &&
                error.code !==
                  "ERR_SERVER_NOT_RUNNING"
              ) {
                reject(error);
                return;
              }

              resolve();
            }
          );
        }
      );

      httpServer = null;
    }

    await mongoose.connection.close();

    console.log(
      "MongoDB connection closed."
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Error closing MongoDB:",
      error.message
    );

    process.exit(1);
  }
}

// =========================================================
// PROCESS SIGNALS
// =========================================================

process.on(
  "SIGINT",
  () => shutdown("SIGINT")
);

process.on(
  "SIGTERM",
  () => shutdown("SIGTERM")
);

process.once(
  "SIGUSR2",
  async () => {
    await shutdown("SIGUSR2");

    process.kill(
      process.pid,
      "SIGUSR2"
    );
  }
);

// =========================================================
// EXPORT
// =========================================================

export default app;