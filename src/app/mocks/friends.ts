import { User } from './../interfaces/user';

export const friends: User[] = [
    {
        id: 1,
        name: 'Пирожок',
        gamesQuantity: 21,
        winQuantity: 10
    },
    {
        id: 2,
        name: 'хххГенийххх',
        gamesQuantity: 5,
        winQuantity: 5
    },
    {
        id: 3,
        name: 'Шкет',
        gamesQuantity: 23,
        winQuantity: 11
    },
    {
        id: 4,
        name: 'Босс',
        gamesQuantity: 20,
        winQuantity: 14
    },
    {
        id: 5,
        name: '12345',
        gamesQuantity: 20,
        winQuantity: 4
    },
    {
        id: 6,
        name: 'Никнейм',
        gamesQuantity: 19,
        winQuantity: 1
    },
];

export const receivedFriendsInvites: User[] = [
    {
        id: 1,
        name: 'Пирожок',
    },
    {
        id: 2,
        name: 'хххГенийххх',
    }
];

export const sentFriendsInvites: User[] = [
    {
        id: 2,
        name: 'хххГенийххх',
    },
    {
        id: 3,
        name: 'Шкет',
    },
    {
        id: 4,
        name: 'Босс',
    },
];