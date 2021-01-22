import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import config from '../config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    const data = {
      email: this.email,
      password: this.password
    }
    console.log(data);
    this.authService.auth(data, `${config.url}/users/login`);
    this.email = this.password = "";
  }
}
