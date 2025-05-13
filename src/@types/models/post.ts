import { IUser } from ".."

export interface IPost {
    id: number,
    author: IUser,
    ticket_title: string,
    ticket_price: number,
    meetup_location: string | null,
    meetup_time: string | null,
    description: string | null,
    category: string,
    is_sponsored: boolean,
    created_at: string,
    updated_at: string,
    status: string,
}