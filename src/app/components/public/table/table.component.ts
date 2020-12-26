import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TableData } from 'src/app/interfaces/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  @Input() data: TableData;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {    
  }
}