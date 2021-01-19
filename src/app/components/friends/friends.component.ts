import { TableService } from './../services/table.service';
import { FriendsService } from './../services/friends.service';
import { TableData } from './../../interfaces/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: TableData;
  receivedInvites: TableData;
  sentInvites: TableData;

  name: string = '';

  constructor(
    private friendsService: FriendsService,
    private tableService: TableService
  ) { }

  ngOnInit(): void {
    this.friendsService.getFriends();
    this.setFriendsToTable();
  }

  private setFriendsToTable(): void {
    this.friendsService.friends$.subscribe(friends => {
      this.friends = this.tableService.toTable(friends);
    });
    this.friendsService.receivedFriendsInvites$.subscribe(friends => {
      this.receivedInvites = this.tableService.toTable(friends);
    });
    this.friendsService.sentFriendsInvites$.subscribe(friends => {
      this.sentInvites = this.tableService.toTable(friends);
    });
  }

  sendInvite(name: string): void {
    this.friendsService.sendFriendInvite(name);
  }

}
