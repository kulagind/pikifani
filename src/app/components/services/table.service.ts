import { ColumnsNames } from './../../interfaces/table';
import { User } from 'src/app/interfaces/user';
import { ReceivedInvite, SentInvite, TableData, Waiting, Game } from 'src/app/interfaces/table';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TableService {

    toTable(items: Waiting[] | Game[] | ReceivedInvite[] | SentInvite[] | User[]): TableData {
        const data: TableData = {
            displayedColumns: [],
            dataSource: []
        };
        if (items.length > 0) {
            const keys = [...Object.keys(items[0]).filter(key => ColumnsNames.includes(key))];
            data.displayedColumns = [...keys],
            data.dataSource = [...items];
        }        
        return {...data};
    }
}