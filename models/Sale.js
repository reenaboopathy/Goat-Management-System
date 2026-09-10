
import mongoose from "mongoose";

/* =========================================================
   SALE SCHEMA
========================================================= */

const SaleSchema = new mongoose.Schema(
  {
    /* =======================================================
       FARM / TENANT

       IMPORTANT:
       tenantId must come from the authenticated user.
       No demo tenant default is allowed.
    ======================================================= */

    tenantId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    /* =======================================================
       GOAT REFERENCE

       goatId remains ObjectId because it references
       the Goat MongoDB document.
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
       SALE DATE
    ======================================================= */

    saleDate: {
      type: String,
      required: true,
    },

    /* =======================================================
       BUYER INFORMATION
    ======================================================= */

    buyerName: {
      type: String,
      required: true,
      trim: true,
    },

    buyerPhone: {
      type: String,
      default: "",
      trim: true,
    },

    buyerAddress: {
      type: String,
      default: "",
      trim: true,
    },

    /* =======================================================
       WEIGHT AT TIME OF SALE
    ======================================================= */

    weight: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* =======================================================
       SALE PRICE
    ======================================================= */

    salePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    /* =======================================================
       PAYMENT STATUS
    ======================================================= */

    paymentStatus: {
      type: String,
      enum: [
        "Paid",
        "Pending",
        "Partial",
      ],
      default: "Paid",
    },

    /* =======================================================
       PAYMENT METHOD
    ======================================================= */

    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "UPI",
        "Bank Transfer",
        "Other",
      ],
      default: "Cash",
    },

    /* =======================================================
       AMOUNT PAID
    ======================================================= */

    amountPaid: {
      type: Number,
      default: 0,
      min: 0,
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
   INDEX
========================================================= */

SaleSchema.index({
  tenantId: 1,
  goatId: 1,
  saleDate: -1,
});

/* =========================================================
   MODEL
========================================================= */

const Sale =
  mongoose.models.Sale ||
  mongoose.model("Sale", SaleSchema);

export default Sale;
