import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './news.service';
import config from '../config'
import { AuthService } from './auth.service';

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
      console.log(fd);
    }
    if(data) {
      console.log(data);
      console.log(fd);
      fd.append('info', JSON.stringify(data))
    }
    console.log(fd);
    
    // return this.http.patch<IUser>(`${config.url}/users/${this.authService.currentUserValue?.user.id}`, fd)
  }
}
