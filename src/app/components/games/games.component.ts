import { ChatFromRes } from '@interfaces/chat';
import { TableService } from '@services/table.service';
import { GamesService } from '@services/games.service';
import { TableData } from '@interfaces/table';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.gamesService.games$.subscribe(games => {
      this.games = this.tableService.toTable(games);
      this.cdr.detectChanges();
    })
  }

  open(item: ChatFromRes): void {
    console.log(item);
    
    // this.router.navigate([gameId], {relativeTo: this.activatedRoute});
  }
}
