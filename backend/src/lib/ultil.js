import env from "../config/env.js";
import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const { JWT_SECRET, NODE_ENV } = env;

  if (!JWT_SECRET) throw new Error("JWT_SECRET variable is not defined");

  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax", // bắt buộc khi cross-domain
    path: "/",
    secure: NODE_ENV === "development" ? false : true,
  });
};
