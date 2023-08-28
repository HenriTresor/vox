import api from "./api";

const authenticate = async (payload: any) => {
  return api.server.POST("/auth/login", payload);
};

export default authenticate;
