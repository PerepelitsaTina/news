import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import config from '../config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(public authService: AuthService, private fb: FormBuilder) {
    this._createForm()
   }

  ngOnInit(): void {
  }

  private _createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get _email() {
    return this.loginForm.get('email')
  }

  get _password() {
    return this.loginForm.get('password')
  }

  login() {
    const data = this.loginForm.value;
    if(this._email?.invalid || this._password?.invalid) {
      return;
    }
    this.authService.auth(data, `${config.url}/users/login`);
  }

}
