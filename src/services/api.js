// src/services/api.js
import axios from "axios";
import { getToken } from "../utils/auth";

const API = axios.create({
  baseURL: " https://lead-management-backend-icv7.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = token;
  return config;
});

export default API;
