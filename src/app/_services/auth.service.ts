import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private afAuth: AngularFireAuth, private snacService: SnackbarService,
            private router: Router) { }

registerUser(email, password) {
  return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
}

login(email, password) {
  return this.afAuth.auth.signInWithEmailAndPassword(email, password);
}

logout() {
  localStorage.clear();
  this.afAuth.auth.signOut().then(() => {
    this.snacService.showSnack('Logged out');
    this.router.navigate(['/home']);
  });
}

isLoggedIn() {
  return !!(localStorage.getItem('userRole')) && !!(localStorage.getItem('userEmail'));
}

isUserLoggedIn() {
  return this.isLoggedIn() && !!(localStorage.getItem('userRole') === 'User');
}

isAdminLoggedIn() {
  return this.isLoggedIn() && !!(localStorage.getItem('userRole') === 'Admin');
}

}
