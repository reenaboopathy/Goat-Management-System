import express from "express";
import mongoose from "mongoose";

import Sale from "../models/Sale.js";
import Goat from "../models/Goat.js";
import { requireFarmAccess as requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(requireAuth);

/* =========================================================
   HELPERS
========================================================= */

const getTenantId = (req) => {
  return (
    req.user?.tenantId ||
    req.headers["x-tenant-id"] ||
    req.body?.tenantId ||
    req.query?.tenantId ||
    null
  );
};

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/* =========================================================
   GET ALL SALES
   GET /api/sales
========================================================= */

router.get("/", async (req, res) => {
  try {
    const {
      goatId,
      startDate,
      endDate,
      paymentStatus,
    } = req.query;

    const tenantId = getTenantId(req);

    const query = {
      tenantId,
    };

    if (goatId) {
      if (!isValidObjectId(goatId)) {
        return res.status(400).json({
          error: "Invalid goatId",
        });
      }

      query.goatId = goatId;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    if (startDate || endDate) {
      query.saleDate = {};

      if (startDate) {
        query.saleDate.$gte = startDate;
      }

      if (endDate) {
        query.saleDate.$lte = endDate;
      }
    }

    const sales = await Sale.find(query)
      .populate(
        "goatId",
        "name tagNumber breed currentWeight status"
      )
      .sort({
        saleDate: -1,
        createdAt: -1,
      })
      .lean();

    res.status(200).json(sales);
  } catch (error) {
    console.error("GET SALES ERROR:", error);

    res.status(500).json({
      error: "Unable to retrieve sales",
      details: error.message,
    });
  }
});

/* =========================================================
   GET SINGLE SALE
   GET /api/sales/:id
========================================================= */

router.get("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: "Invalid sale id",
      });
    }

    const sale = await Sale.findById(req.params.id)
      .populate(
        "goatId",
        "name tagNumber breed currentWeight status"
      )
      .lean();

    if (!sale) {
      return res.status(404).json({
        error: "Sale record not found",
      });
    }

    res.status(200).json(sale);
  } catch (error) {
    console.error("GET SALE ERROR:", error);

    res.status(500).json({
      error: "Unable to retrieve sale",
      details: error.message,
    });
  }
});

/* =========================================================
   CREATE SALE
   POST /api/sales
========================================================= */

router.post("/", async (req, res) => {
  try {
    const tenantId = getTenantId(req);

    const {
      goatId,
      saleDate,
      buyerName,
      buyerPhone,
      buyerAddress,
      weight,
      salePrice,
      paymentStatus,
      paymentMethod,
      amountPaid,
      notes,
    } = req.body;

    console.log("CREATE SALE BODY:", req.body);

    /* -------------------------------------------------------
       VALIDATE GOAT ID
    ------------------------------------------------------- */

    if (!goatId) {
      return res.status(400).json({
        error: "goatId is required",
      });
    }

    if (!isValidObjectId(goatId)) {
      return res.status(400).json({
        error:
          "Invalid goatId. Goat ID must be a MongoDB ObjectId.",
      });
    }

    /* -------------------------------------------------------
       VALIDATE BUYER
    ------------------------------------------------------- */

    if (
      !buyerName ||
      !String(buyerName).trim()
    ) {
      return res.status(400).json({
        error: "Buyer name is required",
      });
    }

    /* -------------------------------------------------------
       VALIDATE SALE PRICE
    ------------------------------------------------------- */

    if (
      salePrice === undefined ||
      salePrice === null ||
      salePrice === ""
    ) {
      return res.status(400).json({
        error: "Sale price is required",
      });
    }

    const numericPrice = Number(salePrice);

    if (
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      return res.status(400).json({
        error: "Invalid sale price",
      });
    }

    /* -------------------------------------------------------
       FIND REAL GOAT FROM MONGODB
    ------------------------------------------------------- */

    const goat = await Goat.findOne({
      _id: goatId,
      tenantId,
    });

    if (!goat) {
      return res.status(404).json({
        error:
          "Goat not found in MongoDB for this tenant",
      });
    }

    /* -------------------------------------------------------
       WEIGHT
    ------------------------------------------------------- */

    let numericWeight =
      weight !== undefined &&
      weight !== null &&
      weight !== ""
        ? Number(weight)
        : Number(goat.currentWeight || 0);

    if (
      !Number.isFinite(numericWeight) ||
      numericWeight < 0
    ) {
      return res.status(400).json({
        error: "Invalid weight",
      });
    }

    /* -------------------------------------------------------
       PAYMENT
    ------------------------------------------------------- */

    const finalPaymentStatus =
      paymentStatus || "Paid";

    const finalPaymentMethod =
      paymentMethod || "Cash";

    let numericAmountPaid =
      amountPaid !== undefined &&
      amountPaid !== null &&
      amountPaid !== ""
        ? Number(amountPaid)
        : finalPaymentStatus === "Paid"
        ? numericPrice
        : 0;

    if (
      !Number.isFinite(numericAmountPaid) ||
      numericAmountPaid < 0
    ) {
      return res.status(400).json({
        error: "Invalid amount paid",
      });
    }

    if (numericAmountPaid > numericPrice) {
      return res.status(400).json({
        error:
          "Amount paid cannot be greater than sale price",
      });
    }

    /* -------------------------------------------------------
       CREATE SALE
    ------------------------------------------------------- */

    const sale = new Sale({
      tenantId,

      goatId: goat._id,

      goatName:
        goat.name || "Unnamed Goat",

      goatTagNumber:
        goat.tagNumber || "",

      saleDate:
        saleDate ||
        new Date()
          .toISOString()
          .slice(0, 10),

      buyerName:
        String(buyerName).trim(),

      buyerPhone:
        buyerPhone
          ? String(buyerPhone).trim()
          : "",

      buyerAddress:
        buyerAddress
          ? String(buyerAddress).trim()
          : "",

      weight: numericWeight,

      salePrice: numericPrice,

      paymentStatus:
        finalPaymentStatus,

      paymentMethod:
        finalPaymentMethod,

      amountPaid:
        numericAmountPaid,

      notes:
        notes
          ? String(notes).trim()
          : "",
    });

    await sale.save();

    /* -------------------------------------------------------
       UPDATE GOAT STATUS
    ------------------------------------------------------- */

    goat.status = "Sold";

    await goat.save();

    console.log(
      `SALE SAVED → ${goat.name} (#${goat.tagNumber}) → ₹${numericPrice}`
    );

    res.status(201).json({
      success: true,
      message:
        "Sale record created successfully in MongoDB",

      sale,

      goat: {
        id: goat._id,
        name: goat.name,
        tagNumber: goat.tagNumber,
        status: goat.status,
      },
    });
  } catch (error) {
    console.error(
      "CREATE SALE ERROR:",
      error
    );

    res.status(500).json({
      error: "Failed to create sale record",
      details: error.message,
    });
  }
});

/* =========================================================
   UPDATE SALE
   PUT /api/sales/:id
========================================================= */

router.put("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: "Invalid sale id",
      });
    }

    const {
      saleDate,
      buyerName,
      buyerPhone,
      buyerAddress,
      weight,
      salePrice,
      paymentStatus,
      paymentMethod,
      amountPaid,
      notes,
    } = req.body;

    const tenantId = getTenantId(req);

    const sale = await Sale.findOne({
      _id: req.params.id,
      tenantId,
    });

    if (!sale) {
      return res.status(404).json({
        error: "Sale record not found",
      });
    }

    if (saleDate !== undefined) {
      sale.saleDate = saleDate;
    }

    if (buyerName !== undefined) {
      if (!String(buyerName).trim()) {
        return res.status(400).json({
          error: "Buyer name is required",
        });
      }

      sale.buyerName =
        String(buyerName).trim();
    }

    if (buyerPhone !== undefined) {
      sale.buyerPhone =
        String(buyerPhone);
    }

    if (buyerAddress !== undefined) {
      sale.buyerAddress =
        String(buyerAddress);
    }

    if (weight !== undefined) {
      const value = Number(weight);

      if (
        !Number.isFinite(value) ||
        value < 0
      ) {
        return res.status(400).json({
          error: "Invalid weight",
        });
      }

      sale.weight = value;
    }

    if (salePrice !== undefined) {
      const value = Number(salePrice);

      if (
        !Number.isFinite(value) ||
        value < 0
      ) {
        return res.status(400).json({
          error: "Invalid sale price",
        });
      }

      sale.salePrice = value;
    }

    if (paymentStatus !== undefined) {
      sale.paymentStatus =
        paymentStatus;
    }

    if (paymentMethod !== undefined) {
      sale.paymentMethod =
        paymentMethod;
    }

    if (amountPaid !== undefined) {
      const value =
        Number(amountPaid);

      if (
        !Number.isFinite(value) ||
        value < 0
      ) {
        return res.status(400).json({
          error: "Invalid amount paid",
        });
      }

      if (value > sale.salePrice) {
        return res.status(400).json({
          error:
            "Amount paid cannot be greater than sale price",
        });
      }

      sale.amountPaid = value;
    }

    if (notes !== undefined) {
      sale.notes = String(notes);
    }

    await sale.save();

    res.status(200).json({
      success: true,
      message:
        "Sale record updated successfully",
      sale,
    });
  } catch (error) {
    console.error(
      "UPDATE SALE ERROR:",
      error
    );

    res.status(500).json({
      error:
        "Failed to update sale record",
      details: error.message,
    });
  }
});

/* =========================================================
   DELETE SALE
   DELETE /api/sales/:id
========================================================= */

router.delete("/:id", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: "Invalid sale id",
      });
    }

    const tenantId = getTenantId(req);

    const sale = await Sale.findOne({
      _id: req.params.id,
      tenantId,
    });

    if (!sale) {
      return res.status(404).json({
        error: "Sale record not found",
      });
    }

    await Sale.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Sale record deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE SALE ERROR:",
      error
    );

    res.status(500).json({
      error:
        "Failed to delete sale record",
      details: error.message,
    });
  }
});

export default router;