import NextAuth from "next-auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
        email: string;
        _id: string;
      firstName: string;
      lastName: string;
      verifiedAccount: boolean;
      verificationCode: number;
        avatar: string;
        createdAt: Date;
        updatedAt: Date;
        token: string;
    };
  }
}
