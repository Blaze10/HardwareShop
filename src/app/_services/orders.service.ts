import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Order } from '../_models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService{
  ordersList: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {}

  getAllOrders() {
    this.ordersList = this.db.list('chinmay/ordersList');
    return this.ordersList;
  }

  addOrder(order: Order) {
    return this.ordersList.push(order);
  }

  getCustomerOrder(userId) {
    return this.db.list('chinmay/ordersList', ref => ref.orderByChild('userId').equalTo(userId));
  }

  changeOrderStatus(key, status) {
    return this.db.object('chinmay/ordersList/' + key + '/orderStatus').set(status);
  }
}
