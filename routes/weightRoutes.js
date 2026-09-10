import express from "express";
import mongoose from "mongoose";

import Weight from "../models/Weight.js";
import Goat from "../models/Goat.js";

import {
  requireFarmAccess,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   FARM ACCESS
========================================================= */

router.use(requireFarmAccess);

/* =========================================================
   TENANT HELPER
========================================================= */

function getTenantId(req) {
  const tenantId = req.user?.tenantId;

  if (!tenantId) {
    throw new Error("Tenant context missing");
  }

  if (!mongoose.Types.ObjectId.isValid(tenantId)) {
    throw new Error("Invalid tenant context");
  }

  return tenantId;
}

/* =========================================================
   SOURCE HELPER

   Frontend may send "Bluetooth Scale".
   MongoDB schema only accepts "USB_Serial".
========================================================= */

function normalizeSource(source) {
  if (source === "Bluetooth Scale") {
    return "USB_Serial";
  }

  if (source === "USB_Serial") {
    return "USB_Serial";
  }

  if (source === "ESP32_Scale") {
    return "ESP32_Scale";
  }

  return "Manual";
}

/* =========================================================
   GET ALL WEIGHTS
   GET /api/weights
========================================================= */

router.get("/", async (req, res) => {
  try {
    const tenantId = getTenantId(req);

    const {
      goatId,
      goatTagNumber,
      startDate,
      endDate,
    } = req.query;

    const query = {
      tenantId,
    };

    /* ---------- Goat Filter ---------- */

    if (goatId) {
      if (!mongoose.Types.ObjectId.isValid(goatId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid goat ID",
        });
      }

      query.goatId = goatId;
    }

    /* ---------- Tag Filter ---------- */

    if (goatTagNumber) {
      query.goatTagNumber = String(
        goatTagNumber
      ).trim();
    }

    /* ---------- Date Filter ---------- */

    if (startDate || endDate) {
      query.recordedAt = {};

      if (startDate) {
        const start = new Date(startDate);

        if (Number.isNaN(start.getTime())) {
          return res.status(400).json({
            success: false,
            error: "Invalid start date",
          });
        }

        start.setHours(0, 0, 0, 0);

        query.recordedAt.$gte = start;
      }

      if (endDate) {
        const end = new Date(endDate);

        if (Number.isNaN(end.getTime())) {
          return res.status(400).json({
            success: false,
            error: "Invalid end date",
          });
        }

        end.setHours(23, 59, 59, 999);

        query.recordedAt.$lte = end;
      }
    }

    const weights = await Weight.find(query)
      .sort({
        recordedAt: -1,
      });

    console.log(
      `GET WEIGHTS -> ${weights.length} | TENANT: ${tenantId}`
    );

    return res.status(200).json({
      success: true,
      count: weights.length,
      weights,
    });
  } catch (error) {
    console.error(
      "GET WEIGHTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      error: "Unable to retrieve weight records",
      details: error.message,
    });
  }
});

/* =========================================================
   GET WEIGHTS FOR ONE GOAT
   GET /api/weights/goat/:goatId
========================================================= */

router.get(
  "/goat/:goatId",
  async (req, res) => {
    try {
      const tenantId = getTenantId(req);

      const goatId = req.params.goatId;

      if (!mongoose.Types.ObjectId.isValid(goatId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid goat ID",
        });
      }

      const goat = await Goat.findOne({
        _id: goatId,
        tenantId,
      });

      if (!goat) {
        return res.status(404).json({
          success: false,
          error: "Goat not found",
        });
      }

      const weights = await Weight.find({
        tenantId,
        goatId,
      }).sort({
        recordedAt: -1,
      });

      return res.status(200).json({
        success: true,
        count: weights.length,
        weights,
      });
    } catch (error) {
      console.error(
        "GET GOAT WEIGHTS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        error:
          "Unable to retrieve goat weight history",
        details: error.message,
      });
    }
  }
);

/* =========================================================
   GET SINGLE WEIGHT
   GET /api/weights/:id
========================================================= */

router.get(
  "/:id",
  async (req, res) => {
    try {
      const tenantId = getTenantId(req);

      const weightId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(weightId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid weight ID",
        });
      }

      const weight = await Weight.findOne({
        _id: weightId,
        tenantId,
      });

      if (!weight) {
        return res.status(404).json({
          success: false,
          error: "Weight record not found",
        });
      }

      return res.status(200).json({
        success: true,
        weight,
      });
    } catch (error) {
      console.error(
        "GET WEIGHT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        error: "Unable to retrieve weight record",
        details: error.message,
      });
    }
  }
);

/* =========================================================
   CREATE WEIGHT RECORD
   POST /api/weights
========================================================= */

router.post(
  "/",
  async (req, res) => {
    try {
      const tenantId = getTenantId(req);

      const {
        goatId,
        weight,
        recordedAt,
        notes,
        source,
      } = req.body;

      console.log(
        "CREATE WEIGHT REQUEST:",
        {
          tenantId,
          goatId,
          weight,
          recordedAt,
          notes,
          source,
        }
      );

      /* =====================================================
         VALIDATE GOAT ID
      ===================================================== */

      if (!goatId) {
        return res.status(400).json({
          success: false,
          error: "goatId is required",
        });
      }

      if (!mongoose.Types.ObjectId.isValid(goatId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid goat ID",
        });
      }

      /* =====================================================
         VALIDATE WEIGHT
      ===================================================== */

      if (
        weight === undefined ||
        weight === null ||
        weight === ""
      ) {
        return res.status(400).json({
          success: false,
          error: "weight is required",
        });
      }

      const numericWeight = Number(weight);

      if (
        Number.isNaN(numericWeight) ||
        numericWeight <= 0
      ) {
        return res.status(400).json({
          success: false,
          error:
            "Weight must be a valid positive number",
        });
      }

      if (numericWeight > 1000) {
        return res.status(400).json({
          success: false,
          error:
            "Weight cannot be greater than 1000 KG",
        });
      }

      /* =====================================================
         FIND GOAT
      ===================================================== */

      const goat = await Goat.findOne({
        _id: goatId,
        tenantId,
      });

      if (!goat) {
        return res.status(404).json({
          success: false,
          error:
            "Goat not found in your farm",
        });
      }

      /* =====================================================
         PREVIOUS WEIGHT
      ===================================================== */

      const previousWeight = Number(
        goat.currentWeight || 0
      );

      /* =====================================================
         DIFFERENCE
      ===================================================== */

      const difference = Number(
        (
          numericWeight -
          previousWeight
        ).toFixed(2)
      );

      /* =====================================================
         GAIN / LOSS
      ===================================================== */

      let gainLoss = "Stable";

      if (difference > 0) {
        gainLoss = "Gain";
      } else if (difference < 0) {
        gainLoss = "Loss";
      }

      /* =====================================================
         RECORDED DATE
      ===================================================== */

      let finalRecordedAt = new Date();

      if (recordedAt) {
        finalRecordedAt = new Date(
          recordedAt
        );

        if (
          Number.isNaN(
            finalRecordedAt.getTime()
          )
        ) {
          return res.status(400).json({
            success: false,
            error: "Invalid recorded date",
          });
        }
      }

      /* =====================================================
         NORMALIZE SOURCE
      ===================================================== */

      const finalSource =
        normalizeSource(source);

      console.log(
        `SOURCE NORMALIZED: ${source} -> ${finalSource}`
      );

      /* =====================================================
         CREATE WEIGHT
      ===================================================== */

      const weightRecord = new Weight({
        tenantId,

        goatId: goat._id,

        goatName: goat.name,

        goatTagNumber: goat.tagNumber,

        weight: numericWeight,

        previousWeight,

        difference,

        gainLoss,

        recordedAt: finalRecordedAt,

        notes: notes || "",

        source: finalSource,
      });

      /* =====================================================
         SAVE WEIGHT TO MONGODB
      ===================================================== */

      await weightRecord.save();

      /* =====================================================
         UPDATE GOAT CURRENT WEIGHT
      ===================================================== */

      goat.currentWeight =
        numericWeight;

      if ("weight" in goat) {
        goat.weight =
          numericWeight;
      }

      await goat.save();

      /* =====================================================
         LOG
      ===================================================== */

      console.log(
        `=================================================`
      );

      console.log(
        `WEIGHT SAVED SUCCESSFULLY`
      );

      console.log(
        `GOAT       : ${goat.name}`
      );

      console.log(
        `TAG        : ${goat.tagNumber}`
      );

      console.log(
        `WEIGHT     : ${numericWeight} KG`
      );

      console.log(
        `SOURCE     : ${finalSource}`
      );

      console.log(
        `WEIGHT ID  : ${weightRecord._id}`
      );

      console.log(
        `TENANT     : ${tenantId}`
      );

      console.log(
        `=================================================`
      );

      /* =====================================================
         RESPONSE
      ===================================================== */

      return res.status(201).json({
        success: true,

        message:
          "Weight record created successfully in MongoDB",

        weight: weightRecord,

        goat: {
          id: goat._id,
          name: goat.name,
          tagNumber: goat.tagNumber,
          currentWeight:
            goat.currentWeight,
        },
      });
    } catch (error) {
      console.error(
        "================================================="
      );

      console.error(
        "CREATE WEIGHT ERROR:"
      );

      console.error(error);

      console.error(
        "================================================="
      );

      return res.status(500).json({
        success: false,
        error:
          "Failed to create weight record",
        details: error.message,
      });
    }
  }
);

/* =========================================================
   UPDATE WEIGHT
   PUT /api/weights/:id
========================================================= */

router.put(
  "/:id",
  async (req, res) => {
    try {
      const tenantId = getTenantId(req);

      const weightId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(weightId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid weight ID",
        });
      }

      const {
        weight,
        recordedAt,
        notes,
        source,
      } = req.body;

      const weightRecord =
        await Weight.findOne({
          _id: weightId,
          tenantId,
        });

      if (!weightRecord) {
        return res.status(404).json({
          success: false,
          error:
            "Weight record not found",
        });
      }

      /* ---------- Weight ---------- */

      if (weight !== undefined) {
        const numericWeight =
          Number(weight);

        if (
          Number.isNaN(numericWeight) ||
          numericWeight <= 0
        ) {
          return res.status(400).json({
            success: false,
            error: "Invalid weight",
          });
        }

        weightRecord.weight =
          numericWeight;
      }

      /* ---------- Date ---------- */

      if (recordedAt !== undefined) {
        const newRecordedAt =
          new Date(recordedAt);

        if (
          Number.isNaN(
            newRecordedAt.getTime()
          )
        ) {
          return res.status(400).json({
            success: false,
            error:
              "Invalid recorded date",
          });
        }

        weightRecord.recordedAt =
          newRecordedAt;
      }

      /* ---------- Notes ---------- */

      if (notes !== undefined) {
        weightRecord.notes =
          notes;
      }

      /* ---------- Source ---------- */

      if (source !== undefined) {
        weightRecord.source =
          normalizeSource(source);
      }

      /* ---------- Difference ---------- */

      weightRecord.difference =
        Number(
          (
            Number(
              weightRecord.weight
            ) -
            Number(
              weightRecord.previousWeight || 0
            )
          ).toFixed(2)
        );

      /* ---------- Gain / Loss ---------- */

      if (
        weightRecord.difference > 0
      ) {
        weightRecord.gainLoss =
          "Gain";
      } else if (
        weightRecord.difference < 0
      ) {
        weightRecord.gainLoss =
          "Loss";
      } else {
        weightRecord.gainLoss =
          "Stable";
      }

      await weightRecord.save();

      /* ---------- Update Goat ---------- */

      const goat =
        await Goat.findOne({
          _id:
            weightRecord.goatId,
          tenantId,
        });

      if (goat) {
        goat.currentWeight =
          weightRecord.weight;

        if ("weight" in goat) {
          goat.weight =
            weightRecord.weight;
        }

        await goat.save();
      }

      console.log(
        `WEIGHT UPDATED -> ${weightRecord._id} | TENANT: ${tenantId}`
      );

      return res.json({
        success: true,
        message:
          "Weight record updated successfully",
        weight: weightRecord,
      });
    } catch (error) {
      console.error(
        "UPDATE WEIGHT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        error:
          "Failed to update weight record",
        details: error.message,
      });
    }
  }
);

/* =========================================================
   DELETE WEIGHT
   DELETE /api/weights/:id
========================================================= */

router.delete(
  "/:id",
  async (req, res) => {
    try {
      const tenantId = getTenantId(req);

      const weightId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(weightId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid weight ID",
        });
      }

      const weightRecord =
        await Weight.findOne({
          _id: weightId,
          tenantId,
        });

      if (!weightRecord) {
        return res.status(404).json({
          success: false,
          error:
            "Weight record not found",
        });
      }

      await Weight.findOneAndDelete({
        _id: weightId,
        tenantId,
      });

      console.log(
        `WEIGHT DELETED -> ${weightId} | TENANT: ${tenantId}`
      );

      return res.json({
        success: true,
        message:
          "Weight record deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE WEIGHT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        error:
          "Failed to delete weight record",
        details: error.message,
      });
    }
  }
);

/* =========================================================
   EXPORT
========================================================= */

export default router;