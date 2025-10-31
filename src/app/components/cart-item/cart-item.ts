import { Component, inject, Input } from '@angular/core';
import { CartProduct } from '../../types/types';
import { Products as ProductsService } from '../../services/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as Actions from './../../store/app.actions';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItem {
  store = inject(Store);
  productService = inject(ProductsService);
  @Input() item!: CartProduct;
  snackBar = inject(MatSnackBar);
  async removeItem() {
    try {
      await this.productService.removeFromCart(this.item.id);
      // this.store.dispatch(Actions.removeFromCart({ productId: this.item.id }));
      this.snackBar.open('Item removed from cart!', 'Success', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (err) {
      this.snackBar.open('Error removing item from cart. Please try again.', 'Error', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }
}
