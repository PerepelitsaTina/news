import { Component, Input, OnInit } from '@angular/core';
import { INews, NewsService } from '../services/news.service';
import  config  from '../config'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  url: string = config.url;
  isLiked!: boolean;

  @Input() item!: INews
  constructor(private newsService: NewsService, public authService: AuthService) {
    
   }

  ngOnInit() {
    this.isLiked = this.item.likes.some(item => item.user_id === this.authService.currentUserValue?.user.id);
  }

  like() {
    const body = {
      user_id: this.authService.currentUserValue?.user.id,
      news_id: this.item.id
    };

    if(!this.isLiked) {
      this.newsService.addLike(body).subscribe(like => {
        if(like) {
          this.isLiked = true;
        } 
      });  
    } else {
      this.newsService.deleteLike(body).subscribe(res => {
        if(res) {
          this.isLiked = false;
        } 
      });  
    }
  }

}
