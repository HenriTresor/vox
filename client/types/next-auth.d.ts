import NextAuth from "next-auth";
import NextAuth from "next-auth";


export type User = {
  email: string;
  _id: string;
  firstName: string;
  lastName: string;
  verifiedAccount: boolean;
  verificationCode: number;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  access_token: string;
};

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
