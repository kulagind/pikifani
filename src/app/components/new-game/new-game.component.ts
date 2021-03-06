import { TableData, ReceivedInvite } from '@interfaces/table';
import { TableService } from '@services/table.service';
import { GamesService } from '@services/games.service';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { debounceTime, filter, map, mergeMap, startWith, takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { FriendsService } from '@services/friends.service';
import { User } from '@interfaces/user';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewGameComponent implements OnInit, OnDestroy {

  private destroy$ = new ReplaySubject<void>(1);

  readonly word = 'word';
  readonly withFriend = 'withFriend';
  readonly name = 'name';

  public receivedGame: ReceivedInvite | null;

  public waitingData: TableData;
  public receivedInvitesData: TableData;
  public sentInvitesData: TableData;

  public isFormOpened = false;

  public newGameForm: FormGroup = new FormGroup({
    [this.word]: new FormControl('', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(4),
      Validators.pattern('[А-Яа-я]{4}')
    ]),
    [this.withFriend]: new FormControl(false),
    [this.name]: new FormControl({value: '', disabled: true}),
  });

  public filteredOptions: Observable<User[]>;

  constructor(
    private gamesService: GamesService,
    private tableService: TableService,
    private cdr: ChangeDetectorRef,
    private friendsService: FriendsService
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.friendsService.getFriends();
    this.gamesService.getGameInvites();
    this.setTables();
    this.listenForm();
    this.setAutocomplete();
  }

  private setAutocomplete() {
    this.filteredOptions = this.newGameForm.get('name').valueChanges.pipe(
      startWith(''),
      map((value: User) => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.friendsService._friends.slice())
    );
  }

  private _filter(name: string = ''): User[] {
    const filterValue = name.toLowerCase();

    return this.friendsService._friends.filter(friend => friend.name.toLowerCase().includes(filterValue));
  }

  private listenForm(): void {
    this.newGameForm.get(this.withFriend).valueChanges.pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe((withFriend: boolean) => {
      if (withFriend) {
        this.newGameForm.get(this.name).enable();
        this.newGameForm.get(this.name).setValidators([Validators.required, Validators.minLength(2)]);
        this.newGameForm.get(this.name).setValue('');
      } else {
        this.newGameForm.get(this.name).disable();
        this.newGameForm.get(this.name).clearValidators();
        this.newGameForm.get(this.name).setValue('');
      }
    });

    this.newGameForm.get(this.word).valueChanges.pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe((word: string) => {
      this.newGameForm.get(this.word).setValue(word.trim());
    });
  }

  private setTables(): void {
    this.gamesService.waitingGames$.subscribe(games => {
      this.waitingData = this.tableService.toTable(games);
      this.cdr.detectChanges();
    });
    this.gamesService.receivedInvites$.subscribe(games => {
      this.receivedInvitesData = this.tableService.toTable(games);
      this.cdr.detectChanges();
    });
    this.gamesService.sentInvites$.subscribe(games => {
      this.sentInvitesData = this.tableService.toTable(games);
      this.cdr.detectChanges();
    });
  }

  openForm(): void {
    this.isFormOpened = true;
  }

  createGame(): void {
    if (!this.newGameForm.invalid) {
      if (this.receivedGame?._id) {
        this.gamesService.createGameChat({inviteId: this.receivedGame?._id, word: this.newGameForm.get(this.word).value});
        this.receivedGame = null;
      } else {
        this.gamesService.createGameInvite(this.newGameForm.value);
      }
      this.newGameForm.get(this.name).setValue('');
      this.newGameForm.get(this.withFriend).setValue(false);
      this.newGameForm.get(this.word).setValue('');
    }
  }

  receiveGame(item: ReceivedInvite): void {
    this.openForm();
    this.receivedGame = {...item};
  }
}
