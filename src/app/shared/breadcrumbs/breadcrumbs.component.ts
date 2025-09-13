import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';
import { Theme } from 'src/app/interfaces/theme.interface';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  public title: string = '';
  public theme : any

  public listObservers$: Subscription[] = [];


  constructor(private themesService: ThemesService,
              private router: Router) { 

    const observer2$ = this.getDataRoutes().subscribe( ({title}) => {
      this.title = title   
       //titulo de la pagina
       document.title = `Medics & Hospitals - ${ title.toLowerCase() }`;   
    })
    this.listObservers$.push(observer2$)
  }

  ngOnInit(): void {
    this.setTheme()
  }

  setTheme(): void {
    const observer1$ = this.themesService.theme$.subscribe((res: Theme) => {
      this.theme = res
    })
    this.listObservers$.push(observer1$)
  }

  getDataRoutes(): Observable<any> {
    //obtenemos la propiedad data de las rutas para los breadcrumbs
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: any) => event.snapshot.firstChild === null ),
      map((event: any) => event.snapshot.data )
    );  
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }

}
