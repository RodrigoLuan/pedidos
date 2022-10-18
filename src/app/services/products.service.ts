import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../shared/product.model';
import { Delivery } from '../shared/delivery.model';
import { Order } from '../shared/order.model';
import { retry, catchError } from 'rxjs/operators';
const BASEURL = 'https://loo-pedidos.herokuapp.com/api';
@Injectable({
  providedIn: 'root'
})

export class productService{
   delete = 'https://loo-pedidos.herokuapp.com/api/produtos/delete';
   deleteDelivery = 'https://loo-pedidos.herokuapp.com/api/produtos/deleteDelivery';
   update = 'https://loo-pedidos.herokuapp.com/api/produtos/editar';
   updatepedido = 'https://loo-pedidos.herokuapp.com/api/produtos/editarpedido';
    constructor(private http: HttpClient) { 
    }
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
      GetProductById(id): Observable<any>{
        return this.http.get(`${BASEURL}/produtos/${id}`);
      }
      addProduct(body): Observable<any>{
        return this.http.post(`${BASEURL}/produtos/cadastro`, body);
      }
      GetProdutos(company): Observable<any>{
        return this.http.get(`${BASEURL}/produtos/todos/${company}`);
      }
      GetDelivery(company): Observable<any>{
        return this.http.get(`${BASEURL}/produtos/delivery/${company}`);
      }
      deleteProduct(produto: Product) {
        return this.http.delete<Product>(this.delete + '/' + produto._id, this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }
      deletedelivery(delivery: Delivery) {
        return this.http.delete<Delivery>(this.deleteDelivery + '/' + delivery._id, this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }

      addAddress(body): Observable<any>{
        return this.http.post(`${BASEURL}/produtos/address`, body);
      }
      updateProduct(produto: Product): Observable<Product> {
        console.log(produto.productId)
        return this.http.post<Product>(this.update + '/' + produto._id, JSON.stringify(produto), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }   
      updatePedido(pedido: Order): Observable<Order> {
        console.log(pedido._id)
        return this.http.post<Order>(this.updatepedido + '/' + pedido._id, JSON.stringify(pedido), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
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