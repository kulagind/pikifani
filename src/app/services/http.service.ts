import { GameResult, OpenedGame } from '@interfaces/chat';
import { WaitingGame, SentGameInvite, GameInvitesFromReq } from '@interfaces/invites';
import { JWT, PublicKey } from '@interfaces/token';
import { User } from '@interfaces/user';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mergeMap } from 'rxjs/operators';
import * as crypto from 'crypto';
import { InvitesFromReq } from '@interfaces/invites';
import { ChatFromRes, CreateChat } from '@interfaces/chat';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private userId: number;

    private readonly basicUrl = `${environment.baseUrl}`;
    private readonly chatUrl = `${environment.baseUrl}/chat`;
    private readonly userUrl = `${environment.baseUrl}/user`;
    private readonly authUrl = `${environment.baseUrl}/auth`;
    private readonly friendUrl = `${environment.baseUrl}/friends`;
    private readonly gameInvitesUrl = `${environment.baseUrl}/invites`;
    private readonly gameChatsUrl = `${environment.baseUrl}/games`;

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

    register(name: string, email: string, password: string, confirmPassword: string): Observable<JWT> {
        return this.getPublicKeyForPassword().pipe(
            mergeMap(result => {
                return this.http.post<JWT>(`${this.authUrl}/register`, {
                    name,
                    email,
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

    sendFriendInvite(name: string): Observable<User> {
        return this.http.post<User>(`${this.friendUrl}`, {name});
    }

    getFriends(): Observable<InvitesFromReq> {
        return this.http.get<InvitesFromReq>(`${this.friendUrl}/all`);
    }

    addFriend(id: string): Observable<User> {
        return this.http.post<User>(`${this.friendUrl}/add`, {id});
    }

    getGameInvites(): Observable<GameInvitesFromReq> {
        return this.http.get<GameInvitesFromReq>(`${this.gameInvitesUrl}`);
    }

    createGame(newGame: WaitingGame | SentGameInvite): Observable<WaitingGame | SentGameInvite> {
        return this.http.post<WaitingGame | SentGameInvite>(`${this.gameInvitesUrl}/create`, newGame);
    }

    getGameChats(): Observable<{chats: ChatFromRes[]}> {
        return this.http.get<{chats: ChatFromRes[]}>(`${this.gameChatsUrl}`);
    }

    startGameChat(gameRes: CreateChat): Observable<ChatFromRes> {
        return this.http.post<ChatFromRes>(`${this.gameChatsUrl}`, gameRes);
    }

    getCurrentGame(id: string): Observable<OpenedGame> {
        return this.http.get<OpenedGame>(`${this.chatUrl}/${id}`);
    }

    sendMessage(id: string, message: string): Observable<void> {
        return this.http.post<void>(`${this.chatUrl}/${id}`, {word: message});
    }

    getResult(id: string): Observable<GameResult> {
        return this.http.get<GameResult>(`${this.chatUrl}/result/${id}`);
    }

    getWords(): any {
       this.http.get(`${this.basicUrl}/word`);
    }
}