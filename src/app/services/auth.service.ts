import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from 'src/model/login';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/accounts/login'
  user: User = new User();
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>
      (JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  doLogin(acc: Login) {
    let body = new HttpParams();
    body = body.set('email', acc.email);
    body = body.set('password', acc.password);
    this.http.post(this.loginUrl, body).subscribe(data => {
      // @ts-ignore
      this.user = data;
      console.log(this.user);
      localStorage.setItem('currentUser', JSON.stringify(this.user));
      localStorage.setItem('roleId', data['rolesList'][0]['roleId']);
      localStorage.setItem('id', data['accountId']);
      if (window.localStorage.getItem('currentUser') !== null){
        console.log(window.localStorage.getItem('currentUser'));
        this.router.navigate(['/dashboard']).then(() => {
          window.location.reload();
        });
        alert('Login successfully!');
      }
    }, (error) => {
      alert('Email not existed in user!');
      console.log(error);
    })
  }
}
