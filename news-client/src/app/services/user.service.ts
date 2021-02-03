import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './news.service';
import config from '../config'
import { AuthService } from './auth.service';
import { timer } from 'rxjs';
import {  debounce } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedFile!: File;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser(id: number) {
   return this.http.get<IUser>(`${config.url}/users/${id}`)
  }

  updateUser(data?: {login: string}) {
    let fd = new FormData();
    if(this.selectedFile) {
      fd.append('image', this.selectedFile);
    }
    if(data) {
      fd.append('login', JSON.stringify(data))
    }
    return this.http.patch<IUser>(`${config.url}/users/${this.authService.currentUserValue?.user.id}`, fd)
  }
}
