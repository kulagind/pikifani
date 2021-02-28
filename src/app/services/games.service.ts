import { SseService } from '@services/sse.service';
import { GameInvitesFromReq } from '@interfaces/invites';
import { HttpService } from '@services/http.service';
import { ReceivedInvite, SentInvite, Waiting } from '@interfaces/table';
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from 'rxjs';
import { SentGameInvite, WaitingGame } from '@interfaces/invites';
import { ChatFromRes, CreateChat } from '@interfaces/chat';
import { SseMessageHandlable, SSEType } from '@interfaces/sse';

@Injectable({
    providedIn: 'root'
})
export class GamesService implements SseMessageHandlable {
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
        this.sseService.setMessageHandler(SSEType.invites, this);
    }

    private getGameInvites(): void {
        this.httpService.getGameInvites().subscribe(result => {
            this.setData(result);
        });
    }

    private getGameChats(): void {
        this.httpService.getGameChats().subscribe(result => {
            this.games.next(result.chats);
        });
    }

    createGameInvite(newGame: WaitingGame | SentGameInvite): void {
        this.httpService.createGame(newGame).subscribe();
    }

    createGameChat(newGame: CreateChat): void {
        this.httpService.startGameChat(newGame).subscribe();
    }

    setData(data: GameInvitesFromReq): void {
        this.waitingGames.next(data.waiting);
        this.receivedInvites.next(data.received);
        this.sentInvites.next(data.sent);
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