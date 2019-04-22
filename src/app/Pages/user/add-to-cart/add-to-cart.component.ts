import { CartService } from './../../../_services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/_models/product.model';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  cartItemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<AddToCartComponent>,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.initCartForm(this.data.Product);
  }

  initCartForm(product: Product) {
    this.cartItemForm = new FormGroup({
      productName: new FormControl(product.productName),
      mainCategory: new FormControl(product.mainCategory),
      subCategory: new FormControl(product.subCategory),
      productImage: new FormControl(product.productImage),
      price: new FormControl(product.price),
      companyName: new FormControl(product.companyName),
      count: new FormControl(1, [Validators.required, Validators.min(1)]),
      total: new FormControl(product.price)
    });
  }

  calcTotal() {
    let total = 0;
    const count = this.cartItemForm.get('count').value;
    total = this.data.Product.price * count;
    this.cartItemForm.get('total').patchValue(total);
  }

  onAdd() {
    const cartItem = this.cartItemForm.value;
    cartItem.price = +cartItem.price;
    cartItem.total = +cartItem.total;
    this.cartService.addToCart(cartItem);
    this.matDialogRef.close();
  }

  onCancel() {
    this.matDialogRef.close();
  }

}
