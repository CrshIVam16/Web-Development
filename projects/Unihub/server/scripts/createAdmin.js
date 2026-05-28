const bcrypt = require("bcryptjs");
const connectDB = require("../src/config/db");
const User = require("../src/models/User");

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || "Admin";

  if (!email || !password) {
    console.log("Usage: node scripts/createAdmin.js <email> <password> [name]");
    process.exit(1);
  }

  await connectDB();

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    if (existing.role !== "Admin") {
      console.log("User exists but is not Admin. Use a different email.");
      process.exit(1);
    }
    console.log("Admin already exists:", existing.email);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await User.create({
    name,
    email: email.toLowerCase(),
    passwordHash,
    role: "Admin",
    department: "",
    semester: null,
  });

  console.log("Admin created:", admin.email);
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed to create admin:", err);
  process.exit(1);
});