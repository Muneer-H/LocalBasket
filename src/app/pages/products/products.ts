import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../types/types';
import { LucideAngularModule } from 'lucide-angular';
import { ProductCard } from '../../components/product-card/product-card';
import { RouterLink } from '@angular/router';
import { PageHeading } from '../../components/page-heading/page-heading';
import { Store } from '@ngrx/store';
import { searchTermSelector, selectProductLoading, selectProducts } from '../../store/app.selectors';
import { combineLatest, map } from 'rxjs';
import { AuthService } from '../../services/auth';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-products',
  imports: [LucideAngularModule, ProductCard, RouterLink, PageHeading, MatProgressSpinner],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  private readonly authService = inject(AuthService);
  isAdmin = this.authService.isAdmin;
  store = inject(Store);
  productsState = this.store.select(selectProducts);
  searchTermState = this.store.select(searchTermSelector);
  loading = signal<boolean>(true);
  productsLoading = this.store.select(selectProductLoading);
  constructor() {
    this.productsLoading.subscribe((loading) => {
      this.loading.set(loading);
    });
  }
  data = signal<Array<Product>>([]);
  ngOnInit(): void {
    combineLatest([this.productsState, this.searchTermState]).pipe(
      map(([products, searchTerm]) => {
        const lowerTerm = searchTerm.toLowerCase();
        if (!lowerTerm || lowerTerm.length === 0) {
          return products;
        } else {
          return products.filter(
            (p) =>
              p.itemName.toLowerCase().includes(lowerTerm) ||
              p.shortDescription.toLowerCase().includes(lowerTerm)
          );
        }
      })
    ).subscribe((data) => {
      this.data.set(data);
    });
  }
}
