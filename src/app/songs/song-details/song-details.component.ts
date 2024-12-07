import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { Song } from '../../interfaces/song';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-song-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './song-details.component.html',
  styleUrl: './song-details.component.css'
})
export class SongDetailsComponent implements OnInit
{
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private userService: UserService) { };

  song = {} as Song;
  isOwner = false;
  songId = ``;
  editMode = false;

  ngOnInit(): void
  {
    this.songId = this.activatedRoute.snapshot.params[`songId`];

    this.apiService.getSongDetails(this.songId).subscribe(song =>
    {
      this.song = song;

      this.isOwner = this.song.createdBy._id === this.userService.user?._id;
    });
  }

  toggleEditMode()
  {
    this.editMode = !this.editMode;
  }

  updateSong(form: NgForm)
  {
    if (form.value.invalid) return;

    const { name, genres, band, length } = form.value;

    this.apiService.updateSong(this.songId, name, genres, band, length).subscribe(() => { this.toggleEditMode(); });
  }
}
