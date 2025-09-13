import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicsComponent } from './medics/medics.component';
import { MedicComponent } from './medic/medic.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [

  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Settings' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' } },
  { path: 'medics', component: MedicsComponent, data: { title: 'Medics' } },
  { path: 'medic/:id', component: MedicComponent, data: { title: 'Medic' } },
  { path: 'search/:term', component: SearchComponent, data: { title: 'Search' } },
  //Admin routes
  { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Users' } },
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
