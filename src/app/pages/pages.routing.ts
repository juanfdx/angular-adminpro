import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//guard
import { AuthGuard } from '../guards/auth.guard';
import { StatusGuard } from '../guards/status.guard';
//components
import { PagesComponent } from './pages.component';



const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    canActivate: [AuthGuard, StatusGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
