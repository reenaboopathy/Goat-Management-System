import mongoose from "mongoose";

/* =========================================================
   USER SCHEMA
========================================================= */

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
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
      default: "",
      trim: true,
    },

    role: {
      type: String,
      enum: ["admin", "staff"],
      default: "admin",
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    _id: true,
  }
);


/* =========================================================
   SUBSCRIPTION SCHEMA
========================================================= */

const SubscriptionSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      enum: [
        "Trial",
        "Basic",
        "Pro",
        "Enterprise",
      ],
      default: "Trial",
    },

    status: {
      type: String,
      enum: [
        "Active",
        "Expired",
        "Cancelled",
        "Suspended",
      ],
      default: "Active",
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
      default: () => {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        return date;
      },
    },

    goatLimit: {
      type: Number,
      default: 20,
    },

    notes: {
      type: String,
      default: "14-day free trial",
    },
  },
  {
    _id: false,
  }
);


/* =========================================================
   TENANT / FARM SCHEMA
========================================================= */

const TenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    users: {
      type: [UserSchema],
      default: [],
    },

    /* =====================================================
       SUBSCRIPTION
    ===================================================== */

    subscription: {
      type: SubscriptionSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);


const Tenant = mongoose.model(
  "Tenant",
  TenantSchema
);

export default Tenant;