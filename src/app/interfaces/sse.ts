export enum SSEType {
    'game' = 'game',
    'games' = 'games',
    'friends' = 'friends',
    'invites' = 'invites',
    'user' = 'user',
}

export interface SSETick<T> {
    type: SSEType,
    payload: T
}

export interface SseMessageHandlable {
    setData: (data: any) => void;
}