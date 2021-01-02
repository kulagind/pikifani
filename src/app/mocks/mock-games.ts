import { Game, RecievedInvite, SentInvite, Waiting } from 'src/app/interfaces/table';

export const waitingGames: Waiting[] = [
    {
        word: 'коза'
    },
    {
        word: 'енот'
    },
    {
        word: 'ЖАБА'
    },
];

export const receivedInvites: RecievedInvite[] = [
    {
        friend: 'Артем'
    },
    {
        friend: 'хххГенийххх'
    },
    {
        friend: 'Смешной котик'
    },
];

export const sentInvites: SentInvite[] = [
    {
        word: 'коза',
        friend: 'Артем'
    },
    {
        word: 'енот',
        friend: 'хххГенийххх'
    },
    {
        word: 'ЖАБА',
        friend: 'Смешной котик'
    },
];

export const games: Game[] = [
    {
        id: 12,
        word: 'коза',
        friend: 'Артем',
        turnId: 4,
    },
    {
        id: 999,
        word: 'енот',
        friend: '',
        turnId: 4
    },
    {
        id: 3,
        word: 'ЖАБА',
        friend: 'Смешной котик',
        turnId: 2
    },
    {
        id: 4,
        word: 'горе',
        friend: 'Смешной котик',
        turnId: 3
    },
    {
        id: 5,
        word: 'шкет',
        friend: 'Смешной котик',
        turnId: 4
    },
    {
        id: 6,
        word: 'жмых',
        friend: '',
        turnId: 1
    },
]

