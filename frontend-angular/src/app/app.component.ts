import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent { 
  user: any = null;
  constructor(private auth: Auth) {
    // Subscribe to the authentication state
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    });

    // Clear local storage on initialization
    // if (typeof window !== 'undefined' && window.localStorage) {
    //   localStorage.clear();
    // }
  }

  // Method to sign out the user and redirect to the home page
  signOut() {
    signOut(this.auth);
    window.location.href = '/';
  }

  // Method to get the current year for the footer
  getCurrentYear() {
    const date = new Date();
    return date.getFullYear();
  }
}