import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import config from '../config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  email: string = '';
  password: string = '';
  login: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    const data = {
      email: this.email,
      login: this.login,
      password: this.password
    };
    this.authService.auth(data, `${config.url}/users/register`);
    this.router.navigate(['/']);
  }

}
