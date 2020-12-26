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
        word: 'коза',
        friend: 'Артем',
        isYourTurn: true,
    },
    {
        word: 'енот',
        friend: '',
        isYourTurn: false,
    },
    {
        word: 'ЖАБА',
        friend: 'Смешной котик',
        isYourTurn: false,
    },
    {
        word: 'горе',
        friend: 'Смешной котик',
        isYourTurn: false,
    },
    {
        word: 'шкет',
        friend: 'Смешной котик',
        isYourTurn: true,
    },
    {
        word: 'жмых',
        friend: '',
        isYourTurn: false,
    },
]

