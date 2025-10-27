import { createAction, props } from '@ngrx/store';
import { CartProduct, type Product } from '../types/types';

export const loadCart = createAction(
  '[Cart] Load Cart',
  props<{ cart: CartProduct[] }>()
);

export const loadProducts = createAction(
  '[Product] Load Products',
  props<{ products: Product[] }>()
);

export const addProduct = createAction('[Product] Add Product', props<{ product: Product }>());
export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);
export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{productId: string, quantity: number}>()
);
export const removeFromCart = createAction('[Cart] Remove From Cart', props<{productId: string}>());

export const setSearchTerm = createAction(
  '[Search] Set Search Term',
  props<{ searchTerm: string }>()
);