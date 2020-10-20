import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './manage/category/category.component';
import { CategoryCreateEditComponent } from './manage/category/create-edit/create-edit.component';
import { DashboardComponent } from './manage/dashboard/dashboard.component';
import { HotProductComponent } from './manage/hot-product/hot-product.component';
import { InsideComponent } from './inside.component';
import { ProductCreateEditComponent } from './manage/product/create-edit/create-edit.component';
import { ProductComponent } from './manage/product/product.component';
import { TransactionComponent } from './manage/transaction/transaction.component';
import { UserComponent } from './manage/user/user.component';
import { MyProductsComponent } from './seller/my-products/my-products.component';
import { MyTransactionsComponent } from './seller/my-transactions/my-transactions.component';
import { ProductDetailComponent } from './manage/product/detail/detail.component';
import { TransactionDetailComponent } from './manage/transaction/detail/detail.component';
import { UserDetailComponent } from './manage/user/detail/detail.component';
import { BlogComponent } from './manage/blog/blog.component';
import { BlogCreateEditComponent } from './manage/blog/create-edit/create-edit.component';

const routes: Routes = [
  {
    path: '',
    component: InsideComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoryComponent,
      },
      {
        path: 'category/create-edit',
        component: CategoryCreateEditComponent,
      },
      {
        path: 'products',
        component: ProductComponent,
      },
      {
        path: 'product/create-edit',
        component: ProductCreateEditComponent,
      },
      {
        path: 'product/detail',
        component: ProductDetailComponent,
      },
      {
        path: 'transactions',
        component: TransactionComponent,
      },
      {
        path: 'transaction/detail',
        component: TransactionDetailComponent,
      },
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'user/detail',
        component: UserDetailComponent,
      },
      {
        path: 'hot-products',
        component: HotProductComponent
      },
      {
        path: 'product-list',
        component: MyProductsComponent,
      },
      {
        path: 'transaction-list',
        component: MyTransactionsComponent,
      },
      {
        path: 'blogs',
        component: BlogComponent,
      },
      {
        path: 'blog/create-edit',
        component: BlogCreateEditComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsideRoutingModule { }
