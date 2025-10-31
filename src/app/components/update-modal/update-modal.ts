import { Component, inject, model, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../types/types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionsSubject, Store } from '@ngrx/store';
import * as Actions from './../../store/app.actions';
import { selectProductLoading } from '../../store/app.selectors';
import { filter } from 'rxjs';

@Component({
  selector: 'app-update-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-modal.html',
  styleUrl: './update-modal.scss',
})
export class UpdateModal {
  store = inject(Store);
  data = inject<{ product: Product }>(MAT_DIALOG_DATA);
  product: Product = this.data.product;
  itemName: FormControl = new FormControl(this.product.itemName);
  itemDescription: FormControl = new FormControl(this.product.shortDescription);
  itemPrice: FormControl = new FormControl(this.product.price);
  itemCategory: FormControl = new FormControl(this.product.category);
  itemRating: FormControl = new FormControl(this.product.rating);
  itemImageURL: FormControl = new FormControl(this.product.image);
  detailDescription: FormControl = new FormControl(this.product.detailDescription);
  dialogRef = inject(MatDialogRef<UpdateModal>);
  snackBar = inject(MatSnackBar);
  loading = signal<boolean>(false);
  actionSubject = inject(ActionsSubject);

  constructor() {
    this.store.select(selectProductLoading).subscribe((loading) => {
      this.loading.set(loading);
    });
    this.actionSubject
      .pipe(filter((action) => action.type === Actions.updateProductSuccess.type))
      .subscribe(() => {
        this.snackBar.open('Item updated successfully!', 'Success', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.dialogRef.close(true);
      });
    this.actionSubject
      .pipe(filter((action) => action.type === Actions.updateProductFailure.type))
      .subscribe(() => {
        this.snackBar.open('Failed to update item!', 'Error', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      });
  }

  handleUpdate(e: Event) {
    e.preventDefault();
    const newItem: Product = {
      ...this.product,
      itemName: this.itemName.value,
      shortDescription: this.itemDescription.value,
      detailDescription: this.detailDescription.value,
      price: parseFloat(this.itemPrice.value || '0'),
      category: this.itemCategory.value,
      rating: parseFloat(this.itemRating.value || '0'),
      image: this.itemImageURL.value,
    };
    this.store.dispatch(Actions.updateProductStart({ product: newItem }));
    this.dialogRef.close();
  }
}
