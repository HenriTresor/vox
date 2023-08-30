import { User } from "./next-auth";

export type Message = {
  sender: User;
  receiver: User;
  message: string;
  sendOn: Date;
};
export type Channel = {
  name: string;
  members: User[];
  creator: User;
  messages: Message[];
  form: "private" | "public";
};
export type WorkspaceTypes = {
  admin: string;
  members: [];
  name: string;
  category: string;
  inviteLink: string;
  createdAt: Date;
  updatedAt: Date;
  avatar: string;
  _id: string;
  channels?: [];
  slug: string;
};
