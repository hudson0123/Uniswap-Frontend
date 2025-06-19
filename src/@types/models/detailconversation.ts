import { IMessage } from "./message";
import { IUser } from "./user";

export interface IDetailConversation {
  id: number,
  name: string,
  participants: IUser[],
  latest_messages: IMessage[],
  created_at: string,
}