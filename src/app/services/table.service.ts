import { ColumnsNames } from '@interfaces/table';
import { User } from '@interfaces/user';
import { ReceivedInvite, SentInvite, TableData, Waiting, Game } from '@interfaces/table';
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
        if (items && items.length > 0) {
            const keys = ColumnsNames.filter(name => Object.keys(items[0]).includes(name));
            data.displayedColumns = [...keys],
            data.dataSource = [...items];
        }        
        return {...data};
    }
}