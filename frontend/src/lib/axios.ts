import axios from "axios";
import env from "@/config/environment";

const instance = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});
export default instance;
