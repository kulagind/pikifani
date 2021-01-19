import { HttpService } from './http.service';
import { Game, RecievedInvite, SentInvite, TableData, Waiting } from 'src/app/interfaces/table';
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    private waitingGames = new ReplaySubject<Waiting[]>(1);
    private receivedInvites = new ReplaySubject<RecievedInvite[]>(1);
    private sentInvites = new ReplaySubject<SentInvite[]>(1);
    private games = new ReplaySubject<Game[]>(1);

    constructor(
        private httpService: HttpService
    ) { }

    private setWaitingGames(games: Waiting[]): void {
        this.waitingGames.next(games);
    }

    get waitingGames$(): Observable<Waiting[]> {
        return this.waitingGames.asObservable();
    }

    private setGames(games: Game[]): void {
        this.games.next(games);
    }

    get games$(): Observable<Game[]> {
        return this.games.asObservable();
    }

    private setRecievedInvites(games: RecievedInvite[]): void {
        this.receivedInvites.next(games);
    }

    get receivedInvites$(): Observable<RecievedInvite[]> {
        return this.receivedInvites.asObservable();
    }

    private setSentInvites(games: SentInvite[]): void {
        this.sentInvites.next(games);
    }

    get sentInvites$(): Observable<SentInvite[]> {
        return this.sentInvites.asObservable();
    }

    fetchWaitingGames(): void {
        // this.httpService.getWaitingGames().pipe(
        //     tap(games => {
        //         this.setWaitingGames(games);
        //     })
        // ).subscribe();
    }

    fetchGames(): void {
        // this.httpService.getGames().pipe(
        //     tap(games => {
        //         this.setGames(games);
        //     })
        // ).subscribe();
    }

    fetchReceivedGamesInvites(): void {
        // this.httpService.getReceivedInvites().pipe(
        //     tap(games => {
        //         this.setRecievedInvites(games);
        //     })
        // ).subscribe();
    }

    fetchSentGamesInvites(): void {
        // this.httpService.getSentInvites().pipe(
        //     tap(games => {
        //         this.setSentInvites(games);
        //     })
        // ).subscribe();
    }
}