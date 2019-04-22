import { SnackbarService } from 'src/app/_services/snackbar.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router, private snackBar: SnackbarService) {}
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
     if (this.authService.isUserLoggedIn()) {
       return true;
     } else {
       this.snackBar.showSnack('Access Denied');
       this.router.navigate(['/']);
       return false;
     }
  }
}
