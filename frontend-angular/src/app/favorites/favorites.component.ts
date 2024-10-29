import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposersListComponent } from "../composers-list/composers-list.component";
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, ComposersListComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})

export class FavoritesComponent {
  user: any = null;
  favoriteComposersID: Set<number> = new Set();

  constructor(private auth: Auth) {}
  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedFavorites = localStorage.getItem(`favoriteComposersID${this.user?.email}`);
        if (storedFavorites) {
          const favoriteArray = JSON.parse(storedFavorites) as number[];
          this.favoriteComposersID = new Set(favoriteArray);
        }
      }
    });
  }
}