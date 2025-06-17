import { IMessage } from "./message";

export interface IDetailConversation {
  id: number,
  name: string,
  participants: number[],
  latest_messages: IMessage[],
  created_at: string,
}