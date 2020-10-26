import { Component, OnInit } from '@angular/core';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {

  blogList = [];
  blogListPer = [];
  sttNotifi = false;
  sttTextNotifi = 'toast-success';
  sttLoading = false;
  textNotifi: string;
  constructor(private service: InsideService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getBlogDatas().subscribe(data => {
      this.blogList = data['data']['list'].sort((a, b) => {
        return b['createdAt'] - a['createdAt'];
      })
      this.blogListPer = data['data']['list'].sort((a, b) => {
        return b['createdAt'] - a['createdAt'];
      })
    })
  }

  dismissToast() {
    this.sttNotifi = false;
  }

  search(val: any) {
    const arr = [];
    const data = this.blogListPer;
    for (let i = 0; i < data.length; i++) {
      const text = (data[i].title).toLowerCase();
      if (text.indexOf(val.toLowerCase()) !== -1) {
        arr.push(data[i]);
      }
    }
    this.blogList = arr;
    if (this.blogList.length === 0) {
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

  getStt(type) {
    if (type === 'all') {
      this.blogList = this.blogListPer;
      return;
    }
    const arr = [];
    const data = this.blogListPer;
    for (let i = 0; i < data.length; i++) {       
      if (data[i].status == type) {
        arr.push(data[i]);
      }
    }
    this.blogList = arr;  
    if (this.blogList.length === 0) {
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
        this.blogList = this.blogList.sort((a, b) => {
          if (checked) {
            return b.createdAt - a.createdAt;
          } else {
            return a.createdAt - b.createdAt;
          }
        })
        break;
      case 'timeUp':
        this.blogList = this.blogList.sort((a, b) => {
          if (checked) {
            return b.updatedAt - a.updatedAt;
          } else {
            return a.updatedAt - b.updatedAt;
          }
        })
        break;
      default:
        break;
    }
  }
}
