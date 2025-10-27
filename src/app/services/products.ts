import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { CartProduct, Product } from '../types/types';
import { Store } from '@ngrx/store';
import { selectProducts } from '../store/app.selectors';
import { Firestore, collectionData, collection, addDoc, updateDoc, doc, setDoc, getDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class Products {
  firestore = inject(Firestore);
  http = inject(HttpClient);
  store = inject(Store);
  productsState = this.store.select(selectProducts);
  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.products.asObservable();

  private cartItems: BehaviorSubject<Array<CartProduct>> = new BehaviorSubject<Array<CartProduct>>([]);
  // cartItems$ = this.cartItems.asObservable();
  
  constructor(){
    const itemsRef = collection(this.firestore, 'products');
    (collectionData(itemsRef, { idField: 'id' }) as Observable<Product[]>).subscribe(items => this.products.next(items));

    const cartItemRef = collection(this.firestore, 'cart');
    (collectionData(cartItemRef, { idField: 'id' }) as Observable<CartProduct[]>).subscribe(async items=>{
      const resolvedCart = await Promise.all(
        items.map(async (cartItem : any) => {
          const productSnap = await getDoc(cartItem['product'])
          const productData = productSnap.data() as Product;
          return {
            quantity: cartItem['quantity'],
            ...productData,
          } as CartProduct;
        })
      )  
      this.cartItems.next(resolvedCart);
    });
  }

  getCartItems(): Observable<Array<CartProduct>> {
    return this.cartItems.asObservable();
  }

  getProducts(): Observable<Array<Product>> {
    return this.products$;
  }
   
  addProduct(product: Product): Promise<void> {
    const itemsRef = collection(this.firestore, 'products');
    return setDoc(doc(itemsRef, product.id), product);
  }

  updateProduct(product: Product): Promise<void> {
    const productDocRef = doc(this.firestore, `products/${product.id}`);
    return updateDoc(productDocRef, { ...product });
  }

  getProductByID(id: string): Observable<Product | undefined> {
    let product = this.productsState.pipe(
      filter(products => products.length > 0),
      map(products => products.find(p => p.id == id))
    )
    return product
  }

  addToCart(productId: string, quantity: number): Promise<void> {
    const cartRef = collection(this.firestore, 'cart');
    const productDocRef = doc(this.firestore, `products/${productId}`);
    updateDoc(productDocRef, { inCart: true });
    return setDoc(doc(cartRef, productId), {
      product: productDocRef,
      quantity: quantity
    });
  }

  removeFromCart(productId: string): Promise<void> {
    const cartRef = collection(this.firestore, 'cart');
    const productDocRef = doc(this.firestore, `products/${productId}`);
    updateDoc(productDocRef, { inCart: false });
    return deleteDoc(doc(cartRef, productId));
  }
}
