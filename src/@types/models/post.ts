import { IUser } from ".."
import { IEvent } from "./event"

export interface IPost {
    id: number,
    author: IUser,
    event: IEvent,
    ticket_price: number,
    meetup_location: string | null,
    description: string | null,
    is_sponsored: boolean,
    created_at: string,
    updated_at: string,
    status: string,
}