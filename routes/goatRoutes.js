import express from "express";
import mongoose from "mongoose";

import Goat from "../models/Goat.js";
import Weight from "../models/Weight.js";
import Event from "../models/Event.js";
import Sale from "../models/Sale.js";

import {
  requireFarmAccess,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   TENANT HELPER
   IMPORTANT:
   tenantId MUST come from authenticated user
========================================================= */

function getTenantId(req) {
  return req.user?.tenantId || null;
}

/* =========================================================
   VALIDATE TENANT
========================================================= */

function validateTenant(req, res) {
  const tenantId = getTenantId(req);

  if (!tenantId) {
    res.status(401).json({
      success: false,
      code: "TENANT_NOT_FOUND",
      error: "Authentication required. Tenant ID not found.",
    });

    return null;
  }

  if (!mongoose.Types.ObjectId.isValid(tenantId)) {
    res.status(400).json({
      success: false,
      code: "INVALID_TENANT_ID",
      error: "Invalid tenant ID.",
    });

    return null;
  }

  return tenantId;
}

/* =========================================================
   GET /api/goats
   GET ALL GOATS

   Subscription protected
========================================================= */

router.get("/", requireFarmAccess, async (req, res) => {
  try {
    const tenantId = validateTenant(req, res);

    if (!tenantId) return;

    const {
      search,
      breed,
      status,
      gender,
      group,
    } = req.query;

    const query = {
      tenantId,
    };

    /* ---------- Breed Filter ---------- */

    if (breed && breed !== "All Breeds") {
      query.breed = breed;
    }

    /* ---------- Status Filter ---------- */

    if (status && status !== "All") {
      query.status = status;
    }

    /* ---------- Gender Filter ---------- */

    if (gender && gender !== "All") {
      query.gender = gender;
    }

    /* ---------- Group Filter ---------- */

    if (group && group !== "All Groups") {
      query.group = group;
    }

    /* ---------- Search ---------- */

    if (search && search.trim()) {
      const escapedSearch = search
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const searchRegex = new RegExp(
        escapedSearch,
        "i"
      );

      query.$or = [
        {
          name: searchRegex,
        },
        {
          tagNumber: searchRegex,
        },
        {
          breed: searchRegex,
        },
        {
          notes: searchRegex,
        },
      ];
    }

    const goats = await Goat.find(query).sort({
      createdAt: -1,
    });

    console.log(
      `GET GOATS -> ${goats.length} | TENANT: ${tenantId}`
    );

    return res.status(200).json({
      success: true,
      count: goats.length,
      goats,
    });
  } catch (error) {
    console.error(
      "GET GOATS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        "Unable to retrieve goats from database",
      details: error.message,
    });
  }
});

/* =========================================================
   GET /api/goats/:id
   GET SINGLE GOAT

   + WEIGHTS
   + EVENTS
   + SALES

   Subscription protected
========================================================= */

router.get(
  "/:id",
  requireFarmAccess,
  async (req, res) => {
    try {
      const tenantId = validateTenant(req, res);

      if (!tenantId) return;

      const goatId = req.params.id;

      if (
        !mongoose.Types.ObjectId.isValid(goatId)
      ) {
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

      /* ---------- Weight History ---------- */

      const weights = await Weight.find({
        goatId: goat._id,
        tenantId,
      }).sort({
        recordedAt: -1,
      });

      /* ---------- Events ---------- */

      const events = await Event.find({
        tenantId,
        $or: [
          {
            goatId: goat._id.toString(),
          },
          {
            goatTagNumber: goat.tagNumber,
          },
        ],
      }).sort({
        eventDate: -1,
      });

      /* ---------- Sales ---------- */

      const sales = await Sale.find({
        tenantId,
        $or: [
          {
            goatId: goat._id.toString(),
          },
          {
            goatTagNumber: goat.tagNumber,
          },
        ],
      }).sort({
        saleDate: -1,
      });

      return res.status(200).json({
        success: true,
        goat: {
          ...goat.toObject(),
          weights,
          events,
          sales,
        },
      });
    } catch (error) {
      console.error(
        "GET GOAT DETAILS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        error:
          "Unable to retrieve goat details",
        details: error.message,
      });
    }
  }
);

/* =========================================================
   POST /api/goats
   CREATE GOAT

   Subscription protected
========================================================= */

router.post(
  "/",
  requireFarmAccess,
  async (req, res) => {
    try {
      const tenantId = validateTenant(req, res);

      if (!tenantId) return;

      const {
        tagNumber,
        name,
        breed,
        gender,
        dob,
        stage,
        currentWeight,
        weight,
        status,
        origin,
        obtained,
        group,
        notes,
        photo,
        dateOfEntry,
        sireTagNumber,
        damTagNumber,
        events,
      } = req.body;

      /* ---------- Required Fields ---------- */

      if (
        !tagNumber ||
        !String(tagNumber).trim()
      ) {
        return res.status(400).json({
          success: false,
          error: "Goat tag number is required",
        });
      }

      if (
        !name ||
        !String(name).trim()
      ) {
        return res.status(400).json({
          success: false,
          error: "Goat name is required",
        });
      }

      const cleanTagNumber =
        String(tagNumber).trim();

      const cleanName =
        String(name).trim();

      /* ---------- Duplicate Check ---------- */

      const existing = await Goat.findOne({
        tenantId,
        tagNumber: cleanTagNumber,
      });

      if (existing) {
        return res.status(409).json({
          success: false,
          error:
            `A goat with Tag #${cleanTagNumber} already exists in this farm`,
        });
      }

      /* ---------- Weight ---------- */

      const rawWeight =
        currentWeight !== undefined
          ? currentWeight
          : weight;

      const numericWeight =
        rawWeight === undefined ||
        rawWeight === ""
          ? 0
          : Number(rawWeight);

      if (
        Number.isNaN(numericWeight) ||
        numericWeight < 0
      ) {
        return res.status(400).json({
          success: false,
          error: "Invalid weight value",
        });
      }

      /* ---------- Create Goat ---------- */

      const goat = new Goat({
        tenantId,

        tagNumber:
          cleanTagNumber,

        name:
          cleanName,

        breed:
          breed || "Tellicherry",

        gender:
          gender || "Female",

        dob:
          dob || "",

        stage:
          stage || "Doe",

        currentWeight:
          numericWeight,

        weight:
          numericWeight,

        status:
          status || "Active",

        origin:
          origin ||
          obtained ||
          "Born on farm",

        obtained:
          obtained ||
          origin ||
          "Born on farm",

        group:
          group ||
          "All Groups",

        photo:
          photo || "",

        dateOfEntry:
          dateOfEntry || "",

        sireTagNumber:
          sireTagNumber || "",

        damTagNumber:
          damTagNumber || "",

        notes:
          notes || "",

        events:
          Array.isArray(events)
            ? events
            : [],
      });

      await goat.save();

      console.log(
        `GOAT SAVED -> ${goat.name} (#${goat.tagNumber}) | TENANT: ${tenantId}`
      );

      /* =====================================================
         INITIAL WEIGHT
      ===================================================== */

      if (numericWeight > 0) {
        await Weight.create({
          tenantId,

          goatId:
            goat._id,

          goatName:
            goat.name,

          goatTagNumber:
            goat.tagNumber,

          weight:
            numericWeight,

          previousWeight:
            0,

          difference:
            0,

          gainLoss:
            "Stable",

          recordedAt:
            new Date(),

          notes:
            "Initial registration weight",

          source:
            "Manual",
        });

        console.log(
          `WEIGHT SAVED -> ${numericWeight} KG | TENANT: ${tenantId}`
        );
      }

      /* =====================================================
         REGISTRATION EVENT
      ===================================================== */

      await Event.create({
        tenantId,

        mode:
          "individual",

        type:
          origin === "Purchased" ||
          obtained === "Purchased"
            ? "Purchase"
            : "Birth",

        title:
          `${goat.name} registered into herd`,

        goatId:
          goat._id.toString(),

        goatName:
          goat.name,

        goatTagNumber:
          goat.tagNumber,

        eventDate:
          new Date(),

        notes:
          notes ||
          "New goat profile created",
      });

      console.log(
        `EVENT SAVED -> ${goat.name} | TENANT: ${tenantId}`
      );

      return res.status(201).json({
        success: true,
        message:
          "Goat created successfully in MongoDB",
        goat,
      });
    } catch (error) {
      console.error(
        "CREATE GOAT ERROR:",
        error
      );

      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          error:
            "A goat with this tag number already exists in this farm",
        });
      }

      return res.status(500).json({
        success: false,
        error:
          "Failed to create goat profile",
        details:
          error.message,
      });
    }
  }
);

/* =========================================================
   PUT /api/goats/:id
   UPDATE GOAT

   Subscription protected
========================================================= */

router.put(
  "/:id",
  requireFarmAccess,
  async (req, res) => {
    try {
      const tenantId = validateTenant(req, res);

      if (!tenantId) return;

      const goatId = req.params.id;

      if (
        !mongoose.Types.ObjectId.isValid(
          goatId
        )
      ) {
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

      const {
        tagNumber,
        name,
        breed,
        gender,
        dob,
        stage,
        currentWeight,
        weight,
        status,
        origin,
        obtained,
        group,
        notes,
        photo,
        dateOfEntry,
        sireTagNumber,
        damTagNumber,
        events,
      } = req.body;

      /* ---------- Tag ---------- */

      if (tagNumber !== undefined) {
        const newTag =
          String(tagNumber).trim();

        if (!newTag) {
          return res.status(400).json({
            success: false,
            error:
              "Goat tag number cannot be empty",
          });
        }

        if (
          newTag !== goat.tagNumber
        ) {
          const duplicate =
            await Goat.findOne({
              tenantId,
              tagNumber: newTag,
              _id: {
                $ne: goat._id,
              },
            });

          if (duplicate) {
            return res.status(409).json({
              success: false,
              error:
                `Tag #${newTag} is already assigned to another goat`,
            });
          }

          goat.tagNumber =
            newTag;
        }
      }

      /* ---------- Basic Fields ---------- */

      if (name !== undefined) {
        const cleanName =
          String(name).trim();

        if (!cleanName) {
          return res.status(400).json({
            success: false,
            error:
              "Goat name cannot be empty",
          });
        }

        goat.name =
          cleanName;
      }

      if (breed !== undefined) {
        goat.breed = breed;
      }

      if (gender !== undefined) {
        goat.gender = gender;
      }

      if (dob !== undefined) {
        goat.dob = dob;
      }

      if (stage !== undefined) {
        goat.stage = stage;
      }

      if (status !== undefined) {
        goat.status = status;
      }

      if (origin !== undefined) {
        goat.origin = origin;
        goat.obtained = origin;
      }

      if (obtained !== undefined) {
        goat.obtained = obtained;
        goat.origin = obtained;
      }

      if (group !== undefined) {
        goat.group = group;
      }

      if (notes !== undefined) {
        goat.notes = notes;
      }

      if (photo !== undefined) {
        goat.photo = photo;
      }

      if (
        dateOfEntry !== undefined
      ) {
        goat.dateOfEntry =
          dateOfEntry;
      }

      if (
        sireTagNumber !== undefined
      ) {
        goat.sireTagNumber =
          sireTagNumber;
      }

      if (
        damTagNumber !== undefined
      ) {
        goat.damTagNumber =
          damTagNumber;
      }

      if (Array.isArray(events)) {
        goat.events = events;
      }

      /* =====================================================
         WEIGHT UPDATE
      ===================================================== */

      const rawWeight =
        currentWeight !== undefined
          ? currentWeight
          : weight;

      if (rawWeight !== undefined) {
        const newWeight =
          Number(rawWeight);

        if (
          Number.isNaN(newWeight) ||
          newWeight < 0
        ) {
          return res.status(400).json({
            success: false,
            error:
              "Invalid weight value",
          });
        }

        const previousWeight =
          Number(
            goat.currentWeight || 0
          );

        if (
          newWeight !==
          previousWeight
        ) {
          const difference =
            Number(
              (
                newWeight -
                previousWeight
              ).toFixed(2)
            );

          goat.currentWeight =
            newWeight;

          goat.weight =
            newWeight;

          await Weight.create({
            tenantId,

            goatId:
              goat._id,

            goatName:
              goat.name,

            goatTagNumber:
              goat.tagNumber,

            weight:
              newWeight,

            previousWeight,

            difference,

            gainLoss:
              newWeight >
              previousWeight
                ? "Gain"
                : newWeight <
                  previousWeight
                ? "Loss"
                : "Stable",

            recordedAt:
              new Date(),

            notes:
              "Updated from goat profile",

            source:
              "Manual",
          });

          console.log(
            `WEIGHT UPDATED -> ${previousWeight} KG -> ${newWeight} KG | TENANT: ${tenantId}`
          );
        }
      }

      await goat.save();

      console.log(
        `GOAT UPDATED -> ${goat.name} (#${goat.tagNumber}) | TENANT: ${tenantId}`
      );

      return res.json({
        success: true,
        message:
          "Goat updated successfully in MongoDB",
        goat,
      });
    } catch (error) {
      console.error(
        "UPDATE GOAT ERROR:",
        error
      );

      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          error:
            "A goat with this tag number already exists in this farm",
        });
      }

      return res.status(500).json({
        success: false,
        error:
          "Failed to update goat",
        details:
          error.message,
      });
    }
  }
);

/* =========================================================
   PATCH /api/goats/:id/status
   CHANGE GOAT STATUS

   Subscription protected
========================================================= */

router.patch(
  "/:id/status",
  requireFarmAccess,
  async (req, res) => {
    try {
      const tenantId =
        validateTenant(req, res);

      if (!tenantId) return;

      const goatId =
        req.params.id;

      if (
        !mongoose.Types.ObjectId.isValid(
          goatId
        )
      ) {
        return res.status(400).json({
          success: false,
          error: "Invalid goat ID",
        });
      }

      const {
        status,
        reason,
      } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          error: "Status is required",
        });
      }

      const allowedStatuses = [
        "Active",
        "Sold",
        "Archived",
        "Dead",
        "Sick",
        "Pregnant",
      ];

      if (
        !allowedStatuses.includes(status)
      ) {
        return res.status(400).json({
          success: false,
          error:
            "Invalid goat status",
        });
      }

      const goat =
        await Goat.findOne({
          _id: goatId,
          tenantId,
        });

      if (!goat) {
        return res.status(404).json({
          success: false,
          error: "Goat not found",
        });
      }

      goat.status =
        status;

      await goat.save();

      await Event.create({
        tenantId,

        mode:
          "individual",

        type:
          status === "Sold"
            ? "Sale"
            : "Other",

        title:
          `Status changed to ${status}`,

        goatId:
          goat._id.toString(),

        goatName:
          goat.name,

        goatTagNumber:
          goat.tagNumber,

        eventDate:
          new Date(),

        notes:
          reason ||
          `Goat status updated to ${status}`,
      });

      console.log(
        `GOAT STATUS UPDATED -> ${goat.name} | ${status} | TENANT: ${tenantId}`
      );

      return res.json({
        success: true,
        message:
          "Goat status updated successfully",
        goat,
      });
    } catch (error) {
      console.error(
        "STATUS UPDATE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        error:
          "Failed to change goat status",
        details:
          error.message,
      });
    }
  }
);

/* =========================================================
   DELETE /api/goats/:id
   DELETE GOAT

   + WEIGHTS
   + EVENTS
   + SALES

   Subscription protected

   NOTE:
   This only deletes when user explicitly deletes a goat.
   Subscription expiry NEVER deletes this data.
========================================================= */

router.delete(
  "/:id",
  requireFarmAccess,
  async (req, res) => {
    try {
      const tenantId =
        validateTenant(req, res);

      if (!tenantId) return;

      const goatId =
        req.params.id;

      if (
        !mongoose.Types.ObjectId.isValid(
          goatId
        )
      ) {
        return res.status(400).json({
          success: false,
          error: "Invalid goat ID",
        });
      }

      const goat =
        await Goat.findOne({
          _id: goatId,
          tenantId,
        });

      if (!goat) {
        return res.status(404).json({
          success: false,
          error: "Goat not found",
        });
      }

      /* ---------- Delete Goat ---------- */

      await Goat.deleteOne({
        _id: goat._id,
        tenantId,
      });

      /* ---------- Delete Weights ---------- */

      await Weight.deleteMany({
        goatId: goat._id,
        tenantId,
      });

      /* ---------- Delete Events ---------- */

      await Event.deleteMany({
        tenantId,
        $or: [
          {
            goatId:
              goat._id.toString(),
          },
          {
            goatTagNumber:
              goat.tagNumber,
          },
        ],
      });

      /* ---------- Delete Sales ---------- */

      await Sale.deleteMany({
        tenantId,
        $or: [
          {
            goatId:
              goat._id.toString(),
          },
          {
            goatTagNumber:
              goat.tagNumber,
          },
        ],
      });

      console.log(
        `GOAT DELETED -> ${goat.name} (#${goat.tagNumber}) | TENANT: ${tenantId}`
      );

      return res.json({
        success: true,
        message:
          `Goat ${goat.name} (#${goat.tagNumber}) deleted successfully`,
      });
    } catch (error) {
      console.error(
        "DELETE GOAT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        error:
          "Failed to delete goat",
        details:
          error.message,
      });
    }
  }
);

/* =========================================================
   EXPORT
========================================================= */

export default router;