import { NewsService } from './../services/news.service';
import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export interface ISearchSet {
  searchFilter: string;
  searchString: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  @Output() filterSet: EventEmitter<ISearchSet> = new EventEmitter<ISearchSet>()

  searchFilter: string = "all";
  searchString: string = "";

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
  }

  searchNews(event?: KeyboardEvent) {
    if(!event || event.key === "Enter") {
      const data: ISearchSet = {
        searchFilter: this.searchFilter,
        searchString: this.searchString
      };
      this.filterSet.emit(data);
    }
  }
}
