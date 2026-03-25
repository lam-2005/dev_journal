import express from "express";
import env from "./config/env.js";
import AuthRoute from "./routes/auth.route.js";
import pool from "./lib/pool.js";
const app = express();

app.use(express.json());

app.use("/api/auth", AuthRoute);

async function startServer() {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully!");
    client.release();
    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();
