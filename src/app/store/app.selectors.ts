import { createSelector } from "@ngrx/store";
import { Product } from "../types/types";
import { CartProduct } from "../types/types";

export interface AppState {
    app:{
        products: Product[];
        cart: CartProduct[];
        searchTerm: string;
        loading: boolean;
        error: string | null;
        loadingAddProduct: boolean;
        loadingAddToCart: boolean;
        loadingRemoveFromCart: boolean;
    }
}

export const selectProducts = (state: AppState) => state.app.products;
export const selectCart = (state: AppState) => state.app.cart;
export const selectCartItemsCount = createSelector(
  selectCart,
  (cart) => cart.length
);
export const searchTermSelector = (state: AppState) => state.app.searchTerm || '';
export const selectProductLoading = (state: AppState) => state.app.loading;
export const selectAddProductLoading = (state: AppState) => state.app.loadingAddProduct;
export const selectAddToCartLoading = (state: AppState) => state.app.loadingAddToCart;
export const selectRemoveFromCartLoading = (state: AppState) => state.app.loadingRemoveFromCart;