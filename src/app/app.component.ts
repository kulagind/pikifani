import { GamesService } from './components/services/games.service';
import { HttpService } from './components/services/http.service';
import { navlist } from './models/navbar';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  navlist = navlist;

  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.gamesService.fetchWaitingGames();
    this.gamesService.fetchReceivedInvites();
    this.gamesService.fetchSentInvites();
    this.gamesService.fetchGames();
  }  
}
