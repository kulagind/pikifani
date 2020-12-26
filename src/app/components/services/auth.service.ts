import { Waiting } from './../../interfaces/table';
import { Injectable } from "@angular/core";
import { ReplaySubject } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userId: number;
    private user = new ReplaySubject<User>(1);

    auth(user: User): void {
        this.userId = user.id;
        this.user.next(user);
    }
}