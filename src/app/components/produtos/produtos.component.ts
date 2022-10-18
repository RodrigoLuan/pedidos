import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { productService } from 'src/app/services/products.service';
import { TokenService } from 'src/app/services/token.service';
import { Product } from '../../shared/product.model';
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

token: any;
product = {} as Product;
produto = {} as Product;
products: Product[];
closeResult: string;
produtoForm: FormGroup;
produtos: any;
constructor(private fb: FormBuilder,private tokenService: TokenService, private productService: productService, private modalService: NgbModal) {}
form: FormGroup;
user: any;

ngOnInit() {
    this.init();
  }


salvarProduto(){
  console.log(this.form.value)
this.productService.addProduct(this.form.value).subscribe(data => {
    console.log(data)
    document.location.reload();

});
}
editProduct(produto: Product) {
    this.produto = { ...produto };
  }
  init(){
    this.token = this.tokenService.GetPayload();
    this.form = this.fb.group({
        nameProduct: [''],
        description: [''],
        category: [''],
        amount: [''],
        price: [''],
        company: this.token.company
    });

    this.token = this.tokenService.GetPayload();
    console.log(this.token);
    this.user = this.token._id
    this.getProducts(this.user);
    this.GetProdutos(this.token.company);
  }

  deleteProduct(produto: Product) {
    this.productService.deleteProduct(produto).subscribe(() => {
      this.product;
      document.location.reload();
    });
  } 

  edit(form: NgForm) {
         this.productService.updateProduct(this.produto).subscribe(() => {
        console.log(this.produto)
        document.location.reload();
      });
  }
  
  cleanForm(form: NgForm) {
    this.getProducts(this.user);
    form.resetForm();
    this.product = {} as Product;
  }
  GetProdutos(company){
    this.productService.GetProdutos(company).subscribe(data => {
      this.produtos = data.result
     // this.products = data.result.products;
    //  this.conquista = data.result.conquista;
    console.log(this.produtos);
  },
  err => console.log(err)
);
}

  open(content, type, modalDimension) {
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

  
  getProducts(user){
    this.productService.GetProductById(user).subscribe(data => {
    
      this.product = data.result;
      console.log(this.product, "produto")
    }, err => {
      if (err.error.token === null){
        this.tokenService.DeleteToken();
      }
    });
  }
private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  'with: $reason';
    }
}  
}