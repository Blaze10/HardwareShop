import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Order } from 'src/app/_models/order.model';
import { OrdersService } from './../../../_services/orders.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderDetailComponent } from '../../user/orders/order-detail/order-detail.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  allOrders: Order[] = [];
  singleOrder: Order;
  showSpinner = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['srno', 'orderId', 'userName', 'contact', 'orderStatus', 'paymentMethod', 'paymentStatus',
  'details' , 'totalPrice', 'changeStatus', 'date'];
  totalSales;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private orderService: OrdersService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.showSpinner = true;
    this.totalSales = 0;
    this.orderService.getAllOrders().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        this.singleOrder = element.payload.toJSON() as Order;
        this.singleOrder.orderId = element.key;
        this.singleOrder.orders = Object.values(this.singleOrder.orders);
        this.totalSales += this.singleOrder.totalPrice;
        this.allOrders.push(this.singleOrder);
      });
      this.dataSource = new MatTableDataSource(this.allOrders);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.showSpinner = false;
    }, err => {
      console.log(err);
      this.showSpinner = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickDetails(order: Order) {
    const dialogRef = this.matDialog.open(OrderDetailComponent, {
      width: '500px',
      data: {Order: order}
    });
  }

  onEditOrder(order: Order) {
    const dialogRef = this.matDialog.open(EditDialogComponent, {
      width: '300px',
      data: {Order: order}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.allOrders = [];
      this.getAllOrders();
    });
  }

}
