export interface Message {
    id: number,
    word: string,
    creationTime: Date,
    resultP: number,
    resultF: number,
    authorId: string
}

export interface ChatFromRes {
    _id: string,
    word: string,
    turnId: string,
    friend: string
}

export interface CreateChat {
    word: string,
    inviteId: string
}