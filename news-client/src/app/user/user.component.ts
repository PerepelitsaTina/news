import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { INews, IUser, NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewsComponent } from '../add-news/add-news.component';
import { NewsComponent } from '../news/news.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import config from '../config';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id!: number;
  user!: IUser;
  isCurrentUser!: boolean;
  page: number = 1;
  url: string = config.url;

  constructor(private route: ActivatedRoute,
    public userService: UserService,
    public authService: AuthService,
    public dialog: MatDialog,
    private newsService: NewsService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.route.params.subscribe(params => {
      this.userService.getUser(+params.id).subscribe(user => {
        this.user = user;
        this.isCurrentUser = this.authService.currentUserValue?.user.id === this.user.id;
      });
    });
  }

  openNewsDialog() {
    const dialogRef = this.dialog.open(AddNewsComponent, {
      width: '600px',
      data: { user_id: this.user.id },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newsService.addNews(result).subscribe(news => {
          if (news) {
            this.getUser();
          }
        })
      }
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '600px',
      data: { login: this.user.login },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result)
          }
        })
      }


}


