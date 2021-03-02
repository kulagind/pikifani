import { GameResult } from '@interfaces/chat';
import { AuthService } from '@services/auth.service';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnInit {

  title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GameResult,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.setTitle();
  }

  setTitle(): void {
    if (this.data.winner === this.authService.id) {
      this.title = `Победа!`;
    } else {
      this.title = `Поражение!`;
    }
  }
}
