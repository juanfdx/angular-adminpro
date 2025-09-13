import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
//components
import { PanelButtonComponent } from './panel-button/panel-button.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { LangDropdownComponent } from './lang-dropdown/lang-dropdown.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SidebarIconComponent } from './sidebar-icon/sidebar-icon.component';
import { SearchMaintComponent } from './search-maint/search-maint.component';
import { LoadingMaintComponent } from './loading-maint/loading-maint.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { TableHospitalsComponent } from './table-hospitals/table-hospitals.component';
import { TableMedicsComponent } from './table-medics/table-medics.component';
import { ModalImageComponent } from './modal-image/modal-image.component';
//translate module
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    PanelButtonComponent,
    ProfileDropdownComponent,
    LangDropdownComponent,
    SearchFormComponent,
    SidebarIconComponent,
    SearchMaintComponent,
    LoadingMaintComponent,
    TableUsersComponent,
    TableHospitalsComponent,
    TableMedicsComponent,
    ModalImageComponent,
  ],
  exports: [
    PanelButtonComponent,
    ProfileDropdownComponent,
    LangDropdownComponent,
    SearchFormComponent,
    SidebarIconComponent,
    SearchMaintComponent,
    LoadingMaintComponent,
    TableUsersComponent,
    TableHospitalsComponent,
    TableMedicsComponent,
    ModalImageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    TranslateModule.forRoot({
      defaultLanguage: 'es',
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ]
})
export class ComponentsModule { }
