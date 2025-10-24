import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/types';
import { RouterLink } from "@angular/router";
import { Products as ProductsService } from '../../services/products';
import { LucideAngularModule } from 'lucide-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdateModal } from '../update-modal/update-modal';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  dialog = inject(MatDialog);
  productService = inject(ProductsService);
  snackbar = inject(MatSnackBar);
  @Input() product!: Product;

  addToCart(){
    this.productService.addToCart(this.product.id);
    this.snackbar.open("Item added to cart!", 'Success', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  }
  removeFromCart(){
    this.productService.removeFromCart(this.product.id);
    this.snackbar.open("Item removed from cart!", 'Success', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  }
  openUpdateDialog(){
    this.dialog.open(UpdateModal, {
      width: '600px',
      data: { product: this.product },
      height: '620px',
      position: { top: '50px' }
    });
  }
}
