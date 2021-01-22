import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './news.service';
import config from '../config'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: IUser

  constructor(private http: HttpClient) { }

  getUser(id: number) {
   this.http.get<IUser>(`${config.url}/users/${id}`).subscribe(user => {
     this.user = user;
   })
  }
}
