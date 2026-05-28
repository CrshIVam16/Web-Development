const mongoose = require("mongoose");
const env = require("./env");

// Connects to MongoDB and keeps connection logic in one place.
async function connectDB() {
  mongoose.set("strictQuery", true);

  await mongoose.connect(env.MONGO_URI);

  console.log("[DB] Connected:", mongoose.connection.name);
}

module.exports = connectDB;