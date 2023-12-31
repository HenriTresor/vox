import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const api = {
  server: {
    POST: async (path: string, payload: Record<string, any>) => {
         const session = await getSession();
         const token = session?.user.access_token || "";
      return fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    },
    GET: async (path: string) => {
      const session = await getSession();
      const token = session?.user.access_token || "";
      return fetch(`${BASE_URL}${path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
  },
};

export default api;
