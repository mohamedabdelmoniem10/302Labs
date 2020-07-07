import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: ServiceService, private router: Router) {

  }

  user;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.service.isLogedIn.subscribe(res => {
      if(res && res != null) {
        this.user = true;
      }else if(!res) {
        this.router.navigate(['/signing'])
        this.user = false;
      }
    });
    return this.user;
  }
  
}
