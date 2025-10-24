import { Component, inject, signal } from '@angular/core';
import { PageHeading } from '../../components/page-heading/page-heading';
import { CartProduct } from '../../types/types';
import { CartItem } from '../../components/cart-item/cart-item';
import { Store } from '@ngrx/store';
import * as Actions from './../../store/app.actions';
import { selectCart } from '../../store/app.selectors';

@Component({
  selector: 'app-cart',
  imports: [PageHeading, CartItem],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cart = signal<CartProduct[]>([]);
  store = inject(Store);
  cartsState = this.store.select(selectCart);

  total = signal<number>(0);
  ngOnInit(): void {
    this.cartsState.subscribe((items) => {
      this.cart.set(items);
    });
    this.total.set(
      this.cart().reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
    );
  }
}
