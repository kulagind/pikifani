import { HttpService } from './http.service';
import { Game, ReceivedInvite, SentInvite, Waiting } from 'src/app/interfaces/table';
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from 'rxjs';
import { SentGameInvite, WaitingGame } from 'src/app/interfaces/invites';

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    private waitingGames = new ReplaySubject<Waiting[]>(1);
    private receivedInvites = new ReplaySubject<ReceivedInvite[]>(1);
    private sentInvites = new ReplaySubject<SentInvite[]>(1);
    private games = new ReplaySubject<Game[]>(1);

    constructor(
        private httpService: HttpService
    ) {
        this.getGameInvites();
    }

    createGame(newGame: WaitingGame | SentGameInvite): void {
        this.httpService.createGame(newGame).subscribe(() => {
            this.getGameInvites();
        });
    }

    private getGameInvites(): void {
        this.httpService.getGameInvites().subscribe(result => {
            this.waitingGames.next(result.waiting);
            this.receivedInvites.next(result.received);
            this.sentInvites.next(result.sent);
        });
    }

    get waitingGames$(): Observable<Waiting[]> {
        return this.waitingGames.asObservable();
    }

    get games$(): Observable<Game[]> {
        return this.games.asObservable();
    }

    get receivedInvites$(): Observable<ReceivedInvite[]> {
        return this.receivedInvites.asObservable();
    }

    get sentInvites$(): Observable<SentInvite[]> {
        return this.sentInvites.asObservable();
    }
}