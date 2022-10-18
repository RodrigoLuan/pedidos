import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  focus;
  focus1;
  constructor(private fb: FormBuilder,private authService: AuthService,    private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  loginUser(){
    this.authService.loginUser(this.loginForm.value).subscribe(
      data => {
        this.tokenService.SetToken(data.token);
        console.log(data.token)
        this.loginForm.reset();
        setTimeout(() => {
          this.router.navigate(['/configuracao']);
        }, 2000);
      },
      err => {

        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }
}
