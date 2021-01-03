import { HttpService } from './../services/http.service';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Chat } from 'src/app/interfaces/chat';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {

  chat: Chat;

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
    public authService: AuthService
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.httpService.getChatById().subscribe(chat => {
      this.chat = chat;
    });

    this.listenForm();
  }

  private listenForm(): void {
    if (this.chat.turnId !== this.authService.userId) {
      this.wordInput.disable();
    }

    this.wordInput.valueChanges.pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe((word: string) => {
      this.wordInput.setValue(word.trim());
    });
  }
}
