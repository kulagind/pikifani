import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { ReplaySubject, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _userId: number;
    private expiredDate: Date;
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
        // this._userId = user.id;
        this.user.next(user);
    }

    get user$(): Observable<User> {
        return this.user.asObservable();
    }

    get userId(): number {
        return this._userId;
    }

    isAuthenticated(): boolean {
        if (this.userId) {
            return true;
        }
        return false;
    }
}