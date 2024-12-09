import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CreateBandComponent } from './bands/create-band/create-band.component';
import { CreateSongComponent } from './songs/create-song/create-song.component';
import { BandsRankingComponent } from './rankings/band-rankings/bands-ranking.component';
import { SongsRankingComponent } from './rankings/song-rankings/songs-ranking.component';
import { SongDetailsComponent } from './songs/song-details/song-details.component';
import { BandDetailsComponent } from './bands/band-details/band-details.component';
import { bandsRankingResolver } from './rankings/band-rankings/bands-ranking.resolver';
import { songsRankingResolver } from './rankings/song-rankings/songs-ranking.resolver';

export const routes: Routes = [
    // Home
    { path: ``, redirectTo: `/home`, pathMatch: `full` }, // Default to Home
    { path: `home`, component: HomeComponent },

    // User related paths
    {
        path: `register`,
        loadComponent: () => import(`./user/register/register.component`).then(c => c.RegisterComponent),
    },
    { path: `login`, component: LoginComponent },
    { path: `profile`, component: ProfileComponent },

    // App related paths
    { path: `create-band`, component: CreateBandComponent },
    { path: `create-song`, component: CreateSongComponent },
    {
        path: `bands-ranking`,
        children: [
            {
                path: ``,
                loadComponent: () => import(`./rankings/band-rankings/bands-ranking.component`).then(c => c.BandsRankingComponent),
                resolve: { bands: bandsRankingResolver },
            },
            { path: `:bandId`, component: BandDetailsComponent }
        ]
    },
    {
        path: `songs-ranking`,
        children: [
            {
                path: ``,
                loadComponent: () => import(`./rankings/song-rankings/songs-ranking.component`).then(c => c.SongsRankingComponent),
                resolve: { songs: songsRankingResolver }
            },
            { path: `:songId`, component: SongDetailsComponent }
        ]
    },

    // Details


    // Errors
    { path: 'error', component: ErrorMsgComponent },
];
