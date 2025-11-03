import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { CartProduct, Product } from '../types/types';
import { Store } from '@ngrx/store';
import { selectProducts } from '../store/app.selectors';
import { Firestore, collectionData, collection, addDoc, updateDoc, doc, setDoc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { AuthService } from './auth';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class Products {
  authService = inject(AuthService);
  firestore = inject(Firestore);
  http = inject(HttpClient);
  store = inject(Store);
  productsState = this.store.select(selectProducts);
  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.products.asObservable();

  user: User & { id?: string } | null = null;
  private cartItems: BehaviorSubject<Array<CartProduct>> = new BehaviorSubject<Array<CartProduct>>([]);
  cartItems$ : Observable<Array<CartProduct>> = this.cartItems.asObservable();

  constructor(){
    const itemsRef = collection(this.firestore, 'products');
    (collectionData(itemsRef, { idField: 'id' }) as Observable<Product[]>).subscribe(items => this.products.next(items));

    effect(()=>{
      console.log("Fetching cart for user change");
      const currentUser = this.authService.currentUser(); // reactive signal
      this.user = currentUser;
      console.log(this.user)
       this.cartItems.next([]);
      if(!this.user){
        return ;
      }
      const cartItemRef = collection(this.firestore, `users/${this.user?.uid || this.user?.id}/cart`);
      const sub = (collectionData(cartItemRef) as Observable<CartProduct[]>).subscribe(async items=>{
          if(!this.user){
            this.cartItems.next([]);
            sub.unsubscribe();
            return;
          }
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
          console.log("Resolved Cart:", resolvedCart);
          this.cartItems.next(resolvedCart);
        });
      return () => sub.unsubscribe();
    })
  }

  getCartItems(): Observable<Array<CartProduct>> {
    if(!this.user) {
      throw new Error('User not authenticated');
    }
    return this.cartItems$;
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
    const cartRef = collection(this.firestore, 'users/' + (this.user ? this.user.uid || this.user.id : '') + '/cart');
    const productDocRef = doc(this.firestore, `products/${productId}`);
    return setDoc(doc(cartRef, productId), {
      product: productDocRef,
      quantity: quantity
    });
  }

  removeFromCart(productId: string): Promise<void> {
    const cartRef = collection(this.firestore, 'users/' + (this.user ? this.user.uid || this.user.id : '') + '/cart');
    return deleteDoc(doc(cartRef, productId));
  }
}
