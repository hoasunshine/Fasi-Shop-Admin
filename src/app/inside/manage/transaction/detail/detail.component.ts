import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class TransactionDetailComponent implements OnInit {

  transactionDetail = [];
  productList = [];
  sellerList = [];
  id: string;
  detail = {};
  constructor(private service: InsideService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    var url = window.location.href;
    this.id = this.getParameterByName('id', url);
    this.service.getAllTransaction().subscribe(data => {
      this.transactionDetail = data['data']['list'];
      this.detail = this.transactionDetail.find(item => item.id == this.id);
      console.log(this.detail);
    });
    this.service.getTransactionDetail(this.id).subscribe(data => {
      this.transactionDetail = data['data']['orderDetailDTOList'];
    });
    this.service.getAccountData().subscribe(data => {
      this.sellerList = data['data']['accountDTOList'];
    })
  }

  getSellerName(id) {
    const findUser = this.sellerList.find(item => item.accountId == id)
    return findUser.accountName;
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
