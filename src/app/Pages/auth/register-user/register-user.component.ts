import { AuthService } from './../../../_services/auth.service';
import { UserService } from './../../../_services/user.service';
import { SnackbarService } from './../../../_services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  userForm: FormGroup;
  showSpinner = false;
  constructor(private snackBar: SnackbarService, private userService: UserService,
              private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getAllUsers();
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required, Validators.pattern('[6-9]\\d{9}')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      address: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.showSpinner = true;
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;
    const user = this.userForm.value;
    delete user.password;
    this.authService.registerUser(email, password)
    .then((registeredUser) => {
      const id = registeredUser.user.uid;
      this.userService.insertUser({...user, userId: id})
      .then(() => {
        this.showSpinner = false;
        this.snackBar.showSnack('User creation successful!');
        this.router.navigate(['/login']);
      })
      .catch(err => {
        this.snackBar.showSnack('Some error occured. Please try again after some time.');
        this.showSpinner = false;
      });
    })
    .catch(err => {
      console.log(err);
      this.showSpinner = false;
      const errorCode = err.code;
      const errorMessage = err.message;
      if (errorCode === 'auth/weak-password') {
        this.snackBar.showSnack('The password is too weak');
      } else {
        this.snackBar.showSnack(errorMessage);
      }
    });

  }

}
