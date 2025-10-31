import { createReducer, on } from '@ngrx/store';
import * as Actions from './app.actions';
import { CartProduct, Product } from '../types/types';

export interface State {
  products: Product[];
  cart: CartProduct[];
  searchTerm?: string;
  loading?: boolean;
  loadingAddProduct?: boolean;
  loadingAddToCart?: boolean;
  loadingRemoveFromCart?: boolean;
  loadingCart?: boolean;
  error?: string | null;
}
export const initialState: State = {
  products: [],
  cart: [],
  searchTerm: '',
  loading: false,
  loadingAddProduct: false,
  loadingAddToCart: false,
  loadingRemoveFromCart: false,
  loadingCart: false,
  error: null,
};

export const appReducer = createReducer(
  initialState,

  on(Actions.loadCartStart, (state) => {
    return {
      ...state,
      loadingCart: true,
    };
  }),
  on(Actions.loadCartSuccess, (state, { cart }) => {
    return {
      ...state,
      cart: [...cart],
      loadingCart: false,
    };
  }),
  on(Actions.loadCartFailure, (state, { error }) => {
    return {
      ...state,
      loadingCart: false,
      error: error.message || 'An error occurred while loading the cart.',
    };
  }),

  on(Actions.loadProductsStart, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(Actions.loadProductsSuccess, (state, { products }) => {
    return {
      ...state,
      products: [...products],
      loading: false,
    };
  }),
  on(Actions.loadProductsFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error.message || 'An error occurred while loading products.',
    };
  }),

  on(Actions.addProductStart, (state) => {
    return {
      ...state,
      loadingAddProduct: true,
      error: null,
    };
  }),
  on(Actions.addProductSuccess, (state, { product }) => {
    return {
      ...state,
      loadingAddProduct: false,
      // products: [...state.products, product],
    };
  }),
  on(Actions.addProductFailure, (state, { error }) => {
    return {
      ...state,
      loadingAddProduct: false,
      error: error.message || 'An error occurred while adding the product.',
    };
  }),

  on(Actions.updateProductStart, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(Actions.updateProductSuccess, (state) => {
    return {
      ...state,
      // products: state.products.map((p) => (p.id === product.id ? product : p)),
      loading: false,
    };
  }),
  on(Actions.updateProductFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error.message || 'An error occurred while updating the product.',
    };
  }),

  on(Actions.addToCartStart, (state) => {
    return {
      ...state,
      loadingAddToCart: true,
    };
  }),
  on(Actions.addToCartSuccess, (state, { productId, quantity }) => {
    let item = state.products.find((p) => p.id == productId);

    return {
      ...state,
      products: state.products.map((p) => (p.id == productId ? { ...p, inCart: true } : p)),
      cart: [...state.cart, { ...item, quantity, inCart: true } as CartProduct],
      loadingAddToCart: false
    };
  }),
  on(Actions.addToCartFailure, (state, { error }) => {
    return {
      ...state,
      loadingAddToCart: false,
      error: error.message || 'An error occurred while adding to cart.',
    };
  }),

  on(Actions.removeFromCartStart, (state) => {
    return {
      ...state,
      loadingRemoveFromCart: true,
    };
  }),
  on(Actions.removeFromCartSuccess, (state, { productId }) => {
    return {
      ...state,
      products: state.products.map((p) => (p.id == productId ? { ...p, inCart: false } : p)),
      cart: state.cart.filter((item) => item.id !== productId),
      loadingRemoveFromCart: false,
    };
  }),
  on(Actions.removeFromCartFailure, (state, { error }) => {
    return {
      ...state,
      loadingRemoveFromCart: false,
      error: error.message || 'An error occurred while removing from cart.',
    };
  }),

  on(Actions.setSearchTerm, (state, { searchTerm }) => {
    return {
      ...state,
      searchTerm: searchTerm,
    };
  })
);
