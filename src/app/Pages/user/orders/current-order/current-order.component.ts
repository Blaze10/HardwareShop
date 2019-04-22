import { OrdersService } from './../../../../_services/orders.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Order } from 'src/app/_models/order.model';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {
  currentUserId;
  currentOrders: Order[] = [];
  showSpinner = false;
  constructor(private userService: UserService, private ordersService: OrdersService) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('userId');
    this.getCurrentOrders(this.currentUserId);

  }

  getCurrentOrders(id) {
    this.showSpinner = true;
    this.ordersService.getCustomerOrder(id).valueChanges().subscribe((list: Order[]) => {
      list.forEach(element => {
        if (element.orderStatus === 'Confirmed') {
          this.currentOrders.push(element);
        }
      });
      this.showSpinner = false;
      console.log(this.currentOrders);
    }, err => {
      this.showSpinner = false;
    });
  }

}
