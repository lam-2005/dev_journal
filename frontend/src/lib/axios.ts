import axios from "axios";
import env from "@/config/environment";

const instance = axios.create({
  baseURL:
    env.NEXT_ENV === "development"
      ? env.API_URL
      : "https://dev-journal-7nn4.onrender.com",
  withCredentials: true,
});
export default instance;
