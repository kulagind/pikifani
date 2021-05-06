import { MatDialog } from '@angular/material/dialog';
import { GameService } from '@services/game.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { storageLetters } from 'src/app/utils/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {

  isButtonDisabled: boolean = true;

  lettersForm: FormGroup = new FormGroup({
    l1: new FormControl(''),
    l2: new FormControl(''),
    l3: new FormControl(''),
    l4: new FormControl(''),
  });

  wordInput = new FormControl('', [
    Validators.required,
    Validators.minLength(4), 
    Validators.maxLength(4),
    Validators.pattern('[А-Яа-я]{4}')
  ]);

  private destroy$ = new ReplaySubject<void>(1);

  constructor(
    public gameService: GameService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.gameService.setOpenedGameId('');
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.setGame();
    this.listenForm();
    this.setLetters();
  }

  private setGame(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe(params => {
      this.gameService.findGame(params.id);

      this.getLetters(params.id);
    });
  }

  private listenForm(): void {
    this.wordInput.valueChanges.pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe((word: string) => {
      this.wordInput.setValue(word.trim());
    });
  }

  sendMessage(): void {
    if (this.wordInput.valid) {
      this.gameService.sendMessage(this.wordInput.value).subscribe(() => {
        this.wordInput.setValue('');
      });
    }
  }

  private getLetters(id: string): void {
    const letters = storageLetters(id);

    for (let control in this.lettersForm.controls) {
      this.lettersForm.get(control).setValue(letters[control] || '');
    }
  }

  private setLetters(): void {
    this.lettersForm.valueChanges.subscribe(value => {
      storageLetters(this.gameService.openedGameId, {...value});
    })
  }
}
