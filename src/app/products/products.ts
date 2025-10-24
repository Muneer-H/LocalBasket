import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../types/types';
import { Products as ProductsService } from '../services/products';
import { catchError } from 'rxjs';
import { LucideAngularModule } from 'lucide-angular';
import { ProductCard } from '../components/product-card/product-card';
import { RouterLink } from '@angular/router';
import { PageHeading } from '../components/page-heading/page-heading';

@Component({
  selector: 'app-products',
  imports: [LucideAngularModule, ProductCard, RouterLink, PageHeading],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  
  productService = inject(ProductsService);
  data = signal<Array<Product>>([]);
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
        this.data.set(products);
        console.log(products);
      });
  }
  
}
