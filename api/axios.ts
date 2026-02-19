import axios from "axios";
import { supabase } from "./supabase";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session", error);
    return config;
  }

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

    if (!error.response) {
      return Promise.reject("Network error — check your connection");
    }

    const errorMessage = error.response.data ?? "Something went wrong";
    return Promise.reject(errorMessage);
  },
);
