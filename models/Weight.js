import mongoose from "mongoose";

/* =========================================================
   WEIGHT SCHEMA
========================================================= */

const WeightSchema = new mongoose.Schema(
  {
    /* =======================================================
       FARM / TENANT
    ======================================================= */

    tenantId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    /* =======================================================
       GOAT REFERENCE
    ======================================================= */

    goatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goat",
      required: true,
      index: true,
    },

    /* =======================================================
       GOAT DETAILS
    ======================================================= */

    goatName: {
      type: String,
      required: true,
      trim: true,
    },

    goatTagNumber: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    /* =======================================================
       CURRENT WEIGHT
    ======================================================= */

    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    /* =======================================================
       PREVIOUS WEIGHT
    ======================================================= */

    previousWeight: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* =======================================================
       DIFFERENCE
    ======================================================= */

    difference: {
      type: Number,
      default: 0,
    },

    /* =======================================================
       GAIN / LOSS / STABLE
    ======================================================= */

    gainLoss: {
      type: String,
      enum: ["Gain", "Loss", "Stable"],
      default: "Stable",
    },

    /* =======================================================
       DATE AND TIME
    ======================================================= */

    recordedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    /* =======================================================
       NOTES
    ======================================================= */

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    /* =======================================================
       WEIGHT SOURCE
       
       Bluetooth Serial is stored as USB_Serial because
       that is the source value supported by the schema.
    ======================================================= */

    source: {
      type: String,
      enum: [
        "ESP32_Scale",
        "Manual",
        "USB_Serial",
      ],
      default: "Manual",
    },
  },
  {
    timestamps: true,
  }
);

/* =========================================================
   INDEX
========================================================= */

WeightSchema.index({
  tenantId: 1,
  goatId: 1,
  recordedAt: -1,
});

/* =========================================================
   MODEL
========================================================= */

const Weight =
  mongoose.models.Weight ||
  mongoose.model("Weight", WeightSchema);

export default Weight;