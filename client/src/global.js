export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.otnotes.app/api"
    : "http://localhost:5000/api";

export const DRAWER_WIDTH = 240;
