export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/choose-workspace", "/create-workspace", "/workspaces"],
};
