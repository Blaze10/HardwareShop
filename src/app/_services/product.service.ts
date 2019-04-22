import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {}

  getProductList() {
    this.productList = this.db.list('chinmay/productList');
    return this.productList;
  }

  addProduct(product) {
    return this.productList.push(product);
  }

  editProduct(product, index) {
    return this.productList.update(index, product);
  }

  onDeleteProduct(index) {
    return this.productList.remove(index);
  }

  getAvailableProductList() {
    return this.db.list('chinmay/productList', ref => ref.orderByChild('availableStock').startAt(1));
  }

  getProductsByCategory(category) {
    return this.db.list('chinmay/productList', ref => ref.orderByChild('subCategory').equalTo(category));
  }
}
