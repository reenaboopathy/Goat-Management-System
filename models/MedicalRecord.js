import mongoose from "mongoose";

const MedicalRecordSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true,
    },

    goatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goat",
      required: true,
      index: true,
    },

    goatName: {
      type: String,
      default: "",
      trim: true,
    },

    tagNumber: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "Treatment",
        "Vaccination",
        "Medicine",
        "Checkup",
        "Injury",
        "Deworming",
        "Other",
      ],
      default: "Treatment",
    },

    date: {
      type: Date,
      required: true,
    },

    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },

    treatment: {
      type: String,
      default: "",
      trim: true,
    },

    medicine: {
      type: String,
      default: "",
      trim: true,
    },

    vaccine: {
      type: String,
      default: "",
      trim: true,
    },

    doctor: {
      type: String,
      default: "",
      trim: true,
    },

    nextDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "Completed",
        "Ongoing",
        "Follow-up",
        "Recovered",
        "Critical",
      ],
      default: "Completed",
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

MedicalRecordSchema.index({
  tenantId: 1,
  goatId: 1,
  date: -1,
});

export default mongoose.model(
  "MedicalRecord",
  MedicalRecordSchema
);