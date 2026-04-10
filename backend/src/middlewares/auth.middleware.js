import jwt from "jsonwebtoken";
import env from "../config/env.js";
import AuthModel from "../models/auth.model.js";

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No token provided" });

    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });

    const user = await AuthModel.findById(decoded.userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const optionalRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Lấy token từ cookie giống protectedRoute

    if (token) {
      const decoded = jwt.verify(token, env.JWT_SECRET);

      if (decoded) {
        const user = await AuthModel.findById(decoded.userId);
        if (user) {
          req.user = user; // Gán user vào request nếu tìm thấy
        }
      }
    }

    // Luôn luôn gọi next() dù có token hay không, dù token đúng hay sai
    next();
  } catch (error) {
    // Nếu token hết hạn hoặc lỗi, chúng ta lờ đi và coi như khách vãng lai
    next();
  }
};
export default protectedRoute;
