import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsideService } from 'src/app/services/inside.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataProducts } from 'src/model/dataProducts';
import { Images } from 'src/model/images';


@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
})
export class ProductCreateEditComponent implements OnInit {

  formCreate: FormGroup;
  urls = [];
  datas: DataProducts = new DataProducts;
  downloadURLThumbnail: Observable<string>;
  downloadURL: Observable<string>;
  progressValue: Observable<number>;
  progressValueThumbnail: Observable<number>;
  url: string;
  fileName: string;
  sttAdd = true;
  sttLoading = false;
  sttLoadingProgress = false;
  sttNotifi = false;
  sttTextNotifi = 'toast-success';
  textNotifi: string;
  images: Images[];
  productData = [];
  categoryData = [];
  id: string;
  thumbnail: string;

  constructor(private fb: FormBuilder, private service: InsideService,
    private http: HttpClient, private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.createForm();
    this.getDataClient();
    this.getDataUpdate();
  }

  createForm() {
    this.formCreate = this.fb.group({
      categoryId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required],
      status: ['Active'],
    })
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

  getDataClient() {
    this.service.getProductData().subscribe(data => {
      this.productData = data['data'];
    });
    this.service.getCategoryData().subscribe(data => {
      this.categoryData = data['data']['list'];
    })
  }

  getDataUpdate() {
    var url = window.location.href;
    this.id = this.getParameterByName('id', url);
    if (this.id !== null && this.id !== undefined) {
      this.service.getProductImageListByProductId(this.id).subscribe(data2 => {
        for (let i = 0; i < data2['imageDTOS'].length; i++) {
          this.urls.push(data2['imageDTOS'][i].url);
        }
      });
      this.service.getDetailProduct(this.id).subscribe(data => {
        this.service.getProductAmountByProductId(this.id).subscribe(data1 => {
          const objCreated = [];
          objCreated['categoryId'] = data['data']['category']['categoryId'];
          objCreated['name'] = data['data']['productName'];
          objCreated['description'] = data['data']['description'];
          objCreated['price'] = data['data']['productPrice'];
          objCreated['amount'] = data1['data']['totalProduct'];
          objCreated['status'] = data['data']['status'];
          this.thumbnail = data['data']['imageProduct'];
          this.formCreate = this.fb.group(objCreated);
          this.sttAdd = false;
        });
      });
    }
  }

  createProduct() {
    const data = {
      accountId: window.localStorage.getItem('id'),
      categoryId: this.formCreate.value.categoryId,
      productName: this.formCreate.value.name,
      productPrice: this.formCreate.value.price,
      description: this.formCreate.value.description,
      status: this.formCreate.value.status,
      imageProduct: this.thumbnail,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      deletedAt: 0,
    }
    this.datas.product = data;
    this.datas.totalProducts = this.formCreate.value.amount;
    this.datas.imageList = this.images;
    this.service.addProduct(this.datas).subscribe(
      response => {
        this.sttLoading = false;
        this.sttNotifi = true;
        setTimeout(() => {
          this.sttNotifi = false;
        }, 5000);
        this.textNotifi = 'Created Successfully!';
        this.sttTextNotifi = 'toast-success';
        window.location.href = '/product-list';
      },
      error => {
        this.sttLoading = false;
        this.sttNotifi = true;
        setTimeout(() => {
          this.sttNotifi = false;
        }, 5000);
        this.textNotifi = error.message;
        this.sttTextNotifi = 'toast-error';
      },
    )
  }

  updateProduct() {
    const data = {
      accountId: window.localStorage.getItem('id'),
      categoryId: this.formCreate.value.categoryId,
      productName: this.formCreate.value.name,
      productPrice: this.formCreate.value.price,
      description: this.formCreate.value.description,
      status: this.formCreate.value.status,
      imageProduct: this.thumbnail,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      deletedAt: 0,
    }
    this.datas.product = data;
    this.datas.totalProducts = this.formCreate.value.amount;
    this.datas.imageList = this.images;
    this.service.updateProduct(this.datas, this.id).subscribe(
      response => {
        this.sttLoading = false;
        this.sttNotifi = true;
        setTimeout(() => {
          this.sttNotifi = false;
        }, 5000);
        this.textNotifi = 'Updated Successfully!';
        this.sttTextNotifi = 'toast-success';
        window.location.href = '/products';
      },
      error => {
        this.sttLoading = false;
        this.sttNotifi = true;
        setTimeout(() => {
          this.sttNotifi = false;
        }, 5000);
        this.textNotifi = error.message;
        this.sttTextNotifi = 'toast-error';
      },
    )
  }

  uploadThumbnail(event) {
    var n = event.target.files[0].name;
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, event.target.files[0]);
    this.sttLoadingProgress = true;
    this.progressValueThumbnail = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => {
      this.downloadURLThumbnail = fileRef.getDownloadURL();
      this.downloadURLThumbnail.subscribe((url) => {
        if (url) {
          this.thumbnail = url;
          this.sttLoadingProgress = false;
        }
      })
    })).subscribe(url => {
      if (url) {
        console.log('url');
      }
    })
  }

  onRemove(event) {
    this.urls.splice(this.urls.indexOf(event), 1);
  }

  onSelect(event) {
    let files = event.addedFiles;
    for (let i = 0; i < files.length; i++) {
      this.fileName = files[i].name;
      this.uploadFile(files[i]);
    }
  }

  uploadFile(file) {
    var n = this.fileName;
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.sttLoadingProgress = true;
    this.progressValue = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.images = [];
              let image = new Images();
              image.url = url
              this.images.push(image)
              this.urls.push(url);
              this.sttLoadingProgress = false;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('url');
        }
      });
  }
}
