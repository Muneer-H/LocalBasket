import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  dName = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  rePassword = new FormControl('');
  snackbar = inject(MatSnackBar);
  authService = inject(AuthService);
  router = inject(Router);
  loading = signal(false);

  async register(event: Event) {
    event.preventDefault();
    if(this.password.value != this.rePassword.value) {
      return this.snackbar.open('Passwords do not match', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }else{
      try{
        this.loading.set(true);
        await this.authService.register(this.email.value || '', this.password.value || '', this.dName.value || '');
        this.router.navigate(['/']);
        return this.snackbar.open(`Registration successful! You are now logged in as ${this.authService.currentUser()?.displayName}`, 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
      }catch(error : Error | any){
        console.log(error)
        return this.snackbar.open(error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }finally{
        this.loading.set(false);
      }
    }
  }
}
