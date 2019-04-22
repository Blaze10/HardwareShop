import { CartService } from './../_services/cart.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {
  userEmail = '';
  cartCount = 0;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService,
              public cartService: CartService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('userEmail')) {
      this.userEmail = localStorage.getItem('userEmail');
      this.cartCount = this.cartService.getCartCount();
    }
  }

  ngDoCheck() {
    this.userEmail = localStorage.getItem('userEmail');
    this.cartCount = this.cartService.getCartCount();
  }

  onClickCart() {
    this.router.navigate(['/cart']);
  }

  onHomeClick() {
    this.router.navigate(['/home']);
  }
}
