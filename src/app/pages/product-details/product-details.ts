import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/types';
import { Products as ProductService } from '../../services/products';
import { LucideAngularModule } from 'lucide-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as Actions from './../../store/app.actions';

@Component({
  selector: 'app-product-details',
  imports: [LucideAngularModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  store = inject(Store);
  snackbar = inject(MatSnackBar);
  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  itemCount = signal<number>(1);
  currentProduct = signal<Product | null>(null);
  productId = signal<string>('');
  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.productId.set(params['id']);
    });
  }
  ngOnInit() {
    this.productService.getProductByID(this.productId()).subscribe((product) => {
      if (product) {
        this.currentProduct.set(product);
      } else {
        this.currentProduct.set(null);
      }
    });
  }

  increment() {
    this.itemCount.set(this.itemCount() + 1);
  }
  decrement() {
    if (this.itemCount() <= 1) {
      this.itemCount.set(1);
      return;
    }
    this.itemCount.set(this.itemCount() - 1);
  }

  addToCart() {
    if (this.currentProduct()) {
      this.store.dispatch(
        Actions.addToCartStart({ productId: this.currentProduct()!.id, quantity: this.itemCount() })
      );
    }
  }
  removeFromCart() {
    if (this.currentProduct()) {
      this.store.dispatch(Actions.removeFromCartStart({ productId: this.currentProduct()!.id }));
    }
  }
}
