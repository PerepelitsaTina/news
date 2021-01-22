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
  routeSubscription: Subscription;
  isCurrentUser!: boolean;

  constructor(private route: ActivatedRoute, 
              public userService: UserService,
              public authService: AuthService) {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = params['id']
    });
   }

  ngOnInit(): void {
    this.userService.getUser(this.id);
  }

  ngDoCheck() {
    this.isCurrentUser = this.authService.currentUserValue?.user.id === this.userService.user.id;
  }

}
