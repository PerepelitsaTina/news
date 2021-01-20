import { Component, OnInit } from '@angular/core';
import { ISearchSet } from './search/search.component';
import { INews, NewsService } from './services/news.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  searchFilter: string = "all";
  searchString: string = "";

  constructor(public newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getNews();
  }

  setSearch(data: ISearchSet) {
    this.searchFilter = data.searchFilter;
    this.searchString = data.searchString;
  }

}
