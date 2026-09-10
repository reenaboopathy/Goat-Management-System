import mongoose from "mongoose";
import dotenv from "dotenv";
import Tenant from "./models/Tenant.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/selsolve";

async function initSubscription() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");

    const tenant = await Tenant.findOne({
      name: "Green-Vally",
    });

    if (!tenant) {
      console.log("❌ Green-Vally tenant not found");
      process.exit(1);
    }

    const startDate = new Date();

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 14);

    tenant.subscription = {
      plan: "Trial",
      status: "Active",
      startDate: startDate,
      endDate: endDate,
      goatLimit: 20,
      notes: "14-day free trial",
    };

    await tenant.save();

    console.log("--------------------------------");
    console.log("✅ SUBSCRIPTION INITIALIZED");
    console.log("Tenant :", tenant.name);
    console.log("Plan   :", tenant.subscription.plan);
    console.log("Status :", tenant.subscription.status);
    console.log("Limit  :", tenant.subscription.goatLimit);
    console.log("Start  :", tenant.subscription.startDate);
    console.log("End    :", tenant.subscription.endDate);
    console.log("--------------------------------");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ INIT SUBSCRIPTION ERROR:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

initSubscription();