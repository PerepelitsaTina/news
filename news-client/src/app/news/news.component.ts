import { Component, Input, OnInit } from '@angular/core';
import { INews, NewsService } from '../services/news.service';
import  config  from '../config'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  url: string = config.url;

  @Input() item!: INews
  constructor(private newsService: NewsService) {
   }

  ngOnInit(): void {
  }

}
