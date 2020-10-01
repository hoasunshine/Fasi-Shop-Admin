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
  sttLoading: boolean = false;
  textNotifi: string;

  constructor(private service: InsideService) { }

  ngOnInit() {
    this.getDataClient();
  }

  getDataClient() {
    this.service.getProductData().subscribe(data => {
      this.productDataList = data['data']['productDTOList'];
      this.productDataListPer = data['data']['productDTOList'];
    });
  }

  deleteProduct(id) {
    const confirmed = confirm('Do you want to deactive this product?');
    if (confirmed) {
      this.service.deleteProduct(id).subscribe(
        response => {
          this.sttLoading = false;
          setTimeout( () => {
            this.sttNotifi = true;
          }, 2000);
          this.textNotifi = 'Deactive successfully!';
          this.sttTextNotifi = 'toast-success';
        },
        error => {
          console.log(error);
          this.sttLoading = false;
          this.sttNotifi = true;
          this.textNotifi = error.msg;
          this.sttTextNotifi = 'toast-error';
        },
      )
    }
  }
}
