import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
})
export class TransactionComponent implements OnInit {

  transactionList = [];
  constructor(private service: InsideService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getAllTransaction().subscribe(data => {      
      this.transactionList = data['data'];
    });
  }
}
