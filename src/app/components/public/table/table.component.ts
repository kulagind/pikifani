import { AuthService } from '@services/auth.service';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TableData } from '@interfaces/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  @Input() data: TableData;
  @Input() title: string;
  @Output() onClick = new EventEmitter<any>();

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {    
  }

  action(row: any): void {
    this.onClick.emit(row);
  }
}
