import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {

  title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {table: string, item: User},
    private dialogRef: MatDialogRef<ModalComponent>
  ) { }

  ngOnInit(): void {
    this.setTitle();
  }

  setTitle(): void {
    if (this.data.table === 'sent') {
      this.title = `Отправленный запрос в друзья ${this.data.item.name || ''}`;
    } else if (this.data.table === 'received') {
      this.title = `Запрос в друзья от ${this.data.item.name || ''}`;
    } else {
      this.title = `Ваш друг ${this.data.item.name || ''}`;
    }
  }

  addFriend(): void {
    this.dialogRef.close(this.data.item._id);
  }

}
