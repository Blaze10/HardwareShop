import { MatDialog } from '@angular/material';
import { AuthService } from './../../../_services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product.model';
import { AddToCartComponent } from '../../user/add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-motherboard-list',
  templateUrl: './motherboard-list.component.html',
  styleUrls: ['./motherboard-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageUrl;
  showSpinner = false;
  productList: Product[] = [];
  constructor(private router: Router, private productService: ProductService,
              public authService: AuthService, private matDialog: MatDialog) { }

  ngOnInit() {
   this.pageUrl = this.router.url.replace(/%20/g, ' ').split('/')[1];
   this.getProducts(this.pageUrl);
  }

  getProducts(url) {
    this.showSpinner = true;
    this.productService.getProductsByCategory(url).valueChanges().subscribe((list: Product[]) => {
      list.forEach(element => {
        if (element.availableStock >= 1 && element.isAvailable) {
          this.productList.push(element);
        }
      });
      this.showSpinner = false;
    }, err => {
      console.log(err);
      this.showSpinner = false;
    });
  }

  addToCart(product: Product) {
    const dialogRef = this.matDialog.open(AddToCartComponent, {
      width: '500px',
      data: {Product: product}
    });
  }

}
