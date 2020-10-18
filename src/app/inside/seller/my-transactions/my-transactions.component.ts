import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-my-transactions',
  templateUrl: './my-transactions.component.html',
})
export class MyTransactionsComponent implements OnInit {

  sttAdmin = false;
  sttLoading = false;
  sttNotifi = false;
  sttTextNotifi = 'toast-success';
  textNotifi: string;
  transactionList = [];
  transactionListPer = [];
  constructor(private service: InsideService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const accountId = window.localStorage.getItem('id');
    this.service.getAllTransaction().subscribe(data => {
      this.transactionList = data['data']['list'].sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      this.transactionListPer = data['data']['list'].sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      this.transactionList = this.transactionList.filter(item => item.sellerId == accountId);
      this.transactionListPer = this.transactionListPer.filter(item => item.sellerId == accountId);
      if (this.transactionList.length === 0) {
        this.sttNotifi = true;
        setTimeout(() => {
          this.sttNotifi = false
        }, 5000);
        this.textNotifi = 'You have no orders yet!!!';
        this.sttTextNotifi = 'toast-error';
      }
    });
  }

  dismissToast() {
    this.sttNotifi = false;
  }

  search(val: any) {
    const arr = [];
    const data = this.transactionListPer;
    for (let i = 0; i < data.length; i++) {
      const text = (data[i].accountName).toLowerCase();
      if (text.indexOf(val.toLowerCase()) !== -1) {
        arr.push(data[i]);
      }
    }
    this.transactionList = arr;
    if (this.transactionList.length === 0) {
      this.sttLoading = false;
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

  changeStatus(type, id) {
    console.log(type, id);
    if (type === 'Pending') {
      const confirmed = confirm('Do you want to change status to confirmed?');
      if (confirmed) {
        this.service.changeStatus('confirmOrder', id).subscribe(
          response => {
            this.sttLoading = false;
            this.sttNotifi = true;
            setTimeout(() => {
              this.sttNotifi = false;
            }, 5000);
            this.textNotifi = 'Changed to confirmed!';
            this.sttTextNotifi = 'toast-success';
            window.location.reload();
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
    if (type === 'Condirmed') {
      const confirmed = confirm('Do you want to change status to shipping?');
      if (confirmed) {
        this.service.changeStatus('shipping', id).subscribe(
          response => {
            this.sttLoading = false;
            this.sttNotifi = true;
            setTimeout(() => {
              this.sttNotifi = false;
            }, 5000);
            this.textNotifi = 'Changed to shipping!';
            this.sttTextNotifi = 'toast-success';
            window.location.reload();
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
    if (type === 'Paid') {
      const confirmed = confirm('Do you want to change status to shipping?');
      if (confirmed) {
        this.service.changeStatus('shipping', id).subscribe(
          response => {
            this.sttLoading = false;
            this.sttNotifi = true;
            setTimeout(() => {
              this.sttNotifi = false;
            }, 5000);
            this.textNotifi = 'Changed to shipping!';
            this.sttTextNotifi = 'toast-success';
            window.location.reload();
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
    if (type === 'Shipping') {
      const confirmed = confirm('Do you want to change status to done?');
      if (confirmed) {
        this.service.changeStatus('done', id).subscribe(
          response => {
            this.sttLoading = false;
            this.sttNotifi = true;
            setTimeout(() => {
              this.sttNotifi = false;
            }, 5000);
            this.textNotifi = 'Changed to done!';
            this.sttTextNotifi = 'toast-success';
            window.location.reload();
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

  deleteTrans(id) {
    const confirmed = confirm('Do you want to change status to cancel?');
    if (confirmed) {
      this.service.changeStatus('cancel', id).subscribe(
        response => {
          this.sttLoading = false;
          this.sttNotifi = true;
          setTimeout(() => {
            this.sttNotifi = false;
          }, 5000);
          this.textNotifi = 'Changed to cancel!';
          this.sttTextNotifi = 'toast-success';
          window.location.reload();
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
