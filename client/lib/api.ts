import getCookie from "./getCookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const api = {
  server: {
    POST: async (path: string, payload: Record<string, any>) => {
      return fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    },
    GET: async (path: string) => {
      const token = getCookie('access_token');
      console.log(token)
      return fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  },
};

export default api;
