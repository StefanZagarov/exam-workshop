import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Band } from './interfaces/band';
import { Song } from './interfaces/song';
import { Comment } from './interfaces/comment';

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

  getAllSongsByLikes()
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

  likeSong(userId: string, songId: string)
  {
    return this.http.post<Song>(`/api/song/${songId}/like`, { userId });
  }

  unlikeSong(userId: string, songId: string)
  {
    return this.http.post<Song>(`/api/song/${songId}/unlike`, { userId });
  }

  postSongComment(songId: string, comment: Object)
  {
    return this.http.post<Song>(`/api/song/${songId}/comment`, { comment });
  }

  deleteSongComment(songId: string, commentId: string)
  {
    return this.http.delete<Song>(`/api/song/${songId}/${commentId}`);
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

  getAllBandsByLikes()
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

  likeBand(userId: string, bandId: string)
  {
    return this.http.post<Band>(`/api/band/${bandId}/like`, { userId });
  }

  unlikeBand(userId: string, bandId: string)
  {
    return this.http.post<Band>(`/api/band/${bandId}/unlike`, { userId });
  }

  postBandComment(bandId: string, comment: Object)
  {
    return this.http.post<Band>(`/api/band/${bandId}/comment`, { comment });
  }

  deleteBandComment(bandId: string, commentId: string)
  {
    return this.http.delete<Band>(`/api/band/${bandId}/${commentId}`);
  }

  // TODO: Search bar functionality
}
