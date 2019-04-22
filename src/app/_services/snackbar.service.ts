import {MatSnackBar} from '@angular/material';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

constructor(private snackBar: MatSnackBar) { }

showSnack(message: string) {
  this.snackBar.open(message, null, {
    duration: 2000
  });
}

}
