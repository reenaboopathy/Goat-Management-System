import express from "express";
import Event from "../models/Event.js";
import { requireFarmAccess as requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   TENANT HELPER
========================================================= */

function getTenantId(req) {
  if (!req.user?.tenantId) {
    throw new Error("Tenant context missing");
  }

  return req.user.tenantId;
}

router.use(requireAuth);

/* =========================================================
   GET ALL EVENTS
   GET /api/events
========================================================= */

router.get("/", async (req, res) => {
  try {
    const tenantId = getTenantId(req);

    const events = await Event.find({
      tenantId,
    })
      .sort({ eventDate: -1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error("GET EVENTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
});

/* =========================================================
   GET SINGLE EVENT
   GET /api/events/:id
========================================================= */

router.get("/:id", async (req, res) => {
  try {
    const tenantId = getTenantId(req);

    const event = await Event.findOne({
      _id: req.params.id,
      tenantId,
    }).lean();

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("GET EVENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
      error: error.message,
    });
  }
});

/* =========================================================
   CREATE EVENT
   POST /api/events
========================================================= */

router.post("/", async (req, res) => {
  try {
    const tenantId = getTenantId(req);

    const {
      mode,
      type,
      title,
      goatId,
      goatName,
      goatTagNumber,
      goats,
      eventDate,
      cost,
      vet,
      medicine,
      dosage,
      nextDueDate,
      status,
      notes,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Event title is required",
      });
    }

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Event type is required",
      });
    }

    const event = await Event.create({
      tenantId,

      mode:
        mode === "mass"
          ? "mass"
          : "individual",

      type,

      title: title.trim(),

      goatId: goatId || "",

      goatName: goatName || "",

      goatTagNumber:
        goatTagNumber || "",

      goats: Array.isArray(goats)
        ? goats.map((goat) => ({
            goatId:
              goat.goatId ||
              goat.id ||
              "",

            name:
              goat.name ||
              "",

            tagNumber:
              goat.tagNumber ||
              "",
          }))
        : [],

      eventDate:
        eventDate
          ? new Date(eventDate)
          : new Date(),

      cost:
        cost === undefined ||
        cost === ""
          ? 0
          : Number(cost),

      vet: vet || "",

      medicine: medicine || "",

      dosage: dosage || "",

      nextDueDate:
        nextDueDate
          ? new Date(nextDueDate)
          : null,

      status:
        status || "Completed",

      notes: notes || "",
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
});

/* =========================================================
   UPDATE EVENT
   PUT /api/events/:id
========================================================= */

router.put("/:id", async (req, res) => {
  try {
    const tenantId = getTenantId(req);

    const updateData = {
      ...req.body,
    };

    /*
     * Tenant ID should never be changed
     * from frontend.
     */
    delete updateData.tenantId;

    if (updateData.title !== undefined) {
      updateData.title =
        String(updateData.title).trim();
    }

    if (updateData.eventDate) {
      updateData.eventDate =
        new Date(updateData.eventDate);
    }

    if (updateData.nextDueDate) {
      updateData.nextDueDate =
        new Date(updateData.nextDueDate);
    }

    if (
      Array.isArray(updateData.goats)
    ) {
      updateData.goats =
        updateData.goats.map(
          (goat) => ({
            goatId:
              goat.goatId ||
              goat.id ||
              "",

            name:
              goat.name ||
              "",

            tagNumber:
              goat.tagNumber ||
              "",
          })
        );
    }

    const event =
      await Event.findOneAndUpdate(
        {
          _id: req.params.id,
          tenantId,
        },
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
});

/* =========================================================
   DELETE EVENT
   DELETE /api/events/:id
========================================================= */

router.delete("/:id", async (req, res) => {
  try {
    const tenantId = getTenantId(req);

    const event =
      await Event.findOneAndDelete({
        _id: req.params.id,
        tenantId,
      });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      data: event,
    });
  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
});

export default router;