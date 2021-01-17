import { JWT, PublicKey } from './../../interfaces/token';
import { User } from 'src/app/interfaces/user';
import { Game, RecievedInvite, SentInvite, Waiting } from './../../interfaces/table';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Chat } from 'src/app/interfaces/chat';
import { environment } from 'src/environments/environment';
import { mergeMap } from 'rxjs/operators';
import * as crypto from 'crypto';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private userId: number;

    private readonly basicUrl = `${environment.baseUrl}`;
    private readonly chatUrl = `${environment.baseUrl}/chat`;
    private readonly userUrl = `${environment.baseUrl}/user`;
    private readonly authUrl = `${environment.baseUrl}/auth`;
    private readonly sseUrl = `${environment.baseUrl}/sse`;

    constructor(
        private http: HttpClient
    ) { }

    login(name: string, password: string): Observable<JWT> {
        return this.getPublicKeyForPassword().pipe(
            mergeMap(result => {
                return this.http.post<JWT>(`${this.authUrl}/login`, {
                    name,
                    password: crypto.publicEncrypt(result.publicKey, Buffer.from(password, 'utf-8')).toString('base64'),
                    publicKey: result.publicKey
                });
            })
        );
    }

    register(name: string, password: string, confirmPassword: string): Observable<JWT> {
        return this.getPublicKeyForPassword().pipe(
            mergeMap(result => {
                return this.http.post<JWT>(`${this.authUrl}/register`, {
                    name,
                    password: crypto.publicEncrypt(result.publicKey, Buffer.from(password, 'utf-8')).toString('base64'),
                    confirmPassword: crypto.publicEncrypt(result.publicKey, Buffer.from(confirmPassword, 'utf-8')).toString('base64'),
                    publicKey: result.publicKey
                });
            })
        );
    }

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${this.userUrl}`);
    }

    private getPublicKeyForPassword(): Observable<PublicKey> {
        return this.http.get<PublicKey>(`${this.authUrl}/key`);
    }

    // getWaitingGames(): Observable<Waiting[]> {
    //     const url = `${this.basicUrl}/${this.userId}`;
    //     // this.httpClient.get<Waiting[]>(url);
    //     return of(waitingGames);
    // }

    // createGame(): Observable<void> {
    // }

    // getSentInvites(): Observable<SentInvite[]> {
    //     const url = `${this.basicUrl}/${this.userId}`;
    //     // this.httpClient.get<SentInvite[]>(url);
    //     return of(sentInvites);
    // }

    // getReceivedInvites(): Observable<RecievedInvite[]> {
    //     const url = `${this.basicUrl}/${this.userId}`;
    //     // this.httpClient.get<RecievedInvite[]>(url);
    //     return of(receivedInvites);
    // }

    // getGames(): Observable<Game[]> {
    //     const url = `${this.basicUrl}/${this.userId}`;
    //     // this.httpClient.get<Game[]>(url);
    //     return of(games);
    // }

    // getFriends(): Observable<User[]> {
    //     const url = `${this.basicUrl}/${this.userId}`;
    //     // this.httpClient.get<Game[]>(url);
    //     return of(friends);
    // }

    // getSentFriendsInvites(): Observable<User[]> {
    //     const url = `${this.basicUrl}/${this.userId}`;
    //     // this.httpClient.get<Game[]>(url);
    //     return of(receivedFriendsInvites);
    // }

    // getReceivedFriendsInvites(): Observable<User[]> {
    //     const url = `${this.basicUrl}/${this.userId}`;
    //     // this.httpClient.get<Game[]>(url);
    //     return of(sentFriendsInvites);
    // }

    // getChatById(chatId?: number): Observable<Chat> {
    //     const url = `${this.basicUrl}/${chatId}`;
    //     // this.httpClient.get<Chat>(url);
    //     return of(mockChat);
    // }

    // connetToChatById(chatId?: number): any {
    //     console.log(chatId);
        
    //     let chat = new EventSource(`${this.sseUrl}/${chatId}`);

    //     chat.onmessage = (event: MessageEvent) => {
    //         console.log(JSON.parse(event.data));
    //     }
    // }

    getWords(): any {
       this.http.get(`${this.basicUrl}/word`).subscribe(words => {
           console.log(words);
       });
    }
}