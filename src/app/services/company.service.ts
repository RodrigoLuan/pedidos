import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'https://loo-pedidos.herokuapp.com/api';
@Injectable({
  providedIn: 'root'
})

export class companyService{

    constructor(private http: HttpClient) { 
    }
    
    GetByName(username): Observable<any>{
        return this.http.get(`${BASEURL}/company/${username}`);
      }

      GetAllUserById(id): Observable<any>{
        return this.http.get(`${BASEURL}/user/${id}`);
      }
      getCompany(company): Observable<any>{
        return this.http.get(`${BASEURL}/${company}`);

      }
      GetProdutos(company): Observable<any>{
        return this.http.get(`${BASEURL}/produtos/todos/${company}`);
    }
}