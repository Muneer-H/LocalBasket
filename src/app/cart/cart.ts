import { Component, inject, signal } from '@angular/core';
import { PageHeading } from '../components/page-heading/page-heading';
import { CartProduct } from '../types/types';
import { CartItem } from '../components/cart-item/cart-item';
import { Products as ProductsService } from '../services/products';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [PageHeading, CartItem],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  productService = inject(ProductsService);
  cart = signal<CartProduct[]>([]);

  total = signal<number>(0);
  ngOnInit(): void {
    this.productService
      .getCartItems()
      .pipe(
        catchError((err) => {
          console.error('Failed to fetch cart items', err);
          throw err;
        })
      )
      .subscribe((items) => {
        this.cart.set(items);
        this.calculateTotal();
      });
  }

  calculateTotal() {
    this.total.set(
      this.cart().reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
    );
  }
}
