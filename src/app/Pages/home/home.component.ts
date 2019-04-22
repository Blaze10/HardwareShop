import { AddToCartComponent } from './../user/add-to-cart/add-to-cart.component';
import { MatDialog } from '@angular/material';
import { AuthService } from './../../_services/auth.service';
import { ProductService } from './../../_services/product.service';
import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';
import { Product } from 'src/app/_models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productList: Product[] = [];
  showSpinner = false;
  imageSources: (string | IImage)[] = [
    { url: 'https://images6.alphacoders.com/942/942455.jpg'},
    { url: 'https://rog.asus.com/media/1515078884315.png' },
    { url: 'https://www.nvidia.com/content/dam/en-zz/Solutions/titan/titan-rtx/nvidia-titan-rtx-gallery-c-641-d@2x.jpg' },
    { url: 'https://www.asus.com/media/IN/banners/msD2yYwI6ZsXTGqc/msD2yYwI6ZsXTGqc-0_0_desktop.jpg' },
    { url: 'https://www.asus.com/media/IN/banners/uDphgryQvTeYLKS3/uDphgryQvTeYLKS3-0_0_desktop.jpg' },
    { url: 'https://www.asus.com/media/IN/banners/zG2v6BPG3grsw6Ul/zG2v6BPG3grsw6Ul-0_0_desktop.jpg' }
  ];
  height = '400px';
  constructor(private productService: ProductService, public authService: AuthService,
              private matDialog: MatDialog) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.showSpinner = true;
    this.productService.getAvailableProductList().valueChanges().subscribe((list: Product[]) => {
      list.forEach(element => {
        if (element.isAvailable) {
          this.productList.push(element);
        }
      });
      this.showSpinner = false;
    }, (err => {
      console.log(err);
    }));
  }

  addToCart(product: Product) {
    const dialogRef = this.matDialog.open(AddToCartComponent, {
      width: '500px',
      data: {Product: product}
    });
  }

}
