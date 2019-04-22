import { CartService } from './../../../_services/cart.service';
import { CartItem } from './../../../_models/order.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { OrdersService } from 'src/app/_services/orders.service';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {
  userEmail;
  currentUser: User;
  cartTotal = 0;
  ordersForm: FormGroup;
  cartItems: CartItem[] = [];
  showLoader = false;
  todayDate: any;
  constructor(private userService: UserService, private cartService: CartService,
    private snackBar: SnackbarService, private ordersService: OrdersService) { }

  ngOnInit() {
    this.todayDate = new Date().toDateString();

    this.userEmail = localStorage.getItem('userEmail');
    this.initOrdersForm();
    this.getCartItems();
    this.getCartTotal();
    this.getUserInfo(this.userEmail);
    this.ordersService.getAllOrders();
  }

  getUserInfo(userEmail) {
    this.showLoader = true;
    this.userService.getUserInfo(userEmail).valueChanges().subscribe((list: User[]) => {
      this.currentUser = list[0];
      setTimeout(() => { this.patchOrdersForm(this.currentUser, this.cartItems); }, 0);
      this.showLoader = false;
    }, (err => {
      console.log(err);
    }));
  }

  getCartItems() {
    this.cartItems = this.cartService.getCart();
  }

  getCartTotal() {
    this.cartTotal = this.cartService.getCartTotalPrice();
  }

  initOrdersForm() {
    this.ordersForm = new FormGroup({
      userId: new FormControl(''),
      userName: new FormControl(''),
      address: new FormControl(''),
      contact: new FormControl(''),
      orders: new FormControl(),
      totalPrice: new FormControl(0),
      orderStatus: new FormControl('Confirmed'),
      paymentMethod: new FormControl('', Validators.required),
      paymentStatus: new FormControl('Paid'),
      cardNumber: new FormControl(''),
      cvv: new FormControl(''),
      date: new FormControl('')
    });
  }

  patchOrdersForm(user: User, cartItems: CartItem[]) {
    this.ordersForm.patchValue({
      userId: user.userId,
      userName: user.name,
      address: user.address,
      contact: user.contact,
      orders: cartItems,
      totalPrice: this.cartTotal,
      orderStatus: 'Confirmed',
      paymentMethod: 'Cash Payment',
      paymentStatus: 'Paid',
      cardNumber: '',
      cvv: '',
      date: this.todayDate
    });
  }

  onPaymentMethod(event) {
    const mode = this.ordersForm.get('paymentMethod').value;
    const cardNumberControl = this.ordersForm.get('cardNumber');
    const cardCvvControl = this.ordersForm.get('cvv');

    if (mode === 'Card Payment') {
      cardNumberControl.setValidators(Validators.required);
      cardCvvControl.setValidators(Validators.required);
    } else {
      cardNumberControl.setValidators(null);
      cardCvvControl.setValidators(null);
    }
    cardNumberControl.updateValueAndValidity();
    cardCvvControl.updateValueAndValidity();
  }

  onRemoveItem(index) {
    this.cartService.removeFromCart(index);
    this.getCartItems();
    this.getCartTotal();
  }

  onSubmit() {
    this.showLoader = true;
    const formData = this.ordersForm.value;
    console.log(formData);
    this.ordersService.addOrder(formData)
      .then((result) => {
        this.showLoader = false;
        this.snackBar.showSnack('Your order has been placed successfully!');
        this.cartService.clearCart();
        this.getCartItems();
        this.getCartTotal();
      })
      .catch(err => {
        this.showLoader = false;
        console.log(err);
      });
  }

  onClearCart() {
    this.cartService.clearCart();
    this.getCartItems();
    this.getCartTotal();
  }

}
