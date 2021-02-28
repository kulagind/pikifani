export enum SSEType {
    'game' = 'game',
    'games' = 'games',
    'friends' = 'friends',
    'invites' = 'invites',
}

export interface SSETick<T> {
    type: SSEType,
    payload: T
}

export interface SseMessageHandlable {
    setData: (data: any) => void;
}