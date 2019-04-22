import { SnackbarService } from 'src/app/_services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  showSpinner = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeleteDialogComponent>,
              private snackBar: SnackbarService, private productService: ProductService) { }

  ngOnInit() {
  }

  onDelete() {
    this.showSpinner = true;
    const key = this.data.key;
    this.productService.onDeleteProduct(key)
    .then(() => {
      this.snackBar.showSnack(this.data.productName + ' has been removed successfully.');
      this.showSpinner = false;
      this.dialogRef.close();
    })
    .catch((err => {
      console.log(err);
      this.snackBar.showSnack('Some error occred. Please try again after some time.');
      this.showSpinner = false;
    }));
  }

  onClose() {
    this.dialogRef.close();
  }

}
