import { Component, inject, Input, signal } from '@angular/core';
import { Product } from '../../types/types';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdateModal } from '../update-modal/update-modal';
import * as Actions from './../../store/app.actions';
import { ActionsSubject, Store } from '@ngrx/store';
import { Products as ProductsService } from '../../services/products';
import {
  selectAddProductLoading,
  selectCart,
  selectProductLoading,
  selectProducts,
  selectRemoveFromCartLoading,
} from '../../store/app.selectors';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  productService = inject(ProductsService);
  store = inject(Store);
  dialog = inject(MatDialog);
  snackbar = inject(MatSnackBar);
  @Input() product!: Product;
  @Input() isAdmin: boolean = false;
  actionSubject = inject(ActionsSubject);
  addLoading = signal<boolean>(false);
  removeLoading = signal<boolean>(false);
  addToCartLoading = this.store.select(selectAddProductLoading);
  removeFromCartLoading = this.store.select(selectRemoveFromCartLoading);
  authService = inject(AuthService);
  user = this.authService.currentUser();
  cartsState = this.store.select(selectCart);
  inCart = signal<boolean>(false);
  ngOnInit() {
    this.addToCartLoading.subscribe((loading) => {
      this.addLoading.set(loading);
    });
    this.removeFromCartLoading.subscribe((loading) => {
      this.removeLoading.set(loading);
    });

    this.cartsState.subscribe((cart) => {
      this.inCart.set(cart.some(item => item.id === this.product.id));
    });

  }

  addToCart() {
    if (this.user) {
      this.store.dispatch(Actions.addToCartStart({ productId: this.product.id, quantity: 1 }));
    } else {
      this.snackbar.open('Please log in to add items to your cart.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['snackbar-error'],
      });
    }
  }

  removeFromCart() {
    this.store.dispatch(Actions.removeFromCartStart({ productId: this.product.id }));
  }
  openUpdateDialog() {
    this.dialog.open(UpdateModal, {
      width: '600px',
      data: { product: this.product },
      height: '620px',
      position: { top: '50px' },
    });
  }
}
