import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CreateBandComponent } from './bands/create-band/create-band.component';
import { CreateSongComponent } from './songs/create-song/create-song.component';
import { SongDetailsComponent } from './songs/song-details/song-details.component';
import { BandDetailsComponent } from './bands/band-details/band-details.component';
import { bandsRankingResolver } from './rankings/band-rankings/bands-ranking.resolver';
import { songsRankingResolver } from './rankings/song-rankings/songs-ranking.resolver';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
    {
        path: `profile`,
        children: [
            {
                path: ``,
                loadComponent: () => import(`./user/profile/profile.component`).then(c => c.ProfileComponent)
            },
            { path: `band/:bandId`, component: BandDetailsComponent },
            { path: `song/:songId`, component: SongDetailsComponent }
        ]
    },

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

    // 404
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' },
];
