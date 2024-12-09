import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Song } from '../../interfaces/song';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LikesPipe } from '../../shared/pipes/likes.pipe';
import { UserService } from '../../user/user.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-song-rankings',
  standalone: true,
  imports: [RouterLink, LikesPipe],
  templateUrl: './songs-ranking.component.html',
  styleUrl: './songs-ranking.component.css'
})
export class SongsRankingComponent implements OnInit
{
  constructor(private apiService: ApiService, private userService: UserService, private activRoute: ActivatedRoute) { }

  songs: Song[] = [];

  userId: string | undefined = ``;

  hasLoaded = false;



  ngOnInit(): void
  {
    // Router Resolver
    this.songs = this.activRoute.snapshot.data[`songs`];

    this.userId = this.userService.user?._id;

    this.hasLoaded = true;

  }

  likeSong(songId: string)
  {
    this.apiService.likeSong(this.userId!, songId).subscribe(() =>
    {
      this.updateSongsRankPage();
    });
  }

  unlikeSong(songId: string)
  {
    this.apiService.unlikeSong(this.userId!, songId).subscribe(() =>
    {
      this.updateSongsRankPage();
    });
  }

  hasLiked(song: Song)
  {
    return song.likes.some(userId => userId === this.userId);
  }

  updateSongsRankPage()
  {
    this.apiService.getAllSongsByLikes().subscribe(songs =>
    {
      this.songs = songs;
    });
  }
}
