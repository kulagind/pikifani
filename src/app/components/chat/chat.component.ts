import { HttpService } from './../services/http.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/interfaces/chat';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

  chat: Chat;

  public wordForm: FormGroup = new FormGroup({
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

  constructor(
    private httpService: HttpService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.httpService.getChatById().subscribe(chat => {
      this.chat = chat;
    });
  }
}
