import { AuthService } from './components/services/auth.service';
import { FriendsService } from './components/services/friends.service';
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
    private gamesService: GamesService,
    private friendsService: FriendsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.auth('admin', 'admin');
    this.gamesService.fetchWaitingGames();
    this.gamesService.fetchReceivedGamesInvites();
    this.gamesService.fetchSentGamesInvites();
    this.gamesService.fetchGames();
    this.friendsService.fetchFriends();
    this.friendsService.fetchReceivedFriendsInvites();
    this.friendsService.fetchSentFriendsInvites();
  }  
}
