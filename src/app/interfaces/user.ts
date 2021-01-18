export interface User {
    email: string,
    name: string,
    id?: string,
    _id?: string,
    gamesQuantity?: number,
    winsQuantity?: number,
    friends: string[],
    games: string[],
    receivedGameInvites: string[],
    sentGameInvites: string[],
    receivedFriendInvites: string[],
    sentFriendInvites: string[],
    waitingGames: string[]
}