import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class StatusGuard implements CanActivate {

  constructor(private userService: UserService,
    private router: Router) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    //protegemos la ruta dahsboard para no entre si no esta activo al recargar la pagina
    if (this.userService.status === 'active') {      
      return true;

    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('menu');
  
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
