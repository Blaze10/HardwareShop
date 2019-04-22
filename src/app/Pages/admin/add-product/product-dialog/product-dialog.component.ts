import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/_services/data.service';
import { MainCategory, SubCategory, Company } from 'src/app/_models/data.model';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  productForm: FormGroup;
  showSpinner = false;
  mainCategoryList: MainCategory[] = [];
  subCategoryList: SubCategory[] = [];
  companyList: Company[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ProductDialogComponent>,
              private dataService: DataService, private snackBar: SnackbarService,
              private productService: ProductService) { }

  ngOnInit() {
    this.initProductForm();
    this.getAllData();
    this.productService.getProductList();
    if (this.data.mode === 'Edit') {
      this.patchProductForm(this.data.Product);
    }
  }

  initProductForm() {
    this.productForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      mainCategory: new FormControl(null, Validators.required),
      subCategory: new FormControl('', Validators.required),
      productImage: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      availableStock: new FormControl('', Validators.required),
      isAvailable: new FormControl(true, Validators.required)
    });
  }

  patchProductForm(product: Product) {
    this.getPatchSub(product.mainCategory);
    this.productForm.patchValue({
      productName: product.productName,
      mainCategory: product.mainCategory,
      subCategory: product.subCategory,
      productImage: product.productImage,
      companyName: product.companyName,
      price: product.price,
      availableStock: product.availableStock,
      isAvailable: product.isAvailable
    });
  }

  getAllData() {
    this.dataService.getMainCategoryList().valueChanges().subscribe((list: MainCategory[]) => {
      this.mainCategoryList = list;
    }, (err => {
      console.log(err);
    }));

    this.dataService.getCompanyList().valueChanges().subscribe((list: Company[]) => {
      this.companyList = list;
    }, (err => {
      console.log(err);
    }));
  }

  getSubCategory(event) {
    const selectedCategory = this.productForm.get('mainCategory').value;
    this.dataService.getSubCategoryByCategory(selectedCategory)
      .valueChanges().subscribe((list: SubCategory[]) => {
        this.subCategoryList = list;
      }, (err => {
        console.log(err);
      }));
  }

  getPatchSub(main) {
    this.dataService.getSubCategoryByCategory(main)
      .valueChanges().subscribe((list: SubCategory[]) => {
        this.subCategoryList = list;
      }, (err => {
        console.log(err);
      }));
  }

  onCloseDialog() {
    this.showSpinner = true;
    const product = this.productForm.value;

    if (this.data.mode === 'New') {
      this.productService.addProduct(product)
        .then(() => {
          this.snackBar.showSnack('Product added successfully');
          this.showSpinner = false;
          this.dialogRef.close();
        })
        .catch(err => {
          this.showSpinner = false;
          this.snackBar.showSnack('Some error occured. Try again after some time.');
        });
    } else if (this.data.mode === 'Edit') {
      const index = this.data.Product.productId;

      if (!this.productForm.dirty) {
        this.snackBar.showSnack('No changes made!');
        this.showSpinner = false;
      } else {
        this.productService.editProduct(product, index)
          .then(() => {
            this.snackBar.showSnack(product.productName + ' updated successfully');
            this.showSpinner = false;
            this.dialogRef.close();
          })
          .catch((err => {
            this.showSpinner = false;
            this.snackBar.showSnack('Some error occured. Try again after some time.');
          }));
      }
    } else {
      this.dialogRef.close();
    }
  }

  onlyClose() {
    this.dialogRef.close();
  }

}
