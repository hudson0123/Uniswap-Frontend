import { IUser } from "..";
import { IPost } from "..";

export interface IRequest {
    id: string,
    status: string,
    sent_at: string,
    approved_at: string | null,
    post: IPost,
    sender: IUser,
}