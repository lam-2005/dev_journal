import express from "express";
import env from "./config/env.js";
import AuthRoute from "./routes/auth.route.js";
import PostRoute from "./routes/post.route.js";
import EmailRoute from "./routes/email.route.js";
import pool from "./lib/pool.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin:
      env.NODE_ENV === "development" ? "http://localhost:3000" : env.URL_CLIENT,
    credentials: true,
  }),
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use("/api/auth", AuthRoute);
app.use("/api/blog", PostRoute);
app.use("/api/email", EmailRoute);

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
    console.error("--- DATABASE CONNECTION ERROR ---");
    console.error("Message:", error.message); // Quan trọng nhất
    console.error("Code:", error.code); // Mã lỗi (vd: 57P01, 28P01)
    console.error("---------------------------------");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();
