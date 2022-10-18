import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://loo-pedidos.herokuapp.com/api';
@Injectable({
  providedIn: 'root'
})

export class lojaService{

    constructor(private http: HttpClient) { 
    }
    
    GetByName(company): Observable<any>{
        return this.http.get(`${BASEURL}/${company}`);
      }
    Pedido(body): Observable<any>{
        return this.http.post(`${BASEURL}/pedidos/cadastro`, body);
      }

}