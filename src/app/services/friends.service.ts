import { SseService } from '@services/sse.service';
import { User } from 'src/app/interfaces/user';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from 'rxjs';
import { InvitesFromReq } from 'src/app/interfaces/invites';
import { SSEType } from '@interfaces/sse';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {
    private friends = new ReplaySubject<User[]>(1);
    private sentFriendsInvites = new ReplaySubject<User[]>(1);
    private receivedFriendsInvites = new ReplaySubject<User[]>(1);

    constructor(
        private httpService: HttpService,
        private sseService: SseService
    ) {
        this.sseService.setMessageHandler(SSEType.friends, this.setData.bind(this));
    }

    sendFriendInvite(name: string): void {
        this.httpService.sendFriendInvite(name).subscribe();
    }

    getFriends(): void {
        this.httpService.getFriends().subscribe((result: InvitesFromReq) => {
            this.setData(result);
        });
    }

    addFriend(id: string): void {
        this.httpService.addFriend(id).subscribe();
    }

    private setData(data: InvitesFromReq): void {
        this.sentFriendsInvites.next(data.sent);
        this.receivedFriendsInvites.next(data.received);
        this.friends.next(data.friends);
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