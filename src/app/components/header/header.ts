import { Component, inject, NgModule, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Products as ProductsService } from '../../services/products';
import { Store } from '@ngrx/store';
import { selectCartItemsCount } from '../../store/app.selectors';
import * as Actions from '../../store/app.actions';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from '../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(Store);
  productService = inject(ProductsService);
  searchTerm = new FormControl('');
  authService = inject(AuthService);
  router = inject(Router);
  snackbar = inject(MatSnackBar)

  cartItemsCount = signal<number>(0);
  itemCountNgrx = this.store.select(selectCartItemsCount);
  constructor() {
    console.log('Header initialized');
    this.searchTerm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term) => {
        this.store.dispatch(Actions.setSearchTerm({ searchTerm: term || '' }));
      });

    this.itemCountNgrx.subscribe((count) => {
      this.cartItemsCount.set(count);
    });
  }
  handleLogin() {
    this.router.navigate(['/login']);
  }
  async handleLogout() {
    await this.authService.logout();
    this.router.navigate(['/']);
    this.snackbar.open("Logged out successfully!", 'Success', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  }
}
