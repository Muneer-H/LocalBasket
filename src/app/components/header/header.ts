import { Component, inject, NgModule, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Products as ProductsService } from '../../services/products';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  cartItemsCount = signal<number>(0);
  productService = inject(ProductsService);
  constructor() {
    this.productService.getCartItems().subscribe((items) => {
      this.cartItemsCount.set(items.length);
    });
  }
}
