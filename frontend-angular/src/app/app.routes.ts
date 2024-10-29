import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ComposersListComponent } from './composers-list/composers-list.component';
import { SignupComponent } from './signup/signup.component';
import { FavoritesComponent } from './favorites/favorites.component';

export const routes: Routes = [
    { path: '', component: ComposersListComponent},
    { path: 'login', component: LoginComponent }, 
    { path: 'signup', component: SignupComponent},
    { path: 'favorites', component: FavoritesComponent},
];
