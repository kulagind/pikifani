import { AppComponent } from './../app.component';
import { SseService } from '@services/sse.service';
import { GameInvitesFromReq } from '@interfaces/invites';
import { HttpService } from '@services/http.service';
import { ReceivedInvite, SentInvite, Waiting } from '@interfaces/table';
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from 'rxjs';
import { SentGameInvite, WaitingGame } from '@interfaces/invites';
import { ChatFromRes, CreateChat } from '@interfaces/chat';
import { SSEType } from '@interfaces/sse';

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    private waitingGames = new ReplaySubject<Waiting[]>(1);
    private receivedInvites = new ReplaySubject<ReceivedInvite[]>(1);
    private sentInvites = new ReplaySubject<SentInvite[]>(1);
    private games = new ReplaySubject<ChatFromRes[]>(1);

    constructor(
        private httpService: HttpService,
        private sseService: SseService
    ) {
        this.getGameInvites();
        this.getGameChats();
        this.sseService.setMessageHandler(SSEType.invites, this.setInvitesData.bind(this));
        this.sseService.setMessageHandler(SSEType.games, this.setGamesData.bind(this));
    }

    getGameInvites(): void {
        this.httpService.getGameInvites().subscribe(result => {
            this.setInvitesData(result);
        });
    }

    getGameChats(): void {
        this.httpService.getGameChats().subscribe(result => {
            this.setGamesData(result.chats);
        });
    }

    createGameInvite(newGame: WaitingGame | SentGameInvite): void {
        this.httpService.createGame(newGame).subscribe();
    }

    createGameChat(newGame: CreateChat): void {
        this.httpService.startGameChat(newGame).subscribe();
    }

    private setInvitesData(data: GameInvitesFromReq): void {
        this.waitingGames.next(data.waiting);
        this.receivedInvites.next(data.received);
        this.sentInvites.next(data.sent);
    }

    private setGamesData(data: ChatFromRes[]): void {
        this.games.next(data);
    }

    get waitingGames$(): Observable<Waiting[]> {
        return this.waitingGames.asObservable();
    }

    get games$(): Observable<ChatFromRes[]> {
        return this.games.asObservable();
    }

    get receivedInvites$(): Observable<ReceivedInvite[]> {
        return this.receivedInvites.asObservable();
    }

    get sentInvites$(): Observable<SentInvite[]> {
        return this.sentInvites.asObservable();
    }
}