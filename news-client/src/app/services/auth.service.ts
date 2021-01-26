import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface IUser {
  user: {
    id: number;
    email: string;
    login: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  }
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<IUser | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<IUser | null>(JSON.parse(localStorage.getItem('currentUser') || "null"));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser | null {
    return this.currentUserSubject.value;
  }

  auth(data: any, url: string) {
    console.log(data);
    this.http.post<IUser>(url, data)
      .subscribe(response => {
        if (response && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
      });
    this.router.navigate(['/'])
  }

  updateUser(login: string) {
    const updatedUser = {
      user: {
        ...this.currentUserValue?.user,
        login: login
      },
      token: this.currentUserValue?.token
    }
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);
  }



  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
