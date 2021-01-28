import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import config from '../config';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup

  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder) {
    this._createForm()
   }

  ngOnInit(): void {
  }

  private _createForm() {
    this.registerForm = this.fb.group({
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get _login() {
    return this.registerForm.get('login')
  }


  get _email() {
    return this.registerForm.get('email')
  }

  get _password() {
    return this.registerForm.get('password')
  }


  register() {
    const data = this.registerForm.value;
    console.log(this._login?.value);
    
    
    if(this._login?.invalid || this._email?.invalid || this._password?.invalid || !this._login?.value.trim() || !this._password?.value.trim()) {
      return;
    }
    this.authService.auth(data, `${config.url}/users/register`);
    // this.router.navigate(['/']);
  }

}
