import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Order } from 'src/app/_models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  detailOrder: Order;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private matDialogRef: MatDialogRef<OrderDetailComponent>) { }

  ngOnInit() {
    this.detailOrder = this.data.Order;
    console.log(this.detailOrder);
  }

  onCloseDialog() {
    this.matDialogRef.close();
  }

}
