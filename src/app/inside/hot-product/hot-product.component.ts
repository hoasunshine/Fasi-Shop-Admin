import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-hot-product',
  templateUrl: './hot-product.component.html',
})
export class HotProductComponent implements OnInit {

  hotProductList = [];
  constructor(private service: InsideService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getHotProducts().subscribe(data => {
      this.hotProductList = data['data']['list'];
      console.log(this.hotProductList);
      
    })
  }
}
