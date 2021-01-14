import { Component, OnInit } from '@angular/core';
import { INews, NewsService } from './services/news.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getNews();  
  }

}
