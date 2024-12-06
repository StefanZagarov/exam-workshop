import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Band } from './interfaces/band';

@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  constructor(private http: HttpClient) { }

  // TODO: Get all bands
  getAllBands()
  {
    return this.http.get<Band[]>(`/api/band/ranking`);
  }
  // TODO: Get all songs

  // TODO: Search bar functionality

  // TODO: Ranking list

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
}
