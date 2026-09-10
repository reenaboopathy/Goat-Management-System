import express from "express";
import bcrypt from "bcryptjs";
import Owner from "../models/Owner.js";
import Tenant from "../models/Tenant.js";
import Goat from "../models/Goat.js";
import Weight from "../models/Weight.js";
import Sale from "../models/Sale.js";
import Event from "../models/Event.js";
import MedicalRecord from "../models/MedicalRecord.js";
import { requireOwner } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(requireOwner);

router.get("/settings", async (req, res) => {
  try {
    const owner = await Owner.findById(req.owner.ownerId)
      .select("_id username email name role status")
      .lean();
    if (!owner) return res.status(404).json({ success: false, message: "Owner account not found." });
    return res.json({ success: true, owner });
  } catch (error) {
    console.error("OWNER SETTINGS GET ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to load settings." });
  }
});

router.put("/settings", async (req, res) => {
  try {
    const owner = await Owner.findById(req.owner.ownerId);
    if (!owner) return res.status(404).json({ success: false, message: "Owner account not found." });
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();
    if (!name || !email) return res.status(400).json({ success: false, message: "Name and email are required." });
    owner.name = name;
    owner.email = email;
    if (req.body?.newPassword) {
      if (String(req.body.newPassword).trim().length < 8) {
        return res.status(400).json({ success: false, message: "New password must be at least 8 characters." });
      }
      owner.password = await bcrypt.hash(String(req.body.newPassword).trim(), 12);
    }
    await owner.save();
    return res.json({
      success: true,
      owner: { id: owner._id, username: owner.username, email: owner.email, name: owner.name, role: owner.role },
    });
  } catch (error) {
    console.error("OWNER SETTINGS UPDATE ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to save settings." });
  }
});

router.get("/dashboard/stats", async (req, res) => {
  try {
    const [tenants, goats, weights, sales, events, medicalRecords] =
      await Promise.all([
        Tenant.find({}).select("_id name status users createdAt updatedAt").lean(),
        Goat.countDocuments(),
        Weight.countDocuments(),
        Sale.find({}).select("salePrice").lean(),
        Event.countDocuments(),
        MedicalRecord.countDocuments(),
      ]);

    const users = tenants.flatMap((tenant) =>
      (tenant.users || []).map((user) => ({
        id: String(user._id),
        name: user.name || user.username,
        username: user.username,
        email: user.email || "",
        role: user.role || "staff",
        tenantName: tenant.name,
        tenantStatus: tenant.status,
        lastLoginAt: user.lastLoginAt || null,
      }))
    );
    const onlineSince = Date.now() - 15 * 60 * 1000;

    return res.json({
      success: true,
      stats: {
        totalTenants: tenants.length,
        activeTenants: tenants.filter((tenant) => tenant.status === "Active").length,
        totalUsers: users.length,
        onlineUsers: users.filter((user) => user.lastLoginAt &&
          new Date(user.lastLoginAt).getTime() >= onlineSince).length,
        totalGoats: goats,
        totalWeights: weights,
        totalSales: sales.length,
        totalRevenue: sales.reduce((sum, sale) => sum + (Number(sale.salePrice) || 0), 0),
        totalEvents: events,
        totalMedicalRecords: medicalRecords,
      },
      tenants: tenants.map((tenant) => ({
        id: String(tenant._id),
        name: tenant.name,
        status: tenant.status,
        userCount: (tenant.users || []).length,
        createdAt: tenant.createdAt,
      })),
      users,
    });
  } catch (error) {
    console.error("OWNER DASHBOARD STATS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load platform statistics.",
    });
  }
});

router.get("/tenants", async (req, res) => {
  try {
    const tenants = await Tenant.find({}).select("_id name status users createdAt updatedAt").sort({ createdAt: -1 }).lean();
    return res.json({
      success: true,
      tenants: tenants.map((tenant) => ({
        ...tenant,
        users: (tenant.users || []).map(({ password, ...user }) => user),
        userCount: (tenant.users || []).length,
      })),
    });
  } catch (error) {
    console.error("OWNER TENANTS ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to load tenants." });
  }
});

export default router;
