import { HttpService } from './http.service';
import { Waiting } from './../../interfaces/table';
import { Injectable } from "@angular/core";
import { ReplaySubject, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userId: number;
    private user = new ReplaySubject<User>(1);

    constructor(
        private httpService: HttpService
    ) { }

    auth(login: string, password: string): void {
        this.httpService.auth(login, password).subscribe(user => {
            this.setUser(user);
        });
    }

    private setUser(user: User): void {
        this.userId = user.id;
        this.user.next(user);
    }

    get user$(): Observable<User> {
        return this.user.asObservable();
    }
}