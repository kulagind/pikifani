export interface Message {
    id: number,
    word: string,
    creationTime: Date,
    p: number,
    f: number,
    authorId: string
}

export interface OpenedGame {
    info: ChatFromRes,
    messages: Message[],
    winner?: string
}

export interface ChatFromRes {
    gameId: string,
    word: string,
    turnId: string,
    friend: string,
}

export interface CreateChat {
    word: string,
    inviteId: string
}

export interface GameResult {
    gameId: string,
    word: string,
    friend: string,
    friendWord: string,
    winner: string
}