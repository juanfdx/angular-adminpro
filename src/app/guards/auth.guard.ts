import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private userService: UserService,
              private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.userService.validateToken()
    .pipe(
      tap( isAuthenticated => {
        //si no esta autenticado lo manda al login
        if (!isAuthenticated) {
          this.router.navigateByUrl('/login');
        }
      })
    )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.userService.validateToken()
      .pipe(
        tap((isAuthenticated: boolean )=> {
          //si no esta autenticado lo manda al login
          if (!isAuthenticated) {
            this.router.navigateByUrl('/login');
          }
        })
      )
  }
  
}
