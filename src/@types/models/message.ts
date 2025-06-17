export interface IMessage {
  conversation: number,
  sender: number,
  content: string,
  timestamp: string,
  read: boolean,
}