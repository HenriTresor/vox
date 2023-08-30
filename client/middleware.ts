export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/choose-workspace",
    "/create-workspace",
    "/workspaces",
    "/workspaces/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
