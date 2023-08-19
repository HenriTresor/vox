const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const api = {
  server: {
    POST: async (path: string, payload: Record<string, any>) => {
        console.log(`${BASE_URL}${path}`)
      return fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    },
  },
};

export default api;
