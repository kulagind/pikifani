import { Game, RecievedInvite, SentInvite, Waiting } from './../../interfaces/table';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { games, receivedInvites, sentInvites, waitingGames } from 'src/app/mocks/mock-games';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private userId: number;

    private readonly basicUrl = '';

    constructor(
        private httpClient: HttpClient
    ) { }

    getWaitingGames(): Observable<Waiting[]> {
        const url = `${this.basicUrl}/${this.userId}`;
        // this.httpClient.get<Waiting[]>(url);
        return of(waitingGames);
    }

    getSentInvites(): Observable<SentInvite[]> {
        const url = `${this.basicUrl}/${this.userId}`;
        // this.httpClient.get<SentInvite[]>(url);
        return of(sentInvites);
    }

    getReceivedInvites(): Observable<RecievedInvite[]> {
        const url = `${this.basicUrl}/${this.userId}`;
        // this.httpClient.get<RecievedInvite[]>(url);
        return of(receivedInvites);
    }

    getGames(): Observable<Game[]> {
        const url = `${this.basicUrl}/${this.userId}`;
        // this.httpClient.get<Game[]>(url);
        return of(games);
    }
}