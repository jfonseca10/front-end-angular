import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import {AuthService} from '../shared/auth.service';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/user/login'], {
      queryParams: {
        returnUrl: state.url
      }
    });
    return false;
  }

  /**
   * @example ['create.user:true','update.user:false'] => 'create.user:true'?true:false
   * @param permission
   */
  verifyPermission(permission) {
    const currentUser = this.authService.currentUserValue
    return currentUser.permissions.indexOf(permission) >= 0
  }
}
