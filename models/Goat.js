
import mongoose from "mongoose";

// =========================================================
// GOAT EVENT SCHEMA
// =========================================================

const GoatEventSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.Mixed,
    },

    type: {
      type: String,
      default: "",
      trim: true,
    },

    title: {
      type: String,
      default: "",
      trim: true,
    },

    date: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

// =========================================================
// GOAT SCHEMA
// =========================================================

const GoatSchema = new mongoose.Schema(
  {
    /* =======================================================
       TENANT
       IMPORTANT:
       tenantId is always taken from the authenticated user.
       Do not set a default demo farm here.
    ======================================================= */

    tenantId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    /* =======================================================
       GOAT BASIC INFORMATION
    ======================================================= */

    tagNumber: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    breed: {
      type: String,
      default: "Tellicherry",
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Female",
    },

    dob: {
      type: String,
      default: "",
    },

    /* =======================================================
       STAGE
    ======================================================= */

    stage: {
      type: String,
      enum: [
        "Kid",
        "Doeling",
        "Doe",
        "Buckling",
        "Buck",
        "Wether",
      ],
      default: "Doe",
    },

    /* =======================================================
       WEIGHT
    ======================================================= */

    currentWeight: {
      type: Number,
      default: 0,
      min: 0,
    },

    weight: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* =======================================================
       STATUS
    ======================================================= */

    status: {
      type: String,
      enum: [
        "Active",
        "Sold",
        "Archived",
        "Dead",
        "Sick",
        "Pregnant",
      ],
      default: "Active",
      index: true,
    },

    /* =======================================================
       ORIGIN
    ======================================================= */

    origin: {
      type: String,
      enum: [
        "Born on farm",
        "Purchased",
        "Other",
      ],
      default: "Born on farm",
    },

    obtained: {
      type: String,
      enum: [
        "Born on farm",
        "Purchased",
        "Other",
        "",
      ],
      default: "Born on farm",
    },

    /* =======================================================
       GROUP
    ======================================================= */

    group: {
      type: String,
      default: "All Groups",
      trim: true,
    },

    /* =======================================================
       PHOTO
    ======================================================= */

    photo: {
      type: String,
      default: "",
    },

    /* =======================================================
       ENTRY INFORMATION
    ======================================================= */

    dateOfEntry: {
      type: String,
      default: "",
    },

    sireTagNumber: {
      type: String,
      default: "",
      trim: true,
    },

    damTagNumber: {
      type: String,
      default: "",
      trim: true,
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
       GOAT EVENTS
    ======================================================= */

    events: {
      type: [GoatEventSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// =========================================================
// VIRTUAL LABEL
// =========================================================

GoatSchema.virtual("label").get(function () {
  return `${
    this.tagNumber
      ? "#" + this.tagNumber + " · "
      : ""
  }${this.name}`;
});

// =========================================================
// UNIQUE TAG PER FARM
// =========================================================

GoatSchema.index(
  {
    tenantId: 1,
    tagNumber: 1,
  },
  {
    unique: true,
  }
);

// =========================================================
// JSON / OBJECT
// =========================================================

GoatSchema.set("toJSON", {
  virtuals: true,
});

GoatSchema.set("toObject", {
  virtuals: true,
});

// =========================================================
// MODEL
// =========================================================

const Goat =
  mongoose.models.Goat ||
  mongoose.model("Goat", GoatSchema);

export default Goat;

