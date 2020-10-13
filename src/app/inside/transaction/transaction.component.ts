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
    const id = window.localStorage.getItem('id');
    if (id == '2') {
      this.service.getAllTransaction().subscribe(data => {
        this.transactionList = data['data']['list'];
        this.transactionList = this.transactionList.filter(item => item.sellerId == id);
      });
    }
    if (id == '1') {
      this.sttAdmin = true;
      this.service.getAllTransaction().subscribe(data => {
        this.transactionList = data['data']['list'];
      });
    }
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
