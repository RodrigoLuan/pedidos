import { Component, OnInit} from '@angular/core';
import { companyService } from '../services/company.service';
import { TokenService } from '../services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../shared/product.model';
import { Order } from '../shared/order.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { productService } from 'src/app/services/products.service';

declare const openCity: any;
@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css'],
})
export class LojaComponent implements OnInit {
  selectedFeatures: any = [];
  company: any;
  user: any;
  closeResult: string;
  products: any;
  product: any;
  nameProducts = [];
  order:  any = [];
  nameProduct: any;
  price: any;
  amount: number = 0;
  endereco: any;
  description: any;
  nomeCliente: any;
  idlink: any;
  data;
  pedido: any;
  troco: any;
  trocoFront:boolean = false;
  total: any;
  soma: any;
  valorfinal: number;
  metodo: any;
  retirar: boolean = false;
  quantidade= 0;
  quantity: 0;
  valorentrega: number = 0;
  totaistotais: number = 0;
  whatsapp = true;
  list:boolean = false;
  address:boolean = false;
  payment_method:boolean = false;
  Prices : number = 0;
  delivery: any;
  constructor(private modalService: NgbModal,private productService: productService, private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute,private companyServices: companyService, private tokenService: TokenService, private router: Router) {}
  carrinho() {
    this.list = true;
    this.whatsapp = false;
    this.address = false;
    this.payment_method = false;
    this.trocoFront = false;
  }
  endereco_() {
    this.list = false;
    this.address = true;
    this.whatsapp = false;
    this.payment_method = false;
    this.trocoFront = false;
  }
  pagamento() {
    this.list = false;
    this.address = false;
    this.whatsapp = false;
    this.trocoFront = false;
    this.payment_method = true;
    this.totaistotais = Number(this.Prices) + Number(this.valorentrega)
    console.log(this.totaistotais)
  }
  trocoF() {
    this.list = false;
    this.address = false;
    this.whatsapp = false;
    this.payment_method = false;
    this.trocoFront = true
    this.totaistotais = Number(this.Prices) + Number(this.valorentrega)
    console.log(this.totaistotais)
  }
  form: FormGroup;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.company = params.company;
      this.GetUserData(this.company);
      this.GetUserProducts(this.company);
      this.getDelivery(this.company);
    });
    this.form = this.fb.group({
    //  nameProduct: this.nameProduct,
 //     description: [''],
      endereco: this.endereco,
  //    amount: [''],
     // price: this.price,
      total: this.total,
      metodo: this.metodo,
      company: this.company,
      troco: this.troco,
     // amount: this.amount,
     // quantity: this.quantity,
     // quantidade:this.quantidade ,
      retirar: this.retirar,
      valorentrega: this.valorentrega,
      nomeCliente: this.nomeCliente,
      order: [this.selectedFeatures]
  });

  }
  ExpandirTitulo = 'lpf-sale-itens-card-header';
  ExpandirAll = 'lpf-sale-itens-card-body_small';
  setExpandirAll(){
    this.ExpandirAll = 'lpf-sale-itens-card-body_small_';
 
  }
  expandirPro = 'lpf-sale-itens-card-body';
  setExpandirPro(){
    this.expandirPro = 'lpf-sale-itens-card-body-md';
    this.ExpandirTitulo = 'lpf-sale-itens-card-header_';
  }
  getDelivery(company){
    this.productService.GetDelivery(company).subscribe(data => {
    
      this.delivery = data.result;
      console.log(this.delivery)
    }, err => {
      if (err.error.token === null){
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    });
  }
  salvarProduto(){
      //console.log(this.form.value)
      //console.log(this.product)
      //console.log( this.selectedFeatures)
      console.log(this.valorentrega)
    }
    onClick(event, entrega){
      console.log(entrega); 
      this.valorentrega = entrega 
      this.valorfinal = entrega += this.Prices
      console.log(this.valorfinal);
      this.totaistotais = Number(this.Prices) + Number(this.valorentrega)
      console.log(this.totaistotais)
      
   }
  GetUserData(company){
    this.companyServices.getCompany(company).subscribe(data => {
      this.user = data.result
     // this.products = data.result.products;
    //  this.conquista = data.result.conquista;
    console.log(this.user);
  },
  err => console.log(err)
);
}
GetUserProducts(company){
  this.companyServices.GetProdutos(company).subscribe(data => {
    this.products = data.result
  console.log(this.products);
},
err => console.log(err)
);
}
 get produtos() : FormArray {
  return this.form.get("nameProduct") as FormArray
}
newProduct(): FormGroup {
  return this.fb.group({
    nameProduct: this.fb.array([]),
    price: this.fb.array([])
  })
}


addProduct(){
  this.products.push(this.form);
}
removeProduct(i:number) {
 // this.produtos.removeAt(i);

  let total = this.selectedFeatures.reduce((total, i)=> Number(total) - Number(this.selectedFeatures.price) - this.quantidade--, 0);
  this.total = total;
  console.log( total );
}


increment(){
  this.quantity += 1;
  console.log( this.quantity + 1)
}
onAdd(product: Product,temp_package ) {
  
  this.whatsapp = false;
  const { length } = this.selectedFeatures;
  const id = length + 1;
  const found = this.selectedFeatures.some(el => el._id === product._id);
 
  if (!found) this.selectedFeatures.push( this.product = { ...product });
  else{
    console.log(temp_package)
    temp_package.quantity++
    this.Prices += temp_package.price
    return  this.contarTotal();
  } 
 // return this.selectedFeatures;
  //this.selectedFeatures.push( this.product = { ...product });

  console.log(this.selectedFeatures)
  console.log(typeof this.valorentrega)
  let valordaentrega : number = 0;
  //let total = this.selectedFeatures.reduce((total, price)=> Number(total) + Number(price.price *  this.quantidade) , 0);
  let soma = this.selectedFeatures.reduce((total, price)=>Number(valordaentrega) + Number(this.Prices), 0);
  //let total = this.selectedFeatures.reduce((total, price)=>Number(total) + Number(price.price), 0);
   this.Prices = 0;
  for(let p of this.selectedFeatures){
    this.Prices += p.price*p.quantity
  }

  this.list = true;
  this.address = false;
  this.payment_method = false;

  this.totaistotais = (Number(this.Prices) + Number(this.valorentrega));
  console.log(this.totaistotais)
}


open(content, type, modalDimension) {
  this.http.post('https://loo-pedidos.herokuapp.com/api/pedidos/cadastro', this.form.value)
  .subscribe(res => {
    console.log("pedido", res);
    this.pedido = res;
  })
  if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
          this.closeResult = 'Closed with: $result';
      }, (reason) => {
          this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
  } else if (modalDimension === '' && type === 'Notification') {
    this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
    }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
    });
  } else {
      this.modalService.open(content,{ centered: true }).result.then((result) => {
          this.closeResult = 'Closed with: $result';
      }, (reason) => {
          this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
  }
}

onRemove(i:number){
  this.selectedFeatures.pop();
  //this.produtos.removeAt(i);
  const index: number = this.selectedFeatures.indexOf(i);
  if (index !== -1) {
    this.data.splice(index, 1);
} 
let total = this.selectedFeatures.reduce((total, i)=> Number(total) + Number(i.price), 0);
  this.total = total;
  console.log( total );
  this.totaistotais = (Number(this.Prices) + Number(this.valorentrega));
  console.log(this.totaistotais)
}
submit(){
  console.log(this.form.value);
  this.http.post('https://loo-pedidos.herokuapp.com/api/pedidos/cadastro', this.form.value)
    .subscribe(res => {
      console.log("pedido", res);
      this.pedido = res;
    })
}


aumentarQuantidade(temp_package){

  if(temp_package.quantity == 15){
    return alert("Limite de pedido para este produto")
  }else{
    console.log(temp_package)
    temp_package.quantity++
    this.Prices += temp_package.price

    return  this.contarTotal();
  }

}
changeMetodo(){
  const dinheiro: string = "dinheiro";
  this.metodo = dinheiro
  console.log(this.metodo)
  console.log(dinheiro)
}

decrementarQuantidade(temp_package, i:number){
    if(temp_package.quantity == '1'){
      this.selectedFeatures.pop();
      //this.produtos.removeAt(i);
      const index: number = this.selectedFeatures.indexOf(i);
      if (index !== -1) {
        this.data.splice(index, 1);
    }
  }
    temp_package.quantity--
    this.Prices -= temp_package.price
    this.totaistotais = (Number(this.Prices) + Number(this.valorentrega));
    console.log(this.totaistotais)
}
contarTotal(){
   this.Prices = 0;
    for(let p of this.selectedFeatures){
      this.Prices += p.price*p.quantity
    }
    this.totaistotais = Number(this.Prices) + Number(this.valorentrega);
    console.log(this.totaistotais)
}


}

