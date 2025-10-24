import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../types/types';
import { Products as ProductService } from '../services/products';
import { LucideAngularModule } from 'lucide-angular';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  imports: [LucideAngularModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
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
      this.productService.addToCart(this.currentProduct()!.id, this.itemCount());
      this.snackbar.open('Item added to cart!', 'Success', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    }
  }
  removeFromCart() {
    if (this.currentProduct()) {
      this.productService.removeFromCart(this.currentProduct()!.id);
      this.snackbar.open('Item removed from cart!', 'Success', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    }
  }
}
