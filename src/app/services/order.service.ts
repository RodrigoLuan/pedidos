import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
const BASEURL = 'https://loo-pedidos.herokuapp.com/api';
@Injectable({
  providedIn: 'root'
})

export class orderService{
   delete = 'https://loo-pedidos.herokuapp.com/api/produtos/delete';
    constructor(private http: HttpClient) { 
    }
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
      GetOrder(id): Observable<any>{
        return this.http.get(`${BASEURL}/pedidos/getById/${id}`);
      }
      GetOrders(company): Observable<any>{
        return this.http.get(`${BASEURL}/pedidos/${company}`);
      }
      addProduct(body): Observable<any>{
        return this.http.post(`${BASEURL}/produtos/cadastro`, body);
      }      
    handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        errorMessage = error.error.message;
      } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    };    
}