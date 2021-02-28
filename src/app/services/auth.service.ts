import { SseService } from './sse.service';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { ReplaySubject, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export const jwtHeades = 'x-jwt';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _id: string;
    private userSubj = new ReplaySubject<User>(1);
    private _jwt: string;
    private _user: User;

    constructor(
        private httpService: HttpService,
        private router: Router,
        private sseService: SseService
    ) { }

    login$(login: string, password: string): Observable<any> {
        return this.httpService.login(login, password).pipe(
            tap(result => {
                this.setToken(result.jwt, result.header);
                this.initUser$().subscribe();
            })
        );
    }

    register$(login: string, email: string, password: string, confirmPassword: string): Observable<any> {
        return this.httpService.register(login, email, password, confirmPassword).pipe(
            tap(result => {
                this.setToken(result.jwt, result.header);
                this.initUser$().subscribe();
            })
        );
    }

    logout(): void {
        if (localStorage.getItem(jwtHeades)) {
            localStorage.removeItem(jwtHeades);
        }
        this._jwt = '';
        this._id = '';
        this.router.navigate(['/login']);
        this.sseService.close();
    }

    changePassword(): void {
        
    }

    changeName(): void {

    }

    initUser$(): Observable<void | User> {
       return this.httpService.getCurrentUser().pipe(
            tap(user => {
                if (user) {
                    this.setUser(user);
                    this.router.navigate(['/']);
                }
            })
       );
    }

    get jwt(): string {
        return this._jwt;
    }

    private setToken(jwt: string, header: string): void {
        this._jwt = jwt;
        if (localStorage.getItem(header)) {
            localStorage.removeItem(header);
        }
        localStorage.setItem(header, jwt);
    }

    private setUser(user: User): void {
        this._id = user._id;
        this._user = {...user, id: user._id};
        this.userSubj.next(this._user);
        this.sseService.connect(this._id);
    }

    get user(): User {
        return this._user;
    }

    get user$(): Observable<User> {
        return this.userSubj.asObservable();
    }

    get id(): string {
        return this._id;
    }

    isAuthenticated(): boolean {
        if (this.id) {
            return true;
        }
        return false;
    }
}