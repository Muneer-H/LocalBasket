import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'products',
    pathMatch: 'full',
    loadComponent: () => import('./pages/products/products').then((m) => m.Products),
  },
  {
    path: 'addItem',
    pathMatch: 'full',
    loadComponent: () => import('./pages/add-item/add-item').then((m) => m.AddItem),
    canMatch: [adminGuard],
  },
  {
    path: 'product/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/product-details/product-details').then((m) => m.ProductDetails),
  },
  {
    path: 'cart',
    pathMatch: 'full',
    loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    pathMatch: 'full',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: 'unauthorized',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/unauthorized/unauthorized').then((m) => m.Unauthorized),
  }
];
