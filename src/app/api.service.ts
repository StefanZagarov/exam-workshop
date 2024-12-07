import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Band } from './interfaces/band';
import { Song } from './interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  constructor(private http: HttpClient) { }

  createSong(name: string, genres: string, band: string, length: string)
  {
    return this.http.post<Song>(`/api/song/create`, {
      name,
      genres,
      band,
      length
    });
  };

  getAllSongs()
  {
    return this.http.get<Song[]>(`/api/song/ranking`);
  }

  getSongDetails(id: string)
  {
    return this.http.get<Song>(`/api/song/${id}`);
  }

  updateSong(id: string, name: string, genres: string, band: string, length: string)
  {
    return this.http.post<Song>(`/api/song/${id}`, { name, genres, band, length });
  }

  createBand(name: string, origin: string, genres: string, members: string, description: string)
  {
    return this.http.post<Band>(`/api/band/create`, {
      name,
      origin,
      genres,
      members,
      description
    });
  }

  getAllBands()
  {
    return this.http.get<Band[]>(`/api/band/ranking`);
  }

  getBandDetails(id: string)
  {
    return this.http.get<Band>(`/api/band/${id}`);
  }

  updateBand(id: string, name: string, origin: string, genres: string, members: string, description: string)
  {
    return this.http.post<Band>(`/api/band/${id}`, { name, origin, genres, members, description });
  };

  // TODO: Search bar functionality
}
