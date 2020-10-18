import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
})
export class TransactionComponent implements OnInit {

  sttAdmin = false;
  sttLoading = false;
  sttNotifi = false;
  sttTextNotifi = 'toast-success';
  textNotifi: string;
  transactionList = [];
  transactionListPer = [];
  userData = [];
  constructor(private service: InsideService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.sttAdmin = true;
    this.service.getAllTransaction().subscribe(data => {
      this.transactionList = data['data']['list'];
    });
    this.service.getAccountData().subscribe(data => {
      this.userData = data['data']['accountDTOList'];
    })
  }

  getSellerName(id) {
    for (let i = 0; i < this.userData.length; i++) {
      if (this.userData[i].accountId == id) {
        return this.userData[i].accountName;
      }
    }
  }

  dismissToast() {
    this.sttNotifi = false;
  }

  sortBy($event, type) {
    const checked = $event.target.classList.contains('ti-arrow-up');
    if (checked) {
      $event.target.classList.remove('ti-arrow-up');
      $event.target.classList.add('ti-arrow-down');
    } else {
      $event.target.classList.remove('ti-arrow-down');
      $event.target.classList.add('ti-arrow-up');
    }
    switch (type) {
      case 'timeCre':
        this.transactionList = this.transactionList.sort((a, b) => {
          if (checked) {
            return b.createdAt - a.createdAt;
          } else {
            return a.createdAt - b.createdAt;
          }
        })
        break;
      case 'timeUp':
        this.transactionList = this.transactionList.sort((a, b) => {
          if (checked) {
            return b.updatedAt - a.updatedAt;
          } else {
            return a.updatedAt - b.updatedAt;
          }
        })
        break;
      case 'totalPrice':
        this.transactionList = this.transactionList.sort((a, b) => {
          if (checked) {
            return b.totalPrice - a.totalPrice;
          } else {
            return a.totalPrice - b.totalPrice;
          }
        })
        break;
      default:
        break;
    }
  }
}
