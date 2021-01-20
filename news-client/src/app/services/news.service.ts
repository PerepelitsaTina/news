import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../config'

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
  url: string = `${config.url}/news`;

  constructor(private http: HttpClient) { }

  getNews() {
    this.http.get<INews[]>(this.url)
    .subscribe(news => {
      this.news = news
    })
  }
}
