import { AuthService } from '@services/auth.service';
import { navlist } from './models/navbar';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  navlist = navlist;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }  
}
