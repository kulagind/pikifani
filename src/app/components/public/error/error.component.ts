import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ErrorService } from '@services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {

  constructor(
    public errorService: ErrorService
  ) { }

  ngOnInit(): void {    
  }

  close(): void {
    this.errorService.setError('');
  }
}
