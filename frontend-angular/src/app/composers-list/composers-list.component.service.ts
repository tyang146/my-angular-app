import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class ComposersListComponentServices {
  // Subject to hold the list of composers
  private composersSubject = new BehaviorSubject<any[]>([]);
  composers$ = this.composersSubject.asObservable();
  // Subject to hold the total number of composers
  private totalItemsSubject = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItemsSubject.asObservable();
  // constructor
  constructor(private http: HttpClient) {}
  // Load all composers into a subject
  async loadAllComposers() {
    try {
      const data = await firstValueFrom(this.fetchAllComposers()); 
      this.composersSubject.next(data);
      this.totalItemsSubject.next(data.length); 
    } catch (error) {
      console.error('Error fetching composers:', error);
      this.composersSubject.next([]); 
      this.totalItemsSubject.next(0); 
    }
  }
  // Fetch all composers from the database
  fetchAllComposers(): Observable<any> {
    return this.http.get<any[]>(environment.apiURL);
  }
  
  // Fetch composers from the database with pagination
  // fetchComposers(page: number = 1, pageSize: number = 10): Observable<any> {
  //   this.loadingSubject.next(true); // Start loading
  //   const options = {
  //     observe: 'response' as const,
  //     params: {
  //       page: page.toString(),
  //       pageSize: pageSize.toString(),
  //     },
  //     transferCache: {
  //       includeHeaders: ['X-Pagination'], // Include this header in your caching strategy
  //     },
  //   };

  //   return this.http.get<any[]>('http://localhost:7074/api/composers', options);
  // }

  // // Load composers and update subjects
  // loadComposers(page: number, pageSize: number) {
  //   this.fetchComposers(page, pageSize).subscribe({
  //     next: (data) => {
  //       this.composersSubject.next(data.body || []);
  //       const paginationHeader = data.headers.get('X-Pagination');
  //       if (paginationHeader) {
  //         const paginationMetadata = JSON.parse(paginationHeader);
  //         this.totalItemsSubject.next(paginationMetadata.TotalRecords);
  //       }
  //       this.loadingSubject.next(false); // Stop loading
  //     },
  //     error: (error) => {
  //       console.error('Error fetching composers:', error);
  //       this.composersSubject.next([]); // Optionally reset to an empty array on error
  //       this.loadingSubject.next(false); // Stop loading on error
  //     },
  //   });
  // }
}