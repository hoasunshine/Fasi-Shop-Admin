import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
})
export class InsideComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logOut() {
    const confirmed = window.confirm('Do you want to logout?');
    if (confirmed) {
      window.localStorage.clear();
      window.localStorage.removeItem('lastLogin');
      window.localStorage.removeItem('timeExpired');
      console.log('Clear successfully!!!');
      window.location.href = '/login';
    }
  }
}
