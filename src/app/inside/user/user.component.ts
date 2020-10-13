import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  userList = [];
  sellerList = [];
  sttNotifi: boolean = false;
  sttTextNotifi = 'toast-success';
  sttLoading = false;
  textNotifi: string;
  constructor(private service: InsideService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getAccountData().subscribe(data => {
      const userData = data['data']['accountDTOList'];      
      for (let i = 0; i < userData.length; i++) {
        for (let j = 0; j < userData[i]['rolesList'].length; j++) {
          if (userData[i]['rolesList'][j]['roleId'] === 2) {
            this.userList.push(userData[i]);
          }
          if (userData[i]['rolesList'][j]['roleId'] === 1) {
            this.sellerList.push(userData[i]);
          }
        }
      }
    });
  }

  deactiveAccount(id) {
    const confirmed = confirm('Do you want to deactive this account?');
    if (confirmed) {
      this.service.deactiveAccount(id).subscribe(
        response => {
          this.sttLoading = false;
          this.sttNotifi = true;
          setTimeout(() => {
            this.sttNotifi = false;
          }, 5000);
          this.textNotifi = 'Deactive successfully!!!';
          this.sttTextNotifi = 'toast-success';
          window.location.reload();
        }, error => {
          this.sttLoading = false;
          this.sttNotifi = true;
          setTimeout(() => {
            this.sttNotifi = false;
          }, 5000);
          this.textNotifi = error.messge;
          this.sttTextNotifi = 'toast-error';
        }
      )
    }
  }
}
