import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/types';
import { RouterLink } from "@angular/router";
import { LucideAngularModule } from 'lucide-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdateModal } from '../update-modal/update-modal';
import * as Actions from './../../store/app.actions'
import { Store } from '@ngrx/store';
import { Products as ProductsService} from '../../services/products';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  productService = inject(ProductsService);
  store = inject(Store)
  dialog = inject(MatDialog);
  snackbar = inject(MatSnackBar);
  @Input() product!: Product;

  async addToCart(){
    try{
      await this.productService.addToCart(this.product.id, 1);
      this.store.dispatch(Actions.addToCart({productId: this.product.id, quantity: 1}))
      this.snackbar.open("Item added to cart!", 'Success', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
    }catch(err){
      this.snackbar.open("Error adding item to cart. Please try again.", 'Error', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
  }
  async removeFromCart(){
    try{
      await this.productService.removeFromCart(this.product.id);
      this.store.dispatch(Actions.removeFromCart({productId: this.product.id}))
      this.snackbar.open("Item removed from cart!", 'Success', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
    }catch(err){
      this.snackbar.open("Error removing item from cart. Please try again.", 'Error', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
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
