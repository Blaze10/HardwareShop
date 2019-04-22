import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product.model';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  mode = 'New';
  allProducts: Product[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['srno', 'productName', 'companyName', 'mainCategory', 'subCategory', 'productImage',
                      'price', 'availableStock', 'isAvailable', 'edit', 'delete'];
  showSpinner = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private matDialog: MatDialog, private productService: ProductService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.showSpinner = true;
    this.productService.getProductList().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['productId'] = element.key;
        this.allProducts.push(x as Product);
      });
      this.dataSource = new MatTableDataSource(this.allProducts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showSpinner = false;
    }, err => {
      this.showSpinner = false;
      console.log('Oops some error occured');
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddProduct() {
    const dialogRef = this.matDialog.open(ProductDialogComponent, {
      width: '550px',
      data: {mode: this.mode}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.allProducts = [];
      this.getAllProducts();
    });
  }

  onEditProduct(product: Product) {
    const dialogRef = this.matDialog.open(ProductDialogComponent, {
      width: '550px',
      data: {mode: 'Edit', Product: product}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.allProducts = [];
      this.getAllProducts();
    });
  }

  onDeleteProduct(index, name) {
    const dialogRef = this.matDialog.open(DeleteDialogComponent, {
      width: '300px',
      data: {key: index, productName: name}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.allProducts = [];
      this.getAllProducts();
    });
  }

  onShowProductImage(imgUrl, name) {
    const dialogRef = this.matDialog.open(ImageDialogComponent, {
      width: '400px',
      data: {imageUrl: imgUrl, productName: name}
    });
  }

}
