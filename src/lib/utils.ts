import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
const { VITE_API_URL } = import.meta.env;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const saveToken = async () => {
  const currentToken = localStorage.getItem("VIDEO_API_TOKEN");
  if (currentToken || currentToken === undefined) return;
  try {
    const response = await fetch(VITE_API_URL + "/auth/generate-simple-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    localStorage.setItem("VIDEO_API_TOKEN", data.data.access_token);
    return;
  } catch (error) {
    throw new Error("Failed to fetch token");
  }
};
