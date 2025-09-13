import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { PageError404Component } from './page-error404/page-error404.component';

const routes: Routes = [

  //path: 'dashboard' PagesRoutingModule
  //path: 'login' AuthRoutingModule
  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageError404Component },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
