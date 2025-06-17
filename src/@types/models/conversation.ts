export interface IConversation {
  id: number,
  name: string,
  participants: number[],
  last_message: string,
  created_at: string,
}