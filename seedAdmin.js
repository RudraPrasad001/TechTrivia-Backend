// seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/user.model.js";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URL);

    const existingAdmin = await User.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("✅ Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("saajid@2009", 10);

    const adminUser = new User({
      name: "Saajid Ahamed",
      email: "saajidahamed01@gmail.com",
      username: "saajid007",
      password: hashedPassword,
      role: "admin"
    });

    await adminUser.save();
    console.log("✅ Admin user created");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
