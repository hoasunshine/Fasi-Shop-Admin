import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './outside/login/login.component';
import { InsideComponent } from './inside/inside.component';
import { InsideRoutingModule } from './inside/inside-routing.module';
import { InsideModule } from './inside/inside.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InsideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InsideRoutingModule,
    InsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
