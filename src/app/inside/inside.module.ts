import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './manage/dashboard/dashboard.component';
import { CategoryComponent } from './manage/category/category.component';
import { ProductComponent } from './manage/product/product.component';
import { TransactionComponent } from './manage/transaction/transaction.component';
import { UserComponent } from './manage/user/user.component';
import { CategoryCreateEditComponent } from './manage/category/create-edit/create-edit.component';
import { ProductCreateEditComponent } from './manage/product/create-edit/create-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { InsideRoutingModule } from './inside-routing.module';
import { InsideComponent } from './inside.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DetailComponent } from './manage/user/detail/detail.component';
import { HotProductComponent } from './manage/hot-product/hot-product.component';
import { MyTransactionsComponent } from './seller/my-transactions/my-transactions.component';
import { MyProductsComponent } from './seller/my-products/my-products.component';


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
    HotProductComponent,
    MyTransactionsComponent,
    MyProductsComponent
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
