import express from "express";

import Goat from "../models/Goat.js";
import Weight from "../models/Weight.js";
import Event from "../models/Event.js";
import Sale from "../models/Sale.js";

import { requireFarmAccess as requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   GET DASHBOARD STATS
   - Login required
   - Uses logged-in user's tenant
   - NO DEMO DATA
   - Reads only real MongoDB data
========================================================= */

router.get("/stats", requireAuth, async (req, res) => {
  try {
    /* =====================================================
       AUTHENTICATED TENANT
    ===================================================== */

    const tenantId = req.user.tenantId;

    console.log(
      `DASHBOARD → USER: ${
        req.user.username || req.user.userId
      } | TENANT: ${tenantId}`
    );

    if (!tenantId) {
      return res.status(400).json({
        success: false,
        error: "Tenant ID is missing from login session.",
      });
    }

    /* =====================================================
       GOAT COUNTS
    ===================================================== */

    const totalGoats = await Goat.countDocuments({
      tenantId,
    });

    const activeGoats = await Goat.countDocuments({
      tenantId,
      status: "Active",
    });

    const soldGoats = await Goat.countDocuments({
      tenantId,
      status: "Sold",
    });

    const archivedGoats = await Goat.countDocuments({
      tenantId,
      status: "Archived",
    });

    const deadGoats = await Goat.countDocuments({
      tenantId,
      status: "Dead",
    });

    /* =====================================================
       ACTIVE GOAT WEIGHT
    ===================================================== */

    const activeGoatsList = await Goat.find(
      {
        tenantId,
        status: "Active",
      },
      "currentWeight breed gender name tagNumber"
    ).lean();

    const totalWeight = Number(
      activeGoatsList
        .reduce(
          (sum, goat) =>
            sum + (Number(goat.currentWeight) || 0),
          0
        )
        .toFixed(2)
    );

    const averageWeight =
      activeGoats > 0
        ? Number(
            (totalWeight / activeGoats).toFixed(2)
          )
        : 0;

    /* =====================================================
       SALES
    ===================================================== */

    const allSales = await Sale.find(
      {
        tenantId,
        type: "Sale",
        status: "Paid",
      },
      "amount"
    ).lean();

    const totalSales = Number(
      allSales
        .reduce(
          (sum, sale) =>
            sum + (Number(sale.amount) || 0),
          0
        )
        .toFixed(2)
    );

    /* =====================================================
       RECENT WEIGHTS
    ===================================================== */

    const recentWeightRecords = await Weight.find({
      tenantId,
    })
      .sort({
        recordedAt: -1,
        createdAt: -1,
      })
      .limit(5)
      .lean();

    /* =====================================================
       RECENT EVENTS
    ===================================================== */

    const recentActivities = await Event.find({
      tenantId,
    })
      .sort({
        eventDate: -1,
        createdAt: -1,
      })
      .limit(5)
      .lean();

    /* =====================================================
       RECENT SALES
    ===================================================== */

    const recentSales = await Sale.find({
      tenantId,
    })
      .sort({
        saleDate: -1,
        createdAt: -1,
      })
      .limit(5)
      .lean();

    /* =====================================================
       BREED BREAKDOWN
    ===================================================== */

    const breedBreakdown = {};

    activeGoatsList.forEach((goat) => {
      const breed = goat.breed || "Unknown";

      breedBreakdown[breed] =
        (breedBreakdown[breed] || 0) + 1;
    });

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.json({
      success: true,

      cards: {
        totalGoats,
        activeGoats,
        soldGoats,
        archivedGoats,
        deadGoats,
        totalWeight,
        averageWeight,
        totalSales,
      },

      breedBreakdown,

      recentActivities,

      recentWeightRecords,

      recentSales,

      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      "ERROR COMPUTING DASHBOARD STATS:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        "Unable to retrieve dashboard statistics.",
      details:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
});

export default router;