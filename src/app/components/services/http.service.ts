import { currentUser } from './../../mocks/user';
import { User } from 'src/app/interfaces/user';
import { friends, receivedFriendsInvites, sentFriendsInvites } from './../../mocks/friends';
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

    auth(name: string, password: string): Observable<User> {
        const url = `${this.basicUrl}`;
        // this.httpClient.get<Waiting[]>(url);
        return of(currentUser);
    }

    getWaitingGames(): Observable<Waiting[]> {
        const url = `${this.basicUrl}/${this.userId}`;
        // this.httpClient.get<Waiting[]>(url);
        return of(waitingGames);
    }

    // createGame(): Observable<void> {
    // }

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

    getFriends(): Observable<User[]> {
        const url = `${this.basicUrl}/${this.userId}`;
        // this.httpClient.get<Game[]>(url);
        return of(friends);
    }

    getSentFriendsInvites(): Observable<User[]> {
        const url = `${this.basicUrl}/${this.userId}`;
        // this.httpClient.get<Game[]>(url);
        return of(receivedFriendsInvites);
    }

    getReceivedFriendsInvites(): Observable<User[]> {
        const url = `${this.basicUrl}/${this.userId}`;
        // this.httpClient.get<Game[]>(url);
        return of(sentFriendsInvites);
    }
}