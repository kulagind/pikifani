import { User } from 'src/app/interfaces/user';
import { TableService } from './../services/table.service';
import { FriendsService } from './../services/friends.service';
import { TableData } from './../../interfaces/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendsComponent implements OnInit {

  friends: TableData;
  receivedInvites: TableData;
  sentInvites: TableData;

  name: string = '';

  constructor(
    private friendsService: FriendsService,
    private tableService: TableService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.setFriendsToTable();
  }

  private setFriendsToTable(): void {
    this.friendsService.friends$.subscribe(friends => {
      this.friends = this.tableService.toTable(friends);
      this.cdr.detectChanges();
    });
    this.friendsService.receivedFriendsInvites$.subscribe(friends => {
      this.receivedInvites = this.tableService.toTable(friends);
      this.cdr.detectChanges();
    });
    this.friendsService.sentFriendsInvites$.subscribe(friends => {
      this.sentInvites = this.tableService.toTable(friends);
      this.cdr.detectChanges();
    });
  }

  sendInvite(name: string): void {
    this.friendsService.sendFriendInvite(name);
  }

  openInviteModal(item: User, table: string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {table, item}
    });

    dialogRef.afterClosed().subscribe((id: string) => {
      if (id) {
        this.friendsService.addFriend(id);
      }
    });
  }

}
