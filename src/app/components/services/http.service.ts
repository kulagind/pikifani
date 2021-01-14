import { mockChat } from './../../mocks/chat';
import { currentUser } from './../../mocks/user';
import { User } from 'src/app/interfaces/user';
import { friends, receivedFriendsInvites, sentFriendsInvites } from './../../mocks/friends';
import { Game, RecievedInvite, SentInvite, Waiting } from './../../interfaces/table';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { games, receivedInvites, sentInvites, waitingGames } from 'src/app/mocks/mock-games';
import { Chat } from 'src/app/interfaces/chat';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private userId: number;

    private readonly basicUrl = `${environment.baseUrl}`;
    private readonly chatUrl = `${environment.baseUrl}/chat`;
    private readonly sseUrl = `${environment.baseUrl}/sse`;

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

    getChatById(chatId?: number): Observable<Chat> {
        const url = `${this.basicUrl}/${chatId}`;
        // this.httpClient.get<Chat>(url);
        return of(mockChat);
    }

    connetToChatById(chatId?: number): any {
        let chat = new EventSource(`${this.sseUrl}`);

        chat.onmessage = (event: MessageEvent) => {
            console.log(JSON.parse(event.data));
        }
    }

    getWords(): any {
       this.httpClient.get(`${this.basicUrl}/word`).subscribe(words => {
           console.log(words);
       });
    }
}