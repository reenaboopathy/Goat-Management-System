import express from "express";
import jwt from "jsonwebtoken";
import Tenant from "../models/Tenant.js";

const router = express.Router();

// =========================================================
// CONFIG
// =========================================================

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "selsolve-development-secret";

const COOKIE_NAME = "selsolve_token";

// =========================================================
// COOKIE OPTIONS
// LOCAL DEVELOPMENT
// Frontend: http://localhost:5173
// Backend : http://localhost:5000
// =========================================================

const isProduction =
  process.env.NODE_ENV === "production";

const COOKIE_OPTIONS = {
  httpOnly: true,

  // Local HTTP -> false
  // Production HTTPS -> true
  secure: isProduction,

  // Local same-site requests -> lax
  // Production HTTPS cross-site -> none
  sameSite: isProduction
    ? "none"
    : "lax",

  path: "/",

  maxAge:
    7 * 24 * 60 * 60 * 1000,
};

// =========================================================
// HELPERS
// =========================================================

function safeString(value) {
  if (
    value === undefined ||
    value === null
  ) {
    return "";
  }

  return String(value).trim();
}

function safeLower(value) {
  return safeString(value).toLowerCase();
}

function escapeRegex(value) {
  return safeString(value).replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

// =========================================================
// CREATE JWT
// =========================================================

function createToken({
  userId,
  tenantId,
  username,
  role,
}) {
  return jwt.sign(
    {
      userId,
      tenantId,
      username,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

// =========================================================
// REGISTER
// POST /api/auth/register
// =========================================================

router.post(
  "/register",
  async (req, res) => {
    try {
      const farmName =
        safeString(
          req.body?.farmName
        );

      const username =
        safeString(
          req.body?.username
        );

      const email =
        safeLower(
          req.body?.email
        );

      const password =
        safeString(
          req.body?.password
        );

      const name =
        safeString(
          req.body?.name
        ) || username;

      // -----------------------------------------------------
      // VALIDATION
      // -----------------------------------------------------

      if (!farmName) {
        return res.status(400).json({
          success: false,
          error:
            "Farm name is required",
        });
      }

      if (!username) {
        return res.status(400).json({
          success: false,
          error:
            "Username is required",
        });
      }

      if (!password) {
        return res.status(400).json({
          success: false,
          error:
            "Password is required",
        });
      }

      // -----------------------------------------------------
      // CHECK FARM
      // -----------------------------------------------------

      const existingFarm =
        await Tenant.findOne({
          name: new RegExp(
            `^${escapeRegex(
              farmName
            )}$`,
            "i"
          ),
        });

      if (existingFarm) {
        return res.status(409).json({
          success: false,
          error:
            "A farm with this name already exists",
        });
      }

      // -----------------------------------------------------
      // CREATE TENANT
      // -----------------------------------------------------

      const tenant =
        new Tenant({
          name: farmName,
          status: "Active",

          users: [
            {
              username,
              email: email || "",
              password,
              name,
              role: "admin",
            },
          ],
        });

      await tenant.save();

      const user =
        tenant.users[0];

      // -----------------------------------------------------
      // CREATE TOKEN
      // -----------------------------------------------------

      const token =
        createToken({
          userId:
            user._id.toString(),

          tenantId:
            tenant._id.toString(),

          username:
            user.username,

          role:
            user.role || "admin",
        });

      // -----------------------------------------------------
      // SET COOKIE
      // -----------------------------------------------------

      res.cookie(
        COOKIE_NAME,
        token,
        COOKIE_OPTIONS
      );

      console.log(
        "=========================================="
      );

      console.log(
        "REGISTER SUCCESS"
      );

      console.log(
        `USER      : ${user.username}`
      );

      console.log(
        `TENANT    : ${tenant._id}`
      );

      console.log(
        `COOKIE    : ${COOKIE_NAME}`
      );

      console.log(
        `NODE_ENV  : ${
          process.env.NODE_ENV ||
          "development"
        }`
      );

      console.log(
        `SECURE    : ${COOKIE_OPTIONS.secure}`
      );

      console.log(
        `SAMESITE  : ${COOKIE_OPTIONS.sameSite}`
      );

      console.log(
        "=========================================="
      );

      return res.status(201).json({
        success: true,

        message:
          "Farm account created successfully",

        user: {
          id:
            user._id.toString(),

          username:
            user.username,

          email:
            user.email || "",

          name:
            user.name ||
            user.username,

          role:
            user.role ||
            "admin",

          tenantId:
            tenant._id.toString(),

          farmName:
            tenant.name,
        },

        tenant: {
          id:
            tenant._id.toString(),

          name:
            tenant.name,

          status:
            tenant.status,
        },
      });
    } catch (error) {
      console.error(
        "REGISTER ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        error:
          error.message ||
          "Unable to create farm account",
      });
    }
  }
);

// =========================================================
// LOGIN
// POST /api/auth/login
// =========================================================

router.post(
  "/login",
  async (req, res) => {
    try {
      const farmId =
        safeString(
          req.body?.farmId
        );

      const username =
        safeString(
          req.body?.username
        );

      const password =
        safeString(
          req.body?.password
        );

      // -----------------------------------------------------
      // VALIDATION
      // -----------------------------------------------------

      if (
        !farmId ||
        !username ||
        !password
      ) {
        return res.status(400).json({
          success: false,
          error:
            "Farm name, username and password are required",
        });
      }

      // -----------------------------------------------------
      // FIND TENANT
      // -----------------------------------------------------

      const tenant =
        await Tenant.findOne({
          name: new RegExp(
            `^${escapeRegex(
              farmId
            )}$`,
            "i"
          ),

          status: "Active",
        });

      if (!tenant) {
        return res.status(401).json({
          success: false,
          error:
            "Farm not found",
        });
      }

      // -----------------------------------------------------
      // FIND USER
      // -----------------------------------------------------

      const loginValue =
        safeLower(username);

      const user =
        tenant.users.find(
          (u) => {
            const storedUsername =
              safeLower(
                u?.username
              );

            const storedEmail =
              safeLower(
                u?.email
              );

            const storedPassword =
              safeString(
                u?.password
              );

            return (
              (
                storedUsername ===
                  loginValue ||
                storedEmail ===
                  loginValue
              ) &&
              storedPassword ===
                password
            );
          }
        );

      if (!user) {
        return res.status(401).json({
          success: false,
          error:
            "Invalid username or password",
        });
      }

      user.lastLoginAt = new Date();
      await tenant.save();

      // -----------------------------------------------------
      // CREATE JWT
      // -----------------------------------------------------

      const token =
        createToken({
          userId:
            user._id.toString(),

          tenantId:
            tenant._id.toString(),

          username:
            user.username,

          role:
            user.role ||
            "admin",
        });

      // -----------------------------------------------------
      // SET COOKIE
      // -----------------------------------------------------

      res.cookie(
        COOKIE_NAME,
        token,
        COOKIE_OPTIONS
      );

      // -----------------------------------------------------
      // DEBUG
      // -----------------------------------------------------

      console.log(
        "=========================================="
      );

      console.log(
        "LOGIN SUCCESS"
      );

      console.log(
        `USER      : ${user.username}`
      );

      console.log(
        `TENANT    : ${tenant._id}`
      );

      console.log(
        `COOKIE    : ${COOKIE_NAME}`
      );

      console.log(
        `TOKEN     : CREATED`
      );

      console.log(
        `NODE_ENV  : ${
          process.env.NODE_ENV ||
          "development"
        }`
      );

      console.log(
        `SECURE    : ${COOKIE_OPTIONS.secure}`
      );

      console.log(
        `SAMESITE  : ${COOKIE_OPTIONS.sameSite}`
      );

      console.log(
        "=========================================="
      );

      return res.json({
        success: true,

        message:
          "Login successful",

        user: {
          id:
            user._id.toString(),

          username:
            user.username,

          email:
            user.email || "",

          name:
            user.name ||
            user.username,

          role:
            user.role ||
            "admin",

          tenantId:
            tenant._id.toString(),

          farmName:
            tenant.name,
        },

        tenant: {
          id:
            tenant._id.toString(),

          name:
            tenant.name,

          status:
            tenant.status,
        },
      });
    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        error:
          error.message ||
          "Internal server error during authentication",
      });
    }
  }
);

// =========================================================
// CURRENT USER
// GET /api/auth/me
// =========================================================

router.get(
  "/me",
  async (req, res) => {
    try {
      console.log(
        "AUTH ME →",
        req.headers.cookie ||
          "NO COOKIE"
      );

      const token =
        req.cookies?.[
          COOKIE_NAME
        ];

      if (!token) {
        return res.status(401).json({
          success: false,
          error:
            "Not authenticated",
        });
      }

      let decoded;

      try {
        decoded =
          jwt.verify(
            token,
            JWT_SECRET
          );
      } catch (error) {
        console.error(
          "AUTH ME JWT ERROR:",
          error.message
        );

        return res.status(401).json({
          success: false,
          error:
            "Session expired. Please login again.",
        });
      }

      if (
        !decoded ||
        !decoded.userId ||
        !decoded.tenantId
      ) {
        return res.status(401).json({
          success: false,
          error:
            "Invalid authentication session",
        });
      }

      const tenant =
        await Tenant.findById(
          decoded.tenantId
        );

      if (
        !tenant ||
        tenant.status !==
          "Active"
      ) {
        return res.status(404).json({
          success: false,
          error:
            "Farm not found",
        });
      }

      const user =
        tenant.users.id(
          decoded.userId
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          error:
            "User not found",
        });
      }

      user.lastLoginAt = new Date();
      await tenant.save();

      return res.json({
        success: true,

        tenant: {
          id:
            tenant._id.toString(),

          name:
            tenant.name,

          status:
            tenant.status,
        },

        user: {
          id:
            user._id.toString(),

          username:
            user.username,

          email:
            user.email || "",

          name:
            user.name ||
            user.username,

          role:
            user.role ||
            "admin",

          tenantId:
            tenant._id.toString(),

          farmName:
            tenant.name,
        },
      });
    } catch (error) {
      console.error(
        "ME ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        error:
          error.message ||
          "Session check failed",
      });
    }
  }
);

// =========================================================
// LOGOUT
// POST /api/auth/logout
// =========================================================

router.post(
  "/logout",
  (req, res) => {
    res.clearCookie(
      COOKIE_NAME,
      {
        httpOnly: true,
        secure:
          COOKIE_OPTIONS.secure,
        sameSite:
          COOKIE_OPTIONS.sameSite,
        path: "/",
      }
    );

    console.log(
      "LOGOUT → COOKIE CLEARED"
    );

    return res.json({
      success: true,
      message:
        "Logged out successfully",
    });
  }
);

// =========================================================
// EXPORT
// =========================================================

export default router;