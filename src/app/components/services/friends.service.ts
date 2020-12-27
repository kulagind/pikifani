import { User } from 'src/app/interfaces/user';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {
    private friends = new ReplaySubject<User[]>(1);
    private sentFriendsInvites = new ReplaySubject<User[]>(1);
    private receivedFriendsInvites = new ReplaySubject<User[]>(1);

    constructor(
        private httpService: HttpService
    ) { }

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

    fetchFriends(): void {
        this.httpService.getFriends().pipe(
            tap(friends => {
                this.setFriends(friends);
            })
        ).subscribe();
    }

    fetchSentFriendsInvites(): void {
        this.httpService.getSentFriendsInvites().pipe(
            tap(friends => {
                this.setSentFriendsInvites(friends);
            })
        ).subscribe();
    }

    fetchReceivedFriendsInvites(): void {
        this.httpService.getReceivedFriendsInvites().pipe(
            tap(friends => {
                this.setReceivedFriendsInvites(friends);
            })
        ).subscribe();
    }
}