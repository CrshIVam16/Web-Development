const app = require("./app");
const env = require("./config/env");
const connectDB = require("./config/db");

async function start() {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`[API] Running on http://localhost:${env.PORT}`);
  });
}

start().catch((err) => {
  console.error("[STARTUP ERROR]", err);
  process.exit(1);
});