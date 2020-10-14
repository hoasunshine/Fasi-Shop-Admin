import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  productDataList = [];
  productDataListPer = [];
  sttAdd: boolean = true;
  sttNotifi: boolean = false;
  sttTextNotifi = 'toast-success';
  sttLoading = false;
  textNotifi: string;
  roleId: string;
  productAmountList = [];
  constructor(private service: InsideService) { }

  ngOnInit() {
    this.roleId = window.localStorage.getItem('roleId');
    this.getDataClient();
  }

  getDataClient() {
    const accountId = window.localStorage.getItem('id');
    if (this.roleId == '1') {
      this.service.getProductData().subscribe(data => {
        this.productDataList = data['data'].sort((a,b) => {
          return b.createdAt - a.createdAt;
        });
        this.productDataListPer = data['data'];
      });
    } else {
      this.service.getProductData().subscribe(data => {
        this.productDataList = data['data'].sort((a,b) => {
          return b.createdAt - a.createdAt;
        });
        this.productDataList = this.productDataList.filter(item => item.accountId == accountId);
      })
    }
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
        const byTimeUp = this.productDataList.slice(0);
        byTimeUp.sort((a, b) => {
          if (checked) {
            return b.updatedAt - a.updatedAt;
          } else {
            return a.updatedAt - b.updatedAt;
          }
        });
        this.productDataList = byTimeUp;
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
