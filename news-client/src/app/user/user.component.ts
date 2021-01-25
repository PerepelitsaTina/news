import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IUser } from '../services/news.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id!: number;
  user!: IUser;
  isCurrentUser!: boolean;

  constructor(private route: ActivatedRoute, 
              public userService: UserService,
              public authService: AuthService) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userService.getUser(+params.id).subscribe(user => {
        this.user = user;
        this.isCurrentUser = this.authService.currentUserValue?.user.id === this.user.id;
      });
    });
  }
  
  ngDoCheck() {
  }

}
