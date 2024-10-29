import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  auth: Auth = inject(Auth);
  router = inject(Router);
  errorMessage: string = '';

  // login method using Firebase Authentication
  async login() {
    this.errorMessage = '';  
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = 'Error: ' + (error.message || 'An unknown error occurred');
    }
  }
}
