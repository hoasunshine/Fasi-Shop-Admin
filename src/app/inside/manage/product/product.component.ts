import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  
  sttAdd = true;
  sttNotifi = false;
  sttTextNotifi = 'toast-success';
  sttLoading = false;
  textNotifi: string;
  roleId: string;
  productAmountList = [];
  productDataList = [];
  productDataListPer = [];
  userData = [];
  
  constructor(private service: InsideService) { }

  ngOnInit() {
    this.roleId = window.localStorage.getItem('roleId');
    this.getDataClient();
  }

  getDataClient() {
    this.service.getProductData().subscribe(data => {
      this.productDataList = data['data'].sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      this.productDataListPer = data['data'];
    });
    this.service.getAccountData().subscribe(data => {
      this.userData = data['data']['accountDTOList'];
    })
  }

  getSellerName(id) {
    const findUser = this.userData.find(item => item.accountId == id)
    return findUser.accountName;
  }

  dismissToast() {
    this.sttNotifi = false;
  }

  search(val: any) {
    const arr = [];
    const data = this.productDataListPer;
    for (let i = 0; i < data.length; i++) {
      const text = (data[i].productName).toLowerCase();
      if (text.indexOf(val.toLowerCase()) !== -1) {
        arr.push(data[i]);
      }
    }
    this.productDataList = arr;
    if (this.productDataList.length === 0) {
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

  getStt(type) {
    if (type === 'all') {
      this.productDataList = this.productDataListPer;
      return;
    }
    const arr = [];
    const data = this.productDataListPer;
    for (let i = 0; i < data.length; i++) {       
      if (data[i].status == type) {
        arr.push(data[i]);
      }
    }
    this.productDataList = arr;  
    if (this.productDataList.length === 0) {
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
        this.productDataList = this.productDataListPer.sort((a, b) => {
          if (checked) {
            return b.createdAt - a.createdAt;
          } else {
            return a.createdAt - b.createdAt;
          }
        })
        break;
      case 'timeUp':
        this.productDataList = this.productDataListPer.sort((a, b) => {
          if (checked) {
            return b.updatedAt - a.updatedAt;
          } else {
            return a.updatedAt - b.updatedAt;
          }
        })
        break;
      case 'price':
        this.productDataList = this.productDataListPer.sort((a, b) => {
          if (checked) {
            return b.productPrice - a.productPrice;
          } else {
            return a.productPrice - b.productPrice;
          }
        })
        break;
      case 'amount':
        this.productDataList = this.productDataListPer.sort((a, b) => {
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
