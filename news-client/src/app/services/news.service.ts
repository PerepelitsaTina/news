import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISearchSet } from '../search/search.component';

export interface INews {
  id?: number;
  user_id: number;
  images: string;
  tags: string;
  title: string;
  content: string;
  user: IUser;
}

export interface IUser {
  id: number;
  email: string;
  login: string;
  password: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news: INews[] = [];

  constructor(private http: HttpClient) { }

  getNews() {
    this.http.get<INews[]>('http://localhost:3000/news')
    .subscribe(news => {
      this.news = news
      console.log(this.news);
    })
  }
}
