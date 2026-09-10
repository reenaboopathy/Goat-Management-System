import jwt from "jsonwebtoken";
import Tenant from "../models/Tenant.js";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "selsolve-development-secret";

const COOKIE_NAME = "selsolve_token";

/* =========================================================
   HELPER
   DATE ONLY COMPARISON
========================================================= */

function parseDateOnly(value) {
  if (!value) return null;

  // HTML date format: YYYY-MM-DD
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    const [year, month, day] =
      value.split("-").map(Number);

    const date = new Date(
      year,
      month - 1,
      day
    );

    date.setHours(0, 0, 0, 0);

    return date;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  date.setHours(0, 0, 0, 0);

  return date;
}

/* =========================================================
   NORMAL USER AUTHENTICATION
========================================================= */

export function requireAuth(req, res, next) {
  try {
    const token =
      req.cookies?.[COOKIE_NAME];

    if (!token) {
      return res.status(401).json({
        success: false,
        code: "AUTH_REQUIRED",
        message:
          "Authentication required.",
      });
    }

    const decoded =
      jwt.verify(
        token,
        JWT_SECRET
      );

    req.user = {
      userId: String(
        decoded.userId || ""
      ),

      tenantId: String(
        decoded.tenantId || ""
      ),

      username:
        decoded.username
          ? String(
              decoded.username
            )
          : "",

      role:
        decoded.role
          ? String(
              decoded.role
            )
          : "admin",
    };

    if (!req.user.userId) {
      return res.status(401).json({
        success: false,
        code: "INVALID_TOKEN",
        message:
          "Invalid authentication token.",
      });
    }

    if (!req.user.tenantId) {
      return res.status(401).json({
        success: false,
        code: "TENANT_NOT_FOUND",
        message:
          "Tenant information not found.",
      });
    }

    return next();
  } catch (error) {
    console.error(
      "AUTH MIDDLEWARE ERROR:",
      error.message
    );

    return res.status(401).json({
      success: false,
      code: "AUTH_FAILED",
      message:
        "Authentication failed.",
    });
  }
}

/* =========================================================
   FARM ACCESS
   AUTHENTICATION + SUBSCRIPTION CHECK
========================================================= */

export async function requireFarmAccess(
  req,
  res,
  next
) {
  return requireAuth(
    req,
    res,
    async () => {
      try {
        /* ---------------------------------------------------
           FIND TENANT
        --------------------------------------------------- */

        const tenant =
          await Tenant.findById(
            req.user.tenantId
          )
            .select(
              "_id status subscription"
            )
            .lean();

        if (!tenant) {
          console.log(
            "FARM ACCESS → TENANT NOT FOUND:",
            req.user.tenantId
          );

          return res.status(404).json({
            success: false,
            code:
              "TENANT_NOT_FOUND",
            message:
              "Tenant not found.",
          });
        }

        const subscription =
          tenant.subscription;

        console.log(
          "SUBSCRIPTION DEBUG:",
          {
            tenantId:
              req.user.tenantId,

            tenantStatus:
              tenant.status,

            subscription:
              subscription,
          }
        );

        /* ---------------------------------------------------
           TENANT STATUS
        --------------------------------------------------- */

        if (
          tenant.status !==
          "Active"
        ) {
          console.log(
            "FARM ACCESS BLOCKED → TENANT INACTIVE:",
            tenant.status
          );

          return res.status(402).json({
            success: false,
            code:
              "TENANT_INACTIVE",
            message:
              "Your farm account is inactive. Please contact the owner.",
          });
        }

        /* ---------------------------------------------------
           NO SUBSCRIPTION
        --------------------------------------------------- */

        if (!subscription) {
          console.log(
            "FARM ACCESS BLOCKED → NO SUBSCRIPTION"
          );

          return res.status(402).json({
            success: false,
            code:
              "SUBSCRIPTION_REQUIRED",
            message:
              "Please activate your SelSolve subscription.",
          });
        }

        /* ---------------------------------------------------
           SUBSCRIPTION STATUS
        --------------------------------------------------- */

        let subscriptionStatus =
          String(
            subscription.status ||
              ""
          ).trim();

        console.log(
          "SUBSCRIPTION STATUS:",
          subscriptionStatus
        );

        /* ---------------------------------------------------
           START DATE
        --------------------------------------------------- */

        const startDate =
          parseDateOnly(
            subscription.startDate
          );

        /* ---------------------------------------------------
           END DATE
        --------------------------------------------------- */

        const endDate =
          parseDateOnly(
            subscription.endDate
          );

        console.log(
          "SUBSCRIPTION DATE CHECK:",
          {
            startDate:
              startDate
                ? startDate.toISOString()
                : null,

            endDate:
              endDate
                ? endDate.toISOString()
                : null,
          }
        );

        /* ---------------------------------------------------
           INVALID END DATE
        --------------------------------------------------- */

        if (!endDate) {
          console.log(
            "FARM ACCESS BLOCKED → INVALID END DATE"
          );

          return res.status(402).json({
            success: false,
            code:
              "SUBSCRIPTION_INVALID",
            message:
              "Your subscription does not have a valid expiry date.",
          });
        }

        /* ---------------------------------------------------
           TODAY
        --------------------------------------------------- */

        const today =
          new Date();

        today.setHours(
          0,
          0,
          0,
          0
        );

        /* ---------------------------------------------------
           START DATE NOT REACHED

           Example:
           Start = 10 Sep
           Today = 7 Sep

           Block access until start date.
        --------------------------------------------------- */

        if (
          startDate &&
          today < startDate
        ) {
          console.log(
            "FARM ACCESS BLOCKED → SUBSCRIPTION NOT STARTED YET"
          );

          return res.status(402).json({
            success: false,
            code:
              "SUBSCRIPTION_NOT_STARTED",
            message:
              "Your subscription has not started yet.",
            startDate,
          });
        }

        /* ---------------------------------------------------
           EXPIRED CHECK

           IMPORTANT:

           End date = today
           → still Active for today

           End date < today
           → Expired
        --------------------------------------------------- */

        if (
          endDate < today
        ) {
          console.log(
            "FARM ACCESS BLOCKED → SUBSCRIPTION EXPIRED:",
            endDate.toISOString()
          );

          /* -----------------------------------------------
             UPDATE DATABASE STATUS
          ----------------------------------------------- */

          await Tenant.updateOne(
            {
              _id:
                req.user.tenantId,
            },
            {
              $set: {
                "subscription.status":
                  "Expired",
              },
            }
          );

          return res.status(402).json({
            success: false,
            code:
              "SUBSCRIPTION_EXPIRED",
            message:
              "Your subscription has expired. Please renew your subscription to continue.",
            endDate,
          });
        }

        /* ---------------------------------------------------
           HANDLE MANUALLY EXPIRED STATUS

           If database says Expired but date is still valid,
           allow access only if owner/admin accidentally left
           wrong status? Better to correct it automatically.
        --------------------------------------------------- */

        if (
          subscriptionStatus ===
          "Expired"
        ) {
          console.log(
            "SUBSCRIPTION STATUS CORRECTED → ACTIVE"
          );

          await Tenant.updateOne(
            {
              _id:
                req.user.tenantId,
            },
            {
              $set: {
                "subscription.status":
                  "Active",
              },
            }
          );

          subscriptionStatus =
            "Active";
        }

        /* ---------------------------------------------------
           INVALID STATUS
        --------------------------------------------------- */

        const allowedStatuses = [
          "Active",
          "Trial",
        ];

        if (
          !allowedStatuses.includes(
            subscriptionStatus
          )
        ) {
          console.log(
            "FARM ACCESS BLOCKED → INVALID STATUS:",
            subscriptionStatus
          );

          return res.status(402).json({
            success: false,
            code:
              "SUBSCRIPTION_REQUIRED",
            message:
              "Your subscription is not active. Please renew or contact the owner.",
          });
        }

        /* ---------------------------------------------------
           REMAINING DAYS
        --------------------------------------------------- */

        const remainingMs =
          endDate.getTime() -
          today.getTime();

        const remainingDays =
          Math.max(
            1,
            Math.ceil(
              remainingMs /
                (1000 *
                  60 *
                  60 *
                  24)
            )
          );

        /* ---------------------------------------------------
           TRIAL ACCESS
        --------------------------------------------------- */

        if (
          subscriptionStatus ===
          "Trial"
        ) {
          console.log(
            `FARM ACCESS → TRIAL ACTIVE (${remainingDays} days remaining)`
          );

          req.subscription = {
            status: "Trial",

            isTrial: true,

            endDate,

            remainingDays,
          };

          return next();
        }

        /* ---------------------------------------------------
           PAID ACTIVE SUBSCRIPTION
        --------------------------------------------------- */

        if (
          subscriptionStatus ===
          "Active"
        ) {
          console.log(
            `FARM ACCESS → ACTIVE SUBSCRIPTION (${remainingDays} days remaining)`
          );

          req.subscription = {
            status: "Active",

            isTrial: false,

            endDate,

            remainingDays,
          };

          return next();
        }

        /* ---------------------------------------------------
           FALLBACK
        --------------------------------------------------- */

        console.log(
          "FARM ACCESS BLOCKED → FALLBACK"
        );

        return res.status(402).json({
          success: false,
          code:
            "SUBSCRIPTION_REQUIRED",
          message:
            "Please activate your SelSolve subscription.",
        });
      } catch (error) {
        console.error(
          "FARM ACCESS CHECK ERROR:",
          error
        );

        return res.status(500).json({
          success: false,
          code:
            "SUBSCRIPTION_CHECK_FAILED",
          message:
            "Unable to verify subscription access.",
        });
      }
    }
  );
}

/* =========================================================
   OWNER AUTHENTICATION
========================================================= */

export function requireOwner(
  req,
  res,
  next
) {
  try {
    const token =
      req.cookies?.[
        "selsolve_owner_token"
      ];

    if (!token) {
      return res.status(401).json({
        success: false,
        code:
          "OWNER_AUTH_REQUIRED",
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
        code:
          "OWNER_ACCESS_REQUIRED",
        message:
          "Owner access required.",
      });
    }

    req.owner = {
      ownerId: String(
        decoded.ownerId || ""
      ),

      username:
        decoded.username
          ? String(
              decoded.username
            )
          : "",

      role: "owner",
    };

    if (!req.owner.ownerId) {
      return res.status(401).json({
        success: false,
        code:
          "INVALID_OWNER_TOKEN",
        message:
          "Invalid owner authentication.",
      });
    }

    return next();
  } catch (error) {
    console.error(
      "OWNER AUTH MIDDLEWARE ERROR:",
      error.message
    );

    return res.status(401).json({
      success: false,
      code:
        "OWNER_AUTH_FAILED",
      message:
        "Owner authentication failed.",
    });
  }
}

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default requireAuth;