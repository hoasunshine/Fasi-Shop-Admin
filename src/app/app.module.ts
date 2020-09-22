import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './outside/login/login.component';
import { InsideComponent } from './inside/inside.component';
import { InsideRoutingModule } from './inside/inside-routing.module';
import { InsideModule } from './inside/inside.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InsideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InsideRoutingModule,
    InsideModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxDropzoneModule,
    CKEditorModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
