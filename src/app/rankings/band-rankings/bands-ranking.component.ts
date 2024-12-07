import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Band } from '../../interfaces/band';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bands-ranking',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bands-ranking.component.html',
  styleUrl: './bands-ranking.component.css'
})
export class BandsRankingComponent implements OnInit
{
  constructor(private apiService: ApiService) { }

  bands: Band[] = [];

  // TODO: Implement loading
  isLoading = true;

  ngOnInit(): void
  {
    this.apiService.getAllBandsByLikes().subscribe(bands =>
    {
      this.bands = bands;
      this.isLoading = false;
    });
  }
}
