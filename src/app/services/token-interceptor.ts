import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService){}

    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{
        const headersConfig ={
            'Content-type': 'application/json',
            'Accept': 'aplication/json'
        };
        const token = this.tokenService.GetToken();
        if(token){
            headersConfig['Authorization'] = `beader ${token}`;
        }
        const _req = req.clone({setHeaders: headersConfig});
        return next.handle(_req);
    }
}
