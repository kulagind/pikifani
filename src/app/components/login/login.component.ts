import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private nameRegExp = /^[a-zA-Zа-яА-я0-9-_]{2,20}$/;

  private isPending = false;

  private loginPassword: string = '';
  private registerPassword: string = '';
  private registerConfirmPassword: string = '';

  loginForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  });

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(this.nameRegExp)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  });

  isLogin = true;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  auth(): void {
    if (this.isLogin) {
      if (!this.loginForm.invalid) {
        this.isPending = true;
        this.authService.login$(this.loginForm.get('name').value, this.loginForm.get('password').value).subscribe(() => {
          this.isPending = false;
        });
      }
    } else {
      if (!this.registerForm.invalid) {
        this.isPending = true;
        this.authService.register$(this.registerForm.get('name').value, this.registerForm.get('email').value, this.registerForm.get('password').value, this.registerForm.get('confirmPassword').value).subscribe(() => {
          this.isPending = false;
        });
      }
    }
  }
}
