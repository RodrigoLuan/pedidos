import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { orderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  constructor( private route: ActivatedRoute, private orderService: orderService) { }
orders: any;
token: any;
closeResult: string;
id: any;
user: any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.GetOrder(this.id);
    });
  }


  GetOrder(id){
    this.orderService.GetOrder(id).subscribe(data => {
      this.orders = data.result
     // this.products = data.result.products;
    //  this.conquista = data.result.conquista;
    console.log(this.orders);
  },
  err => console.log(err)
);
}
}
