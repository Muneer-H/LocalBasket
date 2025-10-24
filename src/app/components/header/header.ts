import { Component, inject, NgModule, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Products as ProductsService } from '../../services/products';
import { Store } from '@ngrx/store';
import { selectCartItemsCount } from '../../store/app.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(Store);
  cartItemsCount = signal<number>(0);
  itemCountNgrx = this.store.select(selectCartItemsCount)
  constructor() {
    this.itemCountNgrx.subscribe(count => {
      this.cartItemsCount.set(count);
    });
  }
}
