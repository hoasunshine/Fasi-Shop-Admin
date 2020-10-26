import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-hot-product',
  templateUrl: './hot-product.component.html',
})
export class HotProductComponent implements OnInit {

  hotProductList = [];
  hotProductListPer = [];
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
      this.hotProductList = data['data']['list'].sort((a,b) => {
        return b.createdAt - a.createdAt;
      });
      this.hotProductListPer = data['data']['list'].sort((a,b) => {
        return b.createdAt - a.createdAt;
      });
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

  getStt(type) {
    if (type === 'all') {
      this.hotProductList = this.hotProductListPer;
      return;
    }
    const arr = [];
    const data = this.hotProductListPer;
    for (let i = 0; i < data.length; i++) {       
      if (data[i].status == type) {
        arr.push(data[i]);
      }
    }
    this.hotProductList = arr;  
    if (this.hotProductList.length === 0) {
      this.sttNotifi = true;
      setTimeout(() => {
        this.sttNotifi = false;
      }, 5000);
      this.textNotifi = 'No data!';
      this.sttTextNotifi = 'toast-error';
    } else {
      this.sttNotifi = false;
    }
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
        this.hotProductList = this.hotProductListPer.sort((a, b) => {
          if (checked) {
            return b.createdAt - a.createdAt;
          } else {
            return a.createdAt - b.createdAt;
          }
        })
        break;
      case 'timeUp':
        this.hotProductList = this.hotProductListPer.sort((a, b) => {
          if (checked) {
            return b.updatedAt - a.updatedAt;
          } else {
            return a.updatedAt - b.updatedAt;
          }
        })
        break;
      case 'price':
        this.hotProductList = this.hotProductListPer.sort((a, b) => {
          if (checked) {
            return b.product.productPrice - a.product.productPrice;
          } else {
            return a.product.productPrice - b.product.productPrice;
          }
        })
        break;
      default:
        break;
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

  deactiveHotProduct(id) {
    const confirmed = confirm('Do you want to deactive this product?');
    if (confirmed) {
      this.service.deactiveHotProduct(id).subscribe(
        response => {
          this.sttNotifi = true;
          setTimeout(() => {
            this.sttNotifi = false;
          }, 5000);
          this.textNotifi = 'Dective successfully!';
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
