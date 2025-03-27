import axios from "axios";
import { getEnvVariables } from "./env";

const { VITE_API_URL } = getEnvVariables();

const api = axios.create({
  baseURL: VITE_API_URL,
});

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${
      localStorage.getItem("token") as string
    }`;
  }
  return config;
});

export default api;