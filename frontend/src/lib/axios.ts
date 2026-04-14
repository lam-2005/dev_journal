import axios from "axios";
import env from "@/config/environment";

const instance = axios.create({
  baseURL: env.NEXT_ENV === "development" ? "http://localhost:8080" : "/",
  withCredentials: true,
});
export default instance;
