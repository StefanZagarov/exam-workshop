import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Band } from '../../interfaces/band';

@Component({
  selector: 'app-bands-ranking',
  standalone: true,
  imports: [],
  templateUrl: './band-rankings.component.html',
  styleUrl: './band-rankings.component.css'
})
export class BandsRankingComponent implements OnInit
{
  constructor(private apiService: ApiService) { }

  bands: Band[] = [];

  // TODO: Implement loading
  isLoading = true;

  ngOnInit(): void
  {
    this.apiService.getAllBands().subscribe(bands =>
    {
      this.bands = bands;
      console.log(this.bands);
      this.isLoading = false;
    });
  }
}
