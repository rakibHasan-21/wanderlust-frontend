"use client";

import { authClient } from "./auth-client";

export default async function TokenClient() {
  try {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      console.log("Token error:", error);
      return null;
    }

    return data.token;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}