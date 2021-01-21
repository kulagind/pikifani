import { WaitingGame, SentGameInvite, GameInvitesFromReq } from './../../interfaces/invites';
import { JWT, PublicKey } from './../../interfaces/token';
import { User } from 'src/app/interfaces/user';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mergeMap } from 'rxjs/operators';
import * as crypto from 'crypto';
import { InvitesFromReq } from 'src/app/interfaces/invites';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private userId: number;

    private readonly basicUrl = `${environment.baseUrl}`;
    private readonly chatUrl = `${environment.baseUrl}/chat`;
    private readonly userUrl = `${environment.baseUrl}/user`;
    private readonly authUrl = `${environment.baseUrl}/auth`;
    private readonly friendUrl = `${environment.baseUrl}/friend`;
    private readonly gameUrl = `${environment.baseUrl}/game`;
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
        return this.http.get<GameInvitesFromReq>(`${this.gameUrl}`);
    }

    createGame(newGame: WaitingGame | SentGameInvite): Observable<WaitingGame | SentGameInvite> {
        return this.http.post<WaitingGame | SentGameInvite>(`${this.gameUrl}/create`, newGame);
    }

    getWords(): any {
       this.http.get(`${this.basicUrl}/word`);
    }
}