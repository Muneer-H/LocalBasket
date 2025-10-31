import { createAction, props } from '@ngrx/store';
import { CartProduct, type Product } from '../types/types';

export const loadCartStart = createAction('[Cart] Load Cart');
export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ cart: CartProduct[] }>()
);
export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: any }>()
);

export const loadProductsStart = createAction(
  '[Product] Load Products Start'
);
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);

export const addProductStart = createAction(
  '[Product] Add Product Start',
  props<{ product: Product }>()
);
export const addProductSuccess = createAction(
  '[Product] Add Product Success',
  props<{ product: Product }>()
);
export const addProductFailure = createAction(
  '[Product] Add Product Failure',
  props<{ error: any }>()
);

export const updateProductStart = createAction(
  '[Product] Update Product Start',
  props<{ product: Product }>()
);
export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: Product }>()
);
export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ error: any }>()
);

export const addToCartStart = createAction(
  '[Cart] Add To Cart Start',
  props<{ productId: string; quantity: number }>()
);
export const addToCartSuccess = createAction(
  '[Cart] Add To Cart Success',
  props<{ productId: string; quantity: number }>()
);
export const addToCartFailure = createAction('[Cart] Add To Cart Failure', props<{ error: any }>());

export const removeFromCartStart = createAction(
  '[Cart] Remove From Cart Start',
  props<{ productId: string }>()
);
export const removeFromCartSuccess = createAction(
  '[Cart] Remove From Cart Success',
  props<{ productId: string }>()
);
export const removeFromCartFailure = createAction(
  '[Cart] Remove From Cart Failure',
  props<{ error: any }>()
);

export const setSearchTerm = createAction(
  '[Search] Set Search Term',
  props<{ searchTerm: string }>()
);
