import { Component, effect, inject, signal } from '@angular/core';
import { PageHeading } from '../../components/page-heading/page-heading';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../types/types';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, ActionsSubject } from '@ngrx/store';
import * as Actions from './../../store/app.actions';
import { AuthService } from '../../services/auth';
import { Unauthorized } from '../unauthorized/unauthorized';
import { selectAddProductLoading } from '../../store/app.selectors';
import { filter } from 'rxjs';

@Component({
  selector: 'app-add-item',
  imports: [PageHeading, ReactiveFormsModule],
  templateUrl: './add-item.html',
  styleUrl: './add-item.scss',
})
export class AddItem {
  authService = inject(AuthService);
  store = inject(Store);
  actionsSubject = inject(ActionsSubject);
  productLoading = this.store.select(selectAddProductLoading);
  snackBar = inject(MatSnackBar);
  itemName: FormControl = new FormControl('');
  itemDescription: FormControl = new FormControl('');
  itemPrice: FormControl = new FormControl('');
  itemCategory: FormControl = new FormControl('');
  itemRating: FormControl = new FormControl('');
  itemImageURL: FormControl = new FormControl('');
  detailDescription: FormControl = new FormControl('');
  loading = signal<boolean>(false);

  constructor() {
    this.productLoading.subscribe((loading) => {
      this.loading.set(loading);
    });
  }

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
      inCart: false,
    };
    if (
      !this.itemName.value ||
      !this.itemDescription.value ||
      !this.detailDescription.value ||
      !this.itemPrice.value ||
      !this.itemCategory.value ||
      !this.itemRating.value ||
      !this.itemImageURL.value
    ) {
      this.snackBar.open('Fill all fields!', 'Error', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } else {
      this.store.dispatch(Actions.addProductStart({ product: newItem }));
    }
  }
}
