import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
  baseURL: "https://book-tracking-backend.onrender.com/v1/",
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("Unauthorized 401");
      }
    }
  }
);
