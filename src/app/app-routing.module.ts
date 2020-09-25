import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsideComponent } from './inside/inside.component';
import { LoginComponent } from './outside/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  // { path: 'inside', component: InsideComponent},
  {
    path: '',
    loadChildren: () => import('./inside/inside.module').then(m => m.InsideModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
