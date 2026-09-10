
import mongoose from "mongoose";

/* =========================================================
   EVENT SCHEMA
========================================================= */

const EventSchema = new mongoose.Schema(
  {
    /* =======================================================
       TENANT
       IMPORTANT:
       tenantId is always taken from the authenticated user.
    ======================================================= */

    tenantId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    /* =======================================================
       EVENT MODE
    ======================================================= */

    mode: {
      type: String,
      enum: [
        "individual",
        "mass",
      ],
      default: "individual",
    },

    /* =======================================================
       EVENT TYPE
    ======================================================= */

    type: {
      type: String,
      enum: [
        "Vaccination",
        "Health Check",
        "Mating",
        "Birth",
        "Purchase",
        "Sale",
        "Weight Check",
        "Milking",
        "Treatment",
        "Other",
      ],
      default: "Health Check",
      index: true,
    },

    /* =======================================================
       EVENT TITLE
    ======================================================= */

    title: {
      type: String,
      required: true,
      trim: true,
    },

    /* =======================================================
       SINGLE GOAT INFORMATION
    ======================================================= */

    goatId: {
      type: String,
      default: "",
      trim: true,
      index: true,
    },

    goatName: {
      type: String,
      default: "",
      trim: true,
    },

    goatTagNumber: {
      type: String,
      default: "",
      trim: true,
    },

    /* =======================================================
       MULTIPLE GOATS
    ======================================================= */

    goats: [
      {
        goatId: {
          type: String,
          default: "",
        },

        name: {
          type: String,
          default: "",
        },

        tagNumber: {
          type: String,
          default: "",
        },
      },
    ],

    /* =======================================================
       EVENT DATE
    ======================================================= */

    eventDate: {
      type: Date,
      default: Date.now,
      index: true,
    },

    /* =======================================================
       COST
    ======================================================= */

    cost: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* =======================================================
       VETERINARIAN
    ======================================================= */

    vet: {
      type: String,
      default: "",
      trim: true,
    },

    /* =======================================================
       MEDICINE
    ======================================================= */

    medicine: {
      type: String,
      default: "",
      trim: true,
    },

    /* =======================================================
       DOSAGE
    ======================================================= */

    dosage: {
      type: String,
      default: "",
      trim: true,
    },

    /* =======================================================
       NEXT DUE DATE
    ======================================================= */

    nextDueDate: {
      type: Date,
      default: null,
    },

    /* =======================================================
       STATUS
    ======================================================= */

    status: {
      type: String,
      enum: [
        "Completed",
        "Pending",
        "Scheduled",
      ],
      default: "Completed",
    },

    /* =======================================================
       NOTES
    ======================================================= */

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/* =========================================================
   INDEXES
========================================================= */

/*
  Helps fetch events for a particular farm quickly.
*/

EventSchema.index({
  tenantId: 1,
  eventDate: -1,
});

/*
  Helps fetch events for a particular goat.
*/

EventSchema.index({
  tenantId: 1,
  goatId: 1,
});

/* =========================================================
   JSON
========================================================= */

EventSchema.set("toJSON", {
  virtuals: true,
});

EventSchema.set("toObject", {
  virtuals: true,
});

/* =========================================================
   MODEL
========================================================= */

const Event =
  mongoose.models.Event ||
  mongoose.model("Event", EventSchema);

export default Event;

