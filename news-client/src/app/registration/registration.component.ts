import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  email: string = '';
  password: string = '';


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  register() {
    const data = {
      email: this.email,
      password: this.password
    };
    this.authService.auth(data, `http://localhost:3000/users/register`);
    this.email = this.password = "";
  }

}
