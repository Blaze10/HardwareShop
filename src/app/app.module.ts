import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
   MatListModule, MatMenuModule, MatInputModule, MatFormFieldModule, MatCardModule,
   MatSnackBarModule, MatProgressSpinnerModule, MatDialogModule, MatSelectModule,
    MatTableModule, MatSortModule, MatPaginatorModule, MatChipsModule, MatBadgeModule, MatTooltipModule, MatCheckboxModule, MatDividerModule, MatRadioModule } from '@angular/material';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/auth/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterUserComponent } from './Pages/auth/register-user/register-user.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { AddProductComponent } from './Pages/admin/add-product/add-product.component';
import { ProductDialogComponent } from './Pages/admin/add-product/product-dialog/product-dialog.component';
import { ImageDialogComponent } from './Pages/admin/add-product/image-dialog/image-dialog.component';
import { DeleteDialogComponent } from './Pages/admin/add-product/delete-dialog/delete-dialog.component';
import { AddToCartComponent } from './Pages/user/add-to-cart/add-to-cart.component';
import { CartDialogComponent } from './Pages/user/cart-dialog/cart-dialog.component';
import { CurrentOrderComponent } from './Pages/user/orders/current-order/current-order.component';
import { AllOrdersComponent } from './Pages/user/orders/all-orders/all-orders.component';
import { OrderDetailComponent } from './Pages/user/orders/order-detail/order-detail.component';
import { OrdersComponent } from './Pages/admin/orders/orders.component';
import { EditDialogComponent } from './Pages/admin/orders/edit-dialog/edit-dialog.component';
import { ProductListComponent } from './Pages/products/motherboard-list/motherboard-list.component';
import { UserListComponent } from './Pages/admin/user-list/user-list.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterUserComponent,
    AddProductComponent,
    ProductDialogComponent,
    ImageDialogComponent,
    DeleteDialogComponent,
    AddToCartComponent,
    CartDialogComponent,
    CurrentOrderComponent,
    AllOrdersComponent,
    OrderDetailComponent,
    OrdersComponent,
    EditDialogComponent,
    ProductListComponent,
    UserListComponent,
    DeleteConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    SlideshowModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDividerModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProductDialogComponent,
    ImageDialogComponent,
    DeleteDialogComponent,
    AddToCartComponent,
    OrderDetailComponent,
    EditDialogComponent,
    DeleteConfirmationDialogComponent
  ]
})
export class AppModule { }
