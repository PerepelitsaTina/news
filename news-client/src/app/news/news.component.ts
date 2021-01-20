import { Component, Input, OnInit } from '@angular/core';
import { INews, NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  @Input() item!: INews
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
  }

}
