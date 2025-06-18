import { IMessage } from "./message";

export interface IConversation {
  id: number,
  name: string,
  participants: number[],
  latest_message: IMessage,
  created_at: string,
}