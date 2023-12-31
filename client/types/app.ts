import { User } from "./next-auth";

export type Message = {
  sender: User;
  receiver: User;
  message: {
    text: string;
    image?: string;
  };
  createdAt: Date;
};
export type Channel = {
  name: string;
  members: User[];
  _id: string;
  creator: User;
  messages: Message[];
  form: "private" | "public";
};
export type WorkspaceTypes = {
  admin?: string;
  members?: [];
  name?: string;
  category?: string;
  inviteLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
  avatar?: string;
  _id?: string;
  channels?: [];
  slug?: string;
};
