import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://backend-project-production-6368.up.railway.app/api",
});

export default API;