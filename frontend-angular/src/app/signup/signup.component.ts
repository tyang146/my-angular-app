import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  auth: Auth = inject(Auth);
  router = inject(Router);
  // successMessage: string = '';
  errorMessage: string = '';

  // signup method using Firebase Authentication
  async signup() {
    // this.successMessage = '';  
    this.errorMessage = '';    
    try {
      await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = 'Error: ' + error.message;
    }
  }

}
