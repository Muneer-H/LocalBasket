import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../types/types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Products as ProductsService } from '../../services/products';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-update-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-modal.html',
  styleUrl: './update-modal.scss'
})
export class UpdateModal {

  productService = inject(ProductsService);
  data = inject<{product: Product}>(MAT_DIALOG_DATA);
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

  handleUpdate(e: Event){
    e.preventDefault();
    const newItem: Product = {...this.product, itemName: this.itemName.value, shortDescription: this.itemDescription.value, detailDescription: this.detailDescription.value, price: parseFloat(this.itemPrice.value || '0'), category: this.itemCategory.value, rating: parseFloat(this.itemRating.value || '0'), image: this.itemImageURL.value};
    this.productService.updateProduct(newItem);
    this.dialogRef.close();
    this.snackBar.open("Item updated successfully!", 'Success', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  }

}
