import AuthService from "../service/auth.service.js";

const AuthController = {
  signup: async (req, res) => {
    try {
      const data = req.body;

      const newUser = await AuthService.signup(data);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newUser,
      });
    } catch (error) {
      console.error("Error in Authcontroller: ", error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
export default AuthController;
