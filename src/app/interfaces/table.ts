export type TableColumns = 'word' | 'friend' | 'turnId' | 'cancel' | 'gamesQuantity' | 'winQuantity' | 'name';
export const ColumnsNames = ['word', 'friend', 'turnId', 'cancel', 'gamesQuantity', 'winQuantity', 'name'];

export interface TableDataSource {
    word?: string,
    friend?: string,
    isYourTurn?: boolean,
    gamesQuantity?: number,
    winQuantity?: number
};

export interface TableData {
    displayedColumns: string[],
    dataSource: TableDataSource[]
}

export interface Waiting {
    id?: number;
    word: string;
}

export interface RecievedInvite {
    id?: number;
    friend: string
}

export interface SentInvite {
    id?: number;
    word: string,
    friend: string
}

export interface Game {
    id: number;
    word: string,
    friend: string,
    turnId: number
}