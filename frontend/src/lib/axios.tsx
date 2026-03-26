import axios from "axios";
import env from "./environment";

const instance = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});
export default instance;
