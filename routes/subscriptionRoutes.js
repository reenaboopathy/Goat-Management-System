import express from "express";

import Tenant from "../models/Tenant.js";
import PaymentRequest from "../models/PaymentRequest.js";

import {
  requireAuth,
  requireOwner,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   PLAN PRICES
========================================================= */

const PLAN_PRICES = {
  monthly: 350,
  yearly: 2500,
};

/* =========================================================
   HELPER
   AUTOMATIC SUBSCRIPTION STATUS
========================================================= */

const getAutomaticStatus = (
  subscription,
  currentStatus
) => {
  if (!subscription?.endDate) {
    return currentStatus || "Active";
  }

  // Manual statuses should not be changed automatically
  if (
    currentStatus === "Cancelled" ||
    currentStatus === "Suspended"
  ) {
    return currentStatus;
  }

  const today = new Date();
  const endDate = new Date(subscription.endDate);

  if (Number.isNaN(endDate.getTime())) {
    return currentStatus || "Active";
  }

  // Compare date only
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  if (endDate < today) {
    return "Expired";
  }

  return "Active";
};

/* =========================================================
   CREATE PAYMENT REQUEST
   POST /api/subscriptions/payment-request

   USER ONLY
========================================================= */

router.post(
  "/payment-request",
  requireAuth,
  async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required.",
        });
      }

      const {
        plan,
        amount,
        paymentMethod,
        paymentReceiver,
      } = req.body;

      /* -------------------------------------------------------
         VALIDATE PLAN
      ------------------------------------------------------- */

      if (
        !plan ||
        !Object.prototype.hasOwnProperty.call(
          PLAN_PRICES,
          plan
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid subscription plan.",
        });
      }

      /* -------------------------------------------------------
         SERVER SIDE PRICE VALIDATION
      ------------------------------------------------------- */

      const expectedAmount = PLAN_PRICES[plan];

      if (Number(amount) !== expectedAmount) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid payment amount for selected plan.",
        });
      }

      /* -------------------------------------------------------
         GET TENANT ID
      ------------------------------------------------------- */

      const tenantId =
        user.tenantId ||
        user.tenant ||
        user.tenant?._id;

      if (!tenantId) {
        return res.status(400).json({
          success: false,
          message:
            "Tenant information not found.",
        });
      }

      /* -------------------------------------------------------
         FIND TENANT
      ------------------------------------------------------- */

      const tenant = await Tenant.findById(tenantId);

      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: "Tenant not found.",
        });
      }

      /* -------------------------------------------------------
         CHECK EXISTING PENDING REQUEST
      ------------------------------------------------------- */

      const existingPending =
        await PaymentRequest.findOne({
          tenantId,
          status: "pending",
        });

      if (existingPending) {
        return res.status(409).json({
          success: false,
          message:
            "You already have a payment waiting for verification.",
          paymentRequest: {
            id: existingPending._id,
            plan: existingPending.plan,
            amount: existingPending.amount,
            status: existingPending.status,
            createdAt: existingPending.createdAt,
          },
        });
      }

      /* -------------------------------------------------------
         CREATE PAYMENT REQUEST
      ------------------------------------------------------- */

      const paymentRequest =
        await PaymentRequest.create({
          tenantId,

          plan,

          amount: expectedAmount,

          paymentMethod:
            paymentMethod === "BANK_TRANSFER"
              ? "BANK_TRANSFER"
              : "UPI",

          paymentReceiver:
            paymentReceiver || "",

          status: "pending",
        });

      console.log(
        `PAYMENT REQUEST CREATED → ${tenant.name} | ${plan} | ₹${expectedAmount}`
      );

      return res.status(201).json({
        success: true,

        message:
          "Payment request submitted successfully.",

        paymentRequest: {
          id: paymentRequest._id,
          plan: paymentRequest.plan,
          amount: paymentRequest.amount,
          status: paymentRequest.status,
          createdAt: paymentRequest.createdAt,
        },
      });
    } catch (error) {
      console.error(
        "CREATE PAYMENT REQUEST ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to submit payment request.",
      });
    }
  }
);

/* =========================================================
   OWNER ONLY
========================================================= */

router.use(requireOwner);

/* =========================================================
   GET PAYMENT REQUESTS
   IMPORTANT:
   Keep this BEFORE /:tenantId
========================================================= */

router.get(
  "/payment-requests/list",
  async (req, res) => {
    try {
      const requests =
        await PaymentRequest.find({})
          .populate(
            "tenantId",
            "name status"
          )
          .sort({
            createdAt: -1,
          })
          .lean();

      const formatted = requests.map(
        (request) => ({
          id: request._id,

          tenantId:
            request.tenantId?._id,

          tenantName:
            request.tenantId?.name ||
            "Unknown Tenant",

          tenantStatus:
            request.tenantId?.status ||
            "",

          plan: request.plan,

          amount: request.amount,

          paymentMethod:
            request.paymentMethod,

          paymentReceiver:
            request.paymentReceiver,

          status: request.status,

          verifiedAt:
            request.verifiedAt,

          rejectedReason:
            request.rejectedReason,

          createdAt:
            request.createdAt,

          updatedAt:
            request.updatedAt,
        })
      );

      return res.status(200).json({
        success: true,
        paymentRequests: formatted,
      });
    } catch (error) {
      console.error(
        "GET PAYMENT REQUESTS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load payment requests.",
      });
    }
  }
);

/* =========================================================
   APPROVE PAYMENT
   PUT /api/subscriptions/payment-requests/:id/approve
========================================================= */

router.put(
  "/payment-requests/:id/approve",
  async (req, res) => {
    try {
      const paymentRequest =
        await PaymentRequest.findById(
          req.params.id
        );

      if (!paymentRequest) {
        return res.status(404).json({
          success: false,
          message:
            "Payment request not found.",
        });
      }

      if (
        paymentRequest.status !==
        "pending"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "This payment request has already been processed.",
        });
      }

      const tenant =
        await Tenant.findById(
          paymentRequest.tenantId
        );

      if (!tenant) {
        return res.status(404).json({
          success: false,
          message: "Tenant not found.",
        });
      }

      /* -------------------------------------------------------
         CALCULATE SUBSCRIPTION PERIOD
      ------------------------------------------------------- */

      const now = new Date();

      let startDate = now;

      /*
        If existing paid subscription is still active,
        extend from existing end date.
      */

      if (
        tenant.subscription?.status ===
          "Active" &&
        tenant.subscription?.endDate
      ) {
        const existingEnd =
          new Date(
            tenant.subscription.endDate
          );

        if (
          !Number.isNaN(
            existingEnd.getTime()
          ) &&
          existingEnd > now
        ) {
          startDate = existingEnd;
        }
      }

      const endDate =
        new Date(startDate);

      if (
        paymentRequest.plan ===
        "monthly"
      ) {
        endDate.setDate(
          endDate.getDate() + 30
        );
      }

      if (
        paymentRequest.plan ===
        "yearly"
      ) {
        endDate.setDate(
          endDate.getDate() + 365
        );
      }

      /* -------------------------------------------------------
         ACTIVATE SUBSCRIPTION
      ------------------------------------------------------- */

      tenant.subscription = {
        plan:
          paymentRequest.plan ===
          "monthly"
            ? "Basic"
            : "Pro",

        status: "Active",

        startDate,

        endDate,

        goatLimit:
          tenant.subscription?.goatLimit ??
          null,

        notes:
          `Payment verified. ${paymentRequest.plan} subscription.`,
      };

      /*
        IMPORTANT:
        We are ONLY updating tenant.subscription.

        We DO NOT delete:
        - goats
        - weights
        - events
        - sales
        - medical records
        - milk records
      */

      await tenant.save();

      /* -------------------------------------------------------
         UPDATE PAYMENT REQUEST
      ------------------------------------------------------- */

      paymentRequest.status =
        "approved";

      paymentRequest.verifiedAt =
        new Date();

      await paymentRequest.save();

      console.log(
        `PAYMENT APPROVED → ${tenant.name} | ${paymentRequest.plan} | ₹${paymentRequest.amount}`
      );

      return res.status(200).json({
        success: true,

        message:
          "Payment approved and subscription activated.",

        subscription:
          tenant.subscription,

        paymentRequest: {
          id:
            paymentRequest._id,

          status:
            paymentRequest.status,

          verifiedAt:
            paymentRequest.verifiedAt,
        },
      });
    } catch (error) {
      console.error(
        "APPROVE PAYMENT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to approve payment.",
      });
    }
  }
);

/* =========================================================
   REJECT PAYMENT
   PUT /api/subscriptions/payment-requests/:id/reject
========================================================= */

router.put(
  "/payment-requests/:id/reject",
  async (req, res) => {
    try {
      const {
        reason,
      } = req.body;

      const paymentRequest =
        await PaymentRequest.findById(
          req.params.id
        );

      if (!paymentRequest) {
        return res.status(404).json({
          success: false,
          message:
            "Payment request not found.",
        });
      }

      if (
        paymentRequest.status !==
        "pending"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "This payment request has already been processed.",
        });
      }

      paymentRequest.status =
        "rejected";

      paymentRequest.rejectedReason =
        reason
          ? String(reason)
          : "Payment could not be verified.";

      await paymentRequest.save();

      console.log(
        `PAYMENT REJECTED → ${paymentRequest._id}`
      );

      return res.status(200).json({
        success: true,

        message:
          "Payment request rejected.",

        paymentRequest: {
          id:
            paymentRequest._id,

          status:
            paymentRequest.status,

          rejectedReason:
            paymentRequest.rejectedReason,
        },
      });
    } catch (error) {
      console.error(
        "REJECT PAYMENT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to reject payment.",
      });
    }
  }
);

/* =========================================================
   GET ALL SUBSCRIPTIONS
   GET /api/subscriptions
========================================================= */

router.get(
  "/",
  async (req, res) => {
    try {
      const tenants =
        await Tenant.find({})
          .select(
            "_id name status subscription createdAt updatedAt"
          )
          .sort({
            createdAt: -1,
          });

      const subscriptions = [];

      for (const tenant of tenants) {
        const subscription =
          tenant.subscription;

        if (subscription) {
          const automaticStatus =
            getAutomaticStatus(
              subscription,
              subscription.status
            );

          if (
            automaticStatus !==
            subscription.status
          ) {
            tenant.subscription.status =
              automaticStatus;

            await tenant.save();
          }
        }

        subscriptions.push({
          tenantId: tenant._id,

          tenantName: tenant.name,

          tenantStatus:
            tenant.status,

          subscription:
            tenant.subscription ||
            null,

          createdAt:
            tenant.createdAt,

          updatedAt:
            tenant.updatedAt,
        });
      }

      return res.status(200).json({
        success: true,
        subscriptions,
      });
    } catch (error) {
      console.error(
        "GET SUBSCRIPTIONS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load subscriptions.",
      });
    }
  }
);

/* =========================================================
   GET SINGLE SUBSCRIPTION
   GET /api/subscriptions/:tenantId
========================================================= */

router.get(
  "/:tenantId",
  async (req, res) => {
    try {
      const tenant =
        await Tenant.findById(
          req.params.tenantId
        );

      if (!tenant) {
        return res.status(404).json({
          success: false,
          message:
            "Tenant not found.",
        });
      }

      if (tenant.subscription) {
        const automaticStatus =
          getAutomaticStatus(
            tenant.subscription,
            tenant.subscription.status
          );

        if (
          automaticStatus !==
          tenant.subscription.status
        ) {
          tenant.subscription.status =
            automaticStatus;

          await tenant.save();
        }
      }

      return res.status(200).json({
        success: true,

        tenant: {
          tenantId:
            tenant._id,

          tenantName:
            tenant.name,

          tenantStatus:
            tenant.status,

          subscription:
            tenant.subscription ||
            null,

          createdAt:
            tenant.createdAt,

          updatedAt:
            tenant.updatedAt,
        },
      });
    } catch (error) {
      console.error(
        "GET SUBSCRIPTION ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load subscription.",
      });
    }
  }
);

/* =========================================================
   UPDATE SUBSCRIPTION
   PUT /api/subscriptions/:tenantId

   USED BY:
   - Save Dates
   - Update Status
   - Update Plan
   - Update Goat Limit
   - Update Notes
========================================================= */

router.put(
  "/:tenantId",
  async (req, res) => {
    try {
      const tenantId =
        req.params.tenantId;

      const {
        plan,
        status,
        startDate,
        endDate,
        goatLimit,
        notes,
      } = req.body;

      console.log(
        "UPDATE SUBSCRIPTION REQUEST:",
        {
          tenantId,
          body: req.body,
        }
      );

      /* -------------------------------------------------------
         VALIDATE PLAN
      ------------------------------------------------------- */

      const allowedPlans = [
        "Trial",
        "Basic",
        "Pro",
        "Enterprise",
      ];

      if (
        plan !== undefined &&
        !allowedPlans.includes(plan)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid subscription plan.",
        });
      }

      /* -------------------------------------------------------
         VALIDATE STATUS
      ------------------------------------------------------- */

      const allowedStatuses = [
        "Active",
        "Expired",
        "Cancelled",
        "Suspended",
      ];

      if (
        status !== undefined &&
        !allowedStatuses.includes(status)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid subscription status.",
        });
      }

      /* -------------------------------------------------------
         VALIDATE GOAT LIMIT
      ------------------------------------------------------- */

      if (
        goatLimit !== undefined &&
        goatLimit !== null
      ) {
        const numericGoatLimit =
          Number(goatLimit);

        if (
          Number.isNaN(
            numericGoatLimit
          ) ||
          numericGoatLimit < 0
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid goat limit.",
          });
        }
      }

      /* -------------------------------------------------------
         FIND TENANT
      ------------------------------------------------------- */

      const tenant =
        await Tenant.findById(
          tenantId
        );

      if (!tenant) {
        return res.status(404).json({
          success: false,
          message:
            "Tenant not found.",
        });
      }

      /* -------------------------------------------------------
         EXISTING SUBSCRIPTION
      ------------------------------------------------------- */

      const existing =
        tenant.subscription
          ? tenant.subscription.toObject
            ? tenant.subscription.toObject()
            : tenant.subscription
          : {};

      /* -------------------------------------------------------
         FINAL START DATE
      ------------------------------------------------------- */

      const finalStartDate =
        startDate !== undefined
          ? startDate || null
          : existing.startDate ||
            null;

      /* -------------------------------------------------------
         FINAL END DATE
      ------------------------------------------------------- */

      const finalEndDate =
        endDate !== undefined
          ? endDate || null
          : existing.endDate ||
            null;

      /* -------------------------------------------------------
         DATE VALIDATION
      ------------------------------------------------------- */

      let parsedStartDate = null;
      let parsedEndDate = null;

      if (finalStartDate) {
        parsedStartDate =
          new Date(finalStartDate);

        if (
          Number.isNaN(
            parsedStartDate.getTime()
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid start date.",
          });
        }
      }

      if (finalEndDate) {
        parsedEndDate =
          new Date(finalEndDate);

        if (
          Number.isNaN(
            parsedEndDate.getTime()
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid end date.",
          });
        }
      }

      if (
        parsedStartDate &&
        parsedEndDate &&
        parsedEndDate < parsedStartDate
      ) {
        return res.status(400).json({
          success: false,
          message:
            "End date cannot be before start date.",
        });
      }

      /* -------------------------------------------------------
         DETERMINE STATUS
      ------------------------------------------------------- */

      let finalStatus =
        status !== undefined
          ? status
          : existing.status ||
            "Active";

      /*
        If owner did not manually provide status,
        automatically calculate from end date.
      */

      if (
        status === undefined &&
        finalEndDate
      ) {
        finalStatus =
          getAutomaticStatus(
            {
              endDate: finalEndDate,
            },
            existing.status
          );
      }

      /* -------------------------------------------------------
         BUILD UPDATED SUBSCRIPTION
      ------------------------------------------------------- */

      const updatedSubscription = {
        plan:
          plan !== undefined
            ? plan
            : existing.plan ||
              "Trial",

        status:
          finalStatus,

        startDate:
          finalStartDate,

        endDate:
          finalEndDate,

        goatLimit:
          goatLimit !== undefined
            ? goatLimit === null
              ? null
              : Number(goatLimit)
            : existing.goatLimit ??
              null,

        notes:
          notes !== undefined
            ? String(notes)
            : existing.notes ||
              "",
      };

      console.log(
        "SUBSCRIPTION TO SAVE:",
        updatedSubscription
      );

      /* -------------------------------------------------------
         SAVE
      ------------------------------------------------------- */

      tenant.subscription =
        updatedSubscription;

      await tenant.save();

      /* -------------------------------------------------------
         VERIFY SAVE
      ------------------------------------------------------- */

      const savedTenant =
        await Tenant.findById(
          tenantId
        ).select(
          "_id name status subscription"
        );

      console.log(
        "SUBSCRIPTION SAVED:",
        savedTenant?.subscription
      );

      return res.status(200).json({
        success: true,

        message:
          "Subscription updated successfully.",

        tenant: {
          tenantId:
            savedTenant._id,

          tenantName:
            savedTenant.name,

          tenantStatus:
            savedTenant.status,

          subscription:
            savedTenant.subscription,
        },
      });
    } catch (error) {
      console.error(
        "UPDATE SUBSCRIPTION ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error?.message ||
          "Failed to update subscription.",
      });
    }
  }
);

export default router;