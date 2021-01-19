import { HttpService } from './components/services/http.service';
import { AuthService } from './components/services/auth.service';
import { FriendsService } from './components/services/friends.service';
import { GamesService } from './components/services/games.service';
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
    public authService: AuthService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.authService.initCurrentUser();
  }  
}
