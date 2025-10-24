import { createReducer, on } from '@ngrx/store';
import * as Actions from './app.actions';
import { CartProduct, Product } from '../types/types';

export interface State {
  products: Product[];
  cart: CartProduct[];
}
export const initialState: State = {
  products: [],
  cart: [],
};

export const appReducer = createReducer(
  initialState,
  on(Actions.loadProducts, (state, { products }) => {
    console.log('Loading products in reducer:', products);
    return {
      ...state,
      products: [...products],
    };
  }),
  on(Actions.addProduct, (state, { product }) => {
    console.log(product);
    return {
      ...state,
      products: [...state.products, product],
    };
  }),
  on(Actions.updateProduct, (state, { product }) => {
    return {
      ...state,
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    };
  }),
  on(Actions.addToCart, (state, { productId, quantity }) => {
    let item = state.products.find((p) => p.id == productId);

    return {
      ...state,
      products: state.products.map((p) => (p.id == productId ? { ...p, inCart: true } : p)),
      cart: [...state.cart, { ...item, quantity, inCart: true } as CartProduct],
    };
  }),
  on(Actions.removeFromCart, (state, { productId }) => {
    return {
      ...state,
      products: state.products.map((p) => (p.id == productId ? { ...p, inCart: false } : p)),
      cart: state.cart.filter((item) => item.id !== productId),
    };
  })
);
