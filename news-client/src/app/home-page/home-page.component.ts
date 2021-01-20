import { Component, OnInit } from '@angular/core';
import { ISearchSet } from '../search/search.component';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  searchFilter: string = "all";
  searchString: string = "";
  page: number = 1;

  constructor(public newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getNews();
  }

  setSearch(data: ISearchSet) {
    this.searchFilter = data.searchFilter;
    this.searchString = data.searchString;
  }


}
