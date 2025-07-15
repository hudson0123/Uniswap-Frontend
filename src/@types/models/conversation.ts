import { IMessage } from "./message";
import { IUser } from "./user";

export interface IConversation {
  id: number,
  name: string,
  buyer: IUser,
  seller: IUser,
  latest_message: IMessage | null,
  created_at: string,
}