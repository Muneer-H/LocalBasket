import { Component, inject } from '@angular/core';
import { PageHeading } from '../../components/page-heading/page-heading';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../types/types';
import { Products as ProductService } from '../../services/products';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as Actions from './../../store/app.actions'


@Component({
  selector: 'app-add-item',
  imports: [PageHeading, ReactiveFormsModule],
  templateUrl: './add-item.html',
  styleUrl: './add-item.scss',
})
export class AddItem {
  store = inject(Store)
  snackBar = inject(MatSnackBar);
  private router: Router = inject(Router);
  productService = inject(ProductService);
  itemName: FormControl = new FormControl('');
  itemDescription: FormControl = new FormControl('');
  itemPrice: FormControl = new FormControl('');
  itemCategory: FormControl = new FormControl('');
  itemRating: FormControl = new FormControl('');
  itemImageURL: FormControl = new FormControl('');
  detailDescription: FormControl = new FormControl('');

  handleSubmit(e: Event) {
    e.preventDefault();
    const newItem: Product = {
      id: Date.now().toString(),
      inStock: true,
      itemName: this.itemName.value,
      shortDescription: this.itemDescription.value,
      detailDescription: this.detailDescription.value,
      price: parseFloat(this.itemPrice.value || '0'),
      category: this.itemCategory.value,
      rating: parseFloat(this.itemRating.value || '0'),
      image: this.itemImageURL.value,
      inCart: false
    };
    if(!this.itemName.value || !this.itemDescription.value || !this.detailDescription.value || !this.itemPrice.value || !this.itemCategory.value || !this.itemRating.value || !this.itemImageURL.value) {
      this.snackBar.open("Fill all fields!", 'Error', {

          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
    }
    else{
      this.store.dispatch(Actions.addProduct({product: newItem}))
      this.router.navigate(['/products']);
      this.snackBar.open("Item added successfully!", 'Success', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
    }
  }
}
