import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import config from '../config';

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

  isGoogleUser!: boolean;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<IUser | null>;

  constructor(private http: HttpClient, private router: Router, private socialAuthService: SocialAuthService) {
    this.currentUserSubject = new BehaviorSubject<IUser | null>(JSON.parse(localStorage.getItem('currentUser') || "null"));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser | null {
    return this.currentUserSubject.value;
  }

  auth(data: any, url: string) {
    this.http.post<IUser>(url, data)
      .subscribe(response => {
        if (response && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
      });
    this.router.navigate(['/'])
  }

  googleAuth(data: any) {
    this.http.post<any>(`${config.url}/users/googleAuth`, data)
      .subscribe(response => {
        if (response && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
          this.isGoogleUser = true;
          console.log(this.isGoogleUser);
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

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      if(user) {
        this.googleAuth(user);
      }
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.socialAuthService.signOut();
    this.isGoogleUser = false;
    this.router.navigate(['/']);
  }
}
