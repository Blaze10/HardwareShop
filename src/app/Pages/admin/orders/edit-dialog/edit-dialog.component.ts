import { OrdersService } from 'src/app/_services/orders.service';
import { Order } from './../../../../_models/order.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  detailOrder: Order;
  status;
  showSpinner = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private matDialogRef: MatDialogRef<EditDialogComponent>,
              private orderService: OrdersService, private snackBar: SnackbarService) { }

  ngOnInit() {
    this.detailOrder = this.data.Order;
    this.status = this.detailOrder.orderStatus;
  }

  onClose() {
    this.matDialogRef.close();
  }

  onSave() {
    this.showSpinner = true;
    const key = this.detailOrder.orderId;
    const status = this.status;
    this.orderService.changeOrderStatus(key, status)
    .then(() => {
      this.snackBar.showSnack('Order ' + key + ' has been updated successfully.');
      this.showSpinner = false;
      this.matDialogRef.close();
    })
    .catch(err => {
      console.log(err);
      this.showSpinner = false;
    });
  }

}
