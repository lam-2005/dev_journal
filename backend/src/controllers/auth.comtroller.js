import { generateToken } from "../lib/ultil.js";
import AuthService from "../service/auth.service.js";

const AuthController = {
  signup: async (req, res) => {
    try {
      const data = req.body;

      const newUser = await AuthService.signup(data);

      generateToken(newUser.id, res);
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newUser,
      });
    } catch (error) {
      console.error("Error in Authcontroller: ", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const data = req.body;

      const user = await AuthService.login(data);

      generateToken(user.id, res);
      return res.status(200).json({
        success: true,
        message: "User login successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error in Authcontroller: ", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  logout: async (_, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      return res.status(200).json({
        success: true,
        message: "Logout successfully",
      });
    } catch (error) {
      console.error("Error in Authcontroller: ", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const user_id = req.params.user_id;
      if (!user_id) res.status(400).json({ message: "User id is required" });
      const user = await AuthService.getById(user_id);

      return res.status(200).json({
        success: true,
        message: "Get post successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error in AuthController: ", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};
export default AuthController;
