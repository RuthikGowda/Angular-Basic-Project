import { inject, Injectable, Query } from '@angular/core';
import { IUserCred } from '../Model/iuser-cred';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILoginCred } from '../Model/ilogin-cred';
import { PasswrdRes } from '../Model/passwrd-res';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  response!: Observable<any>;
  private loggedIn = new BehaviorSubject<boolean>(
    !!sessionStorage.getItem('user')
  );
  loggedIn$ = this.loggedIn.asObservable();
  headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
    console.log('Logged in status set to:', value);
    if (value) {
      sessionStorage.setItem('user', 'true');
      // this.setLoggedIn(true);
    } else {
      sessionStorage.removeItem('user');
    }
  }

  http = inject(HttpClient);
  constructor() {}

  Register(user: IUserCred): Observable<any> {
    console.log('Login called with user:', user);
    let data = JSON.stringify(user);

    console.log('Data to be sent:', data);
    return this.http.post<any>(
      environment.ASPNET_API_URL + 'userRegistration',
      data,
      {
        headers: this.headers,
      }
    );
  }

  Login(user: ILoginCred): Observable<any> {
    return this.http.post<any>(
      environment.ASPNET_API_URL + 'userLogin',
      {
        email: user.email,
        password: user.password,
      },
      {
        headers: this.headers,
      }
    );
  }

  resetPassword(email: string): Observable<PasswrdRes> {
    return this.http.get<PasswrdRes>(
      environment.ASPNET_API_URL + 'userPasswordReset',
      {
        headers: this.headers,
        params: { emailId: email },
      }
    );
  }
}
