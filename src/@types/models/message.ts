import { IProfile } from './profile';

export interface IMessage {
  id: number;
  conversation: number;
  sender: IProfile;
  content: string;
  timestamp: string;
  read: boolean;
}
