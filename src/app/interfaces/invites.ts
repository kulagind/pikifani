import { ReceivedInvite, SentInvite, Waiting } from './table';
import { User } from "./user";

export interface WaitingGame {
    _id?: string,
    word: string
}

export interface SentGameInvite {
    _id?: string,
    word: string,
    recepientId: string
}

export interface ReceivedGameInvite {
    _id?: string,
    authorId: string
}

export interface InvitesFromReq {
    sent: User[],
    received: User[],
    friends: User[]
}

export interface GameInvitesFromReq {
    sent: SentInvite[],
    received: ReceivedInvite[],
    waiting: Waiting[]
}