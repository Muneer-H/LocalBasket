import { createSelector } from "@ngrx/store";
import { Product } from "../types/types";
import { CartProduct } from "../types/types";

export interface AppState {
    app:{
        products: Product[];
        cart: CartProduct[];
        searchTerm: string;
    }
}

export const selectProducts = (state: AppState) => state.app.products;
export const selectCart = (state: AppState) => state.app.cart;
export const selectCartItemsCount = createSelector(
  selectCart,
  (cart) => cart.length
);
export const searchTermSelector = (state: AppState) => state.app.searchTerm || '';