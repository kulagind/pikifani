import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { ErrorService } from "@services/error.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private errorService: ErrorService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status !== 401) {
                    const message = error.error.message;
                    this.errorService.setError(message);
                    return of();
                }
                return throwError(error);
            })
        );
    }
}