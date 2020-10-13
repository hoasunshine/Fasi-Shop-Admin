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
import { NgxDropzoneModule } from 'ngx-dropzone';
import { InsideRoutingModule } from './inside-routing.module';
import { InsideComponent } from './inside.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DetailComponent } from './user/detail/detail.component';
import { HotProductComponent } from './hot-product/hot-product.component';


@NgModule({
  declarations: [
    InsideComponent,
    DashboardComponent,
    CategoryComponent,
    ProductComponent,
    TransactionComponent,
    UserComponent,
    CategoryCreateEditComponent,
    ProductCreateEditComponent,
    DetailComponent,
    HotProductComponent
  ],
  exports:[
    InsideComponent
  ],
  imports: [
    CommonModule,
    InsideRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    NgxPaginationModule,
  ]
})
export class InsideModule { }
