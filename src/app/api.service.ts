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

  createSong(albumImage: string, name: string, genres: string, band: string, length: string)
  {
    return this.http.post<Song>(`/api/song/create`, {
      albumImage,
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

  getAllSongsCreatedByUser(userId: string)
  {
    return this.http.get<Song[]>(`/api/song/${userId}/created-songs`);
  }

  getAllSongsLikedByUser(userId: string)
  {
    return this.http.get<Song[]>(`/api/song/${userId}/liked-songs`);
  }

  getSongDetails(id: string)
  {
    return this.http.get<Song>(`/api/song/${id}`);
  }

  updateSong(id: string, albumImage: string, name: string, genres: string, band: string, length: string)
  {
    return this.http.post<Song>(`/api/song/${id}`, { albumImage, name, genres, band, length });
  }

  likeSong(userId: string, songId: string)
  {
    return this.http.post(`/api/song/${songId}/like`, { userId });
  }

  unlikeSong(userId: string, songId: string)
  {
    return this.http.post(`/api/song/${songId}/unlike`, { userId });
  }

  postSongComment(songId: string, comment: Object)
  {
    return this.http.post(`/api/song/${songId}/comment`, { comment });
  }

  deleteSongComment(songId: string, commentId: string)
  {
    return this.http.delete(`/api/song/${songId}/${commentId}`);
  }

  deleteSong(songId: string)
  {
    return this.http.delete(`/api/song/${songId}`);
  }

  createBand(bandImage: string, name: string, origin: string, genres: string, members: string, description: string)
  {
    return this.http.post<Band>(`/api/band/create`, {
      bandImage,
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

  getAllBandsCreatedByUser(userId: string)
  {
    return this.http.get<Band[]>(`/api/band/${userId}/created-bands`);
  }

  getAllBandsLikedByUser(userId: string)
  {
    return this.http.get<Band[]>(`/api/band/${userId}/liked-bands`);
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
    return this.http.post(`/api/band/${bandId}/like`, { userId });
  }

  unlikeBand(userId: string, bandId: string)
  {
    return this.http.post(`/api/band/${bandId}/unlike`, { userId });
  }

  postBandComment(bandId: string, comment: Object)
  {
    return this.http.post(`/api/band/${bandId}/comment`, { comment });
  }

  deleteBandComment(bandId: string, commentId: string)
  {
    return this.http.delete(`/api/band/${bandId}/${commentId}`);
  }

  deleteBand(bandId: string)
  {
    return this.http.delete(`/api/band/${bandId}`);
  }
}
