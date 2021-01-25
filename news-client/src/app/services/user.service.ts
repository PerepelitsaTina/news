import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './news.service';
import config from '../config'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: number) {
   return this.http.get<IUser>(`${config.url}/users/${id}`)
  }
}
