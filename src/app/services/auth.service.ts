import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/accounts/login'

  constructor(private http: HttpClient, private router: Router) { }

  doLogin(acc: Login) {
    let body = new HttpParams();
    body = body.set('email', acc.email);
    body = body.set('password', acc.password);
    return this.http.post(this.loginUrl, body).subscribe(item => {
      window.localStorage.setItem('id', item['accountId']);
      window.localStorage.setItem('email', item['email']);
      window.localStorage.setItem('roleId', item['rolesList'][0].roleId);
    }, (error) => {
      window.localStorage.setItem('role', 'none');
    })
  }
}
