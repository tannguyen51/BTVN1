import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api-url.com/api", // Thay bằng URL API thật của bạn
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;