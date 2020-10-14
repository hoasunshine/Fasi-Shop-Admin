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
}
