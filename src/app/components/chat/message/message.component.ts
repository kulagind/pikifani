import { AuthService } from './../../services/auth.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/chat';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnInit {

  @Input() message: Message;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
