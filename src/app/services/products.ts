import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { CartProduct, Product } from '../types/types';
import { Store } from '@ngrx/store';
import { selectProducts } from '../store/app.selectors';


@Injectable({
  providedIn: 'root',
})
export class Products {
  http = inject(HttpClient);
  store = inject(Store);
  productsState = this.store.select(selectProducts);
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
   
  getProductByID(id: string): Observable<Product | undefined> {
    let product = this.productsState.pipe(
      filter(products => products.length > 0),
      map(products => products.find(p => p.id == id))
    )
    console.log(product)
    return product
  }
}
