import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private menu : any[] = []

  public menuSource = new BehaviorSubject<any[]>([])
  public menu$ = this.menuSource.asObservable()

  constructor(private http: HttpClient,
              private router: Router) { }


  //para el menu hardcodeado en el assets/data/data-sidebar.json
  // getSidebarMenu(): Observable<any> {
  //   return this.http.get<any>('/assets/data/data-sidebar.json')
  // }



  // si viene del localStorage, que lo puso alli el backend
  loadMenu() {

    this.menu = JSON.parse(localStorage.getItem('menu')!);

    //si no existe el menu, seria por algun problema, entonces lo mandamos al login
    if (this.menu.length === 0 || localStorage.getItem('menu') === null) {
      localStorage.removeItem('token')
      this.router.navigateByUrl('/login')

    } else {
      this.menuSource.next(this.menu)
    }
  }
}
