import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../components/services/auth.service";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtHeader = 'x-jwt';
        let jwt = localStorage.getItem(jwtHeader);        
        if (!jwt) {
            jwt = this.authService.jwt;
        }

        if (jwt) {
            let authReq = req.clone({ setHeaders: { [jwtHeader]: jwt } });
            return next.handle(authReq);
        }
       
        return next.handle(req);
    }
}