import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CategoryCreateEditComponent } from './category/create-edit/create-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HotProductComponent } from './hot-product/hot-product.component';
import { InsideComponent } from './inside.component';
import { ProductCreateEditComponent } from './product/create-edit/create-edit.component';
import { ProductComponent } from './product/product.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: InsideComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoryComponent
      },
      {
        path: 'category/create-edit',
        component: CategoryCreateEditComponent
      },
      {
        path: 'products',
        component: ProductComponent
      },
      {
        path: 'product/create-edit',
        component: ProductCreateEditComponent
      },
      {
        path: 'transactions',
        component: TransactionComponent
      },
      {
        path: 'users',
        component: UserComponent
      },
      {
        path: 'hot-products',
        component: HotProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsideRoutingModule { }
