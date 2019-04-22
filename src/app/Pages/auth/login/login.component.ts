import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from './../../../_services/snackbar.service';
import { AuthService } from './../../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showSpinner = false;
  userEmailList = [];
  constructor(private authService: AuthService, private snackBar: SnackbarService,
    private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
    this.initLoginForm();
  }

  getAllUsers() {
    this.userService.getAllUserEmailList().valueChanges().subscribe((list: User[]) => {
      list.forEach(element => {
        this.userEmailList.push(element.email.trim().toLowerCase());
      });
      this.userEmailList.push('admin@gmail.com');
    }, (err => {
      console.log(err);
    }));
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.showSpinner = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    let validUser = true;
    if (!this.userEmailList.includes(email.trim().toLowerCase())) {
      validUser = false;
    } else { validUser = true; }

    if (validUser) {

      this.authService.login(email, password)
        .then((user) => {
          if (email.trim().toLowerCase() === 'admin@gmail.com') {
            localStorage.setItem('userRole', 'Admin');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userId', user.user.uid);
            this.snackBar.showSnack('Logged in');
            this.router.navigate(['/home']);
            this.showSpinner = false;
          } else {
            localStorage.setItem('userRole', 'User');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userId', user.user.uid);
            this.snackBar.showSnack('Logged in');
            this.router.navigate(['/home']);
            this.showSpinner = false;
          }
        })
        .catch(err => {
          this.snackBar.showSnack('Invalid Credentials');
          this.showSpinner = false;
        });
    } else {
      this.showSpinner = false;
      this.snackBar.showSnack('Invalid credentials');
    }
  }

}
