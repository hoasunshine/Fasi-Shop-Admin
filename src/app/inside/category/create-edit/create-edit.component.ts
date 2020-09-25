import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CategoryCreateEditComponent implements OnInit {

  formCreate: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formCreate = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
}
