import { UserListComponent } from './Pages/admin/user-list/user-list.component';
import { AdminAuthGuard } from './auth/admin-auth.guard';
import { ProductListComponent } from './Pages/products/motherboard-list/motherboard-list.component';
import { OrdersComponent } from './Pages/admin/orders/orders.component';
import { AddProductComponent } from './Pages/admin/add-product/add-product.component';
import { LoginComponent } from './Pages/auth/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterUserComponent } from './Pages/auth/register-user/register-user.component';
import { CartDialogComponent } from './Pages/user/cart-dialog/cart-dialog.component';
import { CurrentOrderComponent } from './Pages/user/orders/current-order/current-order.component';
import { AllOrdersComponent } from './Pages/user/orders/all-orders/all-orders.component';
import { UserAuthGuard } from './auth/user-auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'Motherboard', component: ProductListComponent},
  {path: 'Processor', component: ProductListComponent},
  {path: 'Graphics Card', component: ProductListComponent},
  {path: 'Gaming Keyboard', component: ProductListComponent},
  {path: 'Gaming Mouse', component: ProductListComponent},
  {path: 'Gaming Headset', component: ProductListComponent},
  {
    path: '',
    canActivateChild: [UserAuthGuard],
    children: [
      {path: 'cart', component: CartDialogComponent},
      {path: 'current-orders', component: CurrentOrderComponent},
      {path: 'all-orders', component: AllOrdersComponent}
    ]
  },
  {
    path: '',
    canActivateChild: [AdminAuthGuard],
    children: [
      {path: 'add-product', component: AddProductComponent},
      {path: 'admin-orders', component: OrdersComponent},
      {path: 'user-list', component: UserListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
