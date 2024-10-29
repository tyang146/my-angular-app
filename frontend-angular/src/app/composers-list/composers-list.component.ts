import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComposersListComponentServices } from './composers-list.component.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

interface Composer {
  id: number;
  name: string;
  film?: string;
  year?: number;
}

@Component({
  selector: 'app-composers-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './composers-list.component.html',
  styleUrls: ['./composers-list.component.css'],
})

export class ComposersListComponent {
  searchTerm: string = '';
  composers: Composer[] = [];
  filteredComposersList: Composer[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  user: any = null; 
  favoriteComposersID: Set<number> = new Set();
  router = inject(Router);
  favoriteComposers: string = '';
  fallbackComposers = [
    { id: 1, name: 'John Williams', film: 'Star Wars', year: 1977 },
    { id: 2, name: 'Hans Zimmer', film: 'The Lion King', year: 1994 },
    { id: 3, name: 'Ennio Morricone', film: 'The Good, the Bad and the Ugly', year: 1966 },
    { id: 4, name: 'Alan Silvestri', film: 'Back to the Future', year: 1985 },
    { id: 5, name: 'James Horner', film: 'Avatar', year: 2009 },
  ];

  constructor(
    private composersService: ComposersListComponentServices,
    private auth: Auth,
  ) {}

  ngOnInit() {
    // Subscribe to authentication state
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
      // Load favorite composers from local storage for now
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedFavorites = localStorage.getItem(`favoriteComposersID${this.user?.email}`);
        if (storedFavorites) {
          const favoriteArray = JSON.parse(storedFavorites) as number[];
          this.favoriteComposersID = new Set(favoriteArray);
        }
      }
    });

    // Load composers based on route
    const currentUrl = this.router.url;
    if (currentUrl.includes('/favorites')) {  
      this.composersService.composers$.subscribe((composers) => {
        this.composers = composers.length ? composers : this.fallbackComposers;  
        this.loadFavorites(this.composers);
        this.applySearch();
      })
    } else {
      this.composersService.composers$.subscribe((composers) => {
        this.composers = composers.length ? composers : this.fallbackComposers;
        this.applySearch();
      });
    }
    this.composersService.totalItems$.subscribe((total) => {
      this.totalItems = total;
    });
    this.composersService.loadAllComposers()
  }

  loadFavorites(composers: Composer[]) { 
    const favoriteIds = this.favoriteComposersID; 
    this.composers = []; 
  
    for (const id of favoriteIds) {
      const favoriteComposer = composers.find((composer) => composer.id === id);
      if (favoriteComposer) {
        this.composers.push(favoriteComposer);
      }
    }
  }

  applySearch() {
    this.filteredComposersList = this.composers.filter((composer) =>
      composer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (composer.film && composer.film.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
    this.currentPage = 1;
  }

  get paginatedFilteredComposers(): Composer[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredComposersList.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.filteredComposersList.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // save favorite composers to local storage for now
  toggleFavorite(composer: Composer) {
    if (this.favoriteComposersID.has(composer.id)) {
      this.favoriteComposersID.delete(composer.id);
      localStorage.setItem(`favoriteComposersID${this.user?.email}`, JSON.stringify(Array.from(this.favoriteComposersID))); 
    } else {
      this.favoriteComposersID.add(composer.id);
      localStorage.setItem(`favoriteComposersID${this.user?.email}`, JSON.stringify(Array.from(this.favoriteComposersID))); 
    }  
  }

  isFavorite(composer: Composer): boolean {
    return this.favoriteComposersID.has(composer.id); 
  }
}
