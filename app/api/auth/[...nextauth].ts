import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
        clientId: process.env.GITHUB__ID,
        clientSecret:process.env.GITHUB_SECRET
    }),
  ],
};
