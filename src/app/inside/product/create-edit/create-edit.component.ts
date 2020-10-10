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
  downloadURL: Observable<string>;
  progressValue: Observable<number>;
  url: string;
  fileName: string;
  sttLoading = false;
  sttNotifi = false;
  sttTextNotifi = 'toast-success';
  textNotifi: string;
  images: Images[];
  productData = [];
  categoryData = [];
  id: string;

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
  }

  createProduct() {
    const data = {
      accountId: window.localStorage.getItem('id'),
      productId: '',
      categoryId: this.formCreate.value.categoryId,
      productName: this.formCreate.value.name,
      productPrice: this.formCreate.value.price,
      description: this.formCreate.value.description,
      status: this.formCreate.value.status,
      imageProduct: '123',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      deletedAt: 0,
    }
    console.log(data);
    this.datas.product = data;
    this.datas.totalProducts = this.formCreate.value.amount;
    this.datas.imageList = this.images;
    console.log(this.datas);
    this.service.addProduct(this.datas).subscribe(
      response => {
        this.sttLoading = false;
        this.sttNotifi = true;
        setTimeout(() => {
          this.sttNotifi = false;
        }, 5000);
        this.textNotifi = 'Created Successfully!';
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

  onRemove(event) {
    this.urls.splice(this.urls.indexOf(event), 1);
  }

  onSelect(event) {
    let files = event.addedFiles
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
    this.sttLoading = true;
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
              console.log(this.urls);
              this.sttLoading = false;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
