import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authService = inject(AuthService);
  private router = inject(Router);
  email = new FormControl('');
  password = new FormControl('');
  snackbar = inject(MatSnackBar);
  loading = signal(false)

  async login(event: Event) {
    event.preventDefault();
    if (!this.email.value || !this.password.value) {
      return this.snackbar.open('Please enter both email and password', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } else {
      try {
        this.loading.set(true);
        await this.authService.login(this.email.value, this.password.value);
        this.router.navigate(['/']);
        return this.snackbar.open(
          `Login successful! Welcome back ${this.authService.currentUser()?.displayName}`,
          'Close',
          {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          }
        );
      } catch (error: Error | any) {
        console.log(error);
        return this.snackbar.open(error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }finally{
        this.loading.set(false);
      }
    }
  }

  async loginWithGoogle() {
    await this.authService.signInWithGoogle();

    this.router.navigate(['/']);
  }
}
