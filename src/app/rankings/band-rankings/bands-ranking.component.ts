import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { Band } from '../../interfaces/band';
import { RouterLink } from '@angular/router';
import { LikesPipe } from '../../shared/pipes/likes.pipe';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-bands-ranking',
  standalone: true,
  imports: [RouterLink, LikesPipe],
  templateUrl: './bands-ranking.component.html',
  styleUrl: './bands-ranking.component.css'
})
export class BandsRankingComponent implements OnInit
{
  constructor(private apiService: ApiService, private userService: UserService) { }

  bands: Band[] = [];

  // TODO: Implement lazy loading

  userId: string | undefined = ``;

  ngOnInit(): void
  {
    this.apiService.getAllBandsByLikes().subscribe(bands =>
    {
      this.bands = bands;

      this.userId = this.userService.user?._id;
    });
  }

  likeBand(bandId: string)
  {
    this.apiService.likeBand(this.userId!, bandId).subscribe(() =>
    {
      this.updateBandsRankPage();
    });
  }

  unlikeBand(bandId: string)
  {
    this.apiService.unlikeBand(this.userId!, bandId).subscribe(() =>
    {
      this.updateBandsRankPage();
    });
  }

  hasLiked(band: Band)
  {
    return band.likes.some(userId => userId === this.userId);
  }

  updateBandsRankPage()
  {
    this.apiService.getAllBandsByLikes().subscribe(bands =>
    {
      this.bands = bands;
    });
  }
}
