import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
    
  ]
})
export class PagesComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    //carga el menu de maintenance desde el localstorage
    //en pages pq pages tiene las paginas que puede ver un usuario logeado
    this.sidebarService.loadMenu()
  }

}
