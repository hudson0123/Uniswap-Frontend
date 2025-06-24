import { IMessage } from "./message";
import { IUser } from "./user";

export interface IDetailConversation {
  id: number,
  name: string,
  buyer: IUser,
  seller: IUser, 
  latest_messages: IMessage[],
  created_at: string,
}