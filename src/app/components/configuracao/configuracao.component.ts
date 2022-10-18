import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { companyService } from '../../services/company.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { productService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Address } from '../../shared/address.model';
import { Delivery } from 'src/app/shared/delivery.model';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css']
})
export class ConfiguracaoComponent implements OnInit {
  token: any;
  closeResult: string;
  address = {} as Address;
  products: Address[];
  company: any;
  user: any;
  delivery: any;
  form: FormGroup;
  constructor(private fb: FormBuilder,private modalService: NgbModal,private router: Router,private productService: productService, private tokenService: TokenService, private companyService: companyService) {}
 
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
  
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  'with: $reason';
      }
  } 

  ngOnInit() {
    this.token = this.tokenService.GetPayload();
    console.log(this.token);
    this.company = this.token.company
    this.getCompany(this.company);
    this.getDelivery(this.company);
    this.form = this.fb.group({
      address: [''],
      price: [''],
      company: this.token.company
  });
  }

  getCompany(company){
    this.companyService.getCompany(company).subscribe(data => {
    
      this.user = data.result;
      console.log(this.user)
    }, err => {
      if (err.error.token === null){
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    });
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
  deleteDelivery(delivery: Delivery) {
    this.productService.deletedelivery(delivery).subscribe(() => {
      this.delivery;
      document.location.reload();

    });
  } 
  salvarAddress(){
    this.productService.addAddress(this.form.value).subscribe(data => {
        console.log(data)
        this.router.navigate(['/configuracao']);
        document.location.reload();
    });
    
    }
  GetUserData(company){
    this.companyService.GetByName(company).subscribe(data => {
      this.company = data.result

    //  this.conquista = data.result.conquista;
  },
  err => console.log(err)
);
}
}
