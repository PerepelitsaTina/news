import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IUser } from '../services/news.service';
import { UserService } from '../services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddNewsComponent } from '../add-news/add-news.component';

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
              public authService: AuthService,
              public dialog: MatDialog) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userService.getUser(+params.id).subscribe(user => {
        this.user = user;
        this.isCurrentUser = this.authService.currentUserValue?.user.id === this.user.id;
      });
    });
  }
  
  openDialog() {
     const dialogRef = this.dialog.open(AddNewsComponent, {
      width: '600px',
      data: {user_id: this.user.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  }


