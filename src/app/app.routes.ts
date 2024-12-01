import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home/home.component';

export const routes: Routes = [
    // Home
    // Default to home
    { path: ``, redirectTo: `/home`, pathMatch: `full` },
    { path: `home`, component: HomeComponent },

    // User related paths
    { path: `register`, component: RegisterComponent }
];
