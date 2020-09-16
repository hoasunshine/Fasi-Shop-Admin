import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserComponent } from './user/user.component';
import { CategoryCreateEditComponent } from './category/create-edit/create-edit.component';
import { ProductCreateEditComponent } from './product/create-edit/create-edit.component';


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
    CommonModule
  ]
})
export class InsideModule { }
