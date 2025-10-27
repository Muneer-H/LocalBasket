import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header as HeaderComponent } from './components/header/header';
import { Products as ProductService } from './services/products';
import { Store } from '@ngrx/store';
import * as Actions from './store/app.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [],
})
export class App {

  productService = inject(ProductService);
  store = inject(Store);
  protected readonly title = signal('e-commerce-grocery-store');
  ngOnInit(): void {
    this.productService.getProducts().subscribe(items => {
      this.store.dispatch(Actions.loadProducts({ products: items }));
    });
    this.productService.getCartItems().subscribe(cartItems => {
      this.store.dispatch(Actions.loadCart({ cart: cartItems }));
    });
  }
}
