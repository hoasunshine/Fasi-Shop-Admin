import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserComponent } from './user/user.component';
import { CategoryCreateEditComponent } from './category/create-edit/create-edit.component';
import { ProductCreateEditComponent } from './product/create-edit/create-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { InsideRoutingModule } from './inside-routing.module';


@NgModule({
  declarations: [DashboardComponent,
    CategoryComponent,
    ProductComponent,
    TransactionComponent,
    UserComponent,
    CategoryCreateEditComponent,
    ProductCreateEditComponent
  ],
  imports: [
    CommonModule,
    InsideRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    CKEditorModule,
  ]
})
export class InsideModule { }
