import axios from "axios";
import { supabase } from "./supabase";

export const api = axios.create({
  baseURL: "https://book-tracking-backend.onrender.com/v1/",
});

api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();

  if (data.session?.access_token) {
    config.headers.Authorization = `Bearer ${data.session?.access_token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { error: refreshError } = await supabase.auth.refreshSession();

      if (refreshError) {
        await supabase.auth.signOut();
        console.log("Unauthorized 401 - session refresh failed");
        return Promise.reject(refreshError);
      }

      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);
