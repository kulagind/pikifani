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
    id?: string;
    word: string;
}

export interface RecievedInvite {
    id?: string;
    friend: string
}

export interface SentInvite {
    id?: string;
    word: string,
    friend: string
}

export interface Game {
    id: string;
    word: string,
    friend: string,
    turnId: string
}