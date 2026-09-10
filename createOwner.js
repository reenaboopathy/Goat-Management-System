import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Owner from "./models/Owner.js";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/selsolve";

async function createOwner() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected.");

    const existingOwner = await Owner.findOne({
      username: "owner",
    });

    if (existingOwner) {
      console.log("Owner already exists.");
      await mongoose.connection.close();
      return;
    }

    const hashedPassword = await bcrypt.hash(
      "Owner@123",
      12
    );

    const owner = await Owner.create({
      username: "owner",
      email: "owner@selsolve.com",
      password: hashedPassword,
      name: "SelSolve Owner",
      role: "owner",
      status: "Active",
    });

    console.log("");
    console.log("================================");
    console.log("OWNER CREATED SUCCESSFULLY");
    console.log("================================");
    console.log("Username : owner");
    console.log("Password : Owner@123");
    console.log("Role     : owner");
    console.log("================================");
    console.log("");

    await mongoose.connection.close();
  } catch (error) {
    console.error("CREATE OWNER ERROR:", error);
    process.exit(1);
  }
}

createOwner();