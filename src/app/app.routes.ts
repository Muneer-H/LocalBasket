import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: ()=> import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'products',
    pathMatch: 'full',
    loadComponent: ()=> import('./pages/products/products').then(m => m.Products),
  },
  {
    path: 'addItem',
    pathMatch: 'full',
    loadComponent: ()=> import('./pages/add-item/add-item').then(m => m.AddItem)
  },
  {
    path: 'product/:id',
    pathMatch: 'full',
    loadComponent: ()=> import('./pages/product-details/product-details').then(m => m.ProductDetails)
  },
  {
    path: 'cart',
    pathMatch: 'full',
    loadComponent: ()=> import('./pages/cart/cart').then(m => m.Cart)
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: ()=> import('./pages/login/login').then(m => m.Login)
  }
];
