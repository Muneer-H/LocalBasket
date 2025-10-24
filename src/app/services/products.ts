import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { CartProduct, Product } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class Products {
  http = inject(HttpClient);
  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.products.asObservable();

  private cartItems: BehaviorSubject<Array<CartProduct>> = new BehaviorSubject<Array<CartProduct>>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(){
     this.http.get<Array<Product>>('/groceryItems.json').subscribe({
      next: product => this.products.next(product),
      error: err => console.error('Failed to fetch products', err)
    });
  }
 
  getProducts(): Observable<Array<Product>> {
    return this.products$;
  }


  addProduct(item: Product){
    const current = this.products.getValue();
    const updated = [...current, item];
    this.products.next(updated);
  }

  getProductByID(id: string): Observable<Product | undefined> {
    let product = this.products$.pipe(
      filter(products => products.length > 0),
      map(products => products.find(p => p.id == id))
    )
    console.log(product)
    return product
  }

  updateProduct(updatedProduct: Product): void {
    const currentProducts = this.products.getValue();
    const index = currentProducts.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      currentProducts[index] = updatedProduct;
      this.products.next([...currentProducts]);
    }
  }

  getCartItems(): Observable<Array<CartProduct>> {
    return this.cartItems$;
  }

  addToCart(productID: string, quantity: number = 1): void {
    this.getProductByID(productID).subscribe(product => {
      if (product) {
        product.inCart = true;
        const cartItem: CartProduct = {
          ...product,
          quantity
        };
        const currentCart = this.cartItems.getValue();
        this.cartItems.next([...currentCart, cartItem]);
      }
    }); 
  }

  removeFromCart(productID: string): void {
    const currentCart = this.cartItems.getValue();
    const updatedCart = currentCart.filter(item => item.id !== productID);
    this.getProductByID(productID).subscribe(product => {
      product!.inCart = false;
    });
    this.cartItems.next(updatedCart);
  }

}
