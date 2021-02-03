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
  user?: IUser;
  likes: Array<ILike>
}

export interface ILike {
  user_id: number;
  news_id: number;
  news: INews;
}

export interface IUser {
  id: number;
  email: string;
  login: string;
  avatar: string;
  news: INews[];
  likes: ILike[]
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news: INews[] = [];
  url: string = `${config.url}/news`;
  selectedFile!: File;

  constructor(private http: HttpClient) { }

  getNews() {
    this.http.get<INews[]>(this.url)
    .subscribe(news => {
      this.news = news
    })
  }

  addNews(data: INews) {
      const fd = new FormData();
      fd.append('image', this.selectedFile);
      fd.append('news', JSON.stringify(data));
      return this.http.post<INews>(this.url, fd);
  }

  addLike(body: any) {
    return this.http.post(`${config.url}/likes`, body)
  }

  deleteLike(body: any) {
    return this.http.delete(`${config.url}/likes?user=${body.user_id}&news=${body.news_id}`)
  }
}
