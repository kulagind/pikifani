import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { debounceTime, filter } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private error: ReplaySubject<string> = new ReplaySubject(1);

    constructor() {
        this.debounceErrorClearance();
    }

    setError(mes: string): void {
        this.error.next(mes);
    }

    debounceErrorClearance(): void {
        this.error.pipe(
            filter(error => error !== ''),
            debounceTime(5000)
        ).subscribe(() => {
            this.error.next('');
        });
    }

    get error$(): Observable<string> {
        return this.error.asObservable();
    }
}