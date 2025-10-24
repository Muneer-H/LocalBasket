import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Products } from './products/products';
import { AddItem } from './add-item/add-item';
import { ProductDetails } from './product-details/product-details';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: ()=> import('./home/home').then(m => m.Home),
  },
  {
    path: 'products',
    pathMatch: 'full',
    loadComponent: ()=> import('./products/products').then(m => m.Products),
  },
  {
    path: 'addItem',
    pathMatch: 'full',
    loadComponent: ()=> import('./add-item/add-item').then(m => m.AddItem)
  },
  {
    path: 'product/:id',
    pathMatch: 'full',
    loadComponent: ()=> import('./product-details/product-details').then(m => m.ProductDetails)
  },
  {
    path: 'cart',
    pathMatch: 'full',
    loadComponent: ()=> import('./cart/cart').then(m => m.Cart)
  }
];
