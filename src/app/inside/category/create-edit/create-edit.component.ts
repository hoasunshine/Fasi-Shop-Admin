import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsideService } from 'src/app/services/inside.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
})
export class CategoryCreateEditComponent implements OnInit {

  formCreated: FormGroup;
  id: string;
  sttAdd: boolean = true;
  sttNotifi: boolean = false;
  sttTextNotifi = 'toast-success';
  sttLoading: boolean = false;
  textNotifi: string;
  createdTime: number;

  constructor(private fb: FormBuilder, private service: InsideService) { }

  ngOnInit() {
    this.createForm();
    this.getDataUpdate();
  }

  createForm() {
    this.formCreated = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Active'],
    });
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
    if (this.id !== null || this.id !== undefined) {
      this.service.getDetailCategory(this.id).subscribe(data => {        
        const objCreated = [];                
        objCreated['name'] = data['data'].categoryName;
        objCreated['description'] = data['data'].description;
        objCreated['status'] = data['data'].status;
        this.createdTime = data['data'].createdAt;
        this.formCreated = this.fb.group(objCreated);
        this.sttAdd = false;
      });
    }
  }

  createCategory() {
    const data = {
      categoryId: '',
      categoryName: this.formCreated.value.name,
      description: this.formCreated.value.description,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      deletedAt: 0,
      status: this.formCreated.value.status,
    }
    this.service.addCategory(data).subscribe(
      response => {
        this.sttLoading = false;
        this.sttNotifi = true;
        setTimeout( () => {
          this.sttNotifi = false;
        }, 5000);
        this.textNotifi = 'Created Successfully!';
        this.sttTextNotifi = 'toast-success';
        window.location.href = '/categories';
      },
      error => {
        console.log(error);
        this.sttLoading = false;
        this.sttNotifi = true;
        setTimeout( () => {
          this.sttNotifi = false;
        }, 5000);
        this.textNotifi = error.messge;
        this.sttTextNotifi = 'toast-error';
      },
    )
  }

  updateCategory() {
    this.sttLoading = true;
    const data = {
      categoryId: '',
      categoryName: this.formCreated.value.name,
      description: this.formCreated.value.description,
      createdAt: this.createdTime,
      updatedAt: new Date().getTime(),
      deletedAt: 0,
      status: this.formCreated.value.status,
    }
    this.service.updateCategory(data, this.id).subscribe(
      response => {
        this.sttLoading = false;
        this.sttNotifi = true;
        setTimeout( () => {
          this.sttNotifi = false;
        }, 2000);
        this.textNotifi = 'Updated Successfully!';
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

  dismissToast() {
    this.sttNotifi = false;
  }
}
