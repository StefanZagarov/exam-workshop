import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CreateBandComponent } from './bands/create-band/create-band.component';
import { CreateSongComponent } from './songs/create-song/create-song.component';

export const routes: Routes = [
    // Home
    { path: ``, redirectTo: `/home`, pathMatch: `full` }, // Default to Home
    { path: `home`, component: HomeComponent },

    // User related paths
    { path: `register`, component: RegisterComponent },
    { path: `login`, component: LoginComponent },
    { path: `profile`, component: ProfileComponent },

    // App related paths
    { path: `create-band`, component: CreateBandComponent },
    { path: `create-song`, component: CreateSongComponent },

    // Errors
    { path: `error`, component: ErrorMsgComponent }
];
