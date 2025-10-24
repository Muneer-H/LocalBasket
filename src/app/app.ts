import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header as HeaderComponent } from './components/header/header';
import { Products as ProductService } from './services/products';
import { catchError } from 'rxjs';
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
    this.productService
      .getProducts()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((products) => {
        this.store.dispatch(Actions.loadProducts({ products }));
      });
  }
}
