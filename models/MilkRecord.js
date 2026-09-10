import mongoose from "mongoose";

const MilkRecordSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
      index: true,
    },

    goatId: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
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

    date: {
      type: Date,
      default: Date.now,
    },

    session: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening"],
      default: "Morning",
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      default: "litre",
    },

    fat: {
      type: Number,
      default: null,
    },

    snf: {
      type: Number,
      default: null,
    },

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

export default mongoose.model("MilkRecord", MilkRecordSchema);