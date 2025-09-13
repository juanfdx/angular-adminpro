import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    //protegemos la ruta dahsboard/users para no entre si no es Admin
    if (this.userService.role === 'ADMIN_ROLE') {
      return true;

    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }
  
}
