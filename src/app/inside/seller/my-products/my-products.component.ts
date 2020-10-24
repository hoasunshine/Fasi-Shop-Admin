import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
})
export class MyProductsComponent implements OnInit {

  accountId: string;
  productList = [];
  productListPer = [];
  sttNotifi = false;
  sttTextNotifi = 'toast-success';
  sttLoading = false;
  textNotifi: string;

  constructor(private service: InsideService) { }

  ngOnInit() {
    this.accountId = window.localStorage.getItem('id');
    this.getData();
  }

  getData() {
    this.service.getProductData().subscribe(data => {
      this.productList = data['data'].sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
      this.productListPer = data['data'].sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
      this.productList = this.productList.filter(item => item.accountId == this.accountId);
      this.productListPer = this.productListPer.filter(item => item.accountId == this.accountId);
      if (this.productList.length == 0) {
        this.sttNotifi = true;
        setTimeout(() => {
          this.sttNotifi = false
        }, 5000);
        this.textNotifi = 'You have no products yet!!!';
        this.sttTextNotifi = 'toast-error';
      }
    })
  }

  dismissToast() {
    this.sttNotifi = false;
  }

  search(val: any) {
    const arr = [];
    const data = this.productListPer;
    for (let i = 0; i < data.length; i++) {
      const text = (data[i].productName).toLowerCase();
      if (text.indexOf(val.toLowerCase()) !== -1) {
        arr.push(data[i]);
      }
    }
    this.productList = arr;
    if (this.productList.length === 0) {
      this.sttLoading = false;
      this.sttNotifi = true;
      setTimeout(() => {
        this.sttNotifi = false;
      }, 5000);
      this.textNotifi = 'No product data!';
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
        this.productList = this.productListPer.sort((a, b) => {
          if (checked) {
            return b.createdAt - a.createdAt;
          } else {
            return a.createdAt - b.createdAt;
          }
        })
        break;
      case 'timeUp':
        this.productList = this.productListPer.sort((a, b) => {
          if (checked) {
            return b.updatedAt - a.updatedAt;
          } else {
            return a.updatedAt - b.updatedAt;
          }
        })
        break;
      case 'price':
        this.productList = this.productListPer.sort((a, b) => {
          if (checked) {
            return b.productPrice - a.productPrice;
          } else {
            return a.productPrice - b.productPrice;
          }
        })
        break;
      case 'amount':
        this.productList = this.productListPer.sort((a, b) => {
          if (checked) {
            return b.totalProduct - a.totalProduct;
          } else {
            return a.totalProduct - b.totalProduct;
          }
        })
        break;
      default:
        break;
    }
  }

  getStt(type) {
    if (type === 'all') {
      this.productList = this.productListPer;
      return;
    }
    const arr = [];
    const data = this.productListPer;
    for (let i = 0; i < data.length; i++) {       
      if (data[i].status == type) {
        arr.push(data[i]);
      }
    }
    this.productList = arr;  
    if (this.productList.length === 0) {
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

  hotProductRequest(id) {
    const confirmed = confirm('Do you want to submit a request to put this product on hot product?')
    if (confirmed) {
      const data = {
        productId: id,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        deletedAt: 0,
        status: 'Deactive',
      }
      this.service.createHotProduct(data).subscribe(
        response => {
          this.sttNotifi = true;
          setTimeout( () => {
            this.sttNotifi = false;
          }, 5000)
          this.textNotifi = 'Send request successfully!!!';
          this.sttTextNotifi = 'toast-success';
          window.location.reload();
        },
        error => {
          this.sttNotifi = true;
          setTimeout(() => {
            this.sttNotifi = false;
          }, 5000);
          this.textNotifi = error.message;
          this.sttTextNotifi = 'toast-error';
        }
      )
    }
  }

  deleteProduct(id) {
    const confirmed = confirm('Do you want to deactive this product?');
    if (confirmed) {
      this.service.deleteProduct(id).subscribe(
        response => {
          this.sttLoading = false;
          this.sttNotifi = true;
          setTimeout(() => {
            this.sttNotifi = false;
          }, 5000);
          this.textNotifi = 'Deactive successfully!';
          this.sttTextNotifi = 'toast-success';
        },
        error => {
          this.sttLoading = false;
          this.sttNotifi = true;
          setTimeout(() => {
            this.sttNotifi = false;
          }, 5000);
          this.textNotifi = error.messge;
          this.sttTextNotifi = 'toast-error';
        },
      )
    }
  }

}
