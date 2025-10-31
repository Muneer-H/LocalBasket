import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ActionsList from './app.actions';
import { catchError, map, mergeMap, of, from, Observable, tap } from 'rxjs';
import { Products as ProductService } from '../services/products';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProductEffects {
  actions$ = inject(Actions);
  productService = inject(ProductService);
  router = inject(Router);
  snackbar = inject(MatSnackBar);

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.addProductStart),
      mergeMap(({ product }) =>
        from(this.productService.addProduct(product)).pipe(
          tap(() => {
            this.snackbar.open('Product added successfully!', 'Success', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            });
          }),
          map(() => ActionsList.addProductSuccess({ product })),
          catchError((error) => {
            this.snackbar.open('Error adding product. Please try again.', 'Error', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'],
            });
            return of(ActionsList.addProductFailure({ error }));
          })
        )
      )
    )
  );
  naviagateUponAddProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionsList.addProductSuccess),
        tap(() => {
          this.router.navigate(['/products']);
        })
      ),
    { dispatch: false }
  );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadProductsStart),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ActionsList.loadProductsSuccess({ products })),
          catchError((error) => of(ActionsList.loadProductsFailure({ error })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.updateProductStart),
      mergeMap(({ product }) =>
        from(this.productService.updateProduct(product)).pipe(
          tap(() => {
            this.snackbar.open('Product updated successfully!', 'Success', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            });
          }),
          map(() => ActionsList.updateProductSuccess({ product })),
          catchError((error) => {
            this.snackbar.open('Error updating product. Please try again.', 'Error', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'],
            });
            return of(ActionsList.updateProductFailure({ error }));
          })
        )
      )
    )
  );

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadCartStart),
      mergeMap(() =>
        this.productService.getCartItems().pipe(
          map((cart) => ActionsList.loadCartSuccess({ cart })),
          catchError((error) => of(ActionsList.loadCartFailure({ error })))
        )
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.addToCartStart),
      mergeMap(({ productId, quantity }) =>
        from(this.productService.addToCart(productId, quantity)).pipe(
          tap(() => {
            this.snackbar.open('Item added to cart!', 'Success', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            });
          }),
          map(() => ActionsList.addToCartSuccess({ productId, quantity })),
          catchError((error) => {
            this.snackbar.open('Error adding item to cart. Please try again.', 'Error', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'],
            });
            return of(ActionsList.addToCartFailure({ error }));
          })
        )
      )
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.removeFromCartStart),
      mergeMap(({ productId }) =>
        from(this.productService.removeFromCart(productId)).pipe(
          tap(() => {
            this.snackbar.open('Item removed from cart!', 'Success', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            });
          }),
          map(() => ActionsList.removeFromCartSuccess({ productId })),
          catchError((error) => {
            this.snackbar.open('Error removing item from cart. Please try again.', 'Error', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'],
            });
            return of(ActionsList.removeFromCartFailure({ error }));
          })
        )
      )
    )
  );
}
