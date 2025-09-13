import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
//modules
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
//components
import { AppComponent } from './app.component';
import { PageError404Component } from './page-error404/page-error404.component';


@NgModule({
  declarations: [
    AppComponent,
    PageError404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
    SweetAlert2Module,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
