import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  uploadedFiles: Array<File>;
  images = [];
  myForm = new FormGroup({
   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
   file: new FormControl('', [Validators.required]),
   files: new FormControl('', [Validators.required])
 });
   constructor(private http: HttpClient) { }

   ngOnInit() {}
   get f(){
    return this.myForm.controls;
  }
 
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
   
                reader.onload = (event:any) => {
                 // console.log(event.target.result);
                   this.images.push(event.target.result); 
   
                   this.myForm.patchValue({
                    files: this.images
                   });
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
  
     submit(){
       const body =[
          this.images
        ]
       
       console.log(body);
       this.http.post<any>('https://loo-pedidos.herokuapp.com/create/', body)
         .subscribe(res => {
           console.log(res);
           alert('Uploaded Successfully.');
         })
         document.location.reload();
     }
   }