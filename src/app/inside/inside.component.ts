import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
})
export class InsideComponent implements OnInit {

  roleId: string;
  constructor() { }

  ngOnInit() {
    this.roleId = window.localStorage.getItem('roleId');
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
