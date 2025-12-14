import axios from "axios";

export const api = axios.create({
  baseURL: "https://book-tracking-backend.onrender.com/v1/",
});
