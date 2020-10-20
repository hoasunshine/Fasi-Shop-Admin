import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { InsideService } from 'src/app/services/inside.service';


@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
})
export class BlogCreateEditComponent implements OnInit {

  sttAdd = true;
  formCreated: FormGroup;
  thumbnail: string;
  downloadURLThumbnail: Observable<string>;
  sttLoadingProgress = false;
  progressValueThumbnail: Observable<number>;
  sttNotifi = false;
  sttTextNotifi = 'toast-success';
  sttLoading = false;
  textNotifi: string;
  id: string;
  createdTime: string;
  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private service: InsideService) { }

  ngOnInit() {
    this.createForm();
    this.getDataUpdate();
  }

  createForm() {
    this.formCreated = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
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

  getDataUpdate() {
    var url = window.location.href;
    this.id = this.getParameterByName('id', url);
    if (this.id !== null && this.id !== undefined) {
      this.service.getBlogDetail(this.id).subscribe(data => {        
        const objCreated = [];                
        objCreated['title'] = data['data'].title;
        objCreated['description'] = data['data'].description;
        objCreated['status'] = data['data'].status;
        this.thumbnail = data['data'].image;
        this.createdTime = data['data'].createdAt;
        this.formCreated = this.fb.group(objCreated);
        this.sttAdd = false;
      });
    }
  }

  dismissToast() {
    this.sttNotifi = false;
  }

  createBlog() {
    const data = {
      title: this.formCreated.value.title,
      image: this.thumbnail,
      description: this.formCreated.value.description,
      status: this.formCreated.value.status,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      deletedAt: 0,
    }
    this.service.createBlog(data).subscribe(
      response => {
        this.sttNotifi = true;
        setTimeout( () => {
          this.sttNotifi = false;
        }, 5000);
        this.textNotifi = 'Created Successfully!';
        this.sttTextNotifi = 'toast-success';
        window.location.href = '/blogs';
      }, error => {
        console.log(error);
        this.sttNotifi = true;
        setTimeout( () => {
          this.sttNotifi = false;
        }, 5000);
        this.textNotifi = error.messge;
        this.sttTextNotifi = 'toast-error';
      },
    )
  }

  updateBlog() {
    this.sttLoading = true;
    const data = {
      title: this.formCreated.value.title,
      image: this.thumbnail,
      description: this.formCreated.value.description,
      status: this.formCreated.value.status,
      createdAt: this.createdTime,
      updatedAt: new Date().getTime(),
      deletedAt: 0,
    }
    this.service.updateBlog(data, this.id).subscribe(
      response => {
        this.sttLoading = false;
        this.sttNotifi = true;
        setTimeout( () => {
          this.sttNotifi = false;
        }, 2000);
        this.textNotifi = 'Updated Successfully!';
        this.sttTextNotifi = 'toast-success';
        window.location.href = '/blogs';
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
  
}
