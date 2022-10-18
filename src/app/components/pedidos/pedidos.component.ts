import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import { DatePipe }from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { orderService } from 'src/app/services/order.service';
import { companyService } from 'src/app/services/company.service';
import { TokenService } from '../../services/token.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, NgForm } from '@angular/forms';
import { productService } from 'src/app/services/products.service';
import { Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  providers: [],
})
@Injectable({
  providedIn: 'root',
})
export class PedidosComponent implements OnInit {
  constructor(private tokenService: TokenService,private fb: FormBuilder, private cdRef:ChangeDetectorRef,private productService: productService, private companyService: companyService, private route: ActivatedRoute, private orderService: orderService) {

   }
orders: any;
token: any;
closeResult: string;
company: any;
statusProd: boolean;
statusDone: boolean;
statusConf: boolean;
form: FormGroup;
pedido = {} as Order;
user: any;
  ngOnInit(): void {
    this.token = this.tokenService.GetPayload();
    this.route.params.subscribe(params => {
      this.company = params.company;
      this.GetOrders(this.company);
    });

    this.form = this.fb.group({
        statusConf: this.statusConf,
        statusProd: this.statusProd,
        statusDone: this.statusDone,
    });
    console.log(this.form.value)
  }


  submitForm() {
    console.log(this.form.value)
  }
  checkstatusConf(e,  pedido: Order){
    this.statusConf = e.target.checked
    this.pedido = { ...pedido };
    console.log(this.form.value.statusConf)
    this.productService.updatePedido(this.pedido).subscribe(() => {
      console.log(this.pedido)
     // window.location.reload();
    });
  }
  checkstasProd(pedido: Order) {
    this.pedido = { ...pedido };
    console.log(this.pedido)
  }
  checkstatusProd(e,  pedido: Order){
    this.statusProd = e.target.checked
    this.pedido = { ...pedido };
    console.log(this.form.value.statusProd)
    this.productService.updatePedido(this.pedido).subscribe(() => {
      console.log(this.pedido)
     // window.location.reload();
    });
  }
  checkstatusDone(e, pedido: Order){
    this.statusDone = e.target.checked
    this.pedido = { ...pedido };
    console.log(this.form.value.statusDone)
    this.productService.updatePedido(this.pedido).subscribe(() => {
      console.log(this.pedido)
     // window.location.reload();
    });
  }

  edit(form: NgForm) {
    this.productService.updatePedido(this.pedido).subscribe(() => {
      console.log(this.pedido)
    });
}
  GetOrders(company){
    this.orderService.GetOrders(company).subscribe(data => {
      this.orders = data.result
     // this.products = data.result.products;
    //  this.conquista = data.result.conquista;
    console.log(this.orders);
  },
  err => console.log(err)
);
}
}
