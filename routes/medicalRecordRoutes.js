import express from "express";
import mongoose from "mongoose";

import MedicalRecord from "../models/MedicalRecord.js";
import Goat from "../models/Goat.js";
import { requireFarmAccess as requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   HELPERS
========================================================= */

function getTenantId(req) {
  return req.user?.tenantId || null;
}

function isValidObjectId(id) {
  return Boolean(
    id && mongoose.Types.ObjectId.isValid(id)
  );
}

function toObjectId(id) {
  return new mongoose.Types.ObjectId(id);
}

/* =========================================================
   POPULATE OPTIONS
========================================================= */

const goatPopulate = {
  path: "goatId",
  select:
    "name tagNumber breed gender stage currentWeight",
};

/* =========================================================
   GET ALL MEDICAL RECORDS
   GET /api/medical-records
   GET /api/medical
========================================================= */

router.get("/", requireAuth, async (req, res) => {
  try {
    const tenantId = getTenantId(req);

    console.log("==========================================");
    console.log("GET MEDICAL RECORDS");
    console.log("TENANT ID:", tenantId);
    console.log("==========================================");

    if (!tenantId) {
      return res.status(401).json({
        success: false,
        message: "Tenant information is missing.",
      });
    }

    if (!isValidObjectId(tenantId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tenant ID.",
      });
    }

    const records = await MedicalRecord.find({
      tenantId: toObjectId(tenantId),
    })
      .populate(goatPopulate)
      .sort({
        date: -1,
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: records.length,
      medicalRecords: records,
      records,
    });
  } catch (error) {
    console.error(
      "GET MEDICAL RECORDS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch medical records.",
      error: error.message,
    });
  }
});

/* =========================================================
   GET MEDICAL RECORDS BY GOAT
   GET /api/medical/goat/:goatId
   GET /api/medical-records/goat/:goatId
========================================================= */

router.get(
  "/goat/:goatId",
  requireAuth,
  async (req, res) => {
    try {
      const tenantId = getTenantId(req);
      const { goatId } = req.params;

      console.log("==========================================");
      console.log("GET MEDICAL RECORDS BY GOAT");
      console.log("TENANT ID:", tenantId);
      console.log("GOAT ID:", goatId);
      console.log("==========================================");

      if (!tenantId) {
        return res.status(401).json({
          success: false,
          message:
            "Tenant information is missing.",
        });
      }

      if (!isValidObjectId(tenantId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid tenant ID.",
        });
      }

      if (!isValidObjectId(goatId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid goat ID.",
        });
      }

      /* -----------------------------------------------------
         FIND GOAT BY _id
      ----------------------------------------------------- */

      const goat = await Goat.findById(
        goatId
      ).lean();

      if (!goat) {
        return res.status(404).json({
          success: false,
          message:
            "Selected goat does not exist in MongoDB.",
        });
      }

      /* -----------------------------------------------------
         CHECK TENANT
      ----------------------------------------------------- */

      if (
        String(goat.tenantId) !==
        String(tenantId)
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Selected goat belongs to a different tenant.",
        });
      }

      const records =
        await MedicalRecord.find({
          tenantId: toObjectId(tenantId),
          goatId: goat._id,
        })
          .populate(goatPopulate)
          .sort({
            date: -1,
            createdAt: -1,
          })
          .lean();

      return res.status(200).json({
        success: true,
        count: records.length,
        medicalRecords: records,
        records,
      });
    } catch (error) {
      console.error(
        "GET MEDICAL RECORDS BY GOAT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch goat medical records.",
        error: error.message,
      });
    }
  }
);

/* =========================================================
   GET ONE MEDICAL RECORD
   GET /api/medical-records/:id
========================================================= */

router.get(
  "/:id",
  requireAuth,
  async (req, res) => {
    try {
      const tenantId = getTenantId(req);
      const { id } = req.params;

      if (!tenantId) {
        return res.status(401).json({
          success: false,
          message:
            "Tenant information is missing.",
        });
      }

      if (!isValidObjectId(tenantId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid tenant ID.",
        });
      }

      if (!isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid medical record ID.",
        });
      }

      const record =
        await MedicalRecord.findOne({
          _id: toObjectId(id),
          tenantId: toObjectId(tenantId),
        })
          .populate(goatPopulate)
          .lean();

      if (!record) {
        return res.status(404).json({
          success: false,
          message:
            "Medical record not found.",
        });
      }

      return res.status(200).json({
        success: true,
        medicalRecord: record,
        record,
      });
    } catch (error) {
      console.error(
        "GET MEDICAL RECORD ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch medical record.",
        error: error.message,
      });
    }
  }
);

/* =========================================================
   CREATE MEDICAL RECORD
   POST /api/medical-records
========================================================= */

router.post(
  "/",
  requireAuth,
  async (req, res) => {
    try {
      const tenantId = getTenantId(req);

      const {
        goatId,
        type,
        date,
        diagnosis,
        treatment,
        medicine,
        vaccine,
        doctor,
        nextDate,
        status,
        notes,
      } = req.body;

      console.log("");
      console.log(
        "=========================================="
      );
      console.log(
        "CREATE MEDICAL RECORD"
      );
      console.log(
        "JWT TENANT ID:",
        tenantId
      );
      console.log(
        "FRONTEND GOAT ID:",
        goatId
      );
      console.log(
        "BODY:",
        req.body
      );
      console.log(
        "=========================================="
      );

      /* -----------------------------------------------------
         TENANT VALIDATION
      ----------------------------------------------------- */

      if (!tenantId) {
        return res.status(401).json({
          success: false,
          message:
            "Tenant information is missing.",
        });
      }

      if (!isValidObjectId(tenantId)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid tenant ID.",
        });
      }

      /* -----------------------------------------------------
         GOAT VALIDATION
      ----------------------------------------------------- */

      if (!goatId) {
        return res.status(400).json({
          success: false,
          message:
            "Goat is required.",
        });
      }

      if (!isValidObjectId(goatId)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid MongoDB goat ID. Please select a goat from the goat list.",
        });
      }

      /* -----------------------------------------------------
         DATE VALIDATION
      ----------------------------------------------------- */

      if (!date) {
        return res.status(400).json({
          success: false,
          message:
            "Medical date is required.",
        });
      }

      const medicalDate =
        new Date(date);

      if (
        Number.isNaN(
          medicalDate.getTime()
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid medical date.",
        });
      }

      /* -----------------------------------------------------
         DIAGNOSIS VALIDATION
      ----------------------------------------------------- */

      if (
        !diagnosis ||
        !String(diagnosis).trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Diagnosis is required.",
        });
      }

      /* -----------------------------------------------------
         FIND GOAT BY MONGODB _id
         
         IMPORTANT:
         First find by _id.
         Then check tenant separately.
         This helps identify ID/tenant problems.
      ----------------------------------------------------- */

      const goat =
        await Goat.findById(
          toObjectId(goatId)
        ).lean();

      console.log(
        "GOAT BY ID:",
        goat
          ? {
              _id: String(goat._id),
              name: goat.name,
              tagNumber:
                goat.tagNumber,
              tenantId:
                goat.tenantId
                  ? String(
                      goat.tenantId
                    )
                  : null,
            }
          : "GOAT NOT FOUND"
      );

      /* -----------------------------------------------------
         GOAT DOES NOT EXIST
      ----------------------------------------------------- */

      if (!goat) {
        return res.status(404).json({
          success: false,
          message:
            "Selected goat does not exist in MongoDB.",
        });
      }

      /* -----------------------------------------------------
         TENANT MATCH
      ----------------------------------------------------- */

      const goatTenantId =
        goat.tenantId
          ? String(
              goat.tenantId
            )
          : null;

      const currentTenantId =
        String(tenantId);

      console.log(
        "GOAT TENANT ID:",
        goatTenantId
      );

      console.log(
        "CURRENT USER TENANT ID:",
        currentTenantId
      );

      /* -----------------------------------------------------
         GOAT WITHOUT TENANT
      ----------------------------------------------------- */

      if (!goatTenantId) {
        return res.status(400).json({
          success: false,
          message:
            "Selected goat does not have a tenant assigned.",
        });
      }

      /* -----------------------------------------------------
         TENANT MISMATCH
      ----------------------------------------------------- */

      if (
        goatTenantId !==
        currentTenantId
      ) {
        console.log(
          "TENANT MISMATCH"
        );

        return res.status(403).json({
          success: false,
          message:
            "Selected goat belongs to a different tenant.",
        });
      }

      console.log(
        "TENANT MATCH: YES"
      );

      /* -----------------------------------------------------
         CREATE MEDICAL RECORD
      ----------------------------------------------------- */

      const record =
        await MedicalRecord.create({
          tenantId:
            toObjectId(
              tenantId
            ),

          goatId:
            goat._id,

          goatName:
            goat.name || "",

          tagNumber:
            goat.tagNumber || "",

          type:
            type || "Treatment",

          date:
            medicalDate,

          diagnosis:
            String(
              diagnosis
            ).trim(),

          treatment:
            treatment
              ? String(
                  treatment
                ).trim()
              : "",

          medicine:
            medicine
              ? String(
                  medicine
                ).trim()
              : "",

          vaccine:
            vaccine
              ? String(
                  vaccine
                ).trim()
              : "",

          doctor:
            doctor
              ? String(
                  doctor
                ).trim()
              : "",

          nextDate:
            nextDate
              ? new Date(
                  nextDate
                )
              : null,

          status:
            status ||
            "Completed",

          notes:
            notes
              ? String(
                  notes
                ).trim()
              : "",
        });

      /* -----------------------------------------------------
         GET POPULATED RECORD
      ----------------------------------------------------- */

      const populatedRecord =
        await MedicalRecord.findOne(
          {
            _id: record._id,
            tenantId:
              toObjectId(
                tenantId
              ),
          }
        )
          .populate(goatPopulate)
          .lean();

      console.log("");
      console.log(
        "=========================================="
      );
      console.log(
        "MEDICAL RECORD SAVED SUCCESSFULLY"
      );
      console.log(
        "RECORD ID:",
        record._id
      );
      console.log(
        "GOAT:",
        goat.name
      );
      console.log(
        "TAG:",
        goat.tagNumber
      );
      console.log(
        "TENANT:",
        tenantId
      );
      console.log(
        "=========================================="
      );
      console.log("");

      return res.status(201).json({
        success: true,
        message:
          "Medical record saved successfully.",

        medicalRecord:
          populatedRecord,

        record:
          populatedRecord,
      });
    } catch (error) {
      console.error("");
      console.error(
        "=========================================="
      );
      console.error(
        "CREATE MEDICAL RECORD ERROR"
      );
      console.error(
        error
      );
      console.error(
        "=========================================="
      );

      if (
        error.name ===
        "ValidationError"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Medical record validation failed.",
          error:
            error.message,
        });
      }

      if (
        error.name ===
        "CastError"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid MongoDB ID.",
          error:
            error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message:
          "Failed to create medical record.",
        error:
          error.message,
      });
    }
  }
);

/* =========================================================
   UPDATE MEDICAL RECORD
   PUT /api/medical-records/:id
========================================================= */

router.put(
  "/:id",
  requireAuth,
  async (req, res) => {
    try {
      const tenantId = getTenantId(req);
      const { id } = req.params;

      if (!tenantId) {
        return res.status(401).json({
          success: false,
          message:
            "Tenant information is missing.",
        });
      }

      if (!isValidObjectId(tenantId)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid tenant ID.",
        });
      }

      if (!isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid medical record ID.",
        });
      }

      const {
        goatId,
        type,
        date,
        diagnosis,
        treatment,
        medicine,
        vaccine,
        doctor,
        nextDate,
        status,
        notes,
      } = req.body;

      if (!goatId) {
        return res.status(400).json({
          success: false,
          message:
            "Goat is required.",
        });
      }

      if (!isValidObjectId(goatId)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid MongoDB goat ID.",
        });
      }

      if (!date) {
        return res.status(400).json({
          success: false,
          message:
            "Medical date is required.",
        });
      }

      if (
        !diagnosis ||
        !String(
          diagnosis
        ).trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Diagnosis is required.",
        });
      }

      /* -----------------------------------------------------
         FIND GOAT
      ----------------------------------------------------- */

      const goat =
        await Goat.findById(
          toObjectId(goatId)
        ).lean();

      if (!goat) {
        return res.status(404).json({
          success: false,
          message:
            "Selected goat does not exist in MongoDB.",
        });
      }

      /* -----------------------------------------------------
         TENANT CHECK
      ----------------------------------------------------- */

      if (
        !goat.tenantId ||
        String(
          goat.tenantId
        ) !== String(tenantId)
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Selected goat belongs to a different tenant.",
        });
      }

      /* -----------------------------------------------------
         FIND EXISTING RECORD
      ----------------------------------------------------- */

      const existingRecord =
        await MedicalRecord.findOne({
          _id: toObjectId(id),
          tenantId:
            toObjectId(
              tenantId
            ),
        });

      if (!existingRecord) {
        return res.status(404).json({
          success: false,
          message:
            "Medical record not found.",
        });
      }

      /* -----------------------------------------------------
         UPDATE
      ----------------------------------------------------- */

      existingRecord.goatId =
        goat._id;

      existingRecord.goatName =
        goat.name || "";

      existingRecord.tagNumber =
        goat.tagNumber || "";

      existingRecord.type =
        type || "Treatment";

      existingRecord.date =
        new Date(date);

      existingRecord.diagnosis =
        String(
          diagnosis
        ).trim();

      existingRecord.treatment =
        treatment
          ? String(
              treatment
            ).trim()
          : "";

      existingRecord.medicine =
        medicine
          ? String(
              medicine
            ).trim()
          : "";

      existingRecord.vaccine =
        vaccine
          ? String(
              vaccine
            ).trim()
          : "";

      existingRecord.doctor =
        doctor
          ? String(
              doctor
            ).trim()
          : "";

      existingRecord.nextDate =
        nextDate
          ? new Date(
              nextDate
            )
          : null;

      existingRecord.status =
        status ||
        "Completed";

      existingRecord.notes =
        notes
          ? String(
              notes
            ).trim()
          : "";

      await existingRecord.save();

      /* -----------------------------------------------------
         POPULATE UPDATED RECORD
      ----------------------------------------------------- */

      const updatedRecord =
        await MedicalRecord.findOne(
          {
            _id:
              existingRecord._id,
            tenantId:
              toObjectId(
                tenantId
              ),
          }
        )
          .populate(goatPopulate)
          .lean();

      console.log(
        `MEDICAL RECORD UPDATED -> ${goat.name} (#${goat.tagNumber})`
      );

      return res.status(200).json({
        success: true,
        message:
          "Medical record updated successfully.",

        medicalRecord:
          updatedRecord,

        record:
          updatedRecord,
      });
    } catch (error) {
      console.error(
        "UPDATE MEDICAL RECORD ERROR:",
        error
      );

      if (
        error.name ===
        "ValidationError"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Medical record validation failed.",
          error:
            error.message,
        });
      }

      if (
        error.name ===
        "CastError"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid MongoDB ID.",
          error:
            error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message:
          "Failed to update medical record.",
        error:
          error.message,
      });
    }
  }
);

/* =========================================================
   DELETE MEDICAL RECORD
   DELETE /api/medical-records/:id
========================================================= */

router.delete(
  "/:id",
  requireAuth,
  async (req, res) => {
    try {
      const tenantId = getTenantId(req);
      const { id } = req.params;

      if (!tenantId) {
        return res.status(401).json({
          success: false,
          message:
            "Tenant information is missing.",
        });
      }

      if (!isValidObjectId(tenantId)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid tenant ID.",
        });
      }

      if (!isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid medical record ID.",
        });
      }

      const record =
        await MedicalRecord.findOneAndDelete(
          {
            _id: toObjectId(id),
            tenantId:
              toObjectId(
                tenantId
              ),
          }
        );

      if (!record) {
        return res.status(404).json({
          success: false,
          message:
            "Medical record not found.",
        });
      }

      console.log(
        `MEDICAL RECORD DELETED -> ${record.goatName} (#${record.tagNumber})`
      );

      return res.status(200).json({
        success: true,
        message:
          "Medical record deleted successfully.",
      });
    } catch (error) {
      console.error(
        "DELETE MEDICAL RECORD ERROR:",
        error
      );

      if (
        error.name ===
        "CastError"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid MongoDB ID.",
          error:
            error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete medical record.",
        error:
          error.message,
      });
    }
  }
);

/* =========================================================
   EXPORT
========================================================= */

export default router;