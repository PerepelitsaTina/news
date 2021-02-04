import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ILike, INews, IUser, NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewsComponent } from '../add-news/add-news.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { map } from 'rxjs/operators';
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
  isSubscription!: boolean;
  page: number = 1;
  news!: INews[];
  activeTab: string = 'my-news';

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
    this.activeTab = 'my-news';
    console.log(this.route);
    this.route.params.subscribe((params) => {
      this.userService.getUser(+params.id).subscribe(user => {
        this.user = user;
        this.news = user.news;
        
        this.isCurrentUser = this.authService.currentUserValue?.user.id === this.user.id;
        if(this.isCurrentUser) {
          this.authService.updateUser(this.user.login);
        }
      }, (error) => {
        if(error.status === 401) {
          this.authService.logout();
        }
      });
    });
  }

  showLikedNews() {
    this.activeTab = 'liked';
    this.newsService.getFavouriteNews().subscribe(news => {
      this.news = news.map(item => item.news)
      console.log(this.news);
    })
  }

  openNewsDialog() {
    const dialogRef = this.dialog.open(AddNewsComponent, {
      width: '600px',
      data: { user_id: this.user.id },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result); 
      
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
        this.userService.updateUser(result).subscribe(res => {
          if (res) {
            this.getUser();
          }
        })
      }
    })
  }
}
