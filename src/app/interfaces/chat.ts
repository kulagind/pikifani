export interface Message {
    id: number,
    word: string,
    creationTime: Date,
    resultP: number,
    resultF: number,
    authorId: number
}

export interface Chat {
    messages: Message[],
    turnId: number,
    word: string
}