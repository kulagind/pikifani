import { Chat, Message } from "../interfaces/chat";

export const mockMessages: Message[] = [
    {
        id: 1,
        word: 'коза',
        creationTime: new Date(),
        resultP: 0,
        resultF: 1,
        authorId: 4
    },
    {
        id: 2,
        word: 'енот',
        creationTime: new Date(),
        resultP: 0,
        resultF: 0,
        authorId: 2
    },
    {
        id: 3,
        word: 'гром',
        creationTime: new Date(),
        resultP: 1,
        resultF: 1,
        authorId: 4
    },
    {
        id: 4,
        word: 'бомж',
        creationTime: new Date(),
        resultP: 2,
        resultF: 0,
        authorId: 2
    },
    {
        id: 5,
        word: 'хлам',
        creationTime: new Date(),
        resultP: 0,
        resultF: 2,
        authorId: 4
    },
    {
        id: 6,
        word: 'спам',
        creationTime: new Date(),
        resultP: 3,
        resultF: 1,
        authorId: 2
    },
    {
        id: 1,
        word: 'коза',
        creationTime: new Date(),
        resultP: 0,
        resultF: 1,
        authorId: 4
    },
    {
        id: 2,
        word: 'енот',
        creationTime: new Date(),
        resultP: 0,
        resultF: 0,
        authorId: 2
    },
    {
        id: 3,
        word: 'гром',
        creationTime: new Date(),
        resultP: 1,
        resultF: 1,
        authorId: 4
    },
    {
        id: 4,
        word: 'бомж',
        creationTime: new Date(),
        resultP: 2,
        resultF: 0,
        authorId: 2
    },
    {
        id: 5,
        word: 'хлам',
        creationTime: new Date(),
        resultP: 0,
        resultF: 2,
        authorId: 4
    },
    {
        id: 6,
        word: 'спам',
        creationTime: new Date(),
        resultP: 3,
        resultF: 1,
        authorId: 2
    },  
    {
        id: 1,
        word: 'коза',
        creationTime: new Date(),
        resultP: 0,
        resultF: 1,
        authorId: 4
    },
    {
        id: 2,
        word: 'енот',
        creationTime: new Date(),
        resultP: 0,
        resultF: 0,
        authorId: 2
    },
    {
        id: 3,
        word: 'гром',
        creationTime: new Date(),
        resultP: 1,
        resultF: 1,
        authorId: 4
    },
    {
        id: 4,
        word: 'бомж',
        creationTime: new Date(),
        resultP: 2,
        resultF: 0,
        authorId: 2
    },
    {
        id: 5,
        word: 'хлам',
        creationTime: new Date(),
        resultP: 0,
        resultF: 2,
        authorId: 4
    },  
];

export const mockChat: Chat = {
    messages: mockMessages,
    turnId: 4,
    word: 'шлак'
}