import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      default: "SelSolve Owner",
      trim: true,
    },

    role: {
      type: String,
      enum: ["owner"],
      default: "owner",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Owner =
  mongoose.models.Owner ||
  mongoose.model("Owner", OwnerSchema);

export default Owner;