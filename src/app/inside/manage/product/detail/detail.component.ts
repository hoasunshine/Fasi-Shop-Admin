import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class ProductDetailComponent implements OnInit {

  productData = {};
  urls = [];
  userData = [];
  id: string;
  constructor(private service: InsideService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    var url = window.location.href;
    this.id = this.getParameterByName('id', url);
    this.service.getDetailProduct(this.id).subscribe(data => {
      this.productData = data['data'];      
    })
    this.service.getProductImageListByProductId(this.id).subscribe(data => {
      for (let i = 0; i < data['imageDTOS'].length; i++) {
        this.urls.push(data['imageDTOS'][i].url);
      }
    })
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
  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

}
