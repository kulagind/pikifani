import { ResultComponent } from '@components/chat/modal/result.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '@services/http.service';
import { SseService } from '@services/sse.service';
import { ReplaySubject, Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { OpenedGame } from "@interfaces/chat";
import { SSEType } from '@interfaces/sse';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private openedGame: ReplaySubject<OpenedGame> = new ReplaySubject<OpenedGame>(1);
    private _openedGameId: string;

    constructor(
        private sseService: SseService,
        private httpService: HttpService,
        private matDialog: MatDialog,
        private router: Router
    ) {
        this.sseService.setMessageHandler(SSEType.game, this.setGameFromSSE.bind(this));
    }

    setGame(data: OpenedGame): void {
        this.openedGame.next(data);        
        if (data.winner && data.info.gameId === this._openedGameId) {
            this.openResultDialog(this._openedGameId);
        }
    }

    setGameFromSSE(data: OpenedGame): void {
        if (this._openedGameId !== data.info.gameId) {
            this.setGame(data);
        }
    }

    get openedGame$(): Observable<OpenedGame> {
        return this.openedGame.asObservable();
    }

    setOpenedGameId(id: string): void {
        this._openedGameId = id;
    }

    findGame(id: string): void {
        this.httpService.getCurrentGame(id).subscribe(game => {
            this.setOpenedGameId(id);    
            this.setGame(game);
        });
    }

    sendMessage(word: string): Observable<void> {
        return this.httpService.sendMessage(this._openedGameId, word);
    }

    private openResultDialog(id: string): void {
        this.httpService.getResult(id).subscribe(result => {
            const dialog = this.matDialog.open(ResultComponent, {data: result});

            dialog.afterClosed().subscribe(() => {
                this.router.navigate(['/games']);
            });
        });
    }
}