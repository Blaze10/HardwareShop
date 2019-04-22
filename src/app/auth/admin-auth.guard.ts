import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { SnackbarService } from '../_services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router, private snackBar: SnackbarService) {}
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
     if (this.authService.isAdminLoggedIn()) {
       return true;
     } else {
       this.snackBar.showSnack('Access Denied');
       this.router.navigate(['/']);
       return false;
     }
  }
}
