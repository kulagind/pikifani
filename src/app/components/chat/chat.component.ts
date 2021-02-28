import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@services/http.service';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {

  private gameId: string = '';

  wordForm: FormGroup = new FormGroup({
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
    private httpService: HttpService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.setGameId();
    // this.httpService.getChatById().subscribe(chat => {
    //   this.chat = chat;
    // });

    // this.listenForm();
  }

  private setGameId(): void {
    this.activatedRoute.params.subscribe(params => {
      this.gameId = params.id;
      console.log(this.gameId);
      
    })
  }

  // private listenForm(): void {
  //   if (this.chat.turnId !== this.authService.id) {
  //     this.wordInput.disable();
  //   }

  //   this.wordInput.valueChanges.pipe(
  //     debounceTime(100),
  //     takeUntil(this.destroy$)
  //   ).subscribe((word: string) => {
  //     this.wordInput.setValue(word.trim());
  //   });
  // }
}
