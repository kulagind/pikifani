import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit, OnDestroy {

  private destroy$ = new ReplaySubject<void>(1);

  readonly word = 'word';
  readonly withFriend = 'withFriend';
  readonly friendName = 'friendName';

  public newGameForm: FormGroup = new FormGroup({
    [this.word]: new FormControl('', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(4),
      Validators.pattern('[А-Яа-я]{4}')
    ]),
    [this.withFriend]: new FormControl(false),
    [this.friendName]: new FormControl({value: '', disabled: true}),
  });

  constructor() { }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.listenForm();
  }

  private listenForm(): void {
    this.newGameForm.get(this.withFriend).valueChanges.pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe((withFriend: boolean) => {
      if (withFriend) {
        this.newGameForm.get(this.friendName).enable();
        this.newGameForm.get(this.friendName).setValidators([Validators.required]);
      } else {
        this.newGameForm.get(this.friendName).disable();
        this.newGameForm.get(this.friendName).clearValidators();
      }
    });

    this.newGameForm.get(this.word).valueChanges.pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe((word: string) => {
      this.newGameForm.get(this.word).setValue(word.trim());
    });
  }

}
