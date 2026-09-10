import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Owner from "../models/Owner.js";

const router = express.Router();

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "selsolve-development-secret";

const OWNER_COOKIE_NAME =
  "selsolve_owner_token";

/* =========================================================
   OWNER LOGIN
   POST /api/owner/auth/login
========================================================= */

router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        username,
        password,
      } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message:
            "Username and password are required.",
        });
      }

      const loginValue = String(username)
        .trim()
        .toLowerCase();

      const owner =
        await Owner.findOne({
          $or: [
            { username: loginValue },
            { email: loginValue },
          ],
        });

      if (!owner) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid username or password.",
        });
      }

      if (owner.status !== "Active") {
        return res.status(403).json({
          success: false,
          message:
            "Owner account is inactive.",
        });
      }

      const passwordMatch =
        await bcrypt.compare(
          String(password).trim(),
          owner.password
        );

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid username or password.",
        });
      }

      const token = jwt.sign(
        {
          ownerId: String(owner._id),
          username: owner.username,
          role: "owner",
        },
        JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.cookie(
        OWNER_COOKIE_NAME,
        token,
        {
          httpOnly: true,

          secure:
            process.env.NODE_ENV ===
            "production",

          sameSite:
            process.env.NODE_ENV ===
            "production"
              ? "none"
              : "lax",

          maxAge:
            24 *
            60 *
            60 *
            1000,
        }
      );

      return res.json({
        success: true,

        message:
          "Owner login successful.",

        owner: {
          id: owner._id,
          username: owner.username,
          email: owner.email,
          name: owner.name,
          role: "owner",
        },
      });
    } catch (error) {
      console.error(
        "OWNER LOGIN ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Owner login failed.",
      });
    }
  }
);


/* =========================================================
   OWNER ME
   GET /api/owner/auth/me
========================================================= */

router.get(
  "/me",
  async (req, res) => {
    try {
      const token =
        req.cookies?.[
          OWNER_COOKIE_NAME
        ];

      if (!token) {
        return res.status(401).json({
          success: false,
          message:
            "Owner authentication required.",
        });
      }

      const decoded =
        jwt.verify(
          token,
          JWT_SECRET
        );

      if (
        decoded.role !==
        "owner"
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Owner access required.",
        });
      }

      const owner =
        await Owner.findById(
          decoded.ownerId
        ).select(
          "_id username email name role status"
        );

      if (!owner) {
        return res.status(401).json({
          success: false,
          message:
            "Owner account not found.",
        });
      }

      if (
        owner.status !==
        "Active"
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Owner account is inactive.",
        });
      }

      return res.json({
        success: true,

        owner: {
          id: owner._id,
          username: owner.username,
          email: owner.email,
          name: owner.name,
          role: "owner",
        },
      });
    } catch (error) {
      console.error(
        "OWNER ME ERROR:",
        error
      );

      return res.status(401).json({
        success: false,
        message:
          "Owner authentication failed.",
      });
    }
  }
);


/* =========================================================
   CHANGE OWNER PASSWORD
   PUT /api/owner/auth/settings/password
========================================================= */

router.put(
  "/settings/password",
  async (req, res) => {
    try {
      /* -----------------------------------------
         Get owner token
      ----------------------------------------- */

      const token =
        req.cookies?.[
          OWNER_COOKIE_NAME
        ];

      if (!token) {
        return res.status(401).json({
          success: false,
          message:
            "Owner authentication required.",
        });
      }


      /* -----------------------------------------
         Verify JWT
      ----------------------------------------- */

      const decoded =
        jwt.verify(
          token,
          JWT_SECRET
        );

      if (
        decoded.role !==
        "owner"
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Owner access required.",
        });
      }


      /* -----------------------------------------
         Find owner
      ----------------------------------------- */

      const owner =
        await Owner.findById(
          decoded.ownerId
        );

      if (!owner) {
        return res.status(404).json({
          success: false,
          message:
            "Owner account not found.",
        });
      }


      /* -----------------------------------------
         Get passwords
      ----------------------------------------- */

      const currentPassword =
        String(
          req.body?.currentPassword ||
            ""
        ).trim();

      const newPassword =
        String(
          req.body?.newPassword ||
            ""
        ).trim();


      /* -----------------------------------------
         Required validation
      ----------------------------------------- */

      if (
        !currentPassword ||
        !newPassword
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Current password and new password are required.",
        });
      }


      /* -----------------------------------------
         Password length
      ----------------------------------------- */

      if (
        newPassword.length < 8
      ) {
        return res.status(400).json({
          success: false,
          message:
            "New password must be at least 8 characters.",
        });
      }


      /* -----------------------------------------
         Verify current password
      ----------------------------------------- */

      const passwordMatch =
        await bcrypt.compare(
          currentPassword,
          owner.password
        );

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message:
            "Current password is incorrect.",
        });
      }


      /* -----------------------------------------
         Prevent same password
      ----------------------------------------- */

      const samePassword =
        await bcrypt.compare(
          newPassword,
          owner.password
        );

      if (samePassword) {
        return res.status(400).json({
          success: false,
          message:
            "New password must be different from your current password.",
        });
      }


      /* -----------------------------------------
         Hash new password
      ----------------------------------------- */

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          12
        );

      owner.password =
        hashedPassword;


      /* -----------------------------------------
         Save owner
      ----------------------------------------- */

      await owner.save();


      /* -----------------------------------------
         Success
      ----------------------------------------- */

      return res.json({
        success: true,
        message:
          "Password changed successfully.",
      });
    } catch (error) {
      console.error(
        "OWNER PASSWORD CHANGE ERROR:",
        error
      );

      return res.status(401).json({
        success: false,
        message:
          "Unable to change password.",
      });
    }
  }
);


/* =========================================================
   OWNER LOGOUT
   POST /api/owner/auth/logout
========================================================= */

router.post(
  "/logout",
  (req, res) => {
    res.clearCookie(
      OWNER_COOKIE_NAME,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:
          process.env.NODE_ENV ===
          "production"
            ? "none"
            : "lax",
      }
    );

    return res.json({
      success: true,

      message:
        "Owner logged out successfully.",
    });
  }
);
/* =========================================================
   TEMP OWNER PASSWORD RESET
   POST /api/owner/auth/reset-owner
   Remove this route after successful reset.
========================================================= */

router.post(
  "/reset-owner",
  async (req, res) => {
    try {
      const resetKey =
        req.headers["x-owner-reset-key"];

      if (
        !process.env.OWNER_RESET_KEY ||
        resetKey !== process.env.OWNER_RESET_KEY
      ) {
        return res.status(403).json({
          success: false,
          message: "Invalid reset key.",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          "Owner@123",
          12
        );

      const owner =
        await Owner.findOneAndUpdate(
          { username: "owner" },
          {
            $set: {
              password: hashedPassword,
              email: "owner@selsolve.com",
              name: "SelSolve Owner",
              role: "owner",
              status: "Active",
            },
          },
          {
            new: true,
          }
        );

      if (!owner) {
        return res.status(404).json({
          success: false,
          message: "Owner account not found.",
        });
      }

      return res.json({
        success: true,
        message: "Owner password reset successfully.",
      });
    } catch (error) {
      console.error(
        "OWNER RESET ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Owner reset failed.",
      });
    }
  }
);

export default router;
