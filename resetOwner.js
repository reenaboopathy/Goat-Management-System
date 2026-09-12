import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Owner from "./models/Owner.js";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/selsolve";

async function resetOwner() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected.");
    console.log(
      `Database: ${mongoose.connection.name}`
    );

    const hashedPassword = await bcrypt.hash(
      "Owner@123",
      12
    );

    await Owner.findOneAndUpdate(
      { username: "owner" },
      {
        username: "owner",
        email: "owner@selsolve.com",
        password: hashedPassword,
        name: "SelSolve Owner",
        role: "owner",
        status: "Active",
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    console.log("");
    console.log("================================");
    console.log("OWNER ACCOUNT READY");
    console.log("================================");
    console.log("Username : owner");
    console.log("Role     : owner");
    console.log("Status   : Active");
    console.log("================================");
    console.log("");

    await mongoose.connection.close();
  } catch (error) {
    console.error(
      "RESET OWNER ERROR:",
      error
    );

    try {
      await mongoose.connection.close();
    } catch {}

    process.exit(1);
  }
}

resetOwner();