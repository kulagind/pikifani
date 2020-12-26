import { RecievedInvite, SentInvite, TableData, Waiting, Game } from 'src/app/interfaces/table';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TableService {

    toTable(games: Waiting[] | Game[] | RecievedInvite[] | SentInvite[]): TableData {
        const data: TableData = {
            displayedColumns: [],
            dataSource: []
        };
        if (games.length > 0) {
            const keys = [...Object.keys(games[0])];
            data.displayedColumns = [...keys, 'cancel'],
            data.dataSource = [...games];
        }
        return {...data};
    }
}