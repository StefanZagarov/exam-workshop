import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiService } from '../../api.service';
import { Song } from '../../interfaces/song';

export const songsRankingResolver: ResolveFn<Song[]> = (route, state) =>
{
  const apiService = inject(ApiService);

  return apiService.getAllSongsByLikes();
};
