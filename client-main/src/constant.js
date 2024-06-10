const env = "prod"; // prod || local
export const baseApi =
  env === "prod"
    ? "http://my-domain-for-learn.work.gd.:3050/api"
    : "http://192.168.1.8:6000";

export const BASE_URL = "https://aina-web.vercel.app";

// Regex
export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+-=?<>/]{8,32}$/;
