import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/_services/orders.service';
import { Order } from 'src/app/_models/order.model';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  userId;
  showSpinner = false;
  allOrders: Order[] = [];
  orderItem: Order;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['srno', 'orderId', 'orderStatus', 'date' , 'paymentMethod', 'paymentStatus',
                      'details', 'totalPrice'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ordersservice: OrdersService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getAllOrders(this.userId);
  }

  getAllOrders(userId) {
    this.showSpinner = true;
    this.ordersservice.getCustomerOrder(userId).snapshotChanges().subscribe(item => {
      item.forEach(element => {
        this.orderItem = element.payload.toJSON() as Order;
        this.orderItem.orderId = element.key;
        this.orderItem.orders = Object.values(this.orderItem.orders);
        this.allOrders.push(this.orderItem);
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

}
