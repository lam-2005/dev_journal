import AuthModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";

const AuthService = {
  signup: async (data) => {
    try {
      const { name, email, password, confirmPassword } = data;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!password || !name || !email || !confirmPassword)
        throw new Error("All fields are required");

      if (!emailRegex.test(email)) throw new Error("Invalid email format");

      const existingUser = await AuthModel.findUserByEmail(email);
      if (existingUser) throw new Error("Email already exists");

      if (password.length < 6)
        throw new Error("Password must be at least 6 characters");

      if (confirmPassword !== password)
        throw new Error("Password and confirm password do not match");

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await AuthModel.create({
        name,
        email,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  login: async (data) => {
    try {
      const { email, password } = data;

      if (!email || !password) throw new Error("All fields are required");

      const user = await AuthModel.findUserByEmail(email);
      if (!user) throw new Error("Invalid credentials");

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) throw new Error("Invalid credentials");

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        background: user.background,
        introduction: user.introduction,
        create_at: user.create_at,
        update_at: user.update_at,
      };
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const user = await AuthModel.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
