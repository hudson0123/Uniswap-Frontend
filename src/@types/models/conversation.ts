import { IMessage } from "./message";
import { IUser } from "./user";

export interface IConversation {
  id: number,
  name: string,
  participants: IUser[],
  latest_message: IMessage,
  created_at: string,
}