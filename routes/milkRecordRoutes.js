
import express from "express";
import mongoose from "mongoose";

import { requireFarmAccess as requireAuth } from "../middleware/authMiddleware.js";
import MilkRecord from "../models/MilkRecord.js";

const router = express.Router();
const MILKING_SESSIONS = new Set([
  "Morning",
  "Afternoon",
  "Evening",
]);

/* =========================================================
   DEFAULT TENANT
========================================================= */


/* =========================================================
   HELPER
========================================================= */

function getTenantId(req) {
  if (!req.user?.tenantId) {
    throw new Error("Tenant context missing");
  }

  return req.user.tenantId;
}

router.use(requireAuth);

/* =========================================================
   GET ALL MILK RECORDS
   GET /api/milk-records
========================================================= */

router.get("/", async (req, res) => {
  try {
    const tenantId = getTenantId(req);

    const {
      goatId,
      date,
      session,
    } = req.query;

    const query = {
      tenantId,
    };

    /* ---------- Optional Goat Filter ---------- */

    if (goatId) {
      query.goatId = String(goatId);
    }

    /* ---------- Optional Date Filter ---------- */

    if (date) {
      query.date = date;
    }

    /* ---------- Optional Session Filter ---------- */

    if (session) {
      query.session = session;
    }

    const records = await MilkRecord.find(query)
      .sort({
        date: -1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
      records,
    });
  } catch (error) {
    console.error(
      "GET MILK RECORDS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch milk records",
      error: error.message,
    });
  }
});

/* =========================================================
   GET SINGLE MILK RECORD
   GET /api/milk-records/:id
========================================================= */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid milk record ID",
      });
    }

    const tenantId = getTenantId(req);

    const record = await MilkRecord.findOne({
      _id: id,
      tenantId,
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Milk record not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error(
      "GET SINGLE MILK RECORD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch milk record",
      error: error.message,
    });
  }
});

/* =========================================================
   CREATE MILK RECORD
   POST /api/milk-records
========================================================= */

router.post("/", async (req, res) => {
  try {
    const tenantId = getTenantId(req);

    const {
      goatId,
      goatName,
      goatTagNumber,
      date,
      session,
      quantity,
      unit,
      fat,
      snf,
      notes,
    } = req.body;

    if (
      session !== undefined &&
      !MILKING_SESSIONS.has(String(session))
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Session must be Morning, Afternoon, or Evening",
      });
    }

    /* ---------- Required Goat ---------- */

    if (
      goatId === undefined ||
      goatId === null ||
      String(goatId).trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Goat ID is required",
      });
    }

    /* ---------- Required Quantity ---------- */

    if (
      quantity === undefined ||
      quantity === null ||
      quantity === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Milk quantity is required",
      });
    }

    const numericQuantity = Number(quantity);

    if (
      Number.isNaN(numericQuantity) ||
      numericQuantity < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid milk quantity",
      });
    }

    /* ---------- Fat ---------- */

    let numericFat = null;

    if (
      fat !== undefined &&
      fat !== null &&
      fat !== ""
    ) {
      numericFat = Number(fat);

      if (
        Number.isNaN(numericFat) ||
        numericFat < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid fat value",
        });
      }
    }

    /* ---------- SNF ---------- */

    let numericSnf = null;

    if (
      snf !== undefined &&
      snf !== null &&
      snf !== ""
    ) {
      numericSnf = Number(snf);

      if (
        Number.isNaN(numericSnf) ||
        numericSnf < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid SNF value",
        });
      }
    }

    /* ---------- Create ---------- */

    const record = await MilkRecord.create({
      tenantId,

      goatId: String(goatId).trim(),

      goatName:
        goatName !== undefined
          ? String(goatName).trim()
          : "",

      goatTagNumber:
        goatTagNumber !== undefined
          ? String(goatTagNumber).trim()
          : "",

      date:
        date ||
        new Date(),

      session:
        session ||
        "Morning",

      quantity:
        numericQuantity,

      unit:
        unit ||
        "litre",

      fat:
        numericFat,

      snf:
        numericSnf,

      notes:
        notes !== undefined
          ? String(notes).trim()
          : "",
    });

    console.log(
      `MILK RECORD SAVED -> ${
        record.goatName || record.goatId
      } | ${
        record.quantity
      } ${
        record.unit
      } | FARM: ${tenantId}`
    );

    return res.status(201).json({
      success: true,
      message:
        "Milk record created successfully",
      data: record,
    });
  } catch (error) {
    console.error(
      "CREATE MILK RECORD ERROR:",
      error
    );

    return res.status(
      error.name === "ValidationError" ? 400 : 500
    ).json({
      success: false,
      message: "Failed to create milk record",
      error: error.message,
    });
  }
});

/* =========================================================
   UPDATE MILK RECORD
   PUT /api/milk-records/:id
========================================================= */

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid milk record ID",
      });
    }

    const tenantId = getTenantId(req);

    const record =
      await MilkRecord.findOne({
        _id: id,
        tenantId,
      });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Milk record not found",
      });
    }

    const {
      goatId,
      goatName,
      goatTagNumber,
      date,
      session,
      quantity,
      unit,
      fat,
      snf,
      notes,
    } = req.body;

    /* ---------- Goat ---------- */

    if (goatId !== undefined) {
      if (
        goatId === null ||
        String(goatId).trim() === ""
      ) {
        return res.status(400).json({
          success: false,
          message: "Goat ID is required",
        });
      }

      record.goatId =
        String(goatId).trim();
    }

    /* ---------- Goat Name ---------- */

    if (goatName !== undefined) {
      record.goatName =
        String(goatName).trim();
    }

    /* ---------- Goat Tag ---------- */

    if (goatTagNumber !== undefined) {
      record.goatTagNumber =
        String(goatTagNumber).trim();
    }

    /* ---------- Date ---------- */

    if (date !== undefined) {
      record.date = date;
    }

    /* ---------- Session ---------- */

    if (session !== undefined) {
      if (!MILKING_SESSIONS.has(String(session))) {
        return res.status(400).json({
          success: false,
          message:
            "Session must be Morning, Afternoon, or Evening",
        });
      }

      record.session = session;
    }

    /* ---------- Quantity ---------- */

    if (quantity !== undefined) {
      const numericQuantity =
        Number(quantity);

      if (
        Number.isNaN(numericQuantity) ||
        numericQuantity < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid milk quantity",
        });
      }

      record.quantity =
        numericQuantity;
    }

    /* ---------- Unit ---------- */

    if (unit !== undefined) {
      record.unit = unit;
    }

    /* ---------- Fat ---------- */

    if (fat !== undefined) {
      if (
        fat === null ||
        fat === ""
      ) {
        record.fat = null;
      } else {
        const numericFat =
          Number(fat);

        if (
          Number.isNaN(numericFat) ||
          numericFat < 0
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid fat value",
          });
        }

        record.fat =
          numericFat;
      }
    }

    /* ---------- SNF ---------- */

    if (snf !== undefined) {
      if (
        snf === null ||
        snf === ""
      ) {
        record.snf = null;
      } else {
        const numericSnf =
          Number(snf);

        if (
          Number.isNaN(numericSnf) ||
          numericSnf < 0
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid SNF value",
          });
        }

        record.snf =
          numericSnf;
      }
    }

    /* ---------- Notes ---------- */

    if (notes !== undefined) {
      record.notes =
        String(notes).trim();
    }

    await record.save();

    console.log(
      `MILK RECORD UPDATED -> ${record._id} | FARM: ${tenantId}`
    );

    return res.status(200).json({
      success: true,
      message:
        "Milk record updated successfully",
      data: record,
    });
  } catch (error) {
    console.error(
      "UPDATE MILK RECORD ERROR:",
      error
    );

    return res.status(
      error.name === "ValidationError" ? 400 : 500
    ).json({
      success: false,
      message: "Failed to update milk record",
      error: error.message,
    });
  }
});

/* =========================================================
   DELETE MILK RECORD
   DELETE /api/milk-records/:id
========================================================= */

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid milk record ID",
      });
    }

    const tenantId = getTenantId(req);

    const record =
      await MilkRecord.findOne({
        _id: id,
        tenantId,
      });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Milk record not found",
      });
    }

    await MilkRecord.deleteOne({
      _id: id,
      tenantId,
    });

    console.log(
      `MILK RECORD DELETED -> ${id} | FARM: ${tenantId}`
    );

    return res.status(200).json({
      success: true,
      message:
        "Milk record deleted successfully",
      data: record,
    });
  } catch (error) {
    console.error(
      "DELETE MILK RECORD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete milk record",
      error: error.message,
    });
  }
});

/* =========================================================
   EXPORT
========================================================= */

export default router;
