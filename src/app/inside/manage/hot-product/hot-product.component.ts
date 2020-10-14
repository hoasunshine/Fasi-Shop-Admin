import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-hot-product',
  templateUrl: './hot-product.component.html',
})
export class HotProductComponent implements OnInit {

  hotProductList = [];
  userList = [];
  sttNotifi = false;
  sttTextNotifi = 'toast-success';
  sttLoading = false;
  textNotifi: string;
  constructor(private service: InsideService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getHotProducts().subscribe(data => {
      this.hotProductList = data['data']['list'];
    })
    this.service.getAccountData().subscribe(data => {
      this.userList = data['data']['accountDTOList'];
    })
  }

  getSellerName(id) {
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].accountId == id) {
        return this.userList[i].accountName;
      }
    }
  }

  activeHotProduct(id) {
    const confirmed = confirm('Do you want to active this product?');
    if (confirmed) {
      this.service.activeHotProduct(id).subscribe(
        response => {
          this.sttNotifi = true;
          setTimeout(() => {
            this.sttNotifi = false;
          }, 5000);
          this.textNotifi = 'Active successfully!';
          this.sttTextNotifi = 'toast-success';
          window.location.reload();
        }, error => {
          this.sttNotifi = true;
          setTimeout(() => {
            this.sttNotifi = false
          }, 5000);
          this.textNotifi = error.message;
          this.sttTextNotifi = 'toast-error';
        }
      )
    }

  }
}
