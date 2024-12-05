import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';

export const routes: Routes = [
    // Home
    // Default to home
    { path: ``, redirectTo: `/home`, pathMatch: `full` },
    { path: `home`, component: HomeComponent },

    // User related paths
    { path: `register`, component: RegisterComponent },
    { path: `login`, component: LoginComponent },
    { path: `profile`, component: ProfileComponent },

    { path: `error`, component: ErrorMsgComponent }
];
