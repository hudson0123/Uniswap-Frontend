import { IMessage } from "./message";
import { IUser } from "./user";
import { IPost } from "./post";

export interface IDetailConversation {
  id: number,
  name: string,
  buyer: IUser,
  seller: IUser,
  post: IPost,
  latest_messages: IMessage[],
  created_at: string,
}