import { TableService } from './../services/table.service';
import { GamesService } from './../services/games.service';
import { TableData } from 'src/app/interfaces/table';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { games } from 'src/app/mocks/mock-games';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent implements OnInit {

  games: TableData;

  constructor(
    private gamesService: GamesService,
    private tableService: TableService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.gamesService.games$.subscribe(games => {
      this.games = this.tableService.toTable(games);
    })
  }

  open(gameId: number): void {
    this.router.navigate([gameId], {relativeTo: this.activatedRoute});
  }
}
