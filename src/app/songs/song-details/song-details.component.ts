import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-song-details',
  standalone: true,
  imports: [],
  templateUrl: './song-details.component.html',
  styleUrl: './song-details.component.css'
})
export class SongDetailsComponent implements OnInit
{
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private userService: UserService) { };

  song = {} as Song;

  ngOnInit(): void
  {
    const songId = this.activatedRoute.snapshot.params[`songId`];

    this.apiService.getSongDetails(songId).subscribe(song =>
    {
      this.song = song;
    });
  }
}
