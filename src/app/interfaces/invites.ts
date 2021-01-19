import { User } from "./user";

interface InviteDB {
    authorId: string,
    recepientId: string
}

export interface InvitesFromReq {
    sent: User[],
    received: User[],
    friends: User[]
}