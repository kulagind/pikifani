export interface Message {
    id: number,
    word: string,
    creationTime: Date,
    resultP: number,
    resultF: number,
    authorId: string
}

export interface Chat {
    messages: Message[],
    turnId: string,
    word: string
}