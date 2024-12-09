import { ResolveFn } from '@angular/router';
import { ApiService } from '../../api.service';
import { inject } from '@angular/core';
import { Band } from '../../interfaces/band';

export const bandsRankingResolver: ResolveFn<Band[]> = (route, state) =>
{
  const apiService = inject(ApiService);

  return apiService.getAllBandsByLikes();
};
