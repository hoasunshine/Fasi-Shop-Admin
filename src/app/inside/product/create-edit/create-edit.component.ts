import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsideService } from 'src/app/services/inside.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
})
export class ProductCreateEditComponent implements OnInit {

  formCreate: FormGroup;
  urls = [];
  downloadURL: Observable<string>;
  progressValue: Observable<number>;
  url: string;
  fileName: string;
  sttLoading = false;

  productData: any = [];

  constructor(private fb: FormBuilder, private service: InsideService,
    private http: HttpClient, private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.createForm();
    this.getDataClient();
  }

  createForm() {
    this.formCreate = this.fb.group({
      categoryId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    })
  }

  getDataClient() {
    this.service.getCategoryData().subscribe(data => {
      this.productData = data['data'];
    });
  }

  createProduct() {
    console.log(this.formCreate.value.categoryId);
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
