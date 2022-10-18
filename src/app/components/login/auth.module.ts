import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }
