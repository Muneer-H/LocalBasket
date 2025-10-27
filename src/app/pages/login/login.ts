import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
    private authService = inject(AuthService)
    private router = inject(Router)

    

  async loginWithGoogle() {
    await this.authService.signInWithGoogle();
    this.router.navigate(['/']);
  }

}
