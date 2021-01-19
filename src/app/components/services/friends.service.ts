import { User } from 'src/app/interfaces/user';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { InvitesFromReq } from 'src/app/interfaces/invites';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {
    private friends = new ReplaySubject<User[]>(1);
    private sentFriendsInvites = new ReplaySubject<User[]>(1);
    private receivedFriendsInvites = new ReplaySubject<User[]>(1);

    constructor(
        private httpService: HttpService,
        private authService: AuthService
    ) { }

    sendFriendInvite(name: string): void {
        this.httpService.sendFriendInvite(name).subscribe();
    }

    getFriends(): void {
        this.httpService.getFriends().subscribe((result: InvitesFromReq) => {
            this.sentFriendsInvites.next(result.sent);
            this.receivedFriendsInvites.next(result.received);
            this.friends.next(result.friends);
        });
    }

    private setFriends(friends: User[]): void {
        this.friends.next(friends);
    }

    get friends$(): Observable<User[]> {
        return this.friends.asObservable();
    }
    
    private setReceivedFriendsInvites(friends: User[]): void {
        this.receivedFriendsInvites.next(friends);
    }

    get receivedFriendsInvites$(): Observable<User[]> {
        return this.receivedFriendsInvites.asObservable();
    }
    
    private setSentFriendsInvites(friends: User[]): void {
        this.sentFriendsInvites.next(friends);
    }

    get sentFriendsInvites$(): Observable<User[]> {
        return this.sentFriendsInvites.asObservable();
    }
}