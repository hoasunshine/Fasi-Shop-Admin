import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class UserDetailComponent implements OnInit {

  id: string;
  userInfo: {};
  constructor(private service: InsideService) { }

  ngOnInit() {
    var url = window.location.href;
    this.id = this.getParameterByName('id', url);
    this.getData();
  }

  getData() {
    this.service.getAccountDetail(this.id).subscribe(data => {
      this.userInfo = data['data'];
    })
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

}
