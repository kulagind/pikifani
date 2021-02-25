import { User } from 'src/app/interfaces/user';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from 'rxjs';
import { InvitesFromReq } from 'src/app/interfaces/invites';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {
    private friends = new ReplaySubject<User[]>(1);
    private sentFriendsInvites = new ReplaySubject<User[]>(1);
    private receivedFriendsInvites = new ReplaySubject<User[]>(1);

    constructor(
        private httpService: HttpService
    ) {
        this.getFriends();
    }

    sendFriendInvite(name: string): void {
        this.httpService.sendFriendInvite(name).subscribe(() => {
            this.getFriends();
        });
    }

    private getFriends(): void {
        this.httpService.getFriends().subscribe((result: InvitesFromReq) => {
            this.sentFriendsInvites.next(result.sent);
            this.receivedFriendsInvites.next(result.received);
            this.friends.next(result.friends);
        });
    }

    addFriend(id: string): void {
        this.httpService.addFriend(id).subscribe(() => {
            this.getFriends();
        });
    }

    get friends$(): Observable<User[]> {
        return this.friends.asObservable();
    }

    get receivedFriendsInvites$(): Observable<User[]> {
        return this.receivedFriendsInvites.asObservable();
    }

    get sentFriendsInvites$(): Observable<User[]> {
        return this.sentFriendsInvites.asObservable();
    }
}