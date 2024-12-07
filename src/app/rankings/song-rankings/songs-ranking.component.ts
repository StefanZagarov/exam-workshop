import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Song } from '../../interfaces/song';
import { RouterLink } from '@angular/router';
import { LikesPipe } from '../../shared/pipes/likes.pipe';

@Component({
  selector: 'app-song-rankings',
  standalone: true,
  imports: [RouterLink, LikesPipe],
  templateUrl: './songs-ranking.component.html',
  styleUrl: './songs-ranking.component.css'
})
export class SongsRankingComponent implements OnInit
{
  constructor(private apiService: ApiService) { }

  songs: Song[] = [];

  // TODO: Implement loading
  isLoading = true;

  ngOnInit(): void
  {
    this.apiService.getAllSongsByLikes().subscribe(songs =>
    {
      this.songs = songs;

      this.isLoading = false;
    });
  }
}
