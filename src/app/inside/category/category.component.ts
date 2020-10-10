import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  categoryDataList: any = [];
  categoryDataListPer: any = [];
  sttAdd: boolean = true;
  sttNotifi: boolean = false;
  sttTextNotifi = 'toast-success';
  sttLoading = false;
  textNotifi: string;
  constructor(private service: InsideService) { }

  ngOnInit() {
    this.getDataClient();
  }

  getDataClient() {
    this.service.getCategoryData().subscribe(data => {      
      this.categoryDataList = data['data']['list'];
      this.categoryDataListPer = data['data']['list'];
    });
  }

  dismissToast() {
    this.sttNotifi = false;
  }

  search(val: any) {
    const arr = [];
    const data = this.categoryDataListPer;
    for (let i = 0; i < data.length; i++) {
      const text = (data[i].categoryName).toLowerCase();
      if (text.indexOf(val.toLowerCase()) !== -1) {
        arr.push(data[i]);
      }
    }
    this.categoryDataList = arr;
    if (this.categoryDataList.length === 0) {
      this.sttLoading = false;
      this.sttNotifi = true;
      setTimeout( () => {
        this.sttNotifi = false;
      }, 5000);
      this.textNotifi = 'No category data!';
      this.sttTextNotifi = 'toast-error';
    } else {
      this.sttNotifi = false;
    }
  }

  deleteCategory(id) {
    const confirmed = confirm('Do you want to deactive this category?');
    if (confirmed) {
      this.service.deleteCategory(id).subscribe(
        response => {
          this.sttLoading = false;
          this.sttNotifi = true;
          setTimeout( () => {
            this.sttNotifi = false;
          }, 5000);
          this.textNotifi = 'Deactive successfully!';
          this.sttTextNotifi = 'toast-success';
          window.location.reload();
        },
        error => {
          this.sttLoading = false;
          this.sttNotifi = true;
          setTimeout( () => {
            this.sttNotifi = false;
          }, 5000);
          this.textNotifi = error.message;
          this.sttTextNotifi = 'toast-error';
        },
      )
    }
  }
}
