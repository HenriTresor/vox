import authenticate from "@/lib/authenticate";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export let authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "email",
          required: true,
        },
        password: {
          type: "password",
          required: true,
        },
      },
      async authorize(credentials, re) {
        const res = await authenticate(credentials);
        const data = await res.json();
        if (!data.status) {
          return Promise.reject(new Error(data.message));
        }
        return { ...data.user, apiToken: data.token };
      },
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ],

  pages: {
    signIn: "/login",
    newUser: "/signup",
    error: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }: { token?: JWT; user?: User }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};
