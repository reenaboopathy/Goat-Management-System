import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Owner from "./models/Owner.js";

const MONGO_URI = process.env.MONGO_URI;

async function resetOwner() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not configured.");
    }

    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected.");

    const hashedPassword = await bcrypt.hash("Owner@123", 12);

    await Owner.findOneAndUpdate(
      { username: "owner" },
      {
        $set: {
          password: hashedPassword,
          email: "owner@selsolve.com",
          name: "SelSolve Owner",
          role: "owner",
          status: "Active",
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    console.log("");
    console.log("================================");
    console.log("OWNER ACCOUNT READY");
    console.log("================================");
    console.log("Username : owner");
    console.log("Password : Owner@123");
    console.log("Role     : owner");
    console.log("================================");
    console.log("");

    await mongoose.connection.close();
  } catch (error) {
    console.error("RESET OWNER ERROR:", error);
    process.exit(1);
  }
}

resetOwner();