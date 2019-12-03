import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {User} from '../shared/users';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endPoint = 'http://192.162.71.97:8080/api/auth';
  headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
  storageKey = 'ugsecuriteapplication';

  constructor(private http: HttpClient, private router: Router) { }

  logIn(payload: User) {
    return this.http.post<User>(this.endPoint, payload, {headers: this.headers})
        .pipe(
            tap(data => console.log('Payload: ', JSON.stringify(data)))
        );
  }

  setToken(token: any) {
    localStorage.setItem(this.storageKey, token);
  }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  doLogOut() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }
}

